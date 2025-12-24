# 📊 Analyse de la Structure de TVA.gs

## 🔍 Structure du Fichier

### 1. Déclaration de la Variable Globale

```javascript
var TVA = (function() {
  'use strict';
  // ... code interne ...
  
  // API publique
  return {
    getVersion: getVersion,
    validateVAT: validateVAT,
    validateVATCompany: validateVATCompany,
    validateVATFull: validateVATFull,
    validateVATBatch: validateVATBatch,
    getSupportedCountries: getSupportedCountries
  };
})();
```

**Explication :**
- `TVA` est une **variable globale** déclarée dans le scope global de la bibliothèque
- C'est le résultat d'une **IIFE** (Immediately Invoked Function Expression)
- L'objet retourné contient toutes les fonctions publiques de la bibliothèque

### 2. Comment Apps Script Expose les Bibliothèques

Quand vous ajoutez une bibliothèque Apps Script avec un **identifiant** (ex: "SDK") :

1. **Toutes les variables globales** de la bibliothèque deviennent accessibles via cet identifiant
2. Si la bibliothèque exporte `var TVA = ...`, alors :
   - Avec l'identifiant **"SDK"** → Accès via `SDK.TVA`
   - Avec l'identifiant **"TVA"** → Accès via `TVA` (directement)

---

## ✅ Comment Appeler validateVAT avec l'Identifiant "SDK"

### Méthode 1 : Accès Direct (Recommandé)

```javascript
function ESTTVA(vatNumber) {
  if (!vatNumber) return false;
  return SDK.TVA.validateVAT(vatNumber.toString().trim());
}
```

**Explication :**
- `SDK` = L'identifiant de la bibliothèque
- `TVA` = La variable globale exportée par la bibliothèque
- `validateVAT` = La fonction publique dans l'objet TVA

### Méthode 2 : Créer une Variable Locale (Pour l'Autocomplétion)

```javascript
// En haut du fichier, après avoir ajouté la bibliothèque
var TVA = SDK.TVA;

// Puis utiliser directement TVA
function ESTTVA(vatNumber) {
  if (!vatNumber) return false;
  return TVA.validateVAT(vatNumber.toString().trim());
}
```

**Avantage :** L'autocomplétion fonctionne mieux avec `TVA.` qu'avec `SDK.TVA.`

---

## 🔧 Structure Complète de l'Appel

### Hiérarchie d'Accès

```
SDK                    ← Identifiant de la bibliothèque (défini lors de l'ajout)
  └── TVA             ← Variable globale exportée par la bibliothèque
      └── validateVAT ← Fonction publique dans l'objet TVA
```

### Toutes les Fonctions Disponibles

Avec l'identifiant "SDK", vous pouvez accéder à toutes les fonctions via :

```javascript
SDK.TVA.validateVAT(vatNumber)              // boolean
SDK.TVA.validateVATCompany(vatNumber)      // string
SDK.TVA.validateVATFull(vatNumber)         // object
SDK.TVA.validateVATBatch(vatNumbers)      // array
SDK.TVA.getVersion()                        // string
SDK.TVA.getSupportedCountries()             // array
```

---

## 💡 Pourquoi l'Autocomplétion Ne Fonctionne Pas Toujours

### Problème

Apps Script a des limitations avec l'autocomplétion pour les **objets imbriqués** comme `SDK.TVA`. L'éditeur ne peut pas toujours inférer automatiquement les propriétés d'un objet qui vient d'une bibliothèque externe.

### Solutions

#### Solution 1 : Utiliser une Variable Locale (Recommandé)

```javascript
// Déclaration en haut du fichier
var TVA = SDK.TVA;

// Utilisation
function ESTTVA(vatNumber) {
  return TVA.validateVAT(vatNumber.toString().trim());
}
```

#### Solution 2 : Ajouter des Annotations JSDoc

```javascript
/**
 * @typedef {Object} TVAObject
 * @property {function(string): boolean} validateVAT
 * @property {function(string): string} validateVATCompany
 * @property {function(string): Object} validateVATFull
 * @property {function(Array<string>): Array<Object>} validateVATBatch
 * @property {function(): string} getVersion
 * @property {function(): Array<string>} getSupportedCountries
 */

/**
 * @type {TVAObject}
 */
var TVA = SDK.TVA;
```

#### Solution 3 : Utiliser Directement SDK.TVA (Sans Autocomplétion)

```javascript
// Fonctionne mais sans autocomplétion
return SDK.TVA.validateVAT(vatNumber);
```

---

## 📝 Exemple Complet dans un Fichier Google Sheet

```javascript
/**
 * Fichier Code.gs dans votre Google Sheet
 * La bibliothèque est ajoutée avec l'identifiant "SDK"
 */

// Option 1 : Variable locale pour l'autocomplétion
var TVA = SDK.TVA;

/**
 * Valide un numéro de TVA
 * @param {string} vatNumber - Numéro de TVA complet
 * @return {boolean} VRAI si valide, FAUX sinon
 * @customfunction
 */
function ESTTVA(vatNumber) {
  if (!vatNumber) return false;
  return TVA.validateVAT(vatNumber.toString().trim());
}

/**
 * Retourne le nom de l'entreprise
 * @param {string} vatNumber - Numéro de TVA complet
 * @return {string} Nom de l'entreprise
 * @customfunction
 */
function TVA_SOCIETE(vatNumber) {
  if (!vatNumber) return "";
  return TVA.validateVATCompany(vatNumber.toString().trim());
}

// Option 2 : Utilisation directe (sans variable locale)
function ESTTVA_DIRECT(vatNumber) {
  if (!vatNumber) return false;
  return SDK.TVA.validateVAT(vatNumber.toString().trim());
}
```

---

## 🎯 Résumé

### Avec l'Identifiant "SDK"

**Appel correct :**
```javascript
SDK.TVA.validateVAT("FR18417798402")
```

**Structure :**
- `SDK` = Identifiant de la bibliothèque (défini lors de l'ajout)
- `TVA` = Variable globale exportée par `TVA.gs`
- `validateVAT` = Fonction publique dans l'objet retourné par l'IIFE

**Pour améliorer l'autocomplétion :**
```javascript
var TVA = SDK.TVA;  // Créer une référence locale
TVA.validateVAT(...);  // Utiliser la référence locale
```

---

## ✅ Conclusion

La bibliothèque `TVA.gs` exporte une variable globale `TVA` qui contient toutes les fonctions publiques. Quand vous ajoutez la bibliothèque avec l'identifiant "SDK", vous accédez à cette variable via `SDK.TVA`, puis aux fonctions via `SDK.TVA.validateVAT()`.

