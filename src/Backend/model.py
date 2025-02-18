import pandas as pd
import numpy as np 
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestRegressor
import pickle
import app
import requests

def get_card_data(card_ids):
    base_url = "https://raw.githubusercontent.com/tcgdex/price-history/master/en/base1/{}.tcgplayer.json"
    all_data = []
    
    for card_id in card_ids:
        url = base_url.format(card_id)
        response = requests.get(url)
        if response.status_code == 200:
            card_data = response.json()
            card_data = card_data["data"]["holo-good"]["history"]

            card_records = [
                {
                    'card_id': card_id,
                    'date': item,
                    'price': card_data[item]["avg"]
                }
                for item in card_data
            ]
            all_data.extend(card_records)

    df = pd.DataFrame(all_data)

    df['date'] = pd.to_datetime(df['date'])
    df['year'] = df['date'].dt.year
    df['month'] = df['date'].dt.month
    df['day'] = df['date'].dt.day
    return df

card_ids = [] 
for i in range(100):
    card_ids.append(str(i))

df = get_card_data(card_ids)

print(df)
predict = "price"

X = df[['card_id', 'year', 'month', 'day']]
y = df[predict]

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

model = RandomForestRegressor(n_estimators=100, random_state=42)
model.fit(X_train_scaled, y_train)

train_score = model.score(X_train_scaled, y_train)
test_score = model.score(X_test_scaled, y_test)

print(f"Score d'entrainement: {train_score:.3f}")
print(f"Score de test: {test_score:.3f}")

def predict_price(card_id, date):
    date = pd.to_datetime(date)
    input_data = pd.DataFrame({
        'card_id': [card_id],
        'year': [date.year],
        'month': [date.month],
        'day': [date.day]
    })
    input_scaled = scaler.transform(input_data)
    return model.predict(input_scaled)[0]

future_date = "2024-09-19"
card_id = 1
predicted_price = predict_price(card_id, future_date)
print(f"Prix predit pour la carte d'id {card_id} le {future_date}: {predicted_price:.2f}$")