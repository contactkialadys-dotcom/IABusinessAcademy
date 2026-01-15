# Guide d'intégration Google Analytics

Ce guide vous explique comment obtenir votre ID Google Analytics et l'intégrer dans votre application **IA Business Academy** pour suivre les visiteurs et analyser l'utilisation de vos formations.

## Pourquoi utiliser Google Analytics ?

Google Analytics est un outil gratuit et puissant qui vous permet de comprendre comment les utilisateurs interagissent avec votre application. Vous pourrez voir des informations précieuses comme le nombre de visiteurs quotidiens, les formations les plus populaires, le temps passé sur chaque page, et les parcours des utilisateurs dans votre académie.

Ces données vous aideront à améliorer votre contenu et à mieux servir vos élèves en identifiant ce qui fonctionne bien et ce qui nécessite des ajustements.

## Étape 1 : Créer un compte Google Analytics

La première étape consiste à créer un compte Google Analytics si vous n'en avez pas déjà un. Ce processus est entièrement gratuit et ne prend que quelques minutes.

### Accéder à Google Analytics

Rendez-vous sur [analytics.google.com](https://analytics.google.com) et connectez-vous avec votre compte Google personnel. Si vous n'avez pas de compte Google, vous devrez en créer un gratuitement sur [accounts.google.com](https://accounts.google.com).

### Créer un compte Analytics

Une fois connectée, cliquez sur le bouton **"Commencer à mesurer"** ou **"Start measuring"**. Google Analytics vous demandera de configurer votre compte en trois étapes : le compte, la propriété, et le flux de données.

**Configuration du compte :**

Donnez un nom à votre compte Analytics, par exemple "IA Business Academy". Ce nom est uniquement pour votre organisation interne et ne sera pas visible par vos visiteurs. Vous pouvez cocher les cases de partage de données selon vos préférences, mais ce n'est pas obligatoire.

**Configuration de la propriété :**

Donnez un nom à votre propriété, par exemple "Application IA Business Academy". Sélectionnez votre fuseau horaire (probablement "Africa/..." selon votre pays) et la devise (EUR, XOF, ou votre monnaie locale). Ces paramètres affecteront la façon dont les rapports sont affichés.

**Détails de l'entreprise :**

Google vous demandera quelques informations sur votre entreprise. Sélectionnez la catégorie "Éducation" ou "Formation en ligne", choisissez la taille de votre entreprise (probablement "Petite" si vous débutez), et indiquez que vous souhaitez mesurer un site web ou une application.

## Étape 2 : Créer un flux de données Web

Après avoir configuré votre compte et votre propriété, vous devez créer un flux de données pour votre application web.

### Sélectionner la plateforme

Google Analytics vous proposera de choisir entre iOS, Android, ou Web. Sélectionnez **"Web"** car votre application Expo sera déployée sur le web.

### Configurer le flux de données

Vous devrez fournir deux informations essentielles :

**URL du site web :** Entrez l'URL où votre application sera déployée. Si vous ne l'avez pas encore, vous pouvez entrer une URL temporaire comme `https://ia-business-academy.netlify.app` et la modifier plus tard dans les paramètres.

**Nom du flux :** Donnez un nom descriptif comme "Application Web IA Business Academy" pour identifier facilement ce flux si vous en créez d'autres à l'avenir.

Cliquez sur **"Créer un flux"** pour finaliser la configuration.

## Étape 3 : Obtenir votre ID de mesure

Une fois le flux de données créé, Google Analytics vous redirigera automatiquement vers la page de détails du flux. C'est ici que vous trouverez votre **ID de mesure** (Measurement ID).

### Localiser l'ID de mesure

L'ID de mesure se trouve en haut de la page, dans la section "Détails du flux de données Web". Il commence toujours par **"G-"** suivi d'une série de lettres et de chiffres, par exemple `G-XXXXXXXXXX`.

**Important :** Copiez cet ID exactement tel qu'il apparaît, en incluant le préfixe "G-". Vous en aurez besoin pour configurer l'application.

### Exemple d'ID de mesure

Votre ID de mesure ressemblera à ceci :

```
G-ABC123XYZ456
```

Notez-le dans un endroit sûr, car vous devrez le fournir lors de la configuration de l'application.

## Étape 4 : Configuration dans l'application

Une fois que vous avez votre ID de mesure, l'intégration dans votre application est automatique. Le code Google Analytics a déjà été ajouté à votre application **IA Business Academy**.

### Fournir l'ID de mesure

Lorsque vous déployez l'application, vous devrez configurer une variable d'environnement avec votre ID de mesure. Voici comment faire selon la plateforme de déploiement :

**Sur Netlify :**

1. Allez dans les paramètres de votre site Netlify
2. Cliquez sur **"Environment variables"**
3. Ajoutez une nouvelle variable :
   - **Key** : `EXPO_PUBLIC_GA_MEASUREMENT_ID`
   - **Value** : Votre ID de mesure (par exemple `G-ABC123XYZ456`)
4. Redéployez votre site

**Sur Vercel :**

1. Allez dans les paramètres du projet Vercel
2. Cliquez sur **"Environment Variables"**
3. Ajoutez une nouvelle variable :
   - **Name** : `EXPO_PUBLIC_GA_MEASUREMENT_ID`
   - **Value** : Votre ID de mesure
4. Redéployez

**En local (pour tester) :**

Créez un fichier `.env` à la racine du projet avec :

```
EXPO_PUBLIC_GA_MEASUREMENT_ID=G-ABC123XYZ456
```

Remplacez `G-ABC123XYZ456` par votre véritable ID de mesure.

## Étape 5 : Vérifier que le tracking fonctionne

Après avoir configuré l'ID de mesure et redéployé votre application, vous devez vérifier que Google Analytics reçoit bien les données.

### Test en temps réel

Retournez sur [analytics.google.com](https://analytics.google.com) et accédez à votre propriété. Dans le menu de gauche, cliquez sur **"Rapports"** puis **"Temps réel"**. Cette vue vous montre les visiteurs actuellement sur votre site.

Ouvrez votre application déployée dans un navigateur et naviguez entre les différentes pages (Accueil, Formations, E-books, etc.). Vous devriez voir votre visite apparaître dans le rapport en temps réel dans les 30 secondes.

Si vous voyez votre visite apparaître, félicitations ! Google Analytics est correctement configuré et suit les visiteurs de votre application.

### Données collectées automatiquement

Votre application IA Business Academy est configurée pour suivre automatiquement :

| Événement | Description | Utilité |
|-----------|-------------|---------|
| **page_view** | Chaque fois qu'un utilisateur visite une page | Voir les pages les plus populaires |
| **session_start** | Début d'une nouvelle session utilisateur | Compter le nombre de visites |
| **first_visit** | Première visite d'un nouvel utilisateur | Mesurer l'acquisition de nouveaux élèves |
| **user_engagement** | Temps passé sur l'application | Comprendre l'engagement des utilisateurs |

Ces événements sont collectés automatiquement sans configuration supplémentaire.

## Étape 6 : Explorer vos rapports

Après quelques heures d'utilisation, Google Analytics commencera à générer des rapports détaillés sur votre audience.

### Rapports principaux

**Vue d'ensemble de l'acquisition :**

Ce rapport vous montre d'où viennent vos visiteurs (recherche Google, réseaux sociaux, liens directs, etc.). Vous pourrez identifier quels canaux marketing fonctionnent le mieux pour attirer des élèves.

**Vue d'ensemble de l'engagement :**

Ce rapport affiche les pages les plus visitées, le temps moyen passé sur chaque page, et le taux de rebond. Vous verrez quelles formations intéressent le plus vos élèves et lesquelles nécessitent peut-être des améliorations.

**Vue d'ensemble démographique :**

Google Analytics vous donne des informations sur l'âge, le sexe, les centres d'intérêt, et la localisation géographique de vos visiteurs. Ces données vous aideront à mieux comprendre votre audience et à adapter votre contenu.

**Vue d'ensemble technologique :**

Ce rapport montre quels appareils (mobile, ordinateur, tablette), navigateurs, et systèmes d'exploitation utilisent vos visiteurs. Cela vous permet de vous assurer que votre application fonctionne bien sur les plateformes les plus utilisées par votre audience.

## Conseils pour maximiser l'utilisation de Google Analytics

### Définir des objectifs

Dans les paramètres de Google Analytics, vous pouvez définir des objectifs personnalisés, comme "Compléter une formation" ou "Télécharger un e-book". Ces objectifs vous permettent de mesurer le succès de votre académie au-delà des simples visites de pages.

### Créer des segments d'audience

Les segments vous permettent de filtrer vos rapports pour analyser des groupes spécifiques d'utilisateurs, par exemple "Nouveaux visiteurs" vs "Visiteurs récurrents", ou "Visiteurs mobiles" vs "Visiteurs sur ordinateur". Cette segmentation révèle des insights précieux sur les comportements différents de vos audiences.

### Configurer des alertes

Google Analytics peut vous envoyer des alertes par email lorsque des événements importants se produisent, comme une augmentation soudaine du trafic ou une baisse inhabituelle de l'engagement. Ces alertes vous permettent de réagir rapidement aux changements.

### Analyser régulièrement

Prenez l'habitude de consulter vos rapports Google Analytics au moins une fois par semaine. L'analyse régulière vous permet de détecter des tendances, d'identifier des opportunités d'amélioration, et de mesurer l'impact de vos efforts marketing et pédagogiques.

## Respect de la vie privée et RGPD

Google Analytics collecte des données anonymisées sur vos visiteurs. Pour respecter les réglementations sur la protection des données (RGPD en Europe, lois similaires en Afrique), vous devez informer vos utilisateurs que vous utilisez Google Analytics.

### Ajouter une politique de confidentialité

Créez une page "Politique de confidentialité" sur votre site expliquant que vous utilisez Google Analytics pour améliorer l'expérience utilisateur. Mentionnez que les données sont anonymisées et que les utilisateurs peuvent désactiver le tracking via les paramètres de leur navigateur.

### Anonymisation des adresses IP

Google Analytics 4 (la version actuelle) anonymise automatiquement les adresses IP des visiteurs, ce qui améliore la conformité avec les lois sur la protection de la vie privée.

## Dépannage

### Je ne vois aucune donnée dans Google Analytics

Si aucune donnée n'apparaît dans vos rapports, vérifiez les points suivants :

**L'ID de mesure est-il correct ?** Assurez-vous d'avoir copié l'ID exactement tel qu'il apparaît dans Google Analytics, avec le préfixe "G-".

**La variable d'environnement est-elle configurée ?** Vérifiez que `EXPO_PUBLIC_GA_MEASUREMENT_ID` est bien définie dans les paramètres de votre plateforme de déploiement.

**Avez-vous redéployé après la configuration ?** Les variables d'environnement ne prennent effet qu'après un nouveau déploiement.

**Utilisez-vous un bloqueur de publicités ?** Les extensions de navigateur comme AdBlock peuvent bloquer Google Analytics. Testez dans un navigateur en navigation privée sans extensions.

### Les données apparaissent avec un délai

Google Analytics peut prendre jusqu'à 24 heures pour traiter et afficher certaines données dans les rapports standards. Utilisez le rapport "Temps réel" pour voir les données immédiatement.

### Erreur "Measurement ID not found"

Cette erreur signifie que l'ID de mesure n'est pas valide. Vérifiez que vous avez bien copié l'ID depuis la section "Flux de données Web" de Google Analytics, et non depuis un autre endroit.

## Ressources supplémentaires

Pour approfondir vos connaissances sur Google Analytics, consultez ces ressources officielles :

- **Centre d'aide Google Analytics** : [support.google.com/analytics](https://support.google.com/analytics)
- **Académie Google Analytics** : Cours gratuits sur [analytics.google.com/analytics/academy](https://analytics.google.com/analytics/academy)
- **Documentation Google Analytics 4** : [developers.google.com/analytics/devguides/collection/ga4](https://developers.google.com/analytics/devguides/collection/ga4)

N'hésitez pas à explorer ces ressources pour devenir experte dans l'analyse de vos données et optimiser continuellement votre académie IA Business.

---

**Dernière mise à jour : Janvier 2026**
