# 📚 Guide de Mise en Place - Bibliothèque Apps Script Partagée pour l'Équipe

## 🎯 Objectif

Créer un repository partagé de bibliothèques Google Apps Script que votre équipe de chefs de projet peut utiliser dans **tous leurs Google Sheets** après une seule configuration initiale.

---

## 📋 Vue d'ensemble du Processus

### Pour vous (Administrateur du Repository)

1. ✅ Créer un projet Apps Script pour chaque bibliothèque
2. ✅ Déployer chaque bibliothèque (obtenir l'ID de déploiement)
3. ✅ Partager les projets avec votre équipe
4. ✅ Communiquer les IDs de déploiement

### Pour votre équipe (Chefs de projet)

1. ✅ Ajouter les bibliothèques **une seule fois** dans un projet Apps Script partagé
2. ✅ Utiliser les fonctions dans **tous leurs Google Sheets** sans reconfiguration

---

## 🚀 Étape 1 : Créer le Projet de Bibliothèque

### 📦 Structure Modulaire

Ce repository est organisé avec **une bibliothèque par dossier** sous `bibliotheques/` :

```
bibliotheques/
├── vat-check/           # Bibliothèque VIES VAT
│   ├── VIES_VAT_Library.gs
│   ├── wrapper_functions.gs
│   └── README.md
├── odoo/                # Connecteur Odoo (à venir)
│   ├── Odoo_Library.gs
│   ├── wrapper_functions.gs
│   └── README.md
└── templates/           # Templates pour créer de nouvelles bibliothèques
```

### Option A : Bibliothèque Centralisée (Recommandé pour commencer)

Cette approche permet à votre équipe d'ajouter **une seule bibliothèque** qui contient toutes les fonctions.

#### 1.1 Créer le Projet Central

1. Allez sur [script.google.com](https://script.google.com)
2. Cliquez sur **Nouveau projet**
3. Nommez-le : **"Bibliothèque d'Outils Équipe"** (ou nom de votre choix)
4. Supprimez le code par défaut

#### 1.2 Ajouter le Code des Bibliothèques (Plusieurs Fichiers)

**💡 Bonne pratique : Créez un fichier `.gs` par ensemble de fonctions liées (bibliothèque) !**

Dans Google Apps Script, vous pouvez avoir **plusieurs fichiers `.gs`** dans le même projet. 

**Règle importante : 1 fichier = 1 bibliothèque complète (toutes ses fonctions ensemble)**

**Pour chaque bibliothèque :**

1. **Cliquez sur l'icône ➕** à gauche dans l'éditeur (Nouveau fichier)
2. **Nommez le fichier** (ex: `01_VIES_VAT_Library.gs`)
3. **Copiez le contenu complet** du fichier depuis le repository :
   - Ouvrez `bibliotheques/vat-check/VIES_VAT_Library.gs`
   - **Copiez TOUT le contenu** (toutes les fonctions de cette bibliothèque)
   - Collez dans votre nouveau fichier Apps Script
4. **Enregistrez** (💾)

**Répétez pour chaque bibliothèque :**

```
01_VIES_VAT_Library.gs  ← Toutes les fonctions VAT (validateVAT, validateVATCompany, etc.)
02_Odoo_Library.gs      ← Toutes les fonctions Odoo (connect, searchRead, create, etc.)
03_Autres_Outils.gs     ← Votre ensemble de fonctions personnalisées
```

**💡 Astuce de nommage :** Utilisez des préfixes numériques (`01_`, `02_`, etc.) pour contrôler l'ordre d'affichage dans l'éditeur.

**📌 Important :** 
- ✅ Un fichier contient **toutes les fonctions d'une bibliothèque** (ex: toutes les fonctions VAT)
- ❌ Ne créez **PAS** un fichier par fonction individuelle

**📖 Voir [GUIDE_ORGANISATION_PROJET.md](./docs/GUIDE_ORGANISATION_PROJET.md) pour plus de détails sur l'organisation avec plusieurs fichiers.**

#### 1.3 Déployer la Bibliothèque

1. Cliquez sur **Déployer** > **Nouveau déploiement**
2. Cliquez sur l'icône ⚙️ (Paramètres) à côté de "Sélectionner un type"
3. Choisissez **Bibliothèque**
4. Cliquez sur **Suivant**
5. Configurez :
   - **Description** : "Bibliothèque partagée pour l'équipe - Outils et fonctions communes"
   - **Version** : "1" (ou laissez par défaut)
6. Cliquez sur **Déployer**
7. **📋 Copiez l'ID de déploiement** (ex: `1AbC2dEf3GhI4jKl5MnOp6QrSt7UvWxYz`)

---

### Option B : Bibliothèques Séparées (Alternative pour bibliothèques volumineuses)

Si vous préférez maintenir des bibliothèques séparées pour chaque outil :

1. Pour chaque bibliothèque dans `bibliotheques/`, créez un projet Apps Script séparé
2. Copiez uniquement le fichier `.gs` de cette bibliothèque dans le projet
3. Déployez comme bibliothèque et obtenez un ID de déploiement
4. Partagez plusieurs IDs à votre équipe (un par bibliothèque)

**Avantages :**
- Isolation complète entre bibliothèques
- Mises à jour indépendantes
- Les utilisateurs peuvent choisir quelles bibliothèques installer

**Inconvénients :**
- Plusieurs IDs à gérer
- Plusieurs bibliothèques à ajouter dans chaque projet Google Sheet

**💡 Pour ajouter de nouvelles bibliothèques :** Voir `GUIDE_AJOUTER_BIBLIOTHEQUE.md`

---

## 🔗 Étape 2 : Partager avec Votre Équipe

### 2.1 Partager le Projet Apps Script

1. Dans votre projet de bibliothèque, cliquez sur **Partager** (en haut à droite)
2. Ajoutez les adresses email de tous les chefs de projet
3. Donnez-leur le rôle **Lecteur** (ils n'ont pas besoin de modifier le code)
4. Cochez **"Notifier les personnes"** si vous voulez leur envoyer un email
5. Cliquez sur **Envoyer**

### 2.2 Créer un Document de Référence

Créez un **Google Doc** ou **Google Sheet** avec :

- ✅ L'ID de déploiement de la bibliothèque
- ✅ Les instructions d'installation (voir ci-dessous)
- ✅ La liste des fonctions disponibles
- ✅ Des exemples d'utilisation
- ✅ Un lien vers ce repository

Partagez ce document avec votre équipe.

---

## 📧 Étape 3 : Communiquer avec l'Équipe

### Email Type

```
Objet : 🚀 Bibliothèque Apps Script Partagée - Installation Unique

Bonjour l'équipe,

J'ai mis en place une bibliothèque Google Apps Script partagée que vous pouvez 
utiliser dans TOUS vos Google Sheets après une seule configuration.

🔄 Processus (5 minutes) :

1. Créer un projet Apps Script "partagé" pour l'équipe
2. Ajouter la bibliothèque (ID ci-dessous)
3. Utiliser les fonctions dans tous vos documents

📋 ID de la Bibliothèque :
[VOTRE_ID_DE_DEPLOIEMENT]

📖 Instructions complètes :
[Lien vers ce guide ou votre document de référence]

Une fois configuré, vous pourrez utiliser les fonctions dans n'importe quel 
Google Sheet sans reconfiguration !

Bonne utilisation,
[Votre nom]
```

---

## 👥 Étape 4 : Configuration par les Chefs de Projet

### 4.1 Créer un Projet Apps Script Partagé (Méthode Recommandée)

Cette méthode permet d'ajouter la bibliothèque **une seule fois** et de l'utiliser partout.

#### Option A : Projet Standalone (Recommandé pour l'équipe)

1. Allez sur [script.google.com](https://script.google.com)
2. Cliquez sur **Nouveau projet**
3. Nommez-le : **"Mes Outils Équipe"** (ou nom personnel)
4. **Ne créez pas de fichier Google Sheets associé** (c'est important)

#### Option B : Projet lié à un Google Sheet (Alternative)

1. Créez un nouveau Google Sheet : **"Modèle - Outils Équipe"**
2. Cliquez sur **Extensions** > **Apps Script**
3. Le projet Apps Script sera automatiquement créé et lié à ce Sheet

### 4.2 Ajouter la Bibliothèque

1. Dans le projet Apps Script, cliquez sur **Ressources** > **Bibliothèques**
2. Dans le champ **"ID de script"**, collez l'ID de déploiement :
   ```
   [VOTRE_ID_DE_DEPLOIEMENT]
   ```
3. Cliquez sur **Rechercher**
4. Sélectionnez la **dernière version** (recommandé)
5. Cliquez sur **Ajouter**

✅ **C'est fait !** La bibliothèque est maintenant disponible.

### 4.3 Créer des Fonctions Wrapper (Recommandé)

Pour faciliter l'utilisation dans Google Sheets, créez des fonctions wrapper :

**Option A : Utiliser les wrappers du repository**

Copiez les fichiers `wrapper_functions.gs` de chaque bibliothèque depuis `bibliotheques/nom-bibliotheque/wrapper_functions.gs` et combinez-les dans votre projet Apps Script.

**Exemple :**

```javascript
// Wrappers pour VAT (depuis bibliotheques/vat-check/wrapper_functions.gs)
function VALIDATE_VAT(vatNumber) {
  return VIES_VAT_Library.validateVAT(vatNumber);
}

function VAT_COMPANY(vatNumber) {
  return VIES_VAT_Library.validateVATCompany(vatNumber);
}

// Wrappers pour Odoo (depuis bibliotheques/odoo/wrapper_functions.gs)
function ODOO_CONNECT(url, database, username, password) {
  return Odoo_Library.connect(url, database, username, password);
}
```

**Option B : Créer vos propres wrappers**

Utilisez le template `bibliotheques/templates/TEMPLATE_WRAPPER.gs` comme base.

⚠️ **Important** : Les fonctions wrapper doivent être dans **chaque projet Apps Script** qui utilise la bibliothèque, mais elles peuvent être copiées-collées facilement depuis les fichiers du repository.

---

## 📊 Étape 5 : Utiliser dans Google Sheets

### 5.1 Dans un Nouveau Google Sheet

1. Ouvrez n'importe quel Google Sheet (nouveau ou existant)
2. Cliquez sur **Extensions** > **Apps Script**
3. Si c'est la première fois, un nouveau projet Apps Script sera créé
4. **Ajoutez la bibliothèque** (voir Étape 4.2)
5. **Ajoutez les fonctions wrapper** (voir Étape 4.3)
6. Enregistrez (💾)

### 5.2 Utiliser les Fonctions

Maintenant, dans votre Google Sheet, vous pouvez utiliser :

```
=VALIDATE_VAT("FR18417798402")
=VAT_COMPANY("FR18417798402")
=VAT_INFO("FR18417798402")
```

### 5.3 Bonne Pratique : Créer un Modèle

Créez un **Google Sheet modèle** avec :
- Les fonctions déjà configurées
- Des exemples d'utilisation
- Des instructions

Votre équipe peut ensuite **copier ce modèle** pour créer de nouveaux documents.

---

## 🔄 Workflow Recommandé pour l'Équipe

### Première Configuration (Une Seule Fois)

1. ✅ Recevoir l'ID de déploiement
2. ✅ Créer un projet Apps Script personnel "Mes Outils Équipe"
3. ✅ Ajouter la bibliothèque
4. ✅ Copier les fonctions wrapper (depuis votre document de référence)

### Utilisation au Quotidien

1. ✅ Créer ou ouvrir un Google Sheet
2. ✅ Si c'est la première fois avec ce Sheet :
   - Extensions > Apps Script
   - Ajouter la bibliothèque (même ID)
   - Copier les fonctions wrapper
   - Enregistrer
3. ✅ Utiliser les fonctions directement dans le Sheet

### Alternative : Projet Central Partagé

Créez **un seul projet Apps Script** avec la bibliothèque, puis liez-le à tous vos Sheets :

1. Créez un Google Sheet : "Modèle Équipe"
2. Extensions > Apps Script > Configurez la bibliothèque
3. Dupliquez ce Sheet pour chaque nouveau document

---

## 🔄 Mise à Jour de la Bibliothèque

### Pour vous (Administrateur)

1. Modifiez le code dans le projet de la bibliothèque
2. Cliquez sur **Déployer** > **Gérer les déploiements**
3. Cliquez sur ✏️ (Modifier) du déploiement
4. **Incrémentez le numéro de version** (ex: "1" → "2")
5. Cliquez sur **Déployer**
6. Informez votre équipe de la nouvelle version

### Pour l'Équipe

1. Ouvrez leur projet Apps Script (celui avec la bibliothèque)
2. Cliquez sur **Ressources** > **Bibliothèques**
3. Cliquez sur ✏️ (Modifier) de la bibliothèque
4. Sélectionnez la **nouvelle version**
5. Cliquez sur **Enregistrer**

✅ **C'est tout !** Les nouvelles versions sont disponibles dans tous leurs Sheets.

---

## 📋 Checklist de Mise en Place

### Pour l'Administrateur

- [ ] Bibliothèque créée et testée
- [ ] Bibliothèque déployée comme bibliothèque Apps Script
- [ ] ID de déploiement copié
- [ ] Projet partagé avec l'équipe (rôle Lecteur)
- [ ] Document de référence créé et partagé
- [ ] Email de communication envoyé
- [ ] Fonctions wrapper documentées
- [ ] Exemples d'utilisation fournis
- [ ] Google Sheet modèle créé (optionnel mais recommandé)

### Pour les Chefs de Projet

- [ ] ID de déploiement reçu
- [ ] Projet Apps Script personnel créé
- [ ] Bibliothèque ajoutée au projet
- [ ] Fonctions wrapper copiées
- [ ] Test réussi avec un Google Sheet
- [ ] Document de référence consulté

---

## 🔒 Sécurité et Bonnes Pratiques

### Sécurité

- ✅ Partagez uniquement l'ID de déploiement, pas le code source
- ✅ Donnez le rôle **Lecteur** aux utilisateurs (pas Éditeur)
- ✅ Gardez le contrôle sur les mises à jour
- ✅ Documentez les changements entre versions

### Bonnes Pratiques

- ✅ Créez un document de référence centralisé
- ✅ Utilisez des noms de fonctions clairs (ex: `VALIDATE_VAT` plutôt que `val`)
- ✅ Documentez chaque fonction avec `@customfunction`
- ✅ Fournissez des exemples d'utilisation
- ✅ Créez un Google Sheet modèle pour faciliter l'adoption

---

## 🆘 Support et Dépannage

### Problèmes Courants

#### "Bibliothèque introuvable"
- ✅ Vérifiez que l'ID de déploiement est correct
- ✅ Vérifiez que le projet de la bibliothèque est partagé avec l'utilisateur

#### "Erreur d'autorisation"
- ✅ L'utilisateur doit autoriser l'accès lors de la première utilisation
- ✅ Vérifiez que l'utilisateur a accès au projet de la bibliothèque

#### "Fonction non définie"
- ✅ Vérifiez que la bibliothèque est bien ajoutée dans Ressources > Bibliothèques
- ✅ Vérifiez que vous utilisez le bon namespace : `VIES_VAT_Library.functionName()`
- ✅ Pour les fonctions wrapper, vérifiez qu'elles sont bien dans le projet Apps Script

#### "Fonctions wrapper ne fonctionnent pas dans Sheets"
- ✅ Vérifiez que les fonctions ont l'annotation `@customfunction`
- ✅ Vérifiez que le projet Apps Script est bien lié au Google Sheet
- ✅ Rechargez le Google Sheet (F5)

---

## 📚 Ressources Complémentaires

- 📖 [Guide de Partage Détaillé](./GUIDE_PARTAGE.md)
- 📖 [README Principal](../README.md)
- 💻 [Exemples d'Utilisation](../bibliotheques/vat-check/example_usage.gs)

---

## 🎓 Formation de l'Équipe

Pour faciliter l'adoption :

1. **Session de formation** (15-30 minutes)
   - Présentation du concept
   - Démonstration live de l'installation
   - Exemples d'utilisation

2. **Support continu**
   - Document de référence partagé
   - Channel Slack/Teams dédié (optionnel)
   - Sessions Q&A périodiques

3. **Ressources**
   - Google Sheet modèle prêt à l'emploi
   - Vidéo tutorielle (optionnel)
   - FAQ régulièrement mise à jour

---

## 📞 Contact

Pour toute question ou problème :
- 📧 Email : [votre-email]
- 💬 Slack/Teams : [channel-dédié]
- 📖 Documentation : [lien-vers-ce-repo]

---

**🎉 Bonne utilisation de la bibliothèque partagée !**

