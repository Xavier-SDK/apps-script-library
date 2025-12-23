# 🚀 Instructions Rapides : Publier sur GitHub

Votre dépôt Git est maintenant initialisé et prêt à être publié sur GitHub !

---

## ✅ État Actuel

- ✅ Dépôt Git initialisé
- ✅ Premier commit créé
- ✅ Fichiers prêts (`.gitignore`, `README.md`, etc.)

---

## 📋 Prochaines Étapes

### 1️⃣ Créer le Repository sur GitHub

1. **Allez sur GitHub** : [github.com](https://github.com)
2. **Cliquez sur "+"** (en haut à droite) > **"New repository"**
3. **Configurez** :
   - **Repository name** : `apps-script-library`
   - **Description** : "Bibliothèque Google Apps Script modulaire partagée pour équipes"
   - **Visibility** : Public ou Private (selon vos préférences)
   - ⚠️ **NE COCHEZ PAS** les options par défaut (README, .gitignore, license)
4. **Cliquez sur "Create repository"**

### 2️⃣ Lier le Repository Local à GitHub

GitHub vous donnera les instructions, mais voici les commandes :

```bash
cd "/Users/xroux/Documents/My devs/apps-script-library"

# Ajouter le remote GitHub (remplacez USERNAME par votre nom d'utilisateur)
git remote add origin https://github.com/USERNAME/apps-script-library.git

# Ou avec SSH (si vous avez configuré SSH)
git remote add origin git@github.com:USERNAME/apps-script-library.git

# Vérifier que le remote est bien configuré
git remote -v
```

### 3️⃣ Pousser vers GitHub

```bash
# S'assurer que la branche s'appelle 'main'
git branch -M main

# Pousser vers GitHub
git push -u origin main
```

✅ **C'est fait !** Votre repository est maintenant sur GitHub.

---

## 📝 Améliorer le Repository GitHub

### Ajouter une Description et des Topics

1. Allez sur votre repository GitHub
2. Cliquez sur **⚙️ Settings**
3. Dans **General** > **About**, ajoutez :
   - **Description** : "Bibliothèque Google Apps Script modulaire partagée pour équipes"
   - **Topics** : `google-apps-script`, `google-sheets`, `library`, `vies`, `vat-validation`, `javascript`

### Ajouter une License (Optionnel)

Si vous voulez ajouter une licence (MIT, Apache 2.0, etc.) :

1. Créez un fichier `LICENSE` dans le repository
2. Ou utilisez l'interface GitHub : Settings > General > License

---

## 🔄 Commandes Utiles pour la Suite

### Publier des Modifications

```bash
git add .
git commit -m "📝 Description de vos modifications"
git push
```

### Voir l'État

```bash
git status
git log --oneline -5
```

---

## 📖 Documentation Complète

Pour plus de détails, consultez **[GUIDE_GITHUB.md](./docs/GUIDE_GITHUB.md)**

---

**🎉 Votre repository est prêt pour GitHub !**

