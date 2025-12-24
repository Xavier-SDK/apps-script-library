# 🔑 Guide : Identifiant de Bibliothèque et Appel des Fonctions

## 📋 Réponses à vos Questions

### ❓ Question 1 : Un seul fichier par bibliothèque ?

**Réponse : NON, ce n'est pas obligatoire.**

Une bibliothèque Apps Script peut contenir **plusieurs fichiers `.gs`**. Tous les fichiers d'un même projet Apps Script sont accessibles.

**Recommandation :** Pour simplifier et éviter les conflits, il est recommandé d'avoir **un fichier par namespace/bibliothèque**.

**Exemple :**
```
Projet Apps Script : "Bibliothèque de scripts pour CDP"

Fichiers :
├── TVA.gs                    ← Namespace: TVA
├── Odoo_Library.gs           ← Namespace: Odoo_Library
└── Autres_Outils.gs          ← Namespace: Autres_Outils
```

Tous ces fichiers sont dans le même projet, donc accessibles via le même identifiant de bibliothèque.

---

### ❓ Question 2 : Comment appeler les fonctions depuis le wrapper ?

**Réponse : Cela dépend de l'identifiant que vous donnez à la bibliothèque lors de l'ajout.**

## 🎯 Comment ça fonctionne

### Étape 1 : Ajouter la bibliothèque

Quand vous ajoutez une bibliothèque dans Apps Script :
1. **Éditeur > Bibliothèques > "+"**
2. Ajoutez l'**ID de script** : `1E9s8sErZAolahBT7pHR7EsmekAp5b_ZkAIKQ3cCzp13Zk6MKh2wSYQlL`
3. Dans le champ **"Identifiant"**, vous pouvez utiliser :
   - `VIES_VAT_Library` (recommandé)
   - Ou un autre nom (ex: `Bibliotheque_de_scripts_pour_CDP`)

### Étape 2 : Appeler les fonctions

Le nom utilisé pour appeler les fonctions dépend de **l'identifiant** que vous avez choisi :

#### ✅ Cas 1 : Identifiant = "TVA" (Recommandé)

Si vous avez ajouté la bibliothèque avec l'identifiant **"TVA"** :

```javascript
// Dans votre wrapper ou code Apps Script
function ESTTVA(vatNumber) {
  return TVA.validateVAT(vatNumber);
}
```

**C'est le cas actuel dans votre wrapper** - il fonctionne directement avec `TVA.validateVAT()`.

#### ✅ Cas 2 : Identifiant = "Bibliotheque_de_scripts_pour_CDP"

Si vous avez ajouté la bibliothèque avec l'identifiant **"Bibliotheque_de_scripts_pour_CDP"** :

```javascript
// Dans votre wrapper ou code Apps Script
function ESTTVA(vatNumber) {
  return Bibliotheque_de_scripts_pour_CDP.TVA.validateVAT(vatNumber);
}
```

**Note :** Le namespace dans le code (`TVA`) reste le même, mais vous devez le préfixer avec l'identifiant de la bibliothèque.

---

## 🔧 Configuration du Wrapper

Le wrapper a été mis à jour pour être flexible. Vous pouvez configurer l'identifiant utilisé :

```javascript
// En haut du fichier wrapper
var LIBRARY_ID = ""; // Laissez vide si identifiant = "VIES_VAT_Library"
                     // Sinon, mettez votre identifiant (ex: "Bibliotheque_de_scripts_pour_CDP")
```

### Exemple 1 : Identifiant par défaut

```javascript
var LIBRARY_ID = ""; // Vide = utilise "TVA"

// Le wrapper utilisera automatiquement :
// TVA.validateVAT()
```

### Exemple 2 : Identifiant personnalisé

```javascript
var LIBRARY_ID = "Bibliotheque_de_scripts_pour_CDP";

// Le wrapper utilisera automatiquement :
// Bibliotheque_de_scripts_pour_CDP.TVA.validateVAT()
```

---

## 📝 Recommandations

### ✅ Pour simplifier (Recommandé)

1. **Utilisez toujours l'identifiant "VIES_VAT_Library"** lors de l'ajout de la bibliothèque
2. Le wrapper fonctionnera directement sans modification
3. Les appels sont simples : `VIES_VAT_Library.validateVAT()`

### ✅ Si vous voulez un identifiant personnalisé

1. Ajoutez la bibliothèque avec votre identifiant (ex: "Bibliotheque_de_scripts_pour_CDP")
2. Modifiez `LIBRARY_ID` dans le wrapper
3. Les appels deviennent : `Bibliotheque_de_scripts_pour_CDP.VIES_VAT_Library.validateVAT()`

---

## 🎯 Structure Complète

### Dans la Bibliothèque (TVA.gs)

```javascript
var TVA = (function() {
  'use strict';
  
  function validateVAT(vat) {
    // Code de validation
  }
  
  // API publique
  return {
    validateVAT: validateVAT
  };
})();
```

### Dans le Wrapper (copié dans votre Google Sheet)

```javascript
// Le wrapper utilise directement le namespace TVA
function ESTTVA(vatNumber) {
  return TVA.validateVAT(vatNumber);
}
```

### Dans Google Sheets

```excel
=ESTTVA("FR18417798402")
```

---

## ✅ Résumé

1. **Un seul fichier par bibliothèque ?** → Non, mais recommandé pour simplifier
2. **Comment appeler les fonctions ?** → Dépend de l'identifiant utilisé lors de l'ajout :
   - Identifiant "TVA" → `TVA.validateVAT()`
   - Identifiant "Bibliotheque_de_scripts_pour_CDP" → `Bibliotheque_de_scripts_pour_CDP.TVA.validateVAT()`

**Recommandation :** Utilisez toujours l'identifiant "TVA" pour simplifier.

