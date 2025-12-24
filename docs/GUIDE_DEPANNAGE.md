# 🆘 Guide de Dépannage

## 📋 Problèmes Courants et Solutions

### ❌ Erreur : "Impossible de trouver la bibliothèque"

**Symptôme :** Lors de l'ajout de la bibliothèque, vous recevez :
```
Impossible de trouver la bibliothèque. Vérifiez l'ID et les autorisations d'accès, puis réessayez.
```

**Solutions :**

1. **Vérifier l'ID utilisé**
   - Utilisez le **Script ID** (pas le Deployment ID) : `1E9s8sErZAolahBT7pHR7EsmekAp5b_ZkAIKQ3cCzp13Zk6MKh2wSYQlL`
   - Le Script ID se trouve dans : Paramètres du projet > Section "ID" > "ID de script"

2. **Vérifier le partage du projet**
   - Le projet Apps Script de la bibliothèque doit être partagé avec votre compte
   - Allez sur Google Drive, cherchez le projet "Bibliothèque de scripts pour CDP"
   - Clic droit > Partager > Vérifiez que votre email est dans la liste avec au moins le rôle "Lecteur"

3. **Vérifier le déploiement**
   - Dans le projet de la bibliothèque, allez dans Déployer > Gérer les déploiements
   - Vérifiez qu'il existe un déploiement de type "Bibliothèque"

---

### ❌ Erreur : "VIES_VAT_Library is not defined"

**Symptôme :** Dans votre Google Sheet, vous recevez :
```
ReferenceError: VIES_VAT_Library is not defined (ligne 20)
```

**Solutions :**

1. **Vérifier que la bibliothèque est ajoutée**
   - Dans votre projet Apps Script (Extensions > Apps Script)
   - Allez dans Éditeur > Bibliothèques
   - Vérifiez que la bibliothèque est listée avec l'identifiant `VIES_VAT_Library`

2. **Utiliser le Script ID (pas le Deployment ID)**
   - Script ID : `1E9s8sErZAolahBT7pHR7EsmekAp5b_ZkAIKQ3cCzp13Zk6MKh2wSYQlL`
   - Définir l'identifiant comme : `VIES_VAT_Library` (exactement, avec underscores)

3. **Vérifier le partage**
   - Le projet de la bibliothèque doit être partagé avec votre compte

---

### ❌ Fonction ESTTVA() non reconnue dans Google Sheets

**Symptôme :** La fonction `=ESTTVA()` n'est pas reconnue dans les cellules.

**Solution :**

Les fonctions wrapper doivent être **copiées dans le projet Apps Script de votre Google Sheet** :

1. Ouvrez votre Google Sheet
2. Extensions > Apps Script
3. Créez un nouveau fichier `wrapper_functions.gs`
4. Copiez le contenu de `wrappers/TVA_wrapper_functions.gs` depuis ce repository
5. Collez-le dans le fichier
6. **Important :** Assurez-vous d'avoir ajouté la bibliothèque avec l'identifiant **"TVA"** (voir section "Ajouter la bibliothèque")
7. Enregistrez (💾)
8. Retournez dans votre Google Sheet et testez : `=ESTTVA("FR18417798402")`

**Important :** Chaque Google Sheet a son propre projet Apps Script. Vous devez copier les wrappers dans chaque projet.

---

### ❓ Où trouver le menu "Bibliothèques" dans Apps Script ?

**Solution :**

1. Dans l'éditeur Apps Script, cliquez sur **"Éditeur"** dans la barre latérale gauche
2. Dans la partie supérieure de l'éditeur de code, cherchez **"Bibliothèques"** (ou "Libraries")
3. Cliquez sur le bouton **"+"** pour ajouter une bibliothèque

**Note :** Le menu "Ressources > Bibliothèques" n'existe plus dans l'interface moderne d'Apps Script.

---

### ❓ Comment partager le projet de la bibliothèque ?

**Solution :**

1. Allez sur [drive.google.com](https://drive.google.com)
2. Cherchez le projet "Bibliothèque de scripts pour CDP" (icône Apps Script `</>`)
3. Clic droit sur le fichier > **"Partager"**
4. Ajoutez les adresses email des membres de l'équipe
5. Donnez-leur le rôle **"Lecteur"** (minimum requis)
6. Cliquez sur **"Envoyer"**

---

### ❓ Différence entre Script ID et Deployment ID ?

- **Script ID** : Identifie le projet Apps Script
  - Trouvé dans : Paramètres du projet > Section "ID" > "ID de script"
  - Utilisé pour : Ajouter la bibliothèque dans un autre projet
  - Exemple : `1E9s8sErZAolahBT7pHR7EsmekAp5b_ZkAIKQ3cCzp13Zk6MKh2wSYQlL`

- **Deployment ID** : Identifie un déploiement spécifique
  - Trouvé dans : Déployer > Gérer les déploiements
  - Utilisé pour : Partager la bibliothèque (dans certains cas)
  - Exemple : `AKfycbxTL7gysckYQaDEdT5hfHMdsXiEqCvg9JoBtBDX11FBNAUClH7nC9AXbOSPMniDR0Rrdw`

**Pour ajouter une bibliothèque, utilisez le Script ID.**

---

## 📋 Checklist de Vérification

### Avant d'ajouter une bibliothèque

- [ ] J'ai le **Script ID** (pas le Deployment ID)
- [ ] Le projet de la bibliothèque est **partagé** avec mon compte
- [ ] J'ai au moins le rôle **"Lecteur"** sur le projet
- [ ] Je suis dans le projet Apps Script de mon Google Sheet (pas le projet de la bibliothèque)

### Après avoir ajouté la bibliothèque

- [ ] La bibliothèque apparaît dans Éditeur > Bibliothèques
- [ ] L'identifiant est défini (ex: `TVA`)
- [ ] La version est sélectionnée
- [ ] Les fonctions wrapper sont copiées dans mon projet Google Sheet

### Si ça ne fonctionne toujours pas

- [ ] J'ai actualisé la page Google Sheet (F5)
- [ ] J'ai vérifié les erreurs dans Apps Script > Exécutions
- [ ] J'ai testé la bibliothèque directement : `TVA.getVersion()`
- [ ] J'utilise le bon compte Google partout

---

## 💡 Astuces

### Créer un modèle Google Sheet

Pour éviter de reconfigurer à chaque fois :

1. Créez un Google Sheet "Modèle - Outils Équipe"
2. Configurez la bibliothèque et les wrappers une fois
3. Dupliquez ce Sheet pour chaque nouveau projet

### Tester la bibliothèque

Dans le projet Apps Script de votre Google Sheet, créez une fonction de test :

```javascript
function testLibrary() {
  Logger.log(TVA.getVersion());
  Logger.log(TVA.validateVAT("FR18417798402"));
}
```

Exécutez-la et vérifiez les logs (Journal d'exécution).

---

## 📞 Support

Si le problème persiste :

1. Vérifiez que vous utilisez le même compte Google partout
2. Vérifiez que le projet est bien partagé avec votre compte
3. Contactez l'administrateur de la bibliothèque avec :
   - Le message d'erreur exact
   - L'ID que vous avez utilisé
   - Votre adresse email


