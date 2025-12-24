# 🚀 Amélioration : Validation Algorithmique des Numéros de TVA

## 📋 Vue d'Ensemble

La bibliothèque TVA a été améliorée pour inclure une **validation algorithmique locale** avant d'appeler l'API VIES. Cela permet de :

1. ✅ **Valider le format** du numéro selon le pays
2. ✅ **Vérifier la clé de contrôle** algorithmique (quand disponible)
3. ✅ **Économiser des appels API** inutiles pour les numéros mal formés
4. ✅ **Validation plus rapide** pour les erreurs de format

---

## 🔄 Processus de Validation

### Étapes de Validation

1. **Parsing du numéro** : Extraction du code pays et du numéro
2. **Vérification du format** : Validation de la longueur et du pattern selon le pays
3. **Validation algorithmique** : Vérification de la clé de contrôle (si algorithme disponible)
4. **Appel API VIES** : Vérification de l'existence réelle du numéro

### Flux de Validation

```
Numéro TVA
    ↓
Parse (extraction code pays + numéro)
    ↓
Format valide ? → NON → ❌ INVALIDE (pas d'appel API)
    ↓ OUI
Clé de contrôle valide ? → NON → ❌ INVALIDE (pas d'appel API)
    ↓ OUI
Appel API VIES
    ↓
Résultat final
```

---

## 🌍 Algorithmes Implémentés par Pays

### Pays avec Algorithme de Validation

| Pays | Code | Algorithme | Longueur |
|------|------|------------|----------|
| France | FR | Modulo 97 (formule: (12 + 3 * (SIREN % 97)) % 97) | 11 caractères |
| Allemagne | DE | Modulo 11 | 9 chiffres |
| Italie | IT | Modulo 11 | 11 chiffres |
| Espagne | ES | Modulo 11 avec lettres | 9 caractères |
| Belgique | BE | Modulo 97 | 10 chiffres |
| Pays-Bas | NL | Modulo 11 | 12 caractères |
| Portugal | PT | Modulo 11 | 9 chiffres |
| Autriche | AT | Modulo 11 | 9 caractères (U + 8 chiffres) |
| Danemark | DK | Modulo 11 | 8 chiffres |
| Finlande | FI | Modulo 11 | 8 chiffres |
| Suède | SE | Modulo 10 | 12 chiffres |
| Pologne | PL | Modulo 11 | 10 chiffres |
| Slovaquie | SK | Modulo 11 | 10 chiffres |

### Pays avec Validation de Format Seulement

Pour les pays suivants, seule la validation de format est effectuée avant l'appel API :

- Bulgarie (BG)
- Chypre (CY)
- République tchèque (CZ)
- Estonie (EE)
- Grèce (EL)
- Croatie (HR)
- Hongrie (HU)
- Irlande (IE)
- Lituanie (LT)
- Luxembourg (LU)
- Lettonie (LV)
- Malte (MT)
- Roumanie (RO)
- Slovénie (SI)

---

## 📝 Exemples d'Utilisation

### Validation Simple

```javascript
// Numéro français valide
TVA.validateVAT("FR18417798402");  // → true

// Numéro français avec clé invalide (ne passe pas la validation algorithmique)
TVA.validateVAT("FR18417798403");  // → false (pas d'appel API)

// Format invalide (ne passe pas la validation de format)
TVA.validateVAT("FR123");  // → false (pas d'appel API)
```

### Validation avec Informations Complètes

```javascript
var result = TVA.validateVATFull("FR18417798402");

// Si format ou clé invalide :
{
  valid: false,
  companyName: '',
  address: '',
  error: 'Clé de contrôle invalide pour FR'  // ou 'Format invalide pour FR'
}

// Si format et clé valides, mais API retourne invalide :
{
  valid: false,
  companyName: '',
  address: '',
  error: 'Numéro non trouvé dans VIES'
}

// Si tout est valide :
{
  valid: true,
  companyName: 'Nom de l\'entreprise',
  address: 'Adresse complète',
  requestDate: '2024-12-24',
  error: null
}
```

---

## 🔧 Détails Techniques

### Fonction `validateVATFormat(countryCode, vatNumber)`

Valide le format du numéro selon le pays :
- Longueur attendue
- Pattern (caractères autorisés, structure)

### Fonction `validateVATAlgorithm(countryCode, vatNumber)`

Valide la clé de contrôle algorithmique :
- Retourne `true` si l'algorithme n'est pas connu pour le pays
- Retourne `true` si la clé est valide
- Retourne `false` si la clé est invalide

### Intégration dans les Fonctions Existantes

Toutes les fonctions de validation ont été mises à jour :
- `validateVAT()` : Validation simple (boolean)
- `validateVATCompany()` : Retourne le nom de l'entreprise
- `validateVATFull()` : Retourne toutes les informations
- `validateVATBatch()` : Validation en batch

---

## 📊 Avantages

### Performance

- ⚡ **Validation plus rapide** : Les numéros mal formés sont rejetés immédiatement
- 🌐 **Moins d'appels API** : Économie de bande passante et de temps
- 💰 **Réduction des coûts** : Moins de requêtes vers l'API VIES

### Fiabilité

- ✅ **Double validation** : Format + Clé de contrôle + API
- 🛡️ **Détection précoce** : Erreurs détectées avant l'appel API
- 📝 **Messages d'erreur clairs** : Distinction entre format invalide et clé invalide

---

## 🎲 Génération de Numéros de TVA Valides

### Fonction `generateVATNumber(countryCode)`

Génère un numéro de TVA valide (format + clé de contrôle) pour un pays donné.

**Paramètres :**
- `countryCode` (string) : Code pays à 2 lettres (ex: "FR", "DE", "IT")

**Retour :**
- Numéro de TVA valide avec préfixe pays (ex: "FR18417798402")

**Exemples :**

```javascript
// Générer un numéro français
TVA.generateVATNumber("FR");  // → "FR18417798402" (exemple)

// Générer un numéro allemand
TVA.generateVATNumber("DE");  // → "DE123456789" (exemple)

// Générer un numéro italien
TVA.generateVATNumber("IT");  // → "IT12345678901" (exemple)
```

**Utilisation :**

```javascript
// Pour les tests
var testVAT = TVA.generateVATNumber("FR");
var isValid = TVA.validateVAT(testVAT);  // → true

// Générer plusieurs numéros
var vatNumbers = [];
for (var i = 0; i < 10; i++) {
  vatNumbers.push(TVA.generateVATNumber("FR"));
}
```

**Note importante :**
- Les numéros générés ont un **format et une clé de contrôle valides**
- Ils ne sont **pas nécessairement enregistrés** dans VIES (ce sont des numéros de test)
- Pour vérifier l'existence réelle, utilisez `validateVAT()` qui appellera l'API VIES

---

## 🔄 Version

**Version actuelle :** `1.2.0`

**Changements depuis 1.1.1 :**
- Ajout de la validation de format par pays
- Ajout de la validation algorithmique pour 13 pays
- Optimisation des appels API (validation locale avant appel)
- Messages d'erreur améliorés
- Ajout de la fonction `generateVATNumber()` pour générer des numéros de test valides

---

## 🚧 Pays à Ajouter

Si vous souhaitez ajouter des algorithmes pour d'autres pays, modifiez la fonction `validateVATAlgorithm()` dans `scripts/TVA.gs`.

Les pays suivants n'ont pas encore d'algorithme implémenté :
- Bulgarie (BG)
- Chypre (CY)
- République tchèque (CZ) - Algorithme simplifié
- Estonie (EE)
- Grèce (EL)
- Croatie (HR)
- Hongrie (HU)
- Irlande (IE)
- Lituanie (LT)
- Luxembourg (LU)
- Lettonie (LV)
- Malte (MT)
- Roumanie (RO)
- Slovénie (SI)

---

## 📚 Références

- [Algorithms for VAT Number Validation](https://en.wikipedia.org/wiki/VAT_identification_number)
- [VIES API Documentation](https://ec.europa.eu/taxation_customs/vies/)

