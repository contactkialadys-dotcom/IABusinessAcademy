# Guide de déploiement

Ce document fournit des instructions détaillées pour déployer **IA Business Academy** sur différentes plateformes, avec un focus particulier sur le déploiement web via Vercel.

## Table des matières

- [Déploiement web sur Vercel](#déploiement-web-sur-vercel)
- [Déploiement mobile avec Expo Application Services](#déploiement-mobile-avec-expo-application-services)
- [Déploiement du backend](#déploiement-du-backend)
- [Variables d'environnement](#variables-denvironnement)
- [Dépannage](#dépannage)

## Déploiement web sur Vercel

Vercel offre une solution simple et rapide pour déployer la version web de votre application Expo. Cette section vous guide pas à pas dans le processus de déploiement.

### Prérequis

Avant de commencer le déploiement sur Vercel, assurez-vous d'avoir les éléments suivants :

- Un compte GitHub avec votre code source poussé dans un dépôt
- Un compte Vercel (gratuit) créé sur [vercel.com](https://vercel.com)
- Node.js version 18 ou supérieure installé localement
- pnpm installé globalement sur votre machine

### Étape 1 : Préparer le dépôt GitHub

La première étape consiste à pousser votre code sur GitHub si ce n'est pas déjà fait. Créez un nouveau dépôt sur GitHub en vous rendant sur [github.com/new](https://github.com/new). Donnez un nom à votre dépôt, par exemple `ia-business-academy`, et choisissez la visibilité (public ou privé).

Ensuite, initialisez Git dans votre projet local si ce n'est pas déjà fait :

```bash
cd ia-business-academy
git init
git add .
git commit -m "Initial commit: IA Business Academy"
```

Ajoutez le dépôt distant et poussez votre code :

```bash
git remote add origin https://github.com/votre-username/ia-business-academy.git
git branch -M main
git push -u origin main
```

### Étape 2 : Tester l'export web localement

Avant de déployer sur Vercel, il est recommandé de tester l'export web en local pour s'assurer que tout fonctionne correctement. Exécutez les commandes suivantes dans votre terminal :

```bash
pnpm install
npx expo export --platform web
```

Cette commande génère les fichiers statiques dans le dossier `dist/`. Vous pouvez tester le résultat localement en utilisant un serveur HTTP simple :

```bash
npx serve dist
```

Ouvrez votre navigateur et accédez à `http://localhost:3000` pour vérifier que l'application fonctionne correctement. Testez la navigation, les formulaires, et les fonctionnalités principales.

### Étape 3 : Connecter Vercel à GitHub

Rendez-vous sur [vercel.com](https://vercel.com) et connectez-vous avec votre compte GitHub. Cliquez sur le bouton **"Add New..."** puis sélectionnez **"Project"**. Vercel affichera la liste de vos dépôts GitHub.

Recherchez et sélectionnez le dépôt `ia-business-academy`. Cliquez sur **"Import"** pour continuer.

### Étape 4 : Configurer le projet

Vercel détectera automatiquement qu'il s'agit d'un projet Node.js, mais vous devez configurer les paramètres de build manuellement pour Expo. Voici les paramètres à configurer :

| Paramètre | Valeur |
|-----------|--------|
| Framework Preset | Other |
| Build Command | `pnpm install && npx expo export --platform web` |
| Output Directory | `dist` |
| Install Command | `pnpm install` |

Le fichier `vercel.json` à la racine du projet contient déjà ces configurations, donc Vercel les appliquera automatiquement.

### Étape 5 : Configurer les variables d'environnement

Si votre application utilise des variables d'environnement (API keys, URLs, etc.), vous devez les configurer dans Vercel. Cliquez sur l'onglet **"Environment Variables"** dans les paramètres du projet.

Ajoutez les variables suivantes si nécessaire :

```
NODE_ENV=production
EXPO_PUBLIC_API_URL=https://votre-api.com
```

Les variables préfixées par `EXPO_PUBLIC_` seront accessibles dans votre application React Native.

### Étape 6 : Déployer

Une fois la configuration terminée, cliquez sur **"Deploy"**. Vercel va :

1. Cloner votre dépôt GitHub
2. Installer les dépendances avec pnpm
3. Exécuter la commande de build (`npx expo export --platform web`)
4. Déployer les fichiers statiques sur son CDN global

Le processus de déploiement prend généralement entre 2 et 5 minutes. Vous pouvez suivre la progression en temps réel dans l'interface Vercel.

### Étape 7 : Accéder à votre application

Une fois le déploiement terminé, Vercel vous fournit une URL de production, par exemple :

```
https://ia-business-academy.vercel.app
```

Vous pouvez également configurer un domaine personnalisé dans les paramètres du projet Vercel. Cliquez sur **"Domains"** et ajoutez votre nom de domaine personnalisé.

### Déploiements automatiques

Vercel configure automatiquement les déploiements continus. Chaque fois que vous poussez du code sur la branche `main`, Vercel déclenchera automatiquement un nouveau déploiement. Les Pull Requests créent également des déploiements de prévisualisation avec des URLs uniques.

## Déploiement mobile avec Expo Application Services

Pour déployer l'application mobile native sur iOS et Android, utilisez Expo Application Services (EAS). Cette section explique comment configurer et déployer votre application sur les stores.

### Installation d'EAS CLI

Installez l'outil en ligne de commande EAS globalement :

```bash
npm install -g eas-cli
```

Connectez-vous à votre compte Expo :

```bash
eas login
```

Si vous n'avez pas de compte Expo, créez-en un gratuitement sur [expo.dev](https://expo.dev).

### Configuration du projet

Configurez EAS Build pour votre projet :

```bash
cd ia-business-academy
eas build:configure
```

Cette commande crée un fichier `eas.json` à la racine du projet avec la configuration de build par défaut.

### Build pour Android

Pour créer un build Android (APK ou AAB) :

```bash
eas build --platform android
```

Choisissez le type de build :
- **APK** : pour une distribution directe (téléchargement et installation manuelle)
- **AAB** : pour une soumission au Google Play Store (recommandé)

Le build s'exécute sur les serveurs d'Expo et prend environ 10 à 20 minutes. Une fois terminé, vous recevrez un lien de téléchargement.

### Build pour iOS

Pour créer un build iOS :

```bash
eas build --platform ios
```

**Note importante** : Pour les builds iOS, vous devez avoir un compte Apple Developer (99$/an) et configurer les certificats et profils de provisionnement. EAS peut gérer automatiquement ces certificats pour vous.

### Soumission aux stores

Une fois vos builds créés, soumettez-les aux stores :

**Google Play Store :**
```bash
eas submit --platform android
```

**Apple App Store :**
```bash
eas submit --platform ios
```

Suivez les instructions interactives pour fournir les informations nécessaires (identifiants de store, métadonnées, etc.).

## Déploiement du backend

L'application **IA Business Academy** inclut un backend API optionnel situé dans le dossier `server/`. Voici comment le déployer.

### Option 1 : Déployer sur Vercel (Serverless)

Le backend peut être déployé sur Vercel en tant que fonctions serverless. Assurez-vous que le fichier `vercel.json` est configuré correctement. Vercel détectera automatiquement les routes API dans le dossier `server/`.

### Option 2 : Déployer sur Railway

Railway offre une solution simple pour déployer des applications Node.js avec base de données :

1. Créez un compte sur [railway.app](https://railway.app)
2. Connectez votre dépôt GitHub
3. Railway détectera automatiquement le projet Node.js
4. Configurez les variables d'environnement (DATABASE_URL, etc.)
5. Déployez en un clic

### Option 3 : Déployer sur Heroku

Heroku est une plateforme mature pour déployer des applications Node.js :

```bash
heroku create ia-business-academy-api
git push heroku main
heroku config:set NODE_ENV=production
```

Configurez les add-ons nécessaires (PostgreSQL, Redis, etc.) via le dashboard Heroku.

## Variables d'environnement

Voici la liste des variables d'environnement utilisées par l'application. Configurez-les selon votre environnement de déploiement.

| Variable | Description | Exemple | Requis |
|----------|-------------|---------|--------|
| `NODE_ENV` | Environnement d'exécution | `production` | Oui |
| `DATABASE_URL` | URL de connexion à la base de données | `postgresql://user:pass@host:5432/db` | Non* |
| `EXPO_PUBLIC_API_URL` | URL de l'API backend | `https://api.example.com` | Non* |
| `JWT_SECRET` | Secret pour les tokens JWT | `votre-secret-aleatoire` | Non* |
| `S3_BUCKET` | Nom du bucket S3 pour le stockage | `ia-academy-assets` | Non* |
| `S3_ACCESS_KEY` | Clé d'accès AWS S3 | `AKIAIOSFODNN7EXAMPLE` | Non* |
| `S3_SECRET_KEY` | Clé secrète AWS S3 | `wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY` | Non* |

*Non requis si vous n'utilisez pas les fonctionnalités backend/base de données.

### Configuration dans Vercel

Pour configurer les variables d'environnement dans Vercel :

1. Accédez aux paramètres du projet
2. Cliquez sur **"Environment Variables"**
3. Ajoutez chaque variable avec sa valeur
4. Sélectionnez les environnements (Production, Preview, Development)
5. Cliquez sur **"Save"**

Redéployez l'application pour que les changements prennent effet.

## Dépannage

Cette section couvre les problèmes courants rencontrés lors du déploiement et leurs solutions.

### Erreur : "Build failed"

Si le build échoue sur Vercel, vérifiez les points suivants :

**Problème de dépendances** : Assurez-vous que toutes les dépendances sont listées dans `package.json`. Exécutez `pnpm install` localement pour vérifier.

**Version de Node.js** : Vercel utilise par défaut la dernière version LTS de Node.js. Si votre application nécessite une version spécifique, ajoutez dans `package.json` :

```json
{
  "engines": {
    "node": "18.x"
  }
}
```

**Mémoire insuffisante** : Les builds Expo peuvent nécessiter beaucoup de mémoire. Contactez le support Vercel pour augmenter la limite de mémoire.

### Erreur : "Module not found"

Si vous obtenez des erreurs "Module not found" après le déploiement :

**Chemins d'import** : Vérifiez que tous les imports utilisent des chemins relatifs corrects ou des alias configurés dans `tsconfig.json`.

**Extensions de fichiers** : Assurez-vous d'inclure les extensions `.tsx`, `.ts`, `.jsx`, `.js` dans vos imports si nécessaire.

**Casse des noms de fichiers** : Les systèmes de fichiers Linux (utilisés par Vercel) sont sensibles à la casse. Vérifiez que les noms de fichiers correspondent exactement aux imports.

### Application blanche après déploiement

Si l'application affiche une page blanche :

**Console du navigateur** : Ouvrez les outils de développement (F12) et vérifiez la console pour les erreurs JavaScript.

**Chemins des assets** : Vérifiez que les chemins vers les images, audios, et autres assets sont corrects. Utilisez `require()` pour les assets statiques dans Expo.

**Variables d'environnement** : Assurez-vous que toutes les variables d'environnement nécessaires sont configurées dans Vercel.

### Performances lentes

Si l'application est lente après le déploiement :

**Optimisation des images** : Compressez les images avant de les inclure dans le projet. Utilisez des formats modernes comme WebP.

**Code splitting** : Expo Router gère automatiquement le code splitting. Assurez-vous de ne pas importer de gros modules inutilement.

**CDN** : Vercel utilise automatiquement un CDN global. Les assets statiques sont mis en cache automatiquement.

### Problèmes d'authentification

Si l'authentification ne fonctionne pas en production :

**Cookies** : Vérifiez que les cookies sont configurés avec les bons domaines et attributs (`SameSite`, `Secure`).

**CORS** : Si le backend est sur un domaine différent, configurez CORS correctement dans le serveur.

**HTTPS** : Assurez-vous que votre application utilise HTTPS en production (Vercel le fait automatiquement).

## Support et ressources

Pour obtenir de l'aide supplémentaire sur le déploiement :

- **Documentation Vercel** : [vercel.com/docs](https://vercel.com/docs)
- **Documentation Expo** : [docs.expo.dev](https://docs.expo.dev)
- **Documentation EAS** : [docs.expo.dev/eas](https://docs.expo.dev/eas)
- **Support Vercel** : [vercel.com/support](https://vercel.com/support)
- **Forum Expo** : [forums.expo.dev](https://forums.expo.dev)

N'hésitez pas à ouvrir une issue sur GitHub si vous rencontrez des problèmes spécifiques au projet **IA Business Academy**.

---

**Dernière mise à jour : Janvier 2026**
