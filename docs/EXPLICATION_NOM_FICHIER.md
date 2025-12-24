# 📝 Explication : Pourquoi le fichier local garde son nom ?

## ❓ Question

Pourquoi le fichier local s'appelle `TVA.gs` alors que le fichier en ligne s'appelle aussi `TVA.gs` ?

## ✅ Réponse

C'est **normal et intentionnel** ! Voici pourquoi :

### 🔄 Comment fonctionne la synchronisation

1. **Nom en ligne (Apps Script)** : `TVA.gs`
   - C'est le nom que vous voyez dans l'éditeur Apps Script en ligne
   - Vous pouvez le renommer librement dans Apps Script

2. **Nom local (Repository)** : `scripts/TVA.gs`
   - C'est le nom défini dans `.clasp-projects.json` → `sourceFile`
   - Ce nom reste constant dans votre projet local pour la cohérence

### 📋 Processus de synchronisation

Quand vous exécutez `./pull-clasp.sh` :

```bash
# 1. Le script récupère le fichier depuis Apps Script
clasp pull  # Récupère "TVA.js" depuis Apps Script

# 2. Le script copie le contenu vers le chemin défini dans sourceFile
cp "$js_file" "$source_file"
# TVA.js → scripts/TVA.gs
```

**Résultat :** Le contenu de `TVA.gs` (en ligne) est copié dans `scripts/TVA.gs` (local).

### 💡 Pourquoi cette approche ?

**Avantages :**
- ✅ **Cohérence locale** : Le nom du fichier reste stable dans votre repository
- ✅ **Flexibilité en ligne** : Vous pouvez renommer librement dans Apps Script
- ✅ **Organisation** : Le nom local peut être plus descriptif que le nom en ligne
- ✅ **Versioning** : Git garde une trace cohérente du fichier

**Exemple :**
- En ligne : `TVA.gs` (nom court, pratique)
- Local : `TVA.gs` (nom cohérent avec le namespace)

### 🔧 Si vous voulez changer le nom local

Si vous souhaitez que le fichier local s'appelle aussi `TVA.gs` :

1. Modifiez `.clasp-projects.json` :
```json
{
  "projects": {
    "TVA": {
      "scriptId": "...",
      "sourceFile": "scripts/TVA.gs",
      "description": "..."
    }
  }
}
```

2. Le fichier local est déjà nommé `scripts/TVA.gs`

3. Les prochains `pull` utiliseront le nouveau nom.

### ⚠️ Important

Le **contenu** est toujours synchronisé, seul le **nom** peut différer. Le namespace dans le code (`TVA`) est indépendant du nom du fichier.

---

## 📊 Résumé

| Élément | Nom | Où ? |
|---------|-----|------|
| **Fichier en ligne** | `TVA.gs` | Apps Script (script.google.com) |
| **Fichier local** | `TVA.gs` | Repository local (`scripts/`) |
| **Namespace dans le code** | `TVA` | Dans le contenu du fichier |
| **Configuration** | `sourceFile: "scripts/TVA.gs"` | `.clasp-projects.json` |

**Conclusion :** C'est normal que les noms diffèrent. Le contenu est synchronisé, et le nom local reste cohérent avec votre organisation de projet.

