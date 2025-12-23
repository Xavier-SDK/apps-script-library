# 📚 Bibliothèque Google Apps Script Partagée

Bibliothèque modulaire de fonctions Google Apps Script destinée à être partagée avec votre équipe de chefs de projet. Une fois configurée, l'équipe peut utiliser toutes les fonctions dans **tous leurs Google Sheets** après une seule installation.

---

## 🎯 Objectif

Permettre à une équipe de chefs de projet d'utiliser des fonctions Google Apps Script réutilisables (validation TVA VIES, connecteurs Odoo, outils personnalisés, etc.) dans tous leurs Google Sheets avec une configuration minimale.

---

## 📦 Bibliothèques Disponibles

### ✅ VAT Check - Validation TVA VIES

Bibliothèque pour valider les numéros de TVA de l'Union Européenne via le service VIES.

- 📁 **Fichiers** : `bibliotheques/vat-check/`
- 📖 **Documentation** : `bibliotheques/vat-check/README.md`
- 🔧 **Fonctions** : Validation TVA, récupération nom d'entreprise, validation en batch

### 🚧 Odoo Connector (À venir)

Connecteur pour interagir avec Odoo ERP.

- 📁 **Fichiers** : `bibliotheques/odoo/` (à créer)

---

## 🚀 Démarrage Rapide

### Pour les Administrateurs

1. **Créez votre projet Apps Script partagé** : Suivez [GUIDE_SETUP_TEAM.md](./GUIDE_SETUP_TEAM.md)
2. **Organisez vos bibliothèques** : Voir [GUIDE_ORGANISATION_PROJET.md](./GUIDE_ORGANISATION_PROJET.md)
3. **Ajoutez de nouvelles bibliothèques** : Voir [GUIDE_AJOUTER_BIBLIOTHEQUE.md](./GUIDE_AJOUTER_BIBLIOTHEQUE.md)

### Pour les Utilisateurs (Chefs de Projet)

1. **Recevez l'ID de déploiement** de votre administrateur
2. **Installez la bibliothèque** : Suivez [GUIDE_RAPIDE_EQUIPE.md](./GUIDE_RAPIDE_EQUIPE.md)
3. **Utilisez les fonctions** directement dans vos Google Sheets !

---

## 📖 Documentation

### 📚 Index Complet

Consultez **[INDEX_DOCUMENTATION.md](./INDEX_DOCUMENTATION.md)** pour une vue d'ensemble complète de toute la documentation.

### 👨‍💼 Pour les Administrateurs

- **[GUIDE_SETUP_TEAM.md](./GUIDE_SETUP_TEAM.md)** ⭐ **COMMENCEZ ICI**
  - Guide complet de mise en place
  - Comment créer et déployer la bibliothèque
  - Comment la partager avec l'équipe

- **[GUIDE_ORGANISATION_PROJET.md](./GUIDE_ORGANISATION_PROJET.md)** 📁
  - Comment organiser plusieurs bibliothèques dans un seul projet Apps Script
  - Structure avec plusieurs fichiers `.gs`
  - Bonnes pratiques

- **[GUIDE_AJOUTER_BIBLIOTHEQUE.md](./GUIDE_AJOUTER_BIBLIOTHEQUE.md)** 📦
  - Comment créer une nouvelle bibliothèque (ex: connecteur Odoo)
  - Structure modulaire
  - Templates et exemples

- **[GUIDE_PARTAGE.md](./GUIDE_PARTAGE.md)**
  - Guide détaillé sur le partage de bibliothèques Apps Script
  - Gestion des versions
  - Sécurité et bonnes pratiques

### 👥 Pour les Utilisateurs

- **[GUIDE_RAPIDE_EQUIPE.md](./GUIDE_RAPIDE_EQUIPE.md)** ⭐ **COMMENCEZ ICI**
  - Installation express en 5 minutes
  - Utilisation au quotidien
  - Résolution des problèmes courants

---

## 📂 Structure du Repository

```
apps-script-library/
├── 📄 INDEX_DOCUMENTATION.md          Index complet de la documentation
├── 📄 README.md                        Ce fichier
│
├── 👨‍💼 Documentation Administrateurs
│   ├── 📄 GUIDE_SETUP_TEAM.md         Guide de mise en place complet
│   ├── 📄 GUIDE_ORGANISATION_PROJET.md Comment organiser le projet Apps Script
│   ├── 📄 GUIDE_AJOUTER_BIBLIOTHEQUE.md Comment créer de nouvelles bibliothèques
│   └── 📄 GUIDE_PARTAGE.md            Guide de partage détaillé
│
├── 👥 Documentation Utilisateurs
│   └── 📄 GUIDE_RAPIDE_EQUIPE.md      Guide d'installation et d'utilisation
│
└── 📦 bibliotheques/                   Bibliothèques modulaires
    ├── vat-check/                      Bibliothèque VIES VAT
    │   ├── VIES_VAT_Library.gs        Code source
    │   ├── wrapper_functions.gs        Fonctions pour Google Sheets
    │   ├── example_usage.gs            Exemples d'utilisation
    │   └── README.md                   Documentation spécifique
    │
    ├── odoo/                           Connecteur Odoo (à venir)
    │
    └── templates/                      Templates pour nouvelles bibliothèques
        ├── TEMPLATE_BIBLIOTHEQUE.gs
        └── TEMPLATE_WRAPPER.gs
```

---

## 🔧 Installation et Configuration

### Prérequis

- Compte Google (pour accéder à Google Apps Script)
- Accès à [script.google.com](https://script.google.com)

### Installation Clasp (Optionnel, pour développement)

Si vous voulez utiliser `clasp` pour synchroniser votre code local avec Apps Script :

```bash
# Installer clasp
npm install -g @google/clasp

# Se connecter
clasp login

# Créer un projet Apps Script
clasp create --type standalone --title "Bibliothèque d'Outils Équipe"

# Pousser les fichiers
clasp push
```

⚠️ **Note** : `.clasp.json` est dans `.gitignore` pour des raisons de sécurité.

---

## 💡 Fonctionnalités

### ✅ Fonctionnalités Actuelles

- **Validation TVA VIES** : Validation de numéros de TVA européens
  - Fonction simple : `VALIDATE_VAT("FR18417798402")`
  - Récupération nom d'entreprise : `VAT_COMPANY("FR18417798402")`
  - Validation en batch pour plusieurs numéros

### 🚧 À Venir

- Connecteur Odoo (recherche, création, mise à jour)
- Utilitaires Google Sheets personnalisés
- Autres outils selon les besoins de l'équipe

---

## 🔄 Workflow de Contribution

### Ajouter une Nouvelle Bibliothèque

1. Créez un nouveau dossier dans `bibliotheques/`
2. Utilisez les templates dans `bibliotheques/templates/`
3. Suivez [GUIDE_AJOUTER_BIBLIOTHEQUE.md](./GUIDE_AJOUTER_BIBLIOTHEQUE.md)
4. Testez votre bibliothèque
5. Mettez à jour la documentation
6. Proposez une Pull Request (si vous contribuez au repository public)

### Mettre à Jour une Bibliothèque Existante

1. Modifiez les fichiers dans `bibliotheques/nom-bibliotheque/`
2. Testez les modifications
3. Incrémentez la version dans le code
4. Mettez à jour la documentation
5. Déployez une nouvelle version dans Apps Script

---

## 📝 Licence

[Indiquez votre licence ici - MIT, Apache 2.0, Propriétaire, etc.]

---

## 🤝 Contribution

Les contributions sont les bienvenues ! Pour contribuer :

1. Fork le repository
2. Créez une branche pour votre fonctionnalité (`git checkout -b feature/ma-bibliotheque`)
3. Committez vos changements (`git commit -am 'Ajout de ma bibliothèque'`)
4. Push vers la branche (`git push origin feature/ma-bibliotheque`)
5. Ouvrez une Pull Request

---

## 📞 Support

Pour toute question ou problème :

- 📧 Email : [votre-email]
- 💬 Issues GitHub : [créez une issue]
- 📖 Documentation : Consultez [INDEX_DOCUMENTATION.md](./INDEX_DOCUMENTATION.md)

---

## 🎓 Ressources

- [Documentation Google Apps Script](https://developers.google.com/apps-script)
- [Guide des Bibliothèques Apps Script](https://developers.google.com/apps-script/guides/libraries)
- [Clasp Documentation](https://github.com/google/clasp)

---

**🎉 Bonne utilisation de la bibliothèque partagée !**
