# 📦 Guide GitHub - Publication du Repository

## 🎯 Objectif

Publier ce repository sur GitHub pour le partager avec l'équipe ou le rendre public.

## 📋 Étapes

### 1. Créer un Repository GitHub

1. Allez sur [github.com](https://github.com)
2. Cliquez sur **"New repository"**
3. Nommez-le : `apps-script-library` (ou votre choix)
4. Choisissez **Public** ou **Private**
5. **Ne cochez pas** "Initialize with README" (vous avez déjà un README)
6. Cliquez sur **"Create repository"**

### 2. Connecter le Repository Local

```bash
# Si vous n'avez pas encore initialisé git
git init

# Ajouter le remote GitHub
git remote add origin https://github.com/VOTRE_USERNAME/apps-script-library.git

# Ajouter tous les fichiers
git add .

# Premier commit
git commit -m "Initial commit: Bibliothèque Apps Script partagée"

# Push vers GitHub
git push -u origin main
```

### 3. Fichiers à Exclure (déjà dans .gitignore)

Les fichiers suivants sont automatiquement ignorés :
- `.clasp.json` et `.clasp-projects.json` (contiennent les Script IDs)
- `sync-temp-*/` (dossiers temporaires)
- `*.js` (fichiers générés par clasp)
- `node_modules/`

### 4. Structure Recommandée

Le repository est déjà bien organisé :
- `scripts/` : Bibliothèques Apps Script
- `wrappers/` : Fonctions wrapper pour Google Sheets
- `docs/` : Documentation complète

---

## 🔒 Sécurité

⚠️ **Important :** Ne commitez jamais :
- Les Script IDs dans `.clasp.json` ou `.clasp-projects.json`
- Les clés API ou tokens
- Les informations sensibles

Ces fichiers sont déjà dans `.gitignore`.

---

## 📝 README

Le `README.md` principal est déjà configuré et contient :
- Vue d'ensemble du projet
- Instructions d'installation
- Liens vers la documentation
- Structure du repository

---

## 🔄 Workflow de Contribution

Si vous travaillez en équipe :

1. **Fork** le repository (si vous n'êtes pas propriétaire)
2. **Clone** votre fork
3. Créez une **branche** pour votre fonctionnalité
4. Faites vos modifications
5. **Commit** et **push**
6. Ouvrez une **Pull Request**

---

## 📚 Documentation

Toute la documentation est dans `docs/` :
- Guides pour administrateurs
- Guides pour utilisateurs
- Guide de dépannage
- Configuration clasp
