# Guide de déploiement Netlify

Ce guide vous explique comment déployer **IA Business Academy** sur Netlify, étape par étape.

## 🎯 Le problème "Page not found"

Si vous voyez "Page not found" sur Netlify, c'est parce que vous avez déployé le code source au lieu des fichiers web compilés. Expo nécessite une étape de compilation pour générer les fichiers HTML/CSS/JS que Netlify peut servir.

## ✅ Solution : Générer le dossier web-build

Vous devez d'abord générer les fichiers web statiques avant de les déployer sur Netlify.

### Méthode 1 : Netlify Drop (Drag & Drop)

Cette méthode est la plus simple si vous voulez déployer rapidement sans Git.

**Étape 1 : Installer les dépendances**

Ouvrez un terminal dans le dossier `ia_business_academy` et exécutez :

```bash
pnpm install
```

Si vous n'avez pas pnpm, installez-le d'abord :

```bash
npm install -g pnpm
```

**Étape 2 : Générer les fichiers web**

Exécutez la commande suivante pour créer le dossier `web-build` :

```bash
npx expo export:web
```

Cette commande va créer un dossier `web-build/` contenant tous les fichiers HTML, CSS, et JavaScript nécessaires. Cela peut prendre 2-3 minutes.

**Étape 3 : Déployer sur Netlify Drop**

1. Allez sur [app.netlify.com/drop](https://app.netlify.com/drop)
2. Connectez-vous ou créez un compte gratuit
3. **Glissez-déposez le dossier `web-build`** (pas le dossier racine `ia_business_academy`, mais uniquement le sous-dossier `web-build`)
4. Netlify va uploader et déployer automatiquement
5. Vous recevrez une URL comme `https://random-name-123456.netlify.app`

**Important** : Vous devez déposer le dossier `web-build`, pas le dossier racine du projet !

### Méthode 2 : Via GitHub (Déploiement automatique)

Cette méthode configure des déploiements automatiques à chaque modification du code.

**Étape 1 : Pousser sur GitHub**

Si ce n'est pas déjà fait, poussez votre code sur GitHub :

```bash
cd ia_business_academy
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/VOTRE-USERNAME/ia-business-academy.git
git branch -M main
git push -u origin main
```

**Étape 2 : Connecter Netlify à GitHub**

1. Allez sur [app.netlify.com](https://app.netlify.com)
2. Cliquez sur **"Add new site"** → **"Import an existing project"**
3. Choisissez **"GitHub"** et autorisez Netlify
4. Sélectionnez votre dépôt `ia-business-academy`

**Étape 3 : Configurer le build**

Netlify détectera automatiquement le fichier `netlify.toml` qui contient :

| Paramètre | Valeur |
|-----------|--------|
| Build command | `pnpm install && npx expo export:web` |
| Publish directory | `web-build` |

Si Netlify ne détecte pas automatiquement, entrez ces valeurs manuellement.

**Étape 4 : Déployer**

Cliquez sur **"Deploy site"**. Netlify va :
1. Cloner votre dépôt
2. Installer les dépendances
3. Exécuter `npx expo export:web`
4. Déployer le dossier `web-build`

Le déploiement prend environ 3-5 minutes.

### Méthode 3 : Via CLI Netlify

Pour les utilisateurs avancés qui préfèrent la ligne de commande.

**Étape 1 : Installer Netlify CLI**

```bash
npm install -g netlify-cli
```

**Étape 2 : Se connecter**

```bash
netlify login
```

**Étape 3 : Générer les fichiers web**

```bash
cd ia_business_academy
pnpm install
npx expo export:web
```

**Étape 4 : Déployer**

```bash
netlify deploy --dir=web-build --prod
```

Netlify vous demandera de créer un nouveau site ou de sélectionner un site existant. Choisissez "Create & configure a new site" et suivez les instructions.

## 🔧 Configuration du domaine personnalisé

Une fois votre site déployé, vous pouvez configurer un domaine personnalisé.

**Étape 1 : Accéder aux paramètres de domaine**

1. Dans le dashboard Netlify, cliquez sur votre site
2. Allez dans **"Domain settings"**
3. Cliquez sur **"Add custom domain"**

**Étape 2 : Ajouter votre domaine**

Entrez votre nom de domaine (par exemple `ia-academy.com`) et suivez les instructions pour configurer les DNS.

**Étape 3 : Activer HTTPS**

Netlify active automatiquement HTTPS gratuit via Let's Encrypt. Cela peut prendre quelques minutes après la configuration du domaine.

## 🐛 Dépannage

### Erreur : "Command not found: pnpm"

Si vous obtenez cette erreur, installez pnpm globalement :

```bash
npm install -g pnpm
```

Ou utilisez npm à la place dans les commandes :

```bash
npm install
npx expo export:web
```

### Erreur : "Build failed"

Si le build échoue sur Netlify, vérifiez les logs pour identifier l'erreur. Les causes courantes incluent :

- **Dépendances manquantes** : Assurez-vous que toutes les dépendances sont dans `package.json`
- **Version de Node.js** : Netlify utilise Node 18 par défaut. Si vous avez besoin d'une version spécifique, ajoutez dans `netlify.toml` :

```toml
[build.environment]
  NODE_VERSION = "18"
```

- **Mémoire insuffisante** : Les builds Expo peuvent nécessiter beaucoup de mémoire. Contactez le support Netlify pour augmenter la limite.

### Page blanche après déploiement

Si vous voyez une page blanche :

1. **Ouvrez la console du navigateur** (F12) pour voir les erreurs
2. **Vérifiez les chemins** : Les chemins des assets doivent être relatifs
3. **Vérifiez les variables d'environnement** : Si votre app utilise des variables d'environnement, configurez-les dans Netlify sous **"Site settings"** → **"Environment variables"**

### Erreur 404 sur les routes

Si vous obtenez des erreurs 404 quand vous naviguez dans l'application, c'est que les redirects ne sont pas configurés. Le fichier `netlify.toml` devrait contenir :

```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

Si ce n'est pas le cas, ajoutez cette configuration.

## 📊 Comparaison Netlify vs Vercel

Les deux plateformes sont excellentes pour déployer des applications web. Voici une comparaison rapide :

| Critère | Netlify | Vercel |
|---------|---------|--------|
| Facilité d'utilisation | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| Drag & Drop | ✅ Oui | ❌ Non |
| Build automatique | ✅ Oui | ✅ Oui |
| Domaine personnalisé | ✅ Gratuit | ✅ Gratuit |
| HTTPS | ✅ Gratuit | ✅ Gratuit |
| CDN global | ✅ Oui | ✅ Oui |
| Fonctions serverless | ✅ Oui | ✅ Oui |
| Analytics | 💰 Payant | 💰 Payant |

Les deux sont d'excellents choix. Netlify est légèrement plus simple avec le Drag & Drop, tandis que Vercel offre une meilleure intégration avec Next.js.

## 🆘 Besoin d'aide ?

Si vous rencontrez des problèmes :

- **Documentation Netlify** : [docs.netlify.com](https://docs.netlify.com)
- **Support Netlify** : [community.netlify.com](https://community.netlify.com)
- **Documentation Expo** : [docs.expo.dev](https://docs.expo.dev)

N'hésitez pas à ouvrir une issue sur GitHub si vous rencontrez des problèmes spécifiques au projet **IA Business Academy**.

---

**Dernière mise à jour : Janvier 2026**
