# PoketchAPI

## Description
**PoketchAPI** est une application web utilisant une **Intelligence Artificielle** pour prédire le prix des cartes Pokémon dans le futur. Cette application possède toutes les cartes de la série Pokémon TCG de 1996 jusqu'à 2025.

## Dépendances

### Frontend (JavaScript)
Le frontend du projet utilise npm pour gérer les dépendances JavaScript. Pour installer les modules nécessaires, assurez-vous d'avoir installé [Node.js](https://nodejs.org/en). Vous pouvez lancer la commande suivante dans un terminal pour être sur de l'avoir bien installé:
```bash
node -v # Renvoit par exemple: v22.13.0
npm -v # Renvoit par exemple: 11.2.0
```

Ensuite, vous pouvez installer les dépendances du projet:
```bash
npm install # Installe automatiquement toutes les dépendances de notre projet. 
```

### Backend (Python)
Le backend utilise Flask ainsi que d'autres bibliothèques Python pour gérer les requêtes, manipuler les données et l'IA. Pour installer les dépendances Python, exécutez la commande suivante:
```bash
pip install flask, flask_cors, pokemontcgsdk, scikit-learn, numpy, pandas
```

Sachant que notre IA a été entrainé pendant de nombreux jours, il est important que vous ayiez les données les plus récentes. Pour cela, vous pouvez télécharger la version la plus récente de notre IA [ici](https://www.mediafire.com/file/w0hr7lxc5dlmt9b/pokemon.pickle/file) ou lancer la commande suivante pour créer l'IA:
```bash
python3 src/Backend/model.py # Peut prendre plusieurs heures
```
Il est important que le fichier ``pokemon.pickle`` soit dans le dossier [Backend](./src/Backend/)

## Lancement
Pour lancer le projet, lancez la commande suivante qui lancera le Frontend et le Backend en même temps.
```bash
npm start
```