# 🚀 Guide : Publier sur GitHub

Ce guide explique comment transformer ce repository en projet GitHub indépendant.

---

## 📋 Prérequis

- Compte GitHub
- Git installé sur votre machine
- Accès en ligne de commande

---

## 🔧 Étapes de Publication

### 1️⃣ Initialiser le Dépôt Git (si pas déjà fait)

```bash
cd "/Users/xroux/Documents/My devs/apps-script-library"

# Initialiser Git (si pas déjà fait)
git init

# Vérifier l'état
git status
```

### 2️⃣ Vérifier/Créer .gitignore

Le fichier `.gitignore` est déjà créé et contient :
- Fichiers système (`.DS_Store`, etc.)
- Fichiers Clasp (`.clasp.json` - contient des identifiants sensibles)
- Dossiers IDE (`.vscode/`, `.idea/`)
- Fichiers temporaires

⚠️ **Important** : `.clasp.json` est ignoré car il contient l'ID de votre projet Apps Script (sensible).

### 3️⃣ Faire le Premier Commit

```bash
# Ajouter tous les fichiers (sauf ceux dans .gitignore)
git add .

# Faire le commit initial
git commit -m "🎉 Initial commit - Bibliothèque Apps Script partagée

- Bibliothèque VAT Check (validation TVA VIES)
- Documentation complète pour administrateurs et utilisateurs
- Templates pour créer de nouvelles bibliothèques
- Structure modulaire pour faciliter l'ajout de bibliothèques"

# Vérifier que tout est commité
git status
```

### 4️⃣ Créer le Repository sur GitHub

1. **Allez sur GitHub** : [github.com](https://github.com)
2. **Cliquez sur "+"** (en haut à droite) > **"New repository"**
3. **Configurez le repository** :
   - **Repository name** : `apps-script-library` (ou votre nom)
   - **Description** : "Bibliothèque Google Apps Script partagée pour l'équipe"
   - **Visibility** : Public ou Private (selon vos préférences)
   - **⚠️ NE COCHEZ PAS** "Add a README file" (vous en avez déjà un)
   - **⚠️ NE COCHEZ PAS** "Add .gitignore" (vous en avez déjà un)
   - **⚠️ NE COCHEZ PAS** "Choose a license" (à ajouter plus tard si besoin)
4. **Cliquez sur "Create repository"**

### 5️⃣ Lier le Repository Local à GitHub

GitHub vous donnera des instructions, mais voici les commandes :

```bash
# Ajouter le remote GitHub (remplacez USERNAME par votre nom d'utilisateur)
git remote add origin https://github.com/USERNAME/apps-script-library.git

# Ou avec SSH (si vous avez configuré SSH)
git remote add origin git@github.com:USERNAME/apps-script-library.git

# Vérifier que le remote est bien configuré
git remote -v
```

### 6️⃣ Pousser vers GitHub

```bash
# Renommer la branche principale en 'main' (si nécessaire)
git branch -M main

# Pousser vers GitHub
git push -u origin main
```

✅ **C'est fait !** Votre repository est maintenant sur GitHub.

---

## 🔄 Workflow de Mise à Jour

### Publier des Modifications

```bash
# Voir les changements
git status

# Ajouter les fichiers modifiés
git add .

# Committer
git commit -m "📝 Description de vos modifications"

# Pousser vers GitHub
git push
```

### Créer une Nouvelle Branche pour une Fonctionnalité

```bash
# Créer et basculer sur une nouvelle branche
git checkout -b feature/nom-fonctionnalite

# Faire vos modifications...
# Committer
git add .
git commit -m "✨ Ajout de la fonctionnalité X"

# Pousser la branche
git push -u origin feature/nom-fonctionnalite
```

Puis créez une Pull Request sur GitHub.

---

## 📝 Améliorer la Documentation GitHub

### Ajouter une Description au Repository

1. Allez sur votre repository GitHub
2. Cliquez sur **⚙️ Settings**
3. Dans **General**, section **Features**
4. Cochez/décochez les fonctionnalités (Issues, Wiki, etc.)
5. Dans **About**, ajoutez :
   - **Description** : "Bibliothèque Google Apps Script modulaire partagée pour équipes"
   - **Website** : (optionnel) URL de documentation
   - **Topics** : `google-apps-script`, `google-sheets`, `library`, `vies`, `vat-validation`

### Ajouter des Badges (Optionnel)

Vous pouvez ajouter des badges dans le README.md :

```markdown
![GitHub](https://img.shields.io/github/license/USERNAME/apps-script-library)
![GitHub last commit](https://img.shields.io/github/last-commit/USERNAME/apps-script-library)
![GitHub issues](https://img.shields.io/github/issues/USERNAME/apps-script-library)
```

---

## 🔒 Sécurité et Confidentialité

### Fichiers à NE JAMAIS Committer

- ✅ `.clasp.json` (déjà dans `.gitignore`) - contient l'ID du projet Apps Script
- ✅ Fichiers avec identifiants/mots de passe
- ✅ Clés API personnelles

### Vérifier Avant de Committer

```bash
# Voir ce qui sera commité
git status

# Voir le contenu exact de ce qui sera commité
git diff --cached
```

---

## 📋 Checklist de Publication

- [ ] `.gitignore` créé et vérifié
- [ ] `.clasp.json` dans `.gitignore` (sécurité)
- [ ] README.md complet et à jour
- [ ] Documentation complète dans tous les guides
- [ ] Premier commit effectué
- [ ] Repository GitHub créé
- [ ] Remote GitHub configuré
- [ ] Code poussé vers GitHub
- [ ] Description et topics ajoutés sur GitHub
- [ ] License ajoutée (si nécessaire)

---

## 🔄 Synchronisation avec Clasp

### Workflow Recommandé

1. **Développement local** : Modifiez les fichiers dans `bibliotheques/`
2. **Test local** : Testez votre code
3. **Commit Git** : Committez les modifications
4. **Push GitHub** : `git push`
5. **Clasp Push** : `clasp push` (depuis le projet Apps Script lié)
6. **Déploiement** : Déployez une nouvelle version dans Apps Script

### Important

- Le repository GitHub contient les **fichiers sources** (dans `bibliotheques/`)
- Le projet Apps Script contient les **fichiers compilés/combinés** pour le déploiement
- Utilisez `clasp push` pour synchroniser le projet Apps Script
- Utilisez `git push` pour synchroniser le repository GitHub

---

## 📞 Support

Pour toute question sur Git/GitHub :

- [Documentation Git](https://git-scm.com/doc)
- [GitHub Docs](https://docs.github.com)
- [Clasp Documentation](https://github.com/google/clasp)

---

**🎉 Votre repository est maintenant prêt pour GitHub !**

