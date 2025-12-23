# 📦 Bibliothèque VIES VAT Check

Bibliothèque pour valider les numéros de TVA de l'Union Européenne via le service VIES.

## 📁 Fichiers

- **VIES_VAT_Library.gs** : Code source de la bibliothèque
- **wrapper_functions.gs** : Fonctions wrapper pour Google Sheets
- **example_usage.gs** : Exemples d'utilisation avancés
- **README.md** : Cette documentation

## 🚀 Utilisation

### Dans un Projet Apps Script

1. Copiez `VIES_VAT_Library.gs` dans votre projet Apps Script
2. Utilisez les fonctions via le namespace `VIES_VAT_Library`

```javascript
var isValid = VIES_VAT_Library.validateVAT("FR18417798402");
```

### Dans Google Sheets

1. Ajoutez `VIES_VAT_Library.gs` à votre projet Apps Script
2. Ajoutez `wrapper_functions.gs` à votre projet Apps Script
3. Utilisez les fonctions dans vos cellules :

```
=VALIDATE_VAT("FR18417798402")
=VAT_COMPANY("FR18417798402")
```

## 📚 Fonctions Disponibles

Voir le fichier `VIES_VAT_Library.gs` pour la documentation complète des fonctions.

