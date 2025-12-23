# 🚀 Guide Rapide pour l'Équipe

## ⚡ Installation Express (5 minutes)

### 1️⃣ Recevoir l'ID de la Bibliothèque

Votre administrateur vous a envoyé un **ID de déploiement** (ex: `1AbC2dEf3GhI4jKl5MnOp6QrSt7UvWxYz`).

📋 **Gardez cet ID précieusement** - vous en aurez besoin pour chaque nouveau Google Sheet.

---

### 2️⃣ Ajouter la Bibliothèque à un Google Sheet

#### Option A : Nouveau Google Sheet

1. Créez un nouveau Google Sheet ou ouvrez un existant
2. Cliquez sur **Extensions** > **Apps Script**
3. Un nouvel onglet s'ouvre avec l'éditeur Apps Script

#### Option B : Google Sheet Existant

1. Ouvrez votre Google Sheet
2. Cliquez sur **Extensions** > **Apps Script**
3. Si vous voyez déjà du code, c'est bon. Sinon, continuez.

### 3️⃣ Ajouter la Bibliothèque

1. Dans l'éditeur Apps Script, cliquez sur **Ressources** > **Bibliothèques**
2. Dans le champ **"ID de script"**, collez votre ID de déploiement :
   ```
   [COLLEZ_VOTRE_ID_ICI]
   ```
3. Cliquez sur **Rechercher**
4. Sélectionnez la **dernière version** (recommandé)
5. Cliquez sur **Ajouter**

✅ **Bravo !** La bibliothèque est maintenant ajoutée.

### 4️⃣ Ajouter les Fonctions Wrapper

1. Dans l'éditeur Apps Script, supprimez tout le code existant (s'il y en a)
2. Pour chaque bibliothèque que vous utilisez, ouvrez le fichier **`wrapper_functions.gs`** dans le dossier correspondant :
   - Pour VAT : `bibliotheques/vat-check/wrapper_functions.gs`
   - Pour Odoo : `bibliotheques/odoo/wrapper_functions.gs` (quand disponible)
   - etc.
3. **Copiez-collez** tout le contenu dans l'éditeur Apps Script
4. Répétez pour chaque bibliothèque si vous en utilisez plusieurs
5. Cliquez sur **Enregistrer** (💾) ou `Cmd+S` / `Ctrl+S`

✅ **Parfait !** Vous pouvez maintenant utiliser les fonctions.

---

## 📊 Utilisation dans Google Sheets

### Fonctions Disponibles

Une fois configuré, vous pouvez utiliser ces formules directement dans vos cellules :

| Fonction | Description | Exemple |
|----------|-------------|---------|
| `=VALIDATE_VAT("FR18417798402")` | Valide un numéro de TVA | Retourne `VRAI` ou `FAUX` |
| `=VAT_COMPANY("FR18417798402")` | Nom de l'entreprise | Retourne le nom de l'entreprise |
| `=VAT_ADDRESS("FR18417798402")` | Adresse de l'entreprise | Retourne l'adresse complète |
| `=VAT_INFO("FR18417798402")` | Toutes les infos | Retourne nom + adresse |
| `=VAT_STATUS("FR18417798402")` | Statut (VALIDE/INVALIDE) | Retourne "VALIDE" ou "INVALIDE" |

### Exemples Pratiques

#### Validation Simple

```
Colonne A : Numéros de TVA
Colonne B : =VALIDATE_VAT(A2)
Colonne C : =VAT_COMPANY(A2)
```

Copiez les formules de B2 et C2 vers le bas pour valider toute une liste.

#### Validation Conditionnelle

```
=IF(VALIDATE_VAT(A2), "✅ OK", "❌ Erreur")
```

#### Validation avec Nom de l'Entreprise

```
=IF(VALIDATE_VAT(A2), VAT_COMPANY(A2), "Numéro invalide")
```

---

## 🔧 Menu Personnalisé

Après avoir ajouté les fonctions wrapper, un menu **"🔧 Outils Équipe"** apparaîtra automatiquement dans votre Google Sheet.

### Utilisation du Menu

1. Ouvrez votre Google Sheet
2. Cliquez sur **🔧 Outils Équipe** dans la barre de menu
3. Sélectionnez **"Valider la colonne A"**
4. Les résultats apparaîtront dans les colonnes B (statut) et C (nom entreprise)

---

## 📋 Workflow Recommandé

### Première Utilisation (5 minutes)

1. ✅ Recevoir l'ID de déploiement
2. ✅ Ouvrir/créer un Google Sheet
3. ✅ Extensions > Apps Script
4. ✅ Ajouter la bibliothèque (ID)
5. ✅ Copier-coller les fonctions wrapper
6. ✅ Enregistrer

### Utilisation Quotidienne

1. ✅ Ouvrir votre Google Sheet
2. ✅ Utiliser les formules directement : `=VALIDATE_VAT(A2)`
3. ✅ Ou utiliser le menu : **🔧 Outils Équipe** > **Valider la colonne A**

### Nouveau Google Sheet

Pour chaque nouveau Google Sheet :

1. ✅ Extensions > Apps Script
2. ✅ Ajouter la bibliothèque (même ID)
3. ✅ Copier-coller les fonctions wrapper
4. ✅ Enregistrer

💡 **Astuce** : Créez un Google Sheet modèle avec tout déjà configuré, puis dupliquez-le pour chaque nouveau projet.

---

## 🔄 Mise à Jour de la Bibliothèque

Quand une nouvelle version est disponible :

1. Ouvrez votre projet Apps Script (Extensions > Apps Script)
2. Cliquez sur **Ressources** > **Bibliothèques**
3. Cliquez sur ✏️ (Modifier) de la bibliothèque
4. Sélectionnez la **nouvelle version**
5. Cliquez sur **Enregistrer**

✅ **C'est tout !** Vous avez maintenant la dernière version.

---

## 🆘 Problèmes Courants

### ❌ "Bibliothèque introuvable"

**Solution :**
- Vérifiez que l'ID de déploiement est correct (copie exacte, sans espaces)
- Vérifiez que vous avez bien accès au projet de la bibliothèque (contactez l'administrateur)

### ❌ "Fonction non définie"

**Solution :**
- Vérifiez que la bibliothèque est bien ajoutée dans **Ressources > Bibliothèques**
- Vérifiez que vous avez copié les fonctions wrapper dans votre projet Apps Script
- Rechargez votre Google Sheet (F5)

### ❌ "Erreur d'autorisation"

**Solution :**
- Lors de la première utilisation, Google vous demandera des autorisations
- Cliquez sur **Autoriser** et acceptez les permissions
- Si le problème persiste, contactez l'administrateur

### ❌ "Fonction ne s'exécute pas"

**Solution :**
- Vérifiez que vous utilisez le bon format : `=VALIDATE_VAT(A2)` (avec le `=`)
- Vérifiez que le numéro de TVA est bien formaté (ex: "FR18417798402")
- Attendez quelques secondes (la validation prend 1-2 secondes)

---

## 📞 Support

- 📧 Email : [contact-admin]
- 💬 Slack/Teams : [channel-support]
- 📖 Documentation complète : `GUIDE_SETUP_TEAM.md`

---

## ✅ Checklist d'Installation

- [ ] ID de déploiement reçu
- [ ] Bibliothèque ajoutée dans Ressources > Bibliothèques
- [ ] Fonctions wrapper copiées-collées
- [ ] Projet Apps Script enregistré
- [ ] Test réussi avec une formule : `=VALIDATE_VAT("FR18417798402")`
- [ ] Menu "🔧 Outils Équipe" visible dans Google Sheets

---

**🎉 Vous êtes prêt à utiliser la bibliothèque partagée !**

