# 🎮 Mon Dex API Pokémon

## 1. Présentation du projet

**Mon Dex Pokémon** est une application web qui permet de découvrir et consulter les Pokémon.

Ce projet consiste à connecter un Pokédex à une API externe appelée **PokeAPI** pour récupérer automatiquement les informations des Pokémon.

L'utilisateur peut consulter les Pokémon, rechercher un Pokémon, afficher ses détails et ajouter des Pokémon à ses favoris.

## 2. Technologies utilisées

- HTML5 : structure de la page.
- CSS3 : style de l'application.
- Tailwind CSS : mise en forme et design.
- JavaScript : fonctionnalités et interactions.
- Fetch API : récupération des données depuis Internet.
- PokeAPI : API utilisée pour obtenir les informations des Pokémon.
- LocalStorage : sauvegarde des favoris.
- SessionStorage : sauvegarde de la dernière recherche.
- Git et GitHub : gestion et partage du projet.

## 3. API utilisée

Le projet utilise **PokeAPI**, une API gratuite qui ne nécessite pas de clé d'accès.

Lien de l'API : [https://pokeapi.co/api/v2/](https://pokeapi.co/api/v2/)

Exemples de requêtes :

- Liste des Pokémon : [https://pokeapi.co/api/v2/pokemon?limit=20&offset=0](https://pokeapi.co/api/v2/pokemon?limit=20\&offset=0)
- Détails d'un Pokémon : [https://pokeapi.co/api/v2/pokemon/pikachu](https://pokeapi.co/api/v2/pokemon/pikachu)

Les données sont récupérées avec `fetch()`, puis transformées en objets simples avant leur affichage.

## 4. Fonctionnalités du projet

### Partie 1 : Liste des Pokémon

- Charger les 20 premiers Pokémon au démarrage.
- Afficher les Pokémon sous forme de cartes.
- Récupérer les informations depuis PokeAPI.
- Transformer les données de l'API en objets simples.
- Ajouter un bouton « Charger plus » pour afficher les 20 Pokémon suivants.
- Filtrer les Pokémon selon leur type.

### Partie 2 : Recherche et détails

- Rechercher un Pokémon par son nom exact.
- Afficher le résultat de la recherche.
- Ajouter un bouton « Effacer » pour revenir à la liste.
- Cliquer sur une carte pour afficher les détails du Pokémon.
- Afficher son image, ses types et ses statistiques.

### Partie 3 : États et sauvegarde

- Afficher un indicateur pendant le chargement.
- Afficher les résultats lorsque les données sont disponibles.
- Afficher un message lorsqu'aucun Pokémon n'est trouvé.
- Afficher un message d'erreur en cas de problème.
- Ajouter un bouton pour réessayer après une erreur.
- Ajouter ou retirer un Pokémon des favoris.
- Sauvegarder les favoris dans LocalStorage.
- Sauvegarder la dernière recherche dans SessionStorage.

## 5. Organisation des fichiers

Le projet est organisé en plusieurs fichiers. Chaque fichier possède un rôle précis.

| Fichier               | Rôle                                                                             |
| --------------------- | -------------------------------------------------------------------------------- |
| `src/services/api.js` | Contient les fonctions pour communiquer avec PokeAPI et transformer les données. |
| `src/storage.js`      | Gère les favoris et la dernière recherche.                                       |
| `src/ui.js`           | Gère l'affichage des cartes, des détails et des différents états.                |
| `src/main.js`         | Gère les événements et relie les différentes fonctionnalités.                    |
| `src/input.css`       | Contient les styles personnalisés et les directives Tailwind CSS.                |
| `dist/output.css`     | Contient le CSS généré par Tailwind CSS.                                         |
| `index.html`          | Contient la structure HTML principale.                                           |

## 6. Installation et lancement du projet

### Étape 1 : Cloner le projet

Ouvrir le terminal et exécuter :

```bash
git clone [(https://github.com/aichaelhardi/MonDex-projet-API2.git)]
```

### Étape 2 : Entrer dans le dossier

```bash
cd MonDex-projet-API2
```

### Étape 3 : Installer les dépendances

```bash
npm install
```

### Étape 4 : Lancer Tailwind CSS

```bash
npm run dev
```

Cette commande permet de générer le fichier CSS et de surveiller les modifications.

### Étape 5 : Ouvrir le site

Ouvrir `index.html` dans le navigateur avec un serveur local, par exemple Live Server dans VS Code.

## 7. Gestion des erreurs

Le projet utilise `try / catch` pour gérer les erreurs pendant les requêtes API.

Les différents états sont :

- **Chargement :** afficher un indicateur pendant la récupération des données.
- **Succès :** afficher les Pokémon récupérés.
- **Vide :** afficher un message si aucun résultat n'est trouvé.
- **Erreur :** afficher un message clair et proposer de réessayer.

## 8. Bonus réalisés

À compléter selon les fonctionnalités réellement terminées :

- [ ] Recherche automatique avec debounce (400 ms).
- [ ] Cache des Pokémon déjà consultés.
- [ ] Scroll infini.

## 9. Déploiement

Le projet est déployé avec GitHub Pages.

Lien du site : [(https://aichaelhardi.github.io/MonDex-projet-API2/)]

Lien du dépôt GitHub : [(https://github.com/aichaelhardi/MonDex-projet-API2.git)]

## 10. Conclusion

Ce projet m'a permis de pratiquer JavaScript, de comprendre le fonctionnement d'une API et d'utiliser `fetch`, `async / await` et `Promise.all`.

J'ai également appris à organiser mon code en plusieurs fichiers, à gérer les erreurs et à sauvegarder des données avec LocalStorage et SessionStorage.

