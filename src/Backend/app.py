from flask import Flask, request, jsonify
from flask_cors import CORS
import pokemontcgsdk
from pokemontcgsdk import Card
from pokemontcgsdk import Set
from pokemontcgsdk import Type
from pokemontcgsdk import Supertype
from pokemontcgsdk import Subtype
from pokemontcgsdk import Rarity
from model import load_model, predict_price
import traceback

import requests

app = Flask(__name__)
CORS(app)

# model = tf.keras.models.load_model('predict_price.h5')


@app.route('/')
def home():
    return 'Hello, World!'

@app.route('/sets')
def getAllSets():
    try:
        set = Set.all()
        return jsonify(set)

    except:
        erreur = {
            'messageErreur': "Une erreur a été détecté."
        }
        return jsonify(erreur), 500

@app.route('/sets/<id>')
def getSetById(id):
    try:
        set = Set.find(id)
        if not set:
            return jsonify({"message": "Aucun set a été trouvé"}), 404
        
        cards = Card.where(q=f'set.id:"{set.id}"')

        return jsonify(cards)

    except Exception as e:
        erreur = {
            'messageErreur': "Une erreur a été détectée.",
            'details': str(e)
        }
        return jsonify(erreur), 500

@app.route('/pokemon/search/<pokemonName>')
def getPokemonByName(pokemonName):
    try:
        cards = Card.where(q=f'name:{pokemonName}')
        return jsonify(cards)

    except:
        erreur = { 'messageErreur': "Erreur detecté"}
        return jsonify(erreur), 500


@app.route('/pokemon/prediction')
def predictPokemonCard():
    try:
        card_id = request.args.get('id')
        ext = request.args.get('extension')
        date = request.args.get('date')
        state = request.args.get('state')

        if not all([card_id, date, ext, state]):
            return jsonify({"error": "Paramètres manquants"}), 400

        model, labelEncoder_card, labelEncoder_ext, labelEncoder_sta, scaler = load_model()

        predicted_price = predict_price(card_id, date, ext, state, model, labelEncoder_card, labelEncoder_ext, labelEncoder_sta, scaler)

        return jsonify({
            "cardID": card_id,
            "predicted_price": predicted_price,
            "date": date
        })

    except Exception as e:
        print("Erreur dans /pokemon/prediction :", e)
        error_message = e.decode("utf-8") if isinstance(e, bytes) else str(e)
        return jsonify({"error": f"Une erreur est survenue: {error_message}"}), 500



@app.route('/pokemon/<id>')
def getPokemon(id):
    try:
        card = Card.find(id)

        cardData = {
            'name': card.name,
            'id': card.id,
            'set': card.set.name,
            'rarity': card.rarity,
            'type': card.types,
            'images': card.images,
            'nationalPokedexNumbers' : card.nationalPokedexNumbers,
            'marketPrix': card.tcgplayer
        }
        return jsonify(cardData)

    except:
        erreur = {
            'messageErreur': "Une erreur a été détecté."
        }
        return jsonify(erreur), 500
    
#a partir dune id on recupere les prix grace au github et on applique le modele 


# Route callback qui empêche l'erreur par défaut de Flask
# c'est comme event.preventDefault() et c'est nous qui gérons l'erreur ici
@app.errorhandler(500)
def internal_server_error(e):
    traceback.print_exc()
    return jsonify({
        'messageErreur': "Internal Server Error",
        'details': str(e)
    }), 500


if __name__ == '__main__':
    app.run(debug=True)