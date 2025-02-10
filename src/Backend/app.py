from flask import Flask, jsonify
from flask_cors import CORS
import pokemontcgsdk
from pokemontcgsdk import Card
from pokemontcgsdk import Set
from pokemontcgsdk import Type
from pokemontcgsdk import Supertype
from pokemontcgsdk import Subtype
from pokemontcgsdk import Rarity
app = Flask(__name__)
CORS(app)

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
        tabCartes = []
        set = Set.find(id)
        if not set:
            return jsonify({"message": "Set not found"}), 404
        
        nbCartes = set.total

        for i in range(min(nbCartes, 20)): # l'API est pour l'instant buggé, on limit a 20 le nb de pokémon
            cardID = f'{id}-{i+1}'
            card = Card.find(cardID)  
            if card: 
                card_dict = {
                    'id': card.id, 
                    'name': card.name,
                    'rarity': card.rarity,
                    'set': card.set,
                    'images': card.images
                }
                tabCartes.append(card_dict) 

        return jsonify(tabCartes)

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
            'images': card.images
        }
        return jsonify(cardData)

    except:
        erreur = {
            'messageErreur': "Une erreur a été détecté."
        }
        return jsonify(erreur), 500

if __name__ == '__main__':
    app.run(debug=True)