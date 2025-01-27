from flask import Flask, jsonify
import pokemontcgsdk
from pokemontcgsdk import Card
from pokemontcgsdk import Set
from pokemontcgsdk import Type
from pokemontcgsdk import Supertype
from pokemontcgsdk import Subtype
from pokemontcgsdk import Rarity
app = Flask(__name__)

@app.route('/')
def home():
    return 'Hello, World!'

@app.route('/pokemon')
def pokemonID():
    card = Card.find('xy1-1') # test

    card_data = {
        'name': card.name,
        'id': card.id,
        'set': card.set.name,
        'rarity': card.rarity,
        'type': card.types,
    }
    return jsonify(card_data)

if __name__ == '__main__':
    app.run(debug=True)