# ⚙️ Configuration Clasp - Synchronisation Multi-Projets

## 📋 Vue d'Ensemble

Ce repository utilise un système de configuration multi-projets pour synchroniser chaque bibliothèque Apps Script dans son propre projet Google Apps Script.

## 📁 Structure

```
/
├── scripts/                           Bibliothèques Apps Script
│   └── TVA.gs                         → Projet Apps Script séparé
│
├── wrappers/                          Fonctions wrapper pour Google Sheets
│   └── TVA_wrapper_functions.gs
│
└── .clasp-projects.json               Configuration des projets
```

## 🔧 Configuration

Le fichier `.clasp-projects.json` contient la configuration de tous les projets :

```json
{
  "projects": {
    "TVA": {
      "scriptId": "1E9s8sErZAolahBT7pHR7EsmekAp5b_ZkAIKQ3cCzp13Zk6MKh2wSYQlL",
      "sourceFile": "scripts/TVA.gs",
      "description": "Bibliothèque de validation TVA VIES"
    }
  }
}
```

### Ajouter un Nouveau Projet

Pour ajouter une nouvelle bibliothèque :

1. Créez le fichier dans `scripts/` (ex: `Odoo_Library.gs`)
2. Créez un nouveau projet Apps Script sur [script.google.com](https://script.google.com)
3. Copiez le Script ID du projet
4. Ajoutez l'entrée dans `.clasp-projects.json` :

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

## 🚀 Utilisation

### Synchroniser Tous les Projets (Push)

```bash
./sync-clasp.sh
```

Ce script :
1. Lit `.clasp-projects.json`
2. Pour chaque projet :
   - Crée un répertoire temporaire
   - Copie le fichier source
   - Crée un `.clasp.json` temporaire avec le Script ID
   - Exécute `clasp push --force`
   - Nettoie le répertoire temporaire

### Récupérer Tous les Projets (Pull)

```bash
./pull-clasp.sh
```

Ce script :
1. Lit `.clasp-projects.json`
2. Pour chaque projet :
   - Crée un répertoire temporaire
   - Crée un `.clasp.json` temporaire avec le Script ID
   - Exécute `clasp pull`
   - Copie les fichiers récupérés vers les fichiers sources
   - Nettoie le répertoire temporaire

## 📝 Projets Actuels

### VIES_VAT_Library

- **Script ID** : `1E9s8sErZAolahBT7pHR7EsmekAp5b_ZkAIKQ3cCzp13Zk6MKh2wSYQlL`
- **Fichier source** : `scripts/TVA.gs`
- **Description** : Bibliothèque de validation TVA VIES

## 💡 Avantages

- ✅ **Un projet par bibliothèque** : Chaque bibliothèque a son propre projet Apps Script
- ✅ **Déploiements indépendants** : Chaque bibliothèque peut être déployée séparément
- ✅ **Gestion simplifiée** : Un seul fichier de configuration pour tous les projets
- ✅ **Scripts automatisés** : Push/Pull de tous les projets en une commande

## 🔄 Workflow

1. **Modifier un fichier** dans `scripts/`
2. **Exécuter** `./sync-clasp.sh` pour synchroniser tous les projets
3. **Ou synchroniser un seul projet** en modifiant temporairement `.clasp-projects.json`

## ⚠️ Prérequis

- `clasp` installé et configuré (`clasp login`)
- `jq` installé (optionnel, pour parser le JSON automatiquement)
  - Sur macOS : `brew install jq`
  - Sur Linux : `sudo apt-get install jq` ou équivalent

Si `jq` n'est pas disponible, le script utilise une configuration manuelle pour VIES_VAT_Library.


