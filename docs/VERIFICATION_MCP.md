# 🔍 Vérification de la Configuration MCP

## 📋 Vue d'ensemble

Ce document explique comment vérifier que la configuration MCP (Model Context Protocol) fonctionne correctement après les modifications récentes du projet (changement de namespace de `VIES_VAT_Library` à `TVA`).

---

## 🔧 Configuration MCP pour Google Apps Script

Si vous utilisez un serveur MCP pour interagir avec Google Apps Script, voici comment vérifier que tout fonctionne :

### 1️⃣ Vérifier les Outils MCP Disponibles

Les outils MCP disponibles pour ce projet incluent :

- **Google Drive** : `mcp_google-drive_*`
- **Apps Script** : `mcp_apps-script_*`
- **Odoo** : `mcp_odoo_*`
- **VIES VAT Checker** : `mcp_vies-vat-checker_*`

### 2️⃣ Vérifier la Configuration

La configuration MCP se trouve généralement dans :
- Fichier de configuration Cursor (si vous utilisez Cursor)
- Fichier de configuration MCP externe
- Variables d'environnement

**Emplacements possibles :**
- `~/.cursor/mcp.json`
- `~/.config/cursor/mcp.json`
- Fichier de configuration MCP dans votre projet

### 3️⃣ Tests de Vérification

#### Test 1 : Vérifier l'accès à Google Apps Script

```javascript
// Test dans Apps Script
function testMCPConnection() {
  Logger.log("Test de connexion MCP");
  Logger.log("Namespace actuel: TVA");
  Logger.log("Version: " + TVA.getVersion());
}
```

#### Test 2 : Vérifier le namespace

Le namespace a changé de `VIES_VAT_Library` à `TVA`. Vérifiez que :

1. ✅ Le fichier en ligne s'appelle `TVA.gs`
2. ✅ Le namespace dans le code est `var TVA = (function() {...})()`
3. ✅ Les appels utilisent `TVA.validateVAT()` et non `VIES_VAT_Library.validateVAT()`

#### Test 3 : Vérifier les wrappers

Les wrappers doivent utiliser le nouveau namespace :

```javascript
// ✅ Correct
function ESTTVA(vatNumber) {
  return TVA.validateVAT(vatNumber);
}

// ❌ Incorrect (ancien namespace)
function ESTTVA(vatNumber) {
  return VIES_VAT_Library.validateVAT(vatNumber);
}
```

---

## 🔄 Changements Récents

### Modifications Effectuées

1. **Namespace changé** : `VIES_VAT_Library` → `TVA`
2. **Version mise à jour** : `1.1.0` → `1.1.1`
3. **Fichier en ligne renommé** : `VIES_VAT_Library.gs` → `TVA.gs`
4. **Fichier local renommé** : `VIES_VAT_Library.gs` → `TVA.gs`
5. **Wrapper renommé** : `VIES_VAT_wrapper_functions.gs` → `TVA_wrapper_functions.gs`

### Impact sur la Configuration MCP

Si votre configuration MCP référence l'ancien namespace, vous devrez :

1. **Mettre à jour les références** : Remplacer `VIES_VAT_Library` par `TVA`
2. **Vérifier les scripts** : S'assurer que les scripts MCP utilisent le bon namespace
3. **Tester les fonctions** : Vérifier que les appels MCP fonctionnent avec `TVA.*`

---

## ✅ Checklist de Vérification

### Configuration MCP

- [ ] La configuration MCP est accessible
- [ ] Les outils Google Apps Script sont disponibles
- [ ] Les identifiants de script sont à jour
- [ ] Les permissions sont correctes

### Namespace et Code

- [ ] Le namespace `TVA` est utilisé dans le code
- [ ] Les wrappers utilisent `TVA.*` et non `VIES_VAT_Library.*`
- [ ] La version est `1.1.1`
- [ ] Le fichier en ligne s'appelle `TVA.gs`

### Tests Fonctionnels

- [ ] `TVA.getVersion()` retourne `"1.1.1"`
- [ ] `TVA.validateVAT("FR18417798402")` fonctionne
- [ ] Les wrappers dans Google Sheets fonctionnent
- [ ] Les appels MCP (si utilisés) fonctionnent

---

## 🛠️ Si la Configuration MCP Ne Fonctionne Plus

### Problème 1 : Erreur "VIES_VAT_Library is not defined"

**Solution :** Mettez à jour toutes les références pour utiliser `TVA` au lieu de `VIES_VAT_Library`.

### Problème 2 : Erreur "TVA is not defined"

**Vérifications :**
1. La bibliothèque est bien ajoutée avec l'identifiant `TVA`
2. Le namespace dans le code est bien `var TVA = ...`
3. La version de la bibliothèque est à jour

### Problème 3 : Les outils MCP ne répondent plus

**Vérifications :**
1. La configuration MCP est toujours valide
2. Les permissions Google sont toujours actives
3. Les Script IDs n'ont pas changé

---

## 📝 Notes Importantes

### Nom du Fichier vs Namespace

- **Fichier en ligne** : `TVA.gs` (peut être renommé librement)
- **Fichier local** : `TVA.gs` (dans `scripts/`)
- **Wrapper local** : `TVA_wrapper_functions.gs` (dans `wrappers/`)
- **Namespace** : `TVA` (dans le code, indépendant du nom du fichier)

### Identifiant de Bibliothèque

Lors de l'ajout de la bibliothèque dans Apps Script :
- **Identifiant recommandé** : `TVA`
- **Appels** : `TVA.validateVAT()`, `TVA.getVersion()`, etc.

---

## 🔗 Ressources

- [Documentation MCP](https://modelcontextprotocol.io/)
- [Configuration Cursor MCP](https://cursor.sh/docs/mcp)
- [Guide de Dépannage](./GUIDE_DEPANNAGE.md)
- [Guide Identifiant Bibliothèque](./GUIDE_IDENTIFIANT_BIBLIOTHEQUE.md)

---

**💡 Si vous utilisez des outils MCP spécifiques pour ce projet, assurez-vous qu'ils référencent le namespace `TVA` et non `VIES_VAT_Library`.**

