# 🔧 Modes de Validation TVA

## 📋 Vue d'Ensemble

La fonction `validateVAT()` supporte maintenant un paramètre optionnel `mode` qui permet de modifier le comportement de la validation.

---

## 🎯 Modes Disponibles

### Mode Normal (par défaut)

**Utilisation :**
```javascript
TVA.validateVAT("FR18417798402");
// ou
TVA.validateVAT("FR18417798402", "");
```

**Comportement :**
1. Parse du numéro
2. Vérification du format
3. Vérification de la clé de contrôle
4. Appel API VIES si format et clé valides

**Retour :** `boolean` (true/false)

---

### Mode Debug

**Utilisation :**
```javascript
TVA.validateVAT("FR18417798402", "debug");
```

**Comportement :**
Même processus que le mode normal, mais retourne des **détails sur l'étape d'échec** si la validation échoue.

**Retour :** `Object` avec :
- `valid` (boolean) : Résultat de la validation
- `step` (string) : Étape où la validation a échoué
- `reason` (string) : Motif du rejet (mots-clés)

**Étapes possibles :**
- `PARSE` : Échec lors du parsing du numéro
- `FORMAT` : Format invalide pour le pays
- `ALGORITHM` : Clé de contrôle invalide
- `API` : Validation via API VIES

**Raisons possibles :**
- `INVALID_FORMAT` : Format général invalide
- `INVALID_FORMAT_FR` : Format invalide pour la France (exemple)
- `INVALID_CHECKSUM_FR` : Clé de contrôle invalide pour la France (exemple)
- `NOT_FOUND` : Numéro non trouvé dans VIES
- `VALID` : Numéro valide

**Exemple :**
```javascript
var result = TVA.validateVAT("FR123", "debug");
// → {valid: false, step: "FORMAT", reason: "INVALID_FORMAT_FR"}

var result = TVA.validateVAT("FR18417798403", "debug");
// → {valid: false, step: "ALGORITHM", reason: "INVALID_CHECKSUM_FR"}

var result = TVA.validateVAT("FR18417798402", "debug");
// → {valid: true, step: "API", reason: "VALID"}
```

---

### Mode Basic

**Utilisation :**
```javascript
TVA.validateVAT("FR18417798402", "basic");
```

**Comportement :**
- Parse du numéro
- Vérification du format
- Vérification de la clé de contrôle
- **N'appelle PAS** l'API VIES

**Retour :** `boolean` (true/false)

**Cas d'usage :**
- Validation rapide sans appel API (évite les limites de rate limiting)
- Vérification de format et clé uniquement
- Tests de numéros générés localement
- Validation hors ligne

**Exemple :**
```javascript
// Validation locale uniquement (format + clé)
TVA.validateVAT("FR18417798402", "basic");
// → true si format et clé valides, false sinon (sans appel API)
```

---

### Mode Force

**Utilisation :**
```javascript
TVA.validateVAT("FR18417798402", "force");
```

**Comportement :**
- **Ignore** la vérification du format
- **Ignore** la vérification de la clé de contrôle
- Va **directement** à l'API VIES

**Retour :** `boolean` (true/false)

**Cas d'usage :**
- Numéros avec format non standard mais valides dans VIES
- Tests de numéros historiques
- Validation de numéros de pays sans algorithme connu

**Exemple :**
```javascript
// Numéro avec format non standard mais valide dans VIES
TVA.validateVAT("FR12345678901", "force");
// → Appelle directement l'API VIES sans vérifier le format
```

---

## 📊 Utilisation dans Google Sheets

### Fonction ESTTVA()

La fonction wrapper `ESTTVA()` supporte aussi le paramètre `mode` :

```excel
=ESTTVA("FR18417798402")           → VRAI ou FAUX (mode normal)
=ESTTVA("FR18417798402", "debug")  → "VALIDE" ou "FORMAT:INVALID_FORMAT_FR"
=ESTTVA("FR18417798402", "basic")  → VRAI ou FAUX (validation locale uniquement)
=ESTTVA("FR18417798402", "force")  → VRAI ou FAUX (ignore format/clé)
```

### Exemples Pratiques

#### Mode Normal
```
A1: FR18417798402
B1: =ESTTVA(A1)
    → VRAI (si valide) ou FAUX
```

#### Mode Debug
```
A1: FR123
B1: =ESTTVA(A1, "debug")
    → "FORMAT:INVALID_FORMAT_FR"

A2: FR18417798403
B2: =ESTTVA(A2, "debug")
    → "ALGORITHM:INVALID_CHECKSUM_FR"
```

#### Mode Basic
```
A1: FR18417798402
B1: =ESTTVA(A1, "basic")
    → Validation locale uniquement (format + clé, pas d'API)
```

#### Mode Force
```
A1: FR12345678901
B1: =ESTTVA(A1, "force")
    → Appelle directement l'API VIES
```

---

## 🔍 Détails des Mots-Clés (Mode Debug)

### Étapes (step)

| Étape | Description |
|-------|-------------|
| `PARSE` | Échec lors de l'extraction du code pays et du numéro |
| `FORMAT` | Format du numéro invalide pour le pays |
| `ALGORITHM` | Clé de contrôle algorithmique invalide |
| `API` | Validation via l'API VIES |

### Raisons (reason)

| Raison | Description |
|--------|-------------|
| `INVALID_FORMAT` | Format général invalide (parsing échoué) |
| `INVALID_FORMAT_XX` | Format invalide pour le pays XX (ex: `INVALID_FORMAT_FR`) |
| `INVALID_CHECKSUM_XX` | Clé de contrôle invalide pour le pays XX (ex: `INVALID_CHECKSUM_FR`) |
| `NOT_FOUND` | Numéro non trouvé dans VIES |
| `VALID` | Numéro valide |

---

## 💡 Cas d'Usage

### Mode Debug

**Utile pour :**
- Déboguer pourquoi un numéro est rejeté
- Comprendre à quelle étape la validation échoue
- Créer des messages d'erreur personnalisés

**Exemple :**
```javascript
var result = TVA.validateVAT("FR123", "debug");
if (!result.valid) {
  Logger.log("Échec à l'étape: " + result.step);
  Logger.log("Raison: " + result.reason);
}
```

### Mode Force

**Utile pour :**
- Valider des numéros avec format non standard
- Tester des numéros historiques
- Forcer la validation via API pour tous les pays

**Exemple :**
```javascript
// Numéro avec format suspect mais peut-être valide dans VIES
var isValid = TVA.validateVAT("FR12345678901", "force");
```

---

## 📝 Notes Importantes

1. **Mode par défaut** : Si `mode` n'est pas fourni ou est vide, le comportement est normal
2. **Mode debug** : Retourne un objet, pas un boolean
3. **Mode force** : Ignore toutes les validations locales, va directement à l'API
4. **Performance** : Le mode `force` peut être plus lent car il appelle toujours l'API

---

## 🔄 Version

**Ajouté dans la version :** `1.2.0`

