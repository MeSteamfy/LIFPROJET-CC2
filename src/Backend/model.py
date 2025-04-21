import pandas as pd
import numpy as np 
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
import pickle
import requests
import os
import plotly.express as px
token = "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"
headers = {
    "Authorization": f"Bearer {token}",
    "Accept": "application/vnd.github.v3+json"
}

def get_all_extensions():
    global headers
    url = "https://api.github.com/repos/tcgdex/price-history/contents/en"
    response = requests.get(url, headers=headers)
    if response.status_code == 200:
        contenu = response.json()
        extensions = [item['name'] for item in contenu]
        return extensions
    else:
        print(f"Erreur : Impossible de récupérer les éléments (code {response.status_code})")


def get_extension(ext):
    global headers
    base_url = "https://api.github.com/repos/tcgdex/price-history/contents/en/{}"
    url = base_url.format(ext)
    response = requests.get(url, headers=headers)

    if response.status_code == 200:
        contenu = response.json()
        cards = [item['name'] for item in contenu]
        return cards
    else:
        print(f"Erreur : Impossible de récupérer les éléments (code {response.status_code})")


def get_card_data():
    global headers
    extensions = get_all_extensions()
    all_data = []
    for extension in extensions:
        cards = get_extension(extension)
        base_url = "https://raw.githubusercontent.com/tcgdex/price-history/master/en/{}/{}"
        
        for card in cards:
            url = base_url.format(extension,card)
            response = requests.get(url, headers=headers)
            if (response.status_code == 200):
                card_data = response.json()
                states = [item for item in card_data["data"]]
                for state in states:
                    card_data_state = card_data['data'][state]["history"]
                    card_records = [
                        {
                            'extension': extension,
                            'card_id': card.split('.')[0],
                            'state': state,
                            'date': item,                                
                            'price': card_data_state[item]["avg"]
                        }
                        for item in card_data_state
                    ]
                    all_data.extend(card_records)
            else:
                print(f"Erreur : Impossible de récupérer les éléments (code {response.status_code})")
            print(extension + "   " + card)
    df = pd.DataFrame(all_data)

    df['date'] = pd.to_datetime(df['date'])
    df['year'] = df['date'].dt.year
    df['month'] = df['date'].dt.month
    df['day'] = df['date'].dt.day
    return df

def create_graphe(df):

    output_folder = os.path.abspath("./src/assets/graphes")
    os.makedirs(output_folder, exist_ok=True)

    grouped = df.groupby(['extension', 'card_id'])

    for (extension, card_id), group in grouped:
        print(f"Carte : {card_id} (Extension : {extension}) - États trouvés : {group['state'].unique()}")

        extension_folder = os.path.join(output_folder, extension)
        os.makedirs(extension_folder, exist_ok=True)

        fig = px.line(group.sort_values('date'),
                    x='date', y=group['price'] / 100,
                    color='state',
                    title=f"Évolution du prix - {card_id} ({extension})",
                    labels={'date': 'Date', 'y': 'Prix ($)', 'state': 'État'})

        safe_card_id = str(card_id).replace("/", "_").replace("\\", "_")
        filename = f"{safe_card_id}.html"
        filepath = os.path.join(extension_folder, filename)

        fig.write_html(filepath)
        print(f"Graphe sauvegardé : {filepath}")

def train_model(X, y, save_path="src/Backend/pokemon.pickle", n_iter=20):
    r2_scores = []
    mae_scores = []

    best_model = None
    best_r2 = -np.inf
    best_scaler = None
    best_random_state = None

    for random_state in range(n_iter):
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.1, random_state=random_state)
        scaler = StandardScaler()
        X_train_scaled = scaler.fit_transform(X_train)
        X_test_scaled = scaler.transform(X_test)

        model = RandomForestRegressor(n_estimators=100, max_depth=20, random_state=random_state)
        model.fit(X_train_scaled, y_train)

        y_pred = model.predict(X_test_scaled)

        r2 = r2_score(y_test, y_pred)
        mae = mean_absolute_error(y_test, y_pred)

        r2_scores.append(r2)
        mae_scores.append(mae)

        if r2 > best_r2:
            best_r2 = r2
            best_model = model
            best_scaler = scaler
            best_random_state = random_state

            with open(save_path, "wb") as f:
                pickle.dump((model, labelEncoder_card, labelEncoder_ext, labelEncoder_sta, scaler), f)

    print("\n--- Resultats sur les", n_iter, "iterations ---")
    print(f"R² moyen      : {np.mean(r2_scores):.4f} (±{np.std(r2_scores):.4f})")
    print(f"MAE moyen     : {np.mean(mae_scores):.4f}")                                 #en cents
    print(f"Meilleur R²   : {best_r2:.4f} (random_state={best_random_state})")

    return best_model

#df = get_card_data()
#print(df)

#predict = "price"

#X = df[['card_id', 'year', 'month', 'day', 'extension', 'state']]
#y = df[predict]
#labelEncoder_card = LabelEncoder()
#labelEncoder_ext = LabelEncoder()
#labelEncoder_sta = LabelEncoder()

#X.loc[:, 'card_id'] = labelEncoder_card.fit_transform(X['card_id'])
#X.loc[:, 'extension'] = labelEncoder_ext.fit_transform(X['extension'])
#X.loc[:, 'state'] = labelEncoder_sta.fit_transform(X['state'])
#model = train_model(X, y, save_path="src/Backend/pokemon.pickle", n_iter=20)


def load_model():
    model_path = os.path.join(os.path.dirname(__file__), 'pokemon.pickle')
    with open(model_path, "rb") as f:
        model, labelEncoder_card, labelEncoder_ext, labelEncoder_sta, scaler = pickle.load(f)
    return model, labelEncoder_card, labelEncoder_ext, labelEncoder_sta, scaler

def predict_price(card_id, date, ext, state, model, labelEncoder_card, labelEncoder_ext, labelEncoder_sta, scaler):
    print("Préparation des données...")  # 👈 Ajoute ça
    date = pd.to_datetime(date)
    input_data = pd.DataFrame({
        'card_id': [card_id],
        'year': [date.year],
        'month': [date.month],
        'day': [date.day],
        'extension': [ext],
        'state': [state]
    })

    print("Encodage...")
    input_data['card_id'] = labelEncoder_card.transform(input_data['card_id'])  # ❌ Peut planter ici
    input_data['extension'] = labelEncoder_ext.transform(input_data['extension'])
    input_data['state'] = labelEncoder_sta.transform(input_data['state'])

    print("Scaling...")
    input_scaled = scaler.transform(input_data)

    print("Prédiction...")
    result = model.predict(input_scaled)[0]

    print("Prédiction terminée:", result)
    return result


# future_date = "2024-09-19"
# card_id = "4"
# extension = "xy0"
# state = "normal-good"
# predicted_price = predict_price(card_id, future_date, extension, state)
# print(f"Prix predit pour la carte du set {extension} d'id {card_id} {state} le {future_date}: {predicted_price/100:.2f}$")
