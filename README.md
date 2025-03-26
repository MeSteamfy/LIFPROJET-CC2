# PoketchAPI

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

## Lancement
Pour lancer le projet, lancez la commande suivante qui lancera le Frontend et le Backend en même temps.
```bash
npm start
```