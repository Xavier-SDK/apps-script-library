# 📁 Guide : Organiser Plusieurs Bibliothèques dans un Projet Apps Script

## 🎯 Vue d'ensemble

Oui ! Vous pouvez **absolument** mettre plusieurs fichiers `.gs` dans un même projet Google Apps Script partagé. C'est même la méthode recommandée pour organiser votre code de manière claire et modulaire.

---

## 📋 Organisation dans Google Apps Script

### Comment ça fonctionne

Dans un projet Apps Script :
- ✅ Vous pouvez avoir **plusieurs fichiers `.gs`**
- ✅ **Un fichier = Un ensemble de fonctions liées** (une bibliothèque/namespace)
- ✅ Chaque fichier contient un namespace complet avec toutes ses fonctions
- ✅ Tous les fichiers sont accessibles dans le même projet
- ⚠️ **Pas de dossiers visibles** dans l'éditeur Apps Script (mais on peut les organiser avec des noms de fichiers)

### Structure Recommandée

**Règle importante : 1 fichier = 1 ensemble de fonctions liées (bibliothèque/namespace)**

Dans votre projet Apps Script partagé, créez **un fichier `.gs` par bibliothèque** :

```
Projet Apps Script : "Bibliothèque d'Outils Équipe"

Fichiers .gs :
├── 01_TVA.gs                    ← Ensemble complet de fonctions VAT
│   └─ Namespace: TVA (validateVAT, validateVATCompany, etc.)
│
├── 02_Odoo_Library.gs           ← Ensemble complet de fonctions Odoo
│   └─ Namespace: Odoo_Library (connect, searchRead, create, update, etc.)
│
├── 03_Google_Sheets_Utils.gs    ← Ensemble d'utilitaires Google Sheets
│   └─ Namespace: SheetsUtils (formatDate, cleanData, exportData, etc.)
│
└── 99_Wrappers.gs               ← Fonctions wrapper pour Google Sheets
    └─ Toutes les fonctions @customfunction (VALIDATE_VAT, ODOO_CONNECT, etc.)
```

**💡 Astuce de nommage :** Utilisez des préfixes numériques (`01_`, `02_`, etc.) pour contrôler l'ordre d'affichage dans l'éditeur Apps Script.

**📌 Important :** Ne créez **PAS** un fichier par fonction. Un fichier contient toutes les fonctions d'une bibliothèque complète (toutes les fonctions VAT ensemble, toutes les fonctions Odoo ensemble, etc.).

---

## 🚀 Processus Complet : Créer le Projet Partagé

### Étape 1 : Créer le Projet Apps Script

1. Allez sur [script.google.com](https://script.google.com)
2. Cliquez sur **Nouveau projet**
3. Nommez-le : **"Bibliothèque d'Outils Équipe"** (ou votre nom)
4. Supprimez le fichier par défaut `Code.gs` (optionnel)

### Étape 2 : Ajouter les Bibliothèques (Plusieurs Fichiers)

Pour chaque bibliothèque que vous voulez inclure :

1. **Cliquez sur l'icône ➕** à gauche (Nouveau fichier)
2. **Nommez le fichier** (ex: `01_TVA.gs`)
3. **Copiez le contenu** du fichier depuis votre repository :
   - Ouvrez `scripts/TVA.gs`
   - Copiez tout le contenu
   - Collez dans votre nouveau fichier Apps Script
4. **Enregistrez** (💾)

**Répétez pour chaque bibliothèque :**

```
01_TVA.gs                ← scripts/TVA.gs
02_Odoo_Library.gs      ← scripts/Odoo_Library.gs
03_Autres_Outils.gs     ← votre code personnalisé
```

### Étape 3 : Ajouter les Fonctions Wrapper

1. **Créez un nouveau fichier** : `99_Wrappers.gs` (ou `Wrappers_VAT.gs`, `Wrappers_Odoo.gs`, etc.)
2. **Combinez les wrappers** de toutes les bibliothèques :

```javascript
/**
 * Fonctions Wrapper pour Google Sheets
 * Contient toutes les fonctions utilisables dans les cellules
 */

// ============================================================================
// WRAPPERS POUR VAT (depuis wrappers/TVA_wrapper_functions.gs)
// ============================================================================

/**
 * Valide un numéro de TVA
 * @param {string} vatNumber - Numéro de TVA
 * @return {boolean} VRAI si valide
 * @customfunction
 */
function VALIDATE_VAT(vatNumber) {
  return VIES_VAT_Library.validateVAT(vatNumber);
}

function VAT_COMPANY(vatNumber) {
  return VIES_VAT_Library.validateVATCompany(vatNumber);
}

// ============================================================================
// WRAPPERS POUR ODOO (depuis wrappers/Odoo_wrapper_functions.gs)
// ============================================================================

/**
 * Se connecte à Odoo
 * @param {string} url - URL Odoo
 * @return {string} Statut de connexion
 * @customfunction
 */
function ODOO_CONNECT(url, database, username, password) {
  return Odoo_Library.connect(url, database, username, password);
}

// Ajoutez d'autres wrappers selon vos besoins...
```

### Étape 4 : Déployer comme Bibliothèque

1. Cliquez sur **Déployer** > **Nouveau déploiement**
2. Cliquez sur l'icône ⚙️ (Paramètres)
3. Choisissez **Bibliothèque**
4. Configurez la version (ex: "1")
5. Cliquez sur **Déployer**
6. **📋 Copiez l'ID de déploiement**

✅ **C'est tout !** Votre projet contient maintenant toutes les bibliothèques en un seul endroit.

---

## 🎨 Bonnes Pratiques d'Organisation

### Convention de Nommage

```
01_TVA.gs                        ← Bibliothèques principales (ordre alphabétique)
02_Odoo_Library.gs
03_Data_Utils.gs
...
99_Wrappers.gs                  ← Fonctions wrapper à la fin
99_Config.gs                    ← Configuration (si nécessaire)
```

### Séparation des Responsabilités

- **Un fichier = Un namespace/bibliothèque = Un ensemble de fonctions liées**
  - Exemple : Toutes les fonctions VAT dans `01_TVA.gs`
  - Exemple : Toutes les fonctions Odoo dans `02_Odoo_Library.gs`
- **Fichier séparé pour les wrappers** (plus facile à maintenir)
- **Fichier de config séparé** si nécessaire (identifiants, URLs, etc.)

**❌ Ne faites PAS :**
```
❌ validateVAT.gs           (1 fichier = 1 fonction)
❌ validateVATCompany.gs
❌ connectOdoo.gs
```

**✅ Faites plutôt :**
```
✅ 01_TVA.gs                 (1 fichier = toutes les fonctions VAT)
✅ 02_Odoo_Library.gs       (1 fichier = toutes les fonctions Odoo)
```

### Exemple de Structure Complète

```
Projet Apps Script : "Bibliothèque d'Outils Équipe"

01_TVA.gs
  └─ Namespace: TVA
  
02_Odoo_Library.gs
  └─ Namespace: Odoo_Library
  
03_Google_Drive_Utils.gs
  └─ Namespace: DriveUtils
  
99_Wrappers.gs
  └─ Toutes les fonctions @customfunction
  
99_Config.gs
  └─ Configuration partagée (optionnel)
```

---

## 🔄 Ajouter une Nouvelle Bibliothèque

Quand vous ajoutez une nouvelle bibliothèque (ex: connecteur Odoo) :

1. **Créez la bibliothèque** dans le repository : `scripts/Odoo_Library.gs`
2. **Dans le projet Apps Script** :
   - Créez un nouveau fichier : `02_Odoo_Library.gs`
   - Copiez le contenu de `scripts/Odoo_Library.gs`
   - Collez dans le fichier Apps Script
3. **Ajoutez les wrappers** :
   - Ouvrez `99_Wrappers.gs`
   - Ajoutez les fonctions wrapper depuis `wrappers/Odoo_wrapper_functions.gs` (ou `wrappers/TVA_wrapper_functions.gs` pour TVA)
4. **Déployez une nouvelle version** :
   - Déployer > Gérer les déploiements
   - Modifier le déploiement existant
   - Incrémentez la version (ex: "1" → "2")
   - Déployez

✅ Les utilisateurs n'ont qu'à mettre à jour la version, pas à ajouter une nouvelle bibliothèque !

---

## 💡 Avantages de cette Approche

### ✅ Pour vous (Administrateur)

- **Un seul projet** à maintenir
- **Un seul ID de déploiement** à partager
- **Organisation claire** avec plusieurs fichiers
- **Facile d'ajouter** de nouvelles bibliothèques
- **Versionnement simple** (une version pour tout)

### ✅ Pour votre équipe

- **Installation unique** : un seul ID à ajouter
- **Toutes les fonctions** disponibles immédiatement
- **Mise à jour simple** : changer la version dans Éditeur > Bibliothèques
- **Pas de confusion** : un seul projet à gérer

---

## 📝 Exemple Complet : Projet avec 3 Bibliothèques

### Structure du Projet Apps Script

```
📁 Bibliothèque d'Outils Équipe

📄 01_TVA.gs
   var TVA = (function() {
     // Code de validation TVA
     return {
       validateVAT: ...,
       validateVATCompany: ...
     };
   })();

📄 02_Odoo_Library.gs
   var Odoo_Library = (function() {
     // Code de connexion Odoo
     return {
       connect: ...,
       searchRead: ...
     };
   })();

📄 03_Google_Sheets_Utils.gs
   var SheetsUtils = (function() {
     // Utilitaires Google Sheets
     return {
       formatDate: ...,
       cleanData: ...
     };
   })();

📄 99_Wrappers.gs
   // Wrappers VAT
   function VALIDATE_VAT(vat) {
     return VIES_VAT_Library.validateVAT(vat);
   }
   
   // Wrappers Odoo
   function ODOO_CONNECT(url, db, user, pass) {
     return Odoo_Library.connect(url, db, user, pass);
   }
   
   // Wrappers Utils
   function FORMAT_DATE(date) {
     return SheetsUtils.formatDate(date);
   }
```

### Utilisation dans Google Sheets

Une fois la bibliothèque ajoutée, toutes les fonctions wrapper sont disponibles :

```
=VALIDATE_VAT("FR18417798402")
=ODOO_CONNECT("https://odoo.example.com", "database", "user", "pass")
=FORMAT_DATE(A1)
```

---

## 🔍 Vérification de l'Organisation

### Checklist

- [ ] Chaque bibliothèque est dans son propre fichier `.gs`
- [ ] Les fichiers sont nommés de manière claire (avec préfixes numériques si besoin)
- [ ] Tous les namespaces sont uniques (pas de conflits)
- [ ] Les wrappers sont dans un fichier séparé
- [ ] Le projet se déploie correctement comme bibliothèque
- [ ] Toutes les fonctions sont testées

---

## 🆘 Problèmes Courants

### "Namespace déjà défini"

**Problème :** Vous avez défini le même namespace dans plusieurs fichiers.

**Solution :** Assurez-vous que chaque fichier utilise un namespace unique.

### "Fonction non trouvée"

**Problème :** La fonction wrapper essaie d'utiliser une bibliothèque qui n'existe pas.

**Solution :** Vérifiez que :
- Le fichier de la bibliothèque est bien dans le projet
- Le namespace est correct (ex: `VIES_VAT_Library` et non `VAT_Library`)
- Le fichier est sauvegardé

### "Erreur lors du déploiement"

**Problème :** Il y a une erreur dans un des fichiers.

**Solution :** 
1. Vérifiez chaque fichier individuellement (exécutez une fonction de test)
2. Vérifiez la console d'exécution pour les erreurs
3. Corrigez les erreurs avant de redéployer

---

## 📚 Ressources Complémentaires

- **[GUIDE_SETUP_TEAM.md](./docs/GUIDE_SETUP_TEAM.md)** : Guide complet de mise en place
- **[GUIDE_AJOUTER_BIBLIOTHEQUE.md](./docs/GUIDE_AJOUTER_BIBLIOTHEQUE.md)** : Comment créer de nouvelles bibliothèques

---

**🎉 Votre projet Apps Script est maintenant bien organisé avec plusieurs bibliothèques !**

