# 📚 Index de la Documentation - Bibliothèque Apps Script Partagée

## 🎯 Vue d'ensemble

Ce repository contient une bibliothèque Google Apps Script partagée que votre équipe de chefs de projet peut utiliser dans **tous leurs Google Sheets** après une configuration unique.

---

## 📖 Documentation par Rôle

### 👨‍💼 Pour les Administrateurs / Responsables IT

**Vous créez et maintenez la bibliothèque partagée :**

1. **[GUIDE_SETUP_TEAM.md](./GUIDE_SETUP_TEAM.md)** ⭐ **COMMENCEZ ICI**
   - Guide complet de mise en place
   - Comment créer et déployer la bibliothèque
   - Comment la partager avec l'équipe
   - Gestion des versions et mises à jour

2. **[GUIDE_ORGANISATION_PROJET.md](./GUIDE_ORGANISATION_PROJET.md)** 📁 **ORGANISATION AVEC PLUSIEURS FICHIERS**
   - Comment organiser plusieurs bibliothèques dans un seul projet Apps Script
   - Structure avec plusieurs fichiers `.gs`
   - Bonnes pratiques de nommage et organisation
   - **⭐ Méthode recommandée !**

3. **[GUIDE_AJOUTER_BIBLIOTHEQUE.md](./GUIDE_AJOUTER_BIBLIOTHEQUE.md)** 📦 **POUR AJOUTER DES BIBLIOTHÈQUES**
   - Comment créer une nouvelle bibliothèque (ex: connecteur Odoo)
   - Structure modulaire (un dossier par bibliothèque)
   - Templates et exemples
   - Intégration dans le projet partagé

3. **[GUIDE_PARTAGE.md](./GUIDE_PARTAGE.md)**
   - Guide détaillé sur le partage de bibliothèques Apps Script
   - Processus de gestion des versions
   - Sécurité et bonnes pratiques

4. **[README.md](./README.md)**
   - Documentation technique complète
   - Liste de toutes les fonctions disponibles
   - Exemples d'utilisation avancés

---

### 👥 Pour les Chefs de Projet / Utilisateurs

**Vous utilisez la bibliothèque dans vos Google Sheets :**

1. **[GUIDE_RAPIDE_EQUIPE.md](./GUIDE_RAPIDE_EQUIPE.md)** ⭐ **COMMENCEZ ICI**
   - Installation express en 5 minutes
   - Comment ajouter la bibliothèque à un Google Sheet
   - Utilisation des fonctions au quotidien
   - Résolution des problèmes courants

2. **Fonctions wrapper dans chaque bibliothèque**
   - Chaque bibliothèque a son propre `wrapper_functions.gs` dans son dossier
   - Exemple : `bibliotheques/vat-check/wrapper_functions.gs`
   - Fonctions prêtes à l'emploi pour Google Sheets
   - Pour créer de nouveaux wrappers, utilisez : `bibliotheques/templates/TEMPLATE_WRAPPER.gs`

3. **Exemples d'utilisation**
   - Chaque bibliothèque peut avoir un fichier `example_usage.gs`
   - Exemple : `bibliotheques/vat-check/example_usage.gs`
   - Exemples de code pour utilisation avancée

---

## 📂 Structure des Fichiers

```
apps-script-library/
├── 📄 INDEX_DOCUMENTATION.md          ← Vous êtes ici
├── 📄 README.md                        README principal du projet
│
├── 👨‍💼 Pour Administrateurs
│   ├── 📄 GUIDE_SETUP_TEAM.md         Guide de mise en place complet
│   ├── 📄 GUIDE_PARTAGE.md            Guide détaillé de partage
│   └── 📄 GUIDE_AJOUTER_BIBLIOTHEQUE.md  Comment ajouter une nouvelle bibliothèque
│
├── 👥 Pour Utilisateurs
│   └── 📄 GUIDE_RAPIDE_EQUIPE.md      Installation et utilisation rapide
│
└── 📦 bibliotheques/                   Bibliothèques modulaires
    ├── vat-check/                      Bibliothèque VIES VAT
    │   ├── VIES_VAT_Library.gs        Code source
    │   ├── wrapper_functions.gs        Fonctions pour Google Sheets
    │   ├── example_usage.gs            Exemples d'utilisation
    │   └── README.md                   Documentation
    │
    ├── odoo/                           Connecteur Odoo (à venir)
    │   ├── Odoo_Library.gs
    │   ├── wrapper_functions.gs
    │   └── README.md
    │
    └── templates/                      Templates pour nouvelles bibliothèques
        ├── TEMPLATE_BIBLIOTHEQUE.gs
        └── TEMPLATE_WRAPPER.gs
```

---

## 🚀 Démarrage Rapide

### Si vous êtes Administrateur

1. Lisez **[GUIDE_SETUP_TEAM.md](./GUIDE_SETUP_TEAM.md)**
2. Créez et déployez la bibliothèque
3. Partagez l'ID de déploiement avec votre équipe
4. Envoyez le lien vers **[GUIDE_RAPIDE_EQUIPE.md](./GUIDE_RAPIDE_EQUIPE.md)**

### Si vous êtes Utilisateur

1. Recevez l'ID de déploiement de votre administrateur
2. Suivez **[GUIDE_RAPIDE_EQUIPE.md](./GUIDE_RAPIDE_EQUIPE.md)**
3. Copiez les fonctions depuis **[FONCTIONS_WRAPPER_TEMPLATE.gs](./FONCTIONS_WRAPPER_TEMPLATE.gs)**
4. Utilisez les fonctions dans vos Google Sheets !

---

## 🎯 Fonctionnalités Disponibles

### Validation TVA VIES (Actuellement Disponible)

- ✅ Validation de numéros de TVA européens
- ✅ Récupération du nom d'entreprise
- ✅ Récupération de l'adresse
- ✅ Validation en batch (plusieurs numéros)
- ✅ Liste des pays supportés

**Fonctions Google Sheets :**
- `=VALIDATE_VAT("FR18417798402")` → VRAI/FAUX
- `=VAT_COMPANY("FR18417798402")` → Nom de l'entreprise
- `=VAT_ADDRESS("FR18417798402")` → Adresse
- `=VAT_INFO("FR18417798402")` → Toutes les infos
- `=VAT_STATUS("FR18417798402")` → VALIDE/INVALIDE

---

## 📋 Checklist de Mise en Place

### Pour l'Administrateur

- [ ] Bibliothèque créée et testée
- [ ] Bibliothèque déployée (ID de déploiement obtenu)
- [ ] Projet partagé avec l'équipe
- [ ] Documentation partagée
- [ ] ID de déploiement communiqué à l'équipe
- [ ] Email d'information envoyé

### Pour les Utilisateurs

- [ ] ID de déploiement reçu
- [ ] Bibliothèque ajoutée à un projet Apps Script
- [ ] Fonctions wrapper copiées-collées
- [ ] Test réussi avec une formule
- [ ] Documentation consultée

---

## 🔄 Workflow de Mise à Jour

### Quand une Nouvelle Version est Disponible

1. **Administrateur** : Déploie une nouvelle version (incrémente le numéro)
2. **Administrateur** : Informe l'équipe
3. **Utilisateurs** : Mettent à jour la version dans Ressources > Bibliothèques

✅ Simple et rapide !

---

## 🆘 Support et Aide

### Problèmes Courants

Consultez la section **"Support et Dépannage"** dans :
- **[GUIDE_SETUP_TEAM.md](./GUIDE_SETUP_TEAM.md)** (pour administrateurs)
- **[GUIDE_RAPIDE_EQUIPE.md](./GUIDE_RAPIDE_EQUIPE.md)** (pour utilisateurs)

### Contact

- 📧 Email : [contact-admin]
- 💬 Slack/Teams : [channel-support]

---

## 📝 Notes Importantes

### ⚠️ Configuration Unique par Google Sheet

Chaque Google Sheet nécessite :
1. La bibliothèque ajoutée (une fois)
2. Les fonctions wrapper copiées (une fois)

💡 **Astuce** : Créez un Google Sheet modèle avec tout configuré, puis dupliquez-le.

### 🔒 Sécurité

- La bibliothèque ne stocke aucune donnée
- Toutes les requêtes sont faites directement vers les APIs officielles
- Les utilisateurs n'ont pas accès au code source (sauf si vous le partagez)

### 📊 Quotas Google Apps Script

- Maximum 20 000 requêtes URL par jour
- Maximum 6 minutes d'exécution par fonction
- Rate limiting de l'API VIES : ~1-2 secondes par validation

---

## 🎓 Ressources Supplémentaires

- 📖 [Documentation Google Apps Script](https://developers.google.com/apps-script)
- 📖 [Guide des Bibliothèques Apps Script](https://developers.google.com/apps-script/guides/libraries)
- 📖 [API VIES](https://ec.europa.eu/taxation_customs/vies/)

---

**🎉 Bonne utilisation de la bibliothèque partagée !**

