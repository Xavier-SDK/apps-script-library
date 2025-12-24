# 🔧 Solution : Problème avec l'identifiant "SDK"

## ❌ Problème

Quand vous ajoutez la bibliothèque avec l'identifiant **"SDK"** au lieu de **"TVA"**, vous devez utiliser `SDK.TVA.validateVAT()` mais l'autocomplétion ne fonctionne pas correctement.

## ✅ Solution : Changer l'identifiant de la bibliothèque

### Étape 1 : Modifier l'identifiant dans Apps Script

1. Dans votre projet Apps Script (Google Sheet), allez dans **Éditeur > Bibliothèques**
2. Trouvez la bibliothèque TVA dans la liste
3. Cliquez sur l'icône **⚙️** (Paramètres) à côté de la bibliothèque
4. Dans le champ **"Identifiant"**, changez **"SDK"** en **"TVA"**
5. Cliquez sur **"Enregistrer"**

### Étape 2 : Mettre à jour votre code

Une fois l'identifiant changé en **"TVA"**, vous pouvez utiliser directement :

```javascript
function ESTTVA(vatNumber) {
  if (!vatNumber) return false;
  return TVA.validateVAT(vatNumber.toString().trim());
}
```

Au lieu de :

```javascript
function ESTTVA(vatNumber) {
  if (!vatNumber) return false;
  return SDK.TVA.validateVAT(vatNumber.toString().trim());
}
```

### Étape 3 : Vérifier l'autocomplétion

Après avoir changé l'identifiant, l'autocomplétion devrait fonctionner :
- Tapez `TVA.` et vous devriez voir :
  - `validateVAT`
  - `validateVATCompany`
  - `validateVATFull`
  - `validateVATBatch`
  - `getVersion`
  - `getSupportedCountries`

---

## 🔄 Alternative : Garder l'identifiant "SDK"

Si vous préférez garder l'identifiant "SDK", vous devez :

1. **Utiliser `SDK.TVA`** dans votre code :
```javascript
function ESTTVA(vatNumber) {
  if (!vatNumber) return false;
  return SDK.TVA.validateVAT(vatNumber.toString().trim());
}
```

2. **L'autocomplétion peut ne pas fonctionner** car Apps Script ne reconnaît pas toujours les propriétés imbriquées des bibliothèques.

**Recommandation :** Utilisez l'identifiant **"TVA"** pour une meilleure expérience de développement.

---

## 📝 Note importante

L'identifiant de la bibliothèque est **indépendant** du namespace dans le code :
- **Identifiant** : C'est le nom que vous donnez à la bibliothèque lors de l'ajout (ex: "TVA" ou "SDK")
- **Namespace** : C'est le nom de la variable dans le code de la bibliothèque (`var TVA = ...`)

Pour simplifier, utilisez le même nom pour les deux : **"TVA"**.

