# Recommandations pour le déploiement Vercel

Ce document liste toutes les optimisations et corrections appliquées pour garantir un déploiement réussi sur Vercel.

## ✅ Corrections appliquées

### 1. Commande de build corrigée
- **Avant** : `npx expo export:web` (obsolète avec Expo SDK 54)
- **Après** : `npx expo export --platform web`
- **Raison** : Expo SDK 54 utilise Metro bundler et la nouvelle syntaxe

### 2. Dossier de sortie mis à jour
- **Avant** : `web-build`
- **Après** : `dist`
- **Raison** : Nouveau dossier par défaut avec `expo export --platform web`

### 3. Nettoyage du cache ajouté
- **Commande** : `rm -rf .expo node_modules/.cache`
- **Raison** : Évite l'erreur "Unable to get SHA-1" causée par des fichiers de cache corrompus

### 4. Fichier .vercelignore créé
- **But** : Exclure les fichiers inutiles du déploiement
- **Avantages** :
  - Réduit la taille du déploiement
  - Accélère le build
  - Évite les conflits de fichiers

### 5. Headers de sécurité ajoutés
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`
- **Raison** : Améliore la sécurité de l'application web

### 6. Configuration des fonctions
- `maxDuration: 60` secondes
- **Raison** : Donne plus de temps pour les builds complexes

### 7. Version Node.js spécifiée
- **Version** : >= 22.0.0
- **Raison** : Garantit la compatibilité avec les dépendances modernes

## 📊 Analyse des assets

### Taille totale des assets
- **Total** : 207 MB
- **Audio** : 116 MB (22 fichiers)
- **Vidéos** : 14 MB (2 fichiers)
- **Images** : 77 MB

### Fichiers les plus volumineux
1. `ecommerce-module-facebook-ads.wav` - 9.5 MB
2. `presentation-ia-business-academy.mp4` - 6.1 MB
3. `ecommerce-module-livraison.wav` - 6.0 MB

**Note** : Tous les fichiers sont < 10 MB, donc compatibles avec les limites Vercel.

## ⚠️ Points d'attention

### 1. Taille du déploiement
- **Limite Vercel gratuit** : 100 MB par déploiement
- **Taille actuelle des assets** : 207 MB
- **Solution** : Utiliser un CDN externe pour les fichiers audio/vidéo volumineux

### 2. Variables d'environnement
Les variables suivantes peuvent être configurées dans Vercel :
- `EXPO_PUBLIC_GA_MEASUREMENT_ID` - Google Analytics (optionnel)

**Important** : Les variables préfixées par `EXPO_PUBLIC_` sont accessibles côté client.

### 3. Temps de build
- **Durée estimée** : 3-5 minutes
- **Facteurs** :
  - Installation des dépendances (1153 packages)
  - Nettoyage du cache
  - Export Expo
  - Optimisation des assets

## 🚀 Recommandations pour la production

### 1. Optimiser les assets audio
```bash
# Convertir les fichiers WAV en MP3 pour réduire la taille
for file in assets/audio/*.wav; do
  ffmpeg -i "$file" -codec:a libmp3lame -qscale:a 2 "${file%.wav}.mp3"
done
```

**Gain estimé** : Réduction de 70-80% de la taille des fichiers audio

### 2. Utiliser un CDN pour les assets volumineux
Options recommandées :
- **Cloudinary** : Gratuit jusqu'à 25 GB
- **AWS S3 + CloudFront** : Pay-as-you-go
- **Vercel Blob Storage** : Intégré à Vercel

**Avantages** :
- Déploiements plus rapides
- Meilleure performance de chargement
- Pas de limite de taille

### 3. Activer la compression
Vercel compresse automatiquement les fichiers, mais vous pouvez optimiser :
- Utiliser WebP pour les images
- Minifier les SVG
- Compresser les JSON

### 4. Configurer le cache correctement
Les headers de cache sont déjà configurés dans `vercel.json` :
- Assets : 1 an (immutable)
- HTML : Pas de cache (toujours à jour)

### 5. Surveiller les performances
Après le déploiement, utilisez :
- **Vercel Analytics** : Gratuit, intégré
- **Google Analytics** : Déjà configuré dans l'app
- **Lighthouse** : Audit de performance

## 🔍 Checklist avant déploiement

- [x] Commande de build corrigée
- [x] Dossier de sortie mis à jour
- [x] Cache nettoyé automatiquement
- [x] .vercelignore créé
- [x] Headers de sécurité ajoutés
- [x] Version Node.js spécifiée
- [x] Documentation mise à jour
- [ ] Variables d'environnement configurées (si nécessaire)
- [ ] Assets optimisés (optionnel mais recommandé)
- [ ] CDN configuré pour les gros fichiers (optionnel)

## 📝 Commandes utiles

### Build local pour tester
```bash
pnpm install
rm -rf .expo node_modules/.cache
npx expo export --platform web
```

### Servir localement le build
```bash
npx serve dist
```

### Déployer manuellement avec Vercel CLI
```bash
npm install -g vercel
vercel login
vercel --prod
```

## 🐛 Dépannage

### Erreur : "Build failed"
1. Vérifiez les logs complets dans Vercel
2. Testez le build localement avec les commandes ci-dessus
3. Vérifiez que Node.js >= 22.0.0

### Erreur : "Unable to get SHA-1"
- **Solution** : Le nettoyage du cache est déjà configuré
- Si le problème persiste, ajoutez `--clear` : `npx expo export --platform web --clear`

### Erreur : "Out of memory"
- **Solution** : Contactez le support Vercel pour augmenter la limite
- Ou optimisez les assets pour réduire la charge

### Page blanche après déploiement
1. Ouvrez la console du navigateur (F12)
2. Vérifiez les erreurs JavaScript
3. Vérifiez que le dossier de sortie est bien `dist`
4. Vérifiez les redirections dans `vercel.json`

## 📚 Ressources

- [Documentation Vercel](https://vercel.com/docs)
- [Documentation Expo](https://docs.expo.dev)
- [Guide de déploiement complet](./DEPLOYMENT.md)
- [Guide Netlify alternatif](./NETLIFY.md)

---

**Dernière mise à jour** : Janvier 2026
**Version du projet** : 2.0
**Statut** : Prêt pour le déploiement Vercel
