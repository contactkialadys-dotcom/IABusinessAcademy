# Guide d'installation pour Windows

Ce guide vous explique comment installer et exécuter **IA Business Academy** sur Windows avec PowerShell.

## 📋 Prérequis

Avant de commencer, vous devez installer les outils suivants sur votre machine Windows.

### 1. Installer Node.js

**Node.js** est requis pour exécuter l'application (version 22 ou supérieure).

1. Téléchargez Node.js depuis le site officiel : https://nodejs.org/
2. Choisissez la version **LTS** (Long Term Support) - actuellement v22.x
3. Exécutez l'installeur téléchargé (.msi)
4. Suivez les instructions de l'assistant d'installation
5. **Important** : Cochez l'option "Automatically install the necessary tools" si proposée

**Vérifier l'installation :**

Ouvrez PowerShell et tapez :

```powershell
node --version
```

Vous devriez voir quelque chose comme `v22.x.x`

### 2. Installer pnpm

**pnpm** est le gestionnaire de paquets utilisé par ce projet (plus rapide que npm).

**Option A : Installation via npm (recommandé)**

Dans PowerShell, exécutez :

```powershell
npm install -g pnpm
```

**Option B : Installation via PowerShell (alternative)**

```powershell
iwr https://get.pnpm.io/install.ps1 -useb | iex
```

**Vérifier l'installation :**

```powershell
pnpm --version
```

Vous devriez voir quelque chose comme `9.15.x`

**Si la commande pnpm n'est pas reconnue :**

1. Fermez et rouvrez PowerShell
2. Ou redémarrez votre ordinateur
3. Si le problème persiste, ajoutez pnpm au PATH :
   - Cherchez "Variables d'environnement" dans Windows
   - Ajoutez `C:\Users\VotreNom\AppData\Local\pnpm` au PATH

### 3. Installer Git (optionnel)

Si vous voulez cloner le projet depuis GitHub :

1. Téléchargez Git depuis : https://git-scm.com/download/win
2. Exécutez l'installeur
3. Utilisez les options par défaut

## 🚀 Installation du projet

### Étape 1 : Extraire l'archive

1. Extrayez le fichier `ia_business_academy_final.zip` dans un dossier de votre choix
2. Par exemple : `C:\Users\VotreNom\Documents\ia_business_academy`

### Étape 2 : Ouvrir PowerShell dans le dossier

**Méthode 1 (recommandée) :**
1. Ouvrez l'Explorateur Windows
2. Naviguez vers le dossier extrait
3. Maintenez `Shift` + Clic droit dans le dossier
4. Sélectionnez "Ouvrir PowerShell ici" ou "Ouvrir dans Terminal"

**Méthode 2 :**
1. Ouvrez PowerShell
2. Tapez : `cd "C:\Users\VotreNom\Documents\ia_business_academy"`

### Étape 3 : Installer les dépendances

Dans PowerShell, exécutez :

```powershell
pnpm install
```

**Cette commande va :**
- Télécharger toutes les dépendances nécessaires (~1153 packages)
- Créer le dossier `node_modules`
- Prendre environ 2-5 minutes selon votre connexion internet

**Si vous voyez une erreur de politique d'exécution :**

Exécutez d'abord cette commande (en tant qu'administrateur) :

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

Puis réessayez `pnpm install`.

### Étape 4 : Lancer l'application

Une fois l'installation terminée, lancez le serveur de développement :

```powershell
pnpm dev
```

**Cette commande va :**
- Démarrer le serveur backend sur le port 3000
- Démarrer le serveur Metro (Expo) sur le port 8081
- Afficher un QR code dans le terminal

### Étape 5 : Ouvrir l'application

**Sur ordinateur (navigateur web) :**
1. Ouvrez votre navigateur
2. Allez sur : `http://localhost:8081`
3. L'application se chargera automatiquement

**Sur téléphone (Expo Go) :**
1. Installez l'application **Expo Go** depuis :
   - App Store (iOS) : https://apps.apple.com/app/expo-go/id982107779
   - Google Play (Android) : https://play.google.com/store/apps/details?id=host.exp.exponent
2. Ouvrez Expo Go
3. Scannez le QR code affiché dans PowerShell

## 🛠️ Commandes utiles

Voici les commandes principales que vous pouvez utiliser :

| Commande | Description |
|----------|-------------|
| `pnpm dev` | Lance le serveur de développement complet |
| `pnpm dev:metro` | Lance uniquement le serveur Expo/Metro |
| `pnpm dev:server` | Lance uniquement le serveur backend |
| `pnpm test` | Exécute les tests unitaires |
| `pnpm check` | Vérifie les erreurs TypeScript |
| `pnpm format` | Formate le code avec Prettier |

## ❌ Résolution des problèmes courants

### Problème : "pnpm : Le terme 'pnpm' n'est pas reconnu"

**Solution 1 :** Fermez et rouvrez PowerShell

**Solution 2 :** Utilisez npm à la place :
```powershell
npm install
npm run dev
```

**Solution 3 :** Ajoutez pnpm au PATH manuellement (voir section "Installer pnpm" ci-dessus)

### Problème : "Impossible de charger le fichier... car l'exécution de scripts est désactivée"

**Solution :** Exécutez PowerShell en tant qu'administrateur et tapez :
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Problème : "Port 8081 déjà utilisé"

**Solution :** Un autre processus utilise le port. Tuez le processus ou changez le port :
```powershell
$env:EXPO_PORT=8082
pnpm dev
```

### Problème : "node : Le terme 'node' n'est pas reconnu"

**Solution :** Node.js n'est pas installé ou pas dans le PATH.
1. Réinstallez Node.js depuis https://nodejs.org/
2. Redémarrez votre ordinateur
3. Vérifiez avec `node --version`

### Problème : Installation très lente

**Solution :** Votre connexion internet est peut-être lente.
- Attendez patiemment (peut prendre jusqu'à 10 minutes)
- Ou utilisez un réseau plus rapide
- Ou essayez : `pnpm install --no-optional`

### Problème : Erreurs pendant pnpm install

**Solution :** Nettoyez le cache et réessayez :
```powershell
pnpm store prune
Remove-Item -Recurse -Force node_modules
pnpm install
```

## 📱 Tester sur votre téléphone

### iOS (iPhone/iPad)

1. Installez **Expo Go** depuis l'App Store
2. Assurez-vous que votre téléphone et votre ordinateur sont sur le **même réseau Wi-Fi**
3. Ouvrez Expo Go
4. Scannez le QR code affiché dans PowerShell avec l'appareil photo de votre iPhone
5. L'application se chargera automatiquement

### Android

1. Installez **Expo Go** depuis Google Play Store
2. Assurez-vous que votre téléphone et votre ordinateur sont sur le **même réseau Wi-Fi**
3. Ouvrez Expo Go
4. Appuyez sur "Scan QR code"
5. Scannez le QR code affiché dans PowerShell
6. L'application se chargera automatiquement

## 🌐 Déployer sur Vercel (optionnel)

Si vous voulez déployer l'application sur internet :

### Méthode 1 : Via le site Vercel (plus simple)

1. Créez un compte sur https://vercel.com
2. Cliquez sur "Add New Project"
3. Importez votre projet (depuis GitHub ou en uploadant le dossier)
4. Vercel détectera automatiquement la configuration
5. Cliquez sur "Deploy"

### Méthode 2 : Via la ligne de commande

```powershell
# Installer Vercel CLI
npm install -g vercel

# Se connecter
vercel login

# Déployer
vercel --prod
```

## 📚 Ressources supplémentaires

- **Documentation Expo** : https://docs.expo.dev
- **Documentation React Native** : https://reactnative.dev
- **Documentation pnpm** : https://pnpm.io
- **Support Vercel** : https://vercel.com/docs

## 💡 Conseils

1. **Utilisez Visual Studio Code** comme éditeur de code (gratuit) : https://code.visualstudio.com
2. **Installez l'extension Expo** pour VS Code pour une meilleure expérience
3. **Gardez Node.js et pnpm à jour** pour éviter les problèmes de compatibilité
4. **Utilisez un terminal moderne** comme Windows Terminal (gratuit sur Microsoft Store)

---

**Besoin d'aide ?** Consultez les fichiers suivants dans le projet :
- `README.md` - Documentation générale du projet
- `DEPLOYMENT.md` - Guide de déploiement complet
- `VERCEL_RECOMMENDATIONS.md` - Optimisations pour Vercel
- `NETLIFY.md` - Guide de déploiement sur Netlify

**Bon développement ! 🚀**
