# 📦 Guide : Ajouter une Nouvelle Bibliothèque

Ce guide explique comment ajouter une nouvelle bibliothèque au repository partagé (ex: connecteur Odoo, outils personnalisés, etc.).

---

## 🎯 Vue d'ensemble

Chaque bibliothèque est organisée dans son propre dossier sous `bibliotheques/`, avec :
- Le code source de la bibliothèque (`.gs`)
- Les fonctions wrapper pour Google Sheets (optionnel)
- Un README.md pour la documentation
- Des exemples d'utilisation (optionnel)

---

## 📋 Étapes pour Ajouter une Bibliothèque

### 1️⃣ Créer le Dossier de la Bibliothèque

```bash
# Dans le repository apps-script-library
mkdir -p bibliotheques/nom-de-votre-bibliotheque
```

**Exemple :**
```bash
mkdir -p bibliotheques/odoo
```

### 2️⃣ Créer le Fichier de la Bibliothèque

1. Copiez le template : `bibliotheques/templates/TEMPLATE_BIBLIOTHEQUE.gs`
2. Renommez-le selon votre bibliothèque (ex: `Odoo_Library.gs`)
3. Placez-le dans votre dossier : `bibliotheques/nom-de-votre-bibliotheque/`

**Exemple :**
```bash
cp bibliotheques/templates/TEMPLATE_BIBLIOTHEQUE.gs bibliotheques/odoo/Odoo_Library.gs
```

### 3️⃣ Modifier le Template

#### 3.1 Changer le Namespace

Remplacez `NAMESPACE_NAME` par un nom unique et descriptif :

```javascript
// ❌ AVANT (template)
var NAMESPACE_NAME = (function() {

// ✅ APRÈS (exemple pour Odoo)
var Odoo_Library = (function() {
```

**Convention de nommage :**
- Utilisez des majuscules et underscores : `Odoo_Library`, `Data_Utils`, `Finance_Tools`
- Le nom doit être unique et descriptif
- Terminez par `_Library` pour la cohérence

#### 3.2 Ajouter vos Fonctions

Dans le namespace, ajoutez vos fonctions publiques :

```javascript
var Odoo_Library = (function() {
  'use strict';
  
  const VERSION = '1.0.0';
  const LIBRARY_NAME = 'Odoo Connector Library';
  
  /**
   * Se connecte à Odoo
   * @param {string} url - URL de l'instance Odoo
   * @param {string} database - Nom de la base de données
   * @param {string} username - Nom d'utilisateur
   * @param {string} password - Mot de passe
   * @return {object} Objet de connexion
   */
  function connect(url, database, username, password) {
    // Votre code de connexion ici
    return {
      url: url,
      database: database,
      authenticated: true
    };
  }
  
  /**
   * Récupère des données depuis Odoo
   * @param {object} connection - Objet de connexion
   * @param {string} model - Modèle Odoo (ex: "product.product")
   * @param {Array} domain - Domaine de recherche
   * @return {Array} Résultats
   */
  function searchRead(connection, model, domain) {
    // Votre code ici
    return [];
  }
  
  // Exposez vos fonctions publiques
  return {
    getVersion: function() { return VERSION; },
    getName: function() { return LIBRARY_NAME; },
    connect: connect,
    searchRead: searchRead
    // Ajoutez toutes vos fonctions publiques ici
  };
})();
```

#### 3.3 Documenter vos Fonctions

Utilisez JSDoc pour documenter vos fonctions :

```javascript
/**
 * Description de la fonction
 * @param {type} paramName - Description du paramètre
 * @return {type} Description de la valeur de retour
 */
function myFunction(paramName) {
  // ...
}
```

---

### 4️⃣ Créer les Fonctions Wrapper (Optionnel mais Recommandé)

Les fonctions wrapper permettent d'utiliser votre bibliothèque directement dans Google Sheets.

1. Copiez le template : `bibliotheques/templates/TEMPLATE_WRAPPER.gs`
2. Renommez-le : `wrapper_functions.gs`
3. Placez-le dans votre dossier de bibliothèque

**Exemple pour Odoo :**

```javascript
/**
 * Se connecte à Odoo (pour Google Sheets)
 * @param {string} url - URL de l'instance Odoo
 * @param {string} database - Nom de la base de données
 * @param {string} username - Nom d'utilisateur
 * @param {string} password - Mot de passe
 * @return {string} "Connecté" ou message d'erreur
 * @customfunction
 */
function ODOO_CONNECT(url, database, username, password) {
  if (!url || !database || !username || !password) {
    return "ERREUR: Tous les paramètres sont requis";
  }
  
  try {
    var connection = Odoo_Library.connect(url, database, username, password);
    return connection.authenticated ? "Connecté" : "Échec de connexion";
  } catch (e) {
    return "ERREUR: " + e.message;
  }
}

/**
 * Recherche des produits dans Odoo (pour Google Sheets)
 * @param {string} searchTerm - Terme de recherche
 * @return {string} Liste des produits trouvés
 * @customfunction
 */
function ODOO_SEARCH_PRODUCTS(searchTerm) {
  // Votre code wrapper ici
  return "Résultats...";
}
```

**⚠️ Important :**
- Utilisez l'annotation `@customfunction` pour que les fonctions soient disponibles dans Google Sheets
- Utilisez des noms en MAJUSCULES avec des underscores pour les fonctions Sheets
- Gèrez les erreurs avec des try/catch

---

### 5️⃣ Créer un README.md

Créez un fichier `README.md` dans votre dossier de bibliothèque :

```markdown
# 📦 Nom de votre Bibliothèque

Description courte de ce que fait votre bibliothèque.

## 📁 Fichiers

- **Nom_Bibliotheque.gs** : Code source de la bibliothèque
- **wrapper_functions.gs** : Fonctions wrapper pour Google Sheets (optionnel)
- **README.md** : Cette documentation

## 🚀 Utilisation

### Dans un Projet Apps Script

1. Copiez `Nom_Bibliotheque.gs` dans votre projet Apps Script
2. Utilisez les fonctions via le namespace `Nom_Bibliotheque`

```javascript
var result = Nom_Bibliotheque.functionName(params);
```

### Dans Google Sheets

1. Ajoutez `Nom_Bibliotheque.gs` à votre projet Apps Script
2. Ajoutez `wrapper_functions.gs` à votre projet Apps Script (si disponible)
3. Utilisez les fonctions dans vos cellules

## 📚 Fonctions Disponibles

### Fonctions de la Bibliothèque

- `functionName(param)` : Description
- `anotherFunction(param)` : Description

### Fonctions Google Sheets (si wrapper disponible)

- `=SHEET_FUNCTION(param)` : Description

## 📖 Documentation Complète

Voir le fichier source pour la documentation complète avec JSDoc.
```

---

### 6️⃣ Tester votre Bibliothèque

Avant de partager, testez votre bibliothèque :

1. Créez un projet Apps Script de test
2. Copiez votre fichier `.gs` dans le projet
3. Testez toutes les fonctions
4. Si vous avez des wrappers, testez-les dans un Google Sheet

---

## 🔄 Ajouter la Bibliothèque au Projet Partagé

Une fois votre bibliothèque créée et testée, vous devez décider comment l'intégrer au projet partagé.

### Option A : Bibliothèque Indépendante (Recommandé pour des bibliothèques volumineuses)

Chaque bibliothèque est déployée séparément avec son propre ID de déploiement.

**Avantages :**
- Isolation complète
- Mises à jour indépendantes
- Les utilisateurs peuvent choisir quelles bibliothèques installer

**Inconvénients :**
- Plusieurs IDs à gérer
- Plusieurs bibliothèques à ajouter dans chaque projet

### Option B : Bibliothèque Combinée (Recommandé pour des bibliothèques complémentaires)

Toutes les bibliothèques sont combinées dans un seul projet Apps Script.

**Processus :**

1. Créez ou ouvrez votre projet Apps Script de bibliothèque combinée
2. Copiez le contenu de chaque fichier `.gs` dans le projet
3. Déployez comme une seule bibliothèque
4. Partagez un seul ID de déploiement

**Structure dans le projet combiné :**

```javascript
// Fichier 1: VIES_VAT_Library
var VIES_VAT_Library = (function() {
  // Code VAT
})();

// Fichier 2: Odoo_Library
var Odoo_Library = (function() {
  // Code Odoo
})();

// Fichier 3: Autres outils
var TeamUtils = (function() {
  // Autres fonctions
})();
```

**Avantages :**
- Un seul ID à gérer
- Installation unique pour les utilisateurs
- Facile à maintenir si les bibliothèques sont liées

**Inconvénients :**
- Les mises à jour affectent toutes les bibliothèques
- Plus difficile de versionner séparément

---

## 📝 Mettre à Jour la Documentation

### 7️⃣ Mettre à Jour l'Index

Mettez à jour `INDEX_DOCUMENTATION.md` pour inclure votre nouvelle bibliothèque :

```markdown
## 🎯 Fonctionnalités Disponibles

### Validation TVA VIES
- ✅ Validation de numéros de TVA européens
- ...

### Connecteur Odoo (Nouveau !)
- ✅ Connexion à Odoo
- ✅ Recherche de données
- ...
```

### 8️⃣ Mettre à Jour le Guide d'Installation

Si nécessaire, mettez à jour `GUIDE_SETUP_TEAM.md` pour expliquer comment combiner plusieurs bibliothèques.

---

## ✅ Checklist

- [ ] Dossier de bibliothèque créé
- [ ] Code source créé (basé sur le template)
- [ ] Namespace unique défini
- [ ] Fonctions publiques documentées avec JSDoc
- [ ] Fonctions wrapper créées (optionnel)
- [ ] README.md créé avec documentation
- [ ] Bibliothèque testée
- [ ] Décision prise : bibliothèque indépendante ou combinée ?
- [ ] Documentation mise à jour (INDEX_DOCUMENTATION.md)
- [ ] Code ajouté au projet Apps Script partagé (si combiné)
- [ ] Bibliothèque déployée et ID de déploiement obtenu

---

## 📚 Exemple Complet : Ajouter un Connecteur Odoo

Voici un exemple complet pour ajouter un connecteur Odoo :

```bash
# 1. Créer le dossier
mkdir -p bibliotheques/odoo

# 2. Créer la bibliothèque
cp bibliotheques/templates/TEMPLATE_BIBLIOTHEQUE.gs bibliotheques/odoo/Odoo_Library.gs

# 3. Créer les wrappers
cp bibliotheques/templates/TEMPLATE_WRAPPER.gs bibliotheques/odoo/wrapper_functions.gs

# 4. Créer le README
# (copiez le template de README et personnalisez-le)
```

Puis modifiez les fichiers selon vos besoins.

---

## 🔄 Workflow de Maintenance

### Ajouter une Nouvelle Fonction

1. Ajoutez la fonction dans le namespace de votre bibliothèque
2. Exportez-la dans le `return {}`
3. Créez un wrapper si nécessaire
4. Documentez avec JSDoc
5. Mettez à jour le README.md
6. Testez
7. Incrémentez la version
8. Déployez une nouvelle version

### Corriger un Bug

1. Corrigez le bug dans le code source
2. Testez la correction
3. Incrémentez la version de patch (ex: 1.0.0 → 1.0.1)
4. Déployez une nouvelle version
5. Informez les utilisateurs

---

**🎉 Votre nouvelle bibliothèque est prête à être partagée !**

