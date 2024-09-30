# Smart-City 🧠
FixCity - Mobile app

---

# FixCity - Application

## Description
Ce projet permet de suivre et signaler des incidents en ville via une application mobile connectée à une base de données. L'application offre des fonctionnalités de filtrage des rapports d'incidents et permet aux utilisateurs de poster leurs propres signalements.

## Prérequis

1. **Node.js** : Assurez-vous d'avoir [Node.js](https://nodejs.org/) installé sur votre machine.
2. **Expo** : Vous aurez besoin de [Expo](https://expo.dev/) pour lancer l'application mobile.
3. **Postman** : Pour tester les routes d'API, vous pouvez utiliser [Postman](https://www.postman.com/).

## Configuration de la base de données

La base de données est accessible via l'adresse IP de l'infrastructure Ionis. Cependant, vous devrez effectuer quelques modifications pour vous connecter à la base de données depuis votre machine.

### Étapes à suivre :
**Changer l'URL dans l'index.tsx** :
   - Localisez le fichier `index.tsx` du dossier FixCity-app.
   - Modifiez l'URL en remplaçant **avant** le `:3000` et **après** `http://` avec votre propre adresse IP. Par exemple :
     ```javascript
     http://votre-ip:3000
     ```
   - **Assurez-vous que cette adresse IP soit aussi présente dans la base de données**.

## Lancer le Backend

### Avec Node.js

Pour démarrer le serveur backend, ouvrez un terminal et exécutez :

```bash
node index.js
```

### Avec Nodemon

Si vous utilisez `nodemon` pour recharger automatiquement le serveur lors de modifications, exécutez :

```bash
nodemon index.js
```

## Utilisation des routes avec Postman

Les routes d'API peuvent être testées via Postman. Voici comment procéder :

1. **Routes GET et POST** :
   - **GET** : Pour récupérer les données, vous pouvez utiliser la méthode `GET` avec l'URL suivante :
     ```
     http://localhost:3000/votre-route
     ```
   - **POST** : Pour envoyer des données, utilisez `POST` sur :
     ```
     http://localhost:3000/votre-route
     ```

   Remplacez `votre-route` par les routes spécifiques définies dans votre backend (par exemple, `/abris`, `/signalement`).

## Lancer l'application avec Expo

1. Installez les dépendances du projet mobile en exécutant dans le terminal :
   ```bash
   npm install
   ```

2. Lancer Expo :
   ```bash
   npx expo start
   ```

   Ensuite, scannez le QR code avec votre application Expo Go pour voir l'application sur votre appareil mobile.

## Fonctionnalités de l'application

L'application permet :

- **Filtrer les incidents** : Les utilisateurs peuvent appliquer des filtres pour voir des incidents spécifiques.
- **Poster un signalement** : Les utilisateurs peuvent signaler de nouveaux incidents directement depuis l'application.

## Membres du groupe

Ce projet a été réalisé par :
- **Mathis Ghidotti**
- **Sacha Gaulin**
- **Anna Nouvel**
- **Ayodélé Bansou-Kpindé**
- **Martin Pinaud**