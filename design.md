# Design de l'Application IA Business Academy

## Vue d'ensemble
Application mobile pour l'IA Business Academy qui aide les entrepreneurs à maîtriser l'intelligence artificielle pour développer leur business. L'application offre un accès à des formations, des ebooks et un générateur d'images IA gratuit, le tout dans une communauté d'entraide.

## Palette de couleurs
- **Beige principal**: #E8DCC4 (arrière-plans doux, sections)
- **Marron foncé**: #5C4033 (textes principaux, éléments importants)
- **Nude/Taupe**: #C9B8A8 (éléments secondaires, bordures)
- **Noir**: #1A1A1A (textes de titres, contrastes forts)
- **Beige clair**: #F5F0E8 (arrière-plan général)
- **Accent marron chaud**: #8B6F47 (boutons, liens, éléments interactifs)

## Orientation et usage
- **Orientation**: Portrait (9:16)
- **Usage**: Optimisé pour une utilisation à une main
- **Style**: Aligné sur les guidelines iOS (HIG) - apparence d'application native

## Liste des écrans

### 1. Écran Accueil (Home)
**Contenu principal**:
- En-tête avec logo IA Business Academy et titre de bienvenue
- Section héro avec message d'accroche sur l'IA pour entrepreneurs
- Cartes de navigation rapide vers: Formations, Ebooks, Générateur d'images
- Section "Nouveautés" avec les dernières formations/ebooks ajoutés
- Bouton CTA vers le groupe d'entraide

**Fonctionnalité**:
- Navigation vers les sections principales
- Affichage dynamique des contenus récents
- Scroll vertical fluide

### 2. Écran Formations
**Contenu principal**:
- Liste de mini-formations sur l'utilisation de l'IA dans le business
- Chaque carte de formation affiche: titre, description courte, durée, niveau
- Catégories: Marketing IA, Productivité IA, Automatisation, Création de contenu

**Fonctionnalité**:
- Liste scrollable de formations
- Tap sur une formation → Écran détail de formation
- Filtrage par catégorie (optionnel)

### 3. Écran Détail de Formation
**Contenu principal**:
- Titre et description complète de la formation
- Modules/chapitres de la formation
- Vidéos ou contenu texte enrichi
- Progression de l'utilisateur (barre de progression)
- Bouton "Commencer" ou "Continuer"

**Fonctionnalité**:
- Lecture de contenu (vidéo/texte)
- Suivi de progression
- Navigation entre modules
- Retour à la liste des formations

### 4. Écran Ebooks
**Contenu principal**:
- Bibliothèque d'ebooks sur l'IA business
- Grille ou liste d'ebooks avec couvertures, titres, auteurs
- Catégories: Stratégie IA, Outils IA, Cas pratiques, Guides débutants

**Fonctionnalité**:
- Grille scrollable d'ebooks
- Tap sur un ebook → Écran lecteur d'ebook
- Téléchargement pour lecture hors-ligne (optionnel)

### 5. Écran Lecteur d'Ebook
**Contenu principal**:
- Affichage du contenu de l'ebook (texte formaté)
- Navigation par chapitres
- Barre de progression de lecture
- Contrôles: taille de police, mode sombre/clair

**Fonctionnalité**:
- Lecture fluide avec scroll vertical
- Sauvegarde automatique de la position de lecture
- Navigation entre chapitres
- Retour à la bibliothèque

### 6. Écran Générateur d'Images
**Contenu principal**:
- Champ de saisie pour le prompt (description de l'image)
- Exemples de prompts pour inspirer les utilisateurs
- Zone d'affichage de l'image générée
- Bouton "Générer" et "Télécharger"
- Historique des images générées (galerie miniature)

**Fonctionnalité**:
- Saisie de prompt texte
- Génération d'image via IA (gratuit)
- Affichage de l'image générée
- Téléchargement/sauvegarde de l'image
- Consultation de l'historique

### 7. Écran Groupe d'Entraide
**Contenu principal**:
- Description de la communauté IA Business Academy
- Avantages de rejoindre le groupe
- Bouton CTA "Rejoindre le groupe" (lien vers WhatsApp/Telegram/Discord)
- Témoignages de membres (optionnel)
- FAQ sur le groupe

**Fonctionnalité**:
- Affichage d'informations sur le groupe
- Bouton qui ouvre le lien externe vers la plateforme de groupe (WhatsApp, Telegram, etc.)
- Scroll vertical pour lire toutes les informations

## Flux utilisateur principaux

### Flux 1: Découvrir et suivre une formation
1. Utilisateur ouvre l'app → Écran Accueil
2. Tap sur "Formations" → Écran Formations
3. Tap sur une formation → Écran Détail de Formation
4. Tap sur "Commencer" → Lecture du contenu
5. Progression sauvegardée automatiquement

### Flux 2: Lire un ebook
1. Utilisateur sur Accueil → Tap sur "Ebooks" → Écran Ebooks
2. Tap sur un ebook → Écran Lecteur d'Ebook
3. Lecture avec scroll vertical
4. Position sauvegardée automatiquement
5. Retour à la bibliothèque via bouton retour

### Flux 3: Générer une image
1. Utilisateur sur Accueil → Tap sur "Générateur d'images" → Écran Générateur
2. Saisie d'un prompt dans le champ texte
3. Tap sur "Générer" → Attente (spinner) → Image affichée
4. Option de télécharger l'image
5. Image ajoutée à l'historique

### Flux 4: Rejoindre le groupe
1. Utilisateur sur Accueil → Tap sur "Rejoindre le groupe" → Écran Groupe d'Entraide
2. Lecture des informations sur le groupe
3. Tap sur "Rejoindre le groupe" → Ouverture du lien externe (WhatsApp/Telegram)

## Navigation
- **Tab Bar** en bas avec 4 onglets:
  - Accueil (icône maison)
  - Formations (icône livre/graduation)
  - Ebooks (icône bibliothèque)
  - Générateur (icône image/sparkle)
- **Navigation Stack** pour les écrans de détail (avec bouton retour)
- **Bouton flottant ou section** sur l'accueil pour "Rejoindre le groupe"

## Composants UI clés
- **Cartes** avec ombres douces et coins arrondis (16px radius)
- **Boutons** avec fond marron chaud (#8B6F47), texte blanc, coins arrondis
- **Typographie**: 
  - Titres: SF Pro Display Bold (iOS native feel)
  - Corps: SF Pro Text Regular
  - Tailles: 28px (titres), 17px (corps), 13px (captions)
- **Icônes**: Style SF Symbols (iOS) ou équivalent minimaliste
- **Espacement**: Padding généreux (16-24px) pour confort visuel
- **Images**: Coins arrondis, aspect ratio cohérent

## Considérations techniques
- Pas d'authentification utilisateur requise (accès libre)
- Stockage local pour progression des formations et position de lecture des ebooks
- Générateur d'images: intégration API IA (backend fourni)
- Liens externes pour le groupe d'entraide
- Optimisation des images pour performance mobile
