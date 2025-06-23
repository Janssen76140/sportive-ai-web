# 🚀 Guide de Déploiement Vercel - SportiveAI

## ✅ Préparation terminée

Votre projet a été adapté pour Vercel :
- ✅ Dépendances Electron supprimées
- ✅ Service de protocoles converti en API HTTP
- ✅ Base de données SQLite convertie en JSON (875KB)
- ✅ Configuration Vercel créée
- ✅ Build testé et fonctionnel

## 🚀 Déploiement sur Vercel

### Option 1 : Via GitHub (recommandée)

1. **Créer un repository GitHub**
   ```bash
   git init
   git add .
   git commit -m "Migration vers Vercel - première version"
   git branch -M main
   git remote add origin https://github.com/VOTRE_USERNAME/sportive-ai.git
   git push -u origin main
   ```

2. **Connecter à Vercel**
   - Aller sur [vercel.com](https://vercel.com)
   - Se connecter avec GitHub
   - Cliquer "New Project"
   - Importer votre repository `sportive-ai`
   - Vercel détectera automatiquement que c'est du React

3. **Configuration automatique**
   - Build Command: `npm run build` ✅
   - Output Directory: `build` ✅
   - Install Command: `npm install` ✅

4. **Deploy !**
   - Cliquer "Deploy"
   - Attendre 2-3 minutes
   - Votre app sera en ligne ! 🎉

### Option 2 : Via Vercel CLI

```bash
npm i -g vercel
vercel login
vercel --prod
```

## 🔧 Configuration avancée (optionnelle)

### Variables d'environnement
Si besoin, ajouter dans Vercel Dashboard :
- `REACT_APP_API_URL` : URL de votre API

### Domaine personnalisé
- Dans Vercel Dashboard > Domains
- Ajouter votre domaine

## 🧪 Test en local

```bash
# Tester l'API Vercel en local
npm install -g vercel
vercel dev

# Ou build classique
npm start
```

## 📊 Monitoring

- **Analytics** : Activés automatiquement
- **Logs** : Vercel Dashboard > Functions
- **Performance** : Lighthouse automatique

## 🚨 Résolution de problèmes

### Erreur "Module not found"
```bash
rm -rf node_modules package-lock.json
npm install
```

### API ne répond pas
- Vérifier les logs dans Vercel Dashboard
- Les fonctions sont dans `/api/protocols.js`

### Build fail
- Vérifier `npm run build` en local
- Logs détaillés dans Vercel Dashboard

## 📞 Support

En cas de problème :
1. Logs Vercel Dashboard
2. Tester en local avec `vercel dev`
3. Documentation Vercel : [vercel.com/docs](https://vercel.com/docs)

---

🎉 **Félicitations !** Votre app SportiveAI est maintenant prête pour Vercel ! 