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
        return jsonify(erreur)

@app.route('/sets/<id>')
def getSetById(id):
    try:
        tabCartes = []
        set = Set.find(f"{id}")
        if not set:
            return jsonify("naaaaan")

        for i in range(set.total):
            tabCartes.append(Card.find({id}-{i+1}))
        
        return "heyyyy"

    except:
        erreur = {
            'messageErreur': "Une erreur a été détecté."
        }
        return jsonify(erreur)

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
        return jsonify(erreur)

if __name__ == '__main__':
    app.run(debug=True)