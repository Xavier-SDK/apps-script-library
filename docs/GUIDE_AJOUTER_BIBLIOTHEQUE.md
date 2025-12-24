# 📦 Guide : Ajouter une Nouvelle Bibliothèque

Ce guide explique comment ajouter une nouvelle bibliothèque au repository partagé (ex: connecteur Odoo, outils personnalisés, etc.).

---

## 🎯 Vue d'ensemble

Chaque bibliothèque est organisée dans deux fichiers :
- **Bibliothèque** : `scripts/Nom_Bibliotheque.gs` - Code source de la bibliothèque
- **Wrappers** : `wrappers/Nom_Bibliotheque_wrapper_functions.gs` - Fonctions pour Google Sheets (optionnel)

Chaque bibliothèque est synchronisée dans son propre projet Apps Script via `.clasp-projects.json`.

---

## 📋 Étapes pour Ajouter une Bibliothèque

### 1️⃣ Créer le Fichier de la Bibliothèque

Créez un nouveau fichier dans `scripts/` :

```bash
# Exemple : Créer Odoo_Library.gs
touch scripts/Odoo_Library.gs
```

### 2️⃣ Structure de la Bibliothèque

Utilisez cette structure de base :

```javascript
/**
 * @fileoverview Bibliothèque Google Apps Script pour [Description]
 * @author [Votre nom]
 * @version 1.0.0
 */

/**
 * Namespace pour toutes les fonctions
 */
var Odoo_Library = (function() {
  'use strict';
  
  const VERSION = '1.0.0';
  
  /**
   * Retourne la version de la bibliothèque
   * @return {string} Version de la bibliothèque
   */
  function getVersion() {
    return VERSION;
  }
  
  /**
   * Votre fonction principale
   * @param {string} param - Paramètre
   * @return {object} Résultat
   */
  function mainFunction(param) {
    // Votre code ici
    return {};
  }
  
  // API publique
  return {
    getVersion: getVersion,
    mainFunction: mainFunction
  };
})();
```

### 3️⃣ Créer les Fonctions Wrapper (Optionnel mais Recommandé)

Créez un fichier dans `wrappers/` :

```bash
# Exemple : Créer Odoo_wrapper_functions.gs
touch wrappers/Odoo_wrapper_functions.gs
```

Structure des wrappers :

```javascript
/**
 * 🔧 Fonctions Wrapper pour Google Sheets - Odoo Library
 */

/**
 * Fonction wrapper pour Google Sheets
 * @param {string} param - Paramètre
 * @return {string} Résultat
 * @customfunction
 */
function ODOO_FUNCTION(param) {
  if (!param) return "";
  return Odoo_Library.mainFunction(param.toString().trim());
}
```

**⚠️ Important :**
- Utilisez l'annotation `@customfunction` pour que les fonctions soient disponibles dans Google Sheets
- Utilisez des noms en MAJUSCULES avec des underscores
- Les wrappers doivent être copiés dans chaque projet Google Sheet

### 4️⃣ Créer le Projet Apps Script

1. Allez sur [script.google.com](https://script.google.com)
2. Cliquez sur **Nouveau projet**
3. Nommez-le : **"Nom_Bibliotheque"** (ex: "Odoo_Library")
4. Copiez le contenu de `scripts/Nom_Bibliotheque.gs` dans le projet
5. Enregistrez

### 5️⃣ Configurer la Synchronisation Clasp

Ajoutez l'entrée dans `.clasp-projects.json` :

```json
{
  "projects": {
    "TVA": { ... },
    "Odoo_Library": {
      "scriptId": "VOTRE_SCRIPT_ID_ICI",
      "sourceFile": "scripts/Odoo_Library.gs",
      "description": "Bibliothèque de connexion Odoo"
    }
  }
}
```

**Pour obtenir le Script ID :**
1. Dans votre projet Apps Script, allez dans **Paramètres du projet**
2. Section **"ID"** > **"ID de script"**
3. Copiez l'ID

### 6️⃣ Déployer la Bibliothèque

1. Dans votre projet Apps Script, allez dans **Déployer** > **Nouveau déploiement**
2. Cliquez sur l'icône ⚙️ (Paramètres) à côté de "Sélectionner un type"
3. Choisissez **"Bibliothèque"**
4. Cliquez sur **Déployer**
5. **Copiez l'ID de déploiement** (pour le partage)

### 7️⃣ Partager le Projet

1. Allez sur Google Drive
2. Cherchez votre projet Apps Script
3. Clic droit > **Partager**
4. Ajoutez les membres de l'équipe avec le rôle **"Lecteur"**

### 8️⃣ Synchroniser avec Clasp

```bash
# Synchroniser tous les projets (y compris le nouveau)
./sync-clasp.sh
```

---

## 📝 Exemple Complet : Ajouter Odoo_Library

```bash
# 1. Créer les fichiers
touch scripts/Odoo_Library.gs
touch wrappers/Odoo_wrapper_functions.gs

# 2. Éditer scripts/Odoo_Library.gs (voir structure ci-dessus)

# 3. Éditer wrappers/Odoo_wrapper_functions.gs (voir structure ci-dessus)

# 4. Créer le projet Apps Script sur script.google.com

# 5. Ajouter dans .clasp-projects.json :
#    "Odoo_Library": {
#      "scriptId": "VOTRE_SCRIPT_ID",
#      "sourceFile": "scripts/Odoo_Library.gs",
#      "description": "Bibliothèque Odoo"
#    }

# 6. Synchroniser
./sync-clasp.sh
```

---

## ✅ Checklist

- [ ] Fichier créé dans `scripts/Nom_Bibliotheque.gs`
- [ ] Fichier wrapper créé dans `wrappers/Nom_Bibliotheque_wrapper_functions.gs` (optionnel)
- [ ] Projet Apps Script créé
- [ ] Script ID copié
- [ ] Entrée ajoutée dans `.clasp-projects.json`
- [ ] Bibliothèque déployée (ID de déploiement obtenu)
- [ ] Projet partagé avec l'équipe
- [ ] Synchronisation testée avec `./sync-clasp.sh`
- [ ] Documentation mise à jour

---

## 🔄 Workflow de Maintenance

### Modifier une Bibliothèque

1. Modifiez le fichier dans `scripts/`
2. Testez localement
3. Synchronisez : `./sync-clasp.sh`
4. Déployez une nouvelle version dans Apps Script
5. Informez les utilisateurs

### Récupérer les Modifications depuis Apps Script

```bash
./pull-clasp.sh
```

---

**🎉 Votre nouvelle bibliothèque est prête !**
