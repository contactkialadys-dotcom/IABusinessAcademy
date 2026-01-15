# 🎓 IA Business Academy

**IA Business Academy** est une application mobile éducative conçue pour aider les entrepreneurs à maîtriser l'intelligence artificielle et à l'intégrer dans leur business. L'application propose des mini-formations gratuites, des ebooks, un générateur d'images IA, et un service de coaching privé personnalisé.

## 📱 Aperçu du projet

Cette application mobile a été développée avec **React Native** et **Expo** pour offrir une expérience d'apprentissage immersive et accessible. Elle s'adresse particulièrement aux entrepreneurs qui souhaitent économiser du temps et de l'argent en utilisant l'IA pour créer du contenu professionnel, automatiser des tâches et développer leur activité.

### Fonctionnalités principales

L'application **IA Business Academy** intègre plusieurs fonctionnalités essentielles pour accompagner les entrepreneurs dans leur apprentissage de l'IA. La page d'accueil présente une introduction inspirante avec un audio de bienvenue et une section expliquant pourquoi l'académie a été créée. Les utilisateurs peuvent accéder à quatre mini-formations complètes couvrant la création de photos professionnelles avec l'IA, la production de vidéos, le lancement d'un e-commerce en Afrique, et la maîtrise de Gemini. Chaque formation comprend plusieurs modules avec des guides audio explicatifs enregistrés avec une voix féminine professionnelle.

Le système de progression permet aux élèves de suivre leur avancement dans chaque formation. Une barre de progression affiche le pourcentage de modules complétés, et les utilisateurs peuvent cocher les modules terminés pour garder une trace de leur parcours. Cette fonctionnalité motive les apprenants à terminer les formations et leur offre une vision claire de leur progression.

L'application propose également un générateur d'images IA gratuit intégré, permettant aux entrepreneurs de créer des visuels professionnels sans compétences techniques. Un chatbot IA intelligent répond aux questions des élèves en temps réel, avec la possibilité de copier les réponses pour une utilisation ultérieure. La section coaching privé offre un accompagnement personnalisé en one-to-one via Telegram, avec un formulaire de contact obligatoire pour qualifier les demandes.

### Design et expérience utilisateur

Le design de l'application suit une palette de couleurs beige, marron et dorée pour créer une ambiance chaleureuse et professionnelle. L'interface est épurée et minimaliste, facilitant la navigation et la concentration sur le contenu éducatif. Les cartes de formations sont conçues sans images distrayantes, mettant l'accent sur les informations essentielles et les badges "✓ Gratuit" pour indiquer l'accessibilité du contenu.

## 🚀 Technologies utilisées

Le projet repose sur un ensemble de technologies modernes et éprouvées pour garantir performance et maintenabilité.

| Technologie | Version | Usage |
|-------------|---------|-------|
| React Native | 0.81.5 | Framework mobile multiplateforme |
| Expo | ~54.0.29 | Plateforme de développement et déploiement |
| TypeScript | ~5.9.3 | Typage statique et sécurité du code |
| Expo Router | ~6.0.19 | Navigation basée sur les fichiers |
| NativeWind | ^4.2.1 | Tailwind CSS pour React Native |
| AsyncStorage | ^2.2.0 | Stockage local persistant |
| Expo Audio | ~1.1.0 | Lecture audio native |
| TanStack Query | ^5.90.12 | Gestion de l'état serveur |
| tRPC | 11.7.2 | API type-safe |

## 📂 Structure du projet

Le projet suit une architecture modulaire et organisée pour faciliter la maintenance et l'évolution du code.

```
ia_business_academy/
├── app/                          # Routes et écrans de l'application
│   ├── (tabs)/                   # Navigation par onglets
│   │   ├── _layout.tsx          # Configuration de la barre de navigation
│   │   ├── index.tsx            # Page d'accueil
│   │   ├── formations.tsx       # Page des mini-formations
│   │   ├── ebooks.tsx           # Bibliothèque d'ebooks
│   │   ├── generator.tsx        # Générateur d'images IA
│   │   └── chatbot.tsx          # Chatbot IA
│   ├── _layout.tsx              # Layout racine avec providers
│   └── oauth/                   # Gestion de l'authentification
├── components/                   # Composants réutilisables
│   ├── screen-container.tsx     # Container avec SafeArea
│   ├── themed-view.tsx          # Vue avec thème automatique
│   └── ui/                      # Composants UI
│       └── icon-symbol.tsx      # Icônes multiplateforme
├── hooks/                        # Hooks React personnalisés
│   ├── use-progress.ts          # Gestion de la progression
│   ├── use-colors.ts            # Palette de couleurs du thème
│   ├── use-auth.ts              # État d'authentification
│   └── __tests__/               # Tests unitaires des hooks
├── lib/                          # Utilitaires et configuration
│   ├── trpc.ts                  # Client API
│   ├── utils.ts                 # Fonctions utilitaires
│   └── theme-provider.tsx       # Provider de thème global
├── assets/                       # Ressources statiques
│   ├── images/                  # Images et icônes
│   └── audio/                   # Fichiers audio des formations
├── server/                       # Backend API (optionnel)
│   └── _core/                   # Logique serveur
├── constants/                    # Constantes de l'application
│   └── theme.ts                 # Palette de couleurs
├── app.config.ts                # Configuration Expo
├── tailwind.config.js           # Configuration Tailwind CSS
├── theme.config.js              # Configuration du thème
└── package.json                 # Dépendances du projet
```

## 🛠️ Installation et configuration

Pour installer et exécuter l'application en local, suivez les étapes ci-dessous.

### Prérequis

Avant de commencer, assurez-vous d'avoir installé les outils suivants sur votre machine :

- **Node.js** version 22 ou supérieure
- **pnpm** version 9.12.0 ou supérieure (gestionnaire de paquets)
- **Expo CLI** (installé automatiquement avec les dépendances)
- **Expo Go** sur votre appareil mobile (iOS ou Android) pour tester l'application

### Étapes d'installation

Clonez le dépôt GitHub sur votre machine locale en utilisant la commande suivante :

```bash
git clone https://github.com/votre-username/ia-business-academy.git
cd ia-business-academy
```

Installez toutes les dépendances du projet avec pnpm :

```bash
pnpm install
```

Lancez le serveur de développement Expo :

```bash
pnpm dev
```

Cette commande démarre simultanément le serveur backend (port 3000) et le serveur Metro (port 8081). Un QR code s'affichera dans le terminal.

Pour tester l'application sur votre appareil mobile, ouvrez l'application **Expo Go** et scannez le QR code affiché dans le terminal. L'application se chargera automatiquement sur votre téléphone.

### Scripts disponibles

Le fichier `package.json` contient plusieurs scripts utiles pour le développement et la production.

| Script | Commande | Description |
|--------|----------|-------------|
| Développement | `pnpm dev` | Lance le serveur de développement complet |
| Backend seul | `pnpm dev:server` | Lance uniquement le serveur backend |
| Metro seul | `pnpm dev:metro` | Lance uniquement le bundler Metro |
| Build | `pnpm build` | Compile le backend pour la production |
| Production | `pnpm start` | Lance le serveur en mode production |
| Tests | `pnpm test` | Exécute les tests unitaires avec Vitest |
| Vérification | `pnpm check` | Vérifie les types TypeScript |
| Linting | `pnpm lint` | Analyse le code avec ESLint |
| Formatage | `pnpm format` | Formate le code avec Prettier |
| Android | `pnpm android` | Lance l'application sur Android |
| iOS | `pnpm ios` | Lance l'application sur iOS |

## 📚 Contenu éducatif

L'application propose quatre mini-formations complètes avec des guides audio professionnels.

### Mini-formation 1 : Photos Pro IA

Cette formation enseigne aux entrepreneurs comment créer des photos professionnelles gratuitement avec l'IA, économisant ainsi des milliers d'euros en shootings photo. Les modules couvrent l'art du prompting, l'utilisation de Gemini pour générer des images, la création d'assistants IA personnalisés (Gems), les prompts avancés par catégorie de produits, et le calcul des économies réalisées. Chaque module est accompagné d'un guide audio explicatif avec une voix féminine professionnelle.

### Mini-formation 2 : Vidéo IA

Cette formation explique comment créer des vidéos professionnelles avec l'IA pour le marketing et les réseaux sociaux. Les entrepreneurs apprennent à rédiger des scripts vidéo efficaces, à utiliser les meilleurs outils de génération vidéo IA, à créer du contenu viral, et à monétiser leurs vidéos. Les modules incluent des exemples concrets et des templates prêts à l'emploi.

### Mini-formation 3 : E-commerce en Afrique

Cette formation complète guide les entrepreneurs dans le lancement et le développement d'une boutique en ligne en Afrique. Les modules couvrent l'opportunité du e-commerce africain, le choix des produits rentables, la création d'une boutique en ligne, la configuration des paiements mobiles, la gestion de la livraison, et la maîtrise de Facebook Ads pour acquérir des clients. Chaque module est adapté aux spécificités du marché africain.

### Mini-formation 4 : Maîtriser Gemini

Cette formation approfondie enseigne comment utiliser Gemini, l'IA de Google, pour automatiser et développer son business. Les modules expliquent la création d'un compte Gemini, l'art du prompting avancé, la création de Gems personnalisés, la génération d'images professionnelles, l'automatisation du marketing, l'analyse de données, l'utilisation des extensions Google, des cas pratiques concrets, des astuces avancées, et un plan d'action sur 30 jours.

## 🎨 Personnalisation du thème

Le thème de l'application est entièrement personnalisable via le fichier `theme.config.js`. Les couleurs sont définies pour les modes clair et sombre.

```javascript
const themeColors = {
  primary: { light: '#8B6F47', dark: '#8B6F47' },      // Marron principal
  background: { light: '#F5F0E8', dark: '#1A1612' },   // Fond beige/noir
  surface: { light: '#FFFFFF', dark: '#2A2420' },      // Surfaces
  foreground: { light: '#2A2420', dark: '#F5F0E8' },   // Texte principal
  muted: { light: '#8B7355', dark: '#C9B8A8' },        // Texte secondaire
  border: { light: '#E5DDD0', dark: '#3A3430' },       // Bordures
  success: { light: '#4A7C59', dark: '#6B9D7A' },      // Succès
  warning: { light: '#D4AF37', dark: '#F0C75E' },      // Avertissement
  error: { light: '#8B5A3C', dark: '#B87A5C' },        // Erreur
};
```

Pour modifier les couleurs de l'application, éditez simplement les valeurs dans ce fichier. Les changements seront automatiquement appliqués à toute l'interface grâce à NativeWind et au système de thème.

## 🧪 Tests

Le projet utilise **Vitest** pour les tests unitaires. Les tests sont organisés dans des dossiers `__tests__` à côté des fichiers testés.

Pour exécuter tous les tests :

```bash
pnpm test
```

Pour exécuter les tests en mode watch (re-exécution automatique lors des modifications) :

```bash
pnpm test --watch
```

Les tests couvrent notamment le hook `useProgress` qui gère la progression des formations, avec sept scénarios testés incluant la sauvegarde, le chargement, le calcul des pourcentages, et la gestion des modules complétés.

## 📦 Déploiement

Pour déployer l'application en production, plusieurs options sont disponibles selon vos besoins.

### Déploiement avec Expo Application Services (EAS)

Expo Application Services offre la solution la plus simple pour déployer l'application sur les stores iOS et Android. Installez d'abord EAS CLI globalement :

```bash
npm install -g eas-cli
```

Connectez-vous à votre compte Expo :

```bash
eas login
```

Configurez le projet pour EAS Build :

```bash
eas build:configure
```

Créez un build pour iOS :

```bash
eas build --platform ios
```

Créez un build pour Android :

```bash
eas build --platform android
```

Soumettez l'application aux stores :

```bash
eas submit --platform ios
eas submit --platform android
```

### Déploiement web

Pour déployer la version web de l'application, compilez d'abord le projet :

```bash
npx expo export --platform web
```

Les fichiers compilés seront générés dans le dossier `dist/`. Vous pouvez ensuite les déployer sur n'importe quel hébergeur statique comme Vercel, Netlify, ou GitHub Pages.

## 🤝 Contribution

Les contributions sont les bienvenues pour améliorer l'application et enrichir le contenu éducatif. Pour contribuer au projet, suivez ces étapes :

Forkez le dépôt sur GitHub en cliquant sur le bouton "Fork" en haut à droite de la page du projet. Clonez ensuite votre fork sur votre machine locale :

```bash
git clone https://github.com/votre-username/ia-business-academy.git
cd ia-business-academy
```

Créez une nouvelle branche pour votre fonctionnalité ou correction :

```bash
git checkout -b feature/ma-nouvelle-fonctionnalite
```

Effectuez vos modifications et committez-les avec des messages clairs :

```bash
git add .
git commit -m "Ajout d'une nouvelle fonctionnalité X"
```

Poussez votre branche vers votre fork :

```bash
git push origin feature/ma-nouvelle-fonctionnalite
```

Ouvrez une Pull Request sur le dépôt principal en décrivant vos modifications et leur intérêt pour le projet.

### Directives de contribution

Respectez le style de code existant en utilisant Prettier et ESLint. Exécutez `pnpm format` avant de committer. Ajoutez des tests unitaires pour toute nouvelle fonctionnalité. Mettez à jour la documentation si nécessaire. Vérifiez que tous les tests passent avec `pnpm test`. Assurez-vous que le code compile sans erreur avec `pnpm check`.

## 📄 Licence

Ce projet est sous licence **MIT**. Vous êtes libre de l'utiliser, le modifier et le distribuer selon les termes de cette licence.

## 📞 Contact et support

Pour toute question, suggestion ou demande de support, vous pouvez :

- Ouvrir une issue sur GitHub
- Rejoindre le groupe Telegram de l'académie
- Contacter l'équipe via le formulaire de coaching privé dans l'application

## 🙏 Remerciements

Ce projet a été développé avec passion pour aider les entrepreneurs à maîtriser l'IA et à transformer leur business. Un grand merci à la communauté Expo et React Native pour leurs outils exceptionnels, ainsi qu'à tous les contributeurs qui enrichissent ce projet.

---

**Développé avec ❤️ par l'équipe IA Business Academy**
