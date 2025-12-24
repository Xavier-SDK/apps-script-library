# 📚 Bibliothèque Google Apps Script Partagée

Bibliothèque modulaire de fonctions Google Apps Script destinée à être partagée avec votre équipe de chefs de projet. Une fois configurée, l'équipe peut utiliser toutes les fonctions dans **tous leurs Google Sheets** après une seule installation.

---

## 🎯 Objectif

Permettre à une équipe de chefs de projet d'utiliser des fonctions Google Apps Script réutilisables (validation TVA VIES, connecteurs Odoo, outils personnalisés, etc.) dans tous leurs Google Sheets avec une configuration minimale.

---

## 📦 Bibliothèques Disponibles

### ✅ VAT Check - Validation TVA VIES

Bibliothèque pour valider les numéros de TVA de l'Union Européenne via le service VIES.

- 📁 **Bibliothèque** : `scripts/TVA.gs`
- 📁 **Wrappers** : `wrappers/TVA_wrapper_functions.gs`
- 🔧 **Fonctions** : Validation TVA, récupération nom d'entreprise, validation en batch

---

## 🚀 Démarrage Rapide

### Pour les Administrateurs

1. **Créez votre projet Apps Script partagé** : Suivez [GUIDE_SETUP_TEAM.md](./docs/GUIDE_SETUP_TEAM.md)
2. **Organisez vos bibliothèques** : Voir [GUIDE_ORGANISATION_PROJET.md](./docs/GUIDE_ORGANISATION_PROJET.md)
3. **Ajoutez de nouvelles bibliothèques** : Voir [GUIDE_AJOUTER_BIBLIOTHEQUE.md](./docs/GUIDE_AJOUTER_BIBLIOTHEQUE.md)
4. **Synchronisez avec clasp** : Voir [CONFIGURATION_CLASP.md](./docs/CONFIGURATION_CLASP.md)

### Pour les Utilisateurs (Chefs de Projet)

1. **Récupérez l'ID de déploiement** : Consultez [DEPLOIEMENT_ID.md](./docs/DEPLOIEMENT_ID.md)
2. **Installez la bibliothèque** : Suivez [GUIDE_RAPIDE_EQUIPE.md](./docs/GUIDE_RAPIDE_EQUIPE.md)
3. **Utilisez les fonctions** directement dans vos Google Sheets !

---

## 📖 Documentation

### 📚 Index Complet

Consultez **[INDEX_DOCUMENTATION.md](./docs/INDEX_DOCUMENTATION.md)** pour une vue d'ensemble complète de toute la documentation.

### 👨‍💼 Pour les Administrateurs

- **[GUIDE_SETUP_TEAM.md](./docs/GUIDE_SETUP_TEAM.md)** ⭐ **COMMENCEZ ICI**
  - Guide complet de mise en place
  - Comment créer et déployer la bibliothèque
  - Comment la partager avec l'équipe

- **[CONFIGURATION_CLASP.md](./docs/CONFIGURATION_CLASP.md)** ⚙️
  - Configuration multi-projets avec clasp
  - Synchronisation de chaque bibliothèque dans son propre projet


- **[GUIDE_AJOUTER_BIBLIOTHEQUE.md](./docs/GUIDE_AJOUTER_BIBLIOTHEQUE.md)** 📦
  - Comment créer une nouvelle bibliothèque (ex: connecteur Odoo)
  - Structure modulaire
  - Templates et exemples

- **[GUIDE_PARTAGE.md](./docs/GUIDE_PARTAGE.md)**
  - Guide détaillé sur le partage de bibliothèques Apps Script
  - Gestion des versions
  - Sécurité et bonnes pratiques

### 👥 Pour les Utilisateurs

- **[GUIDE_RAPIDE_EQUIPE.md](./docs/GUIDE_RAPIDE_EQUIPE.md)** ⭐ **COMMENCEZ ICI**
  - Installation express en 5 minutes
  - Utilisation au quotidien
  - Résolution des problèmes courants

---

## 📂 Structure du Repository

```
apps-script-library/
├── 📄 README.md                        Ce fichier (README principal)
│
├── 📁 docs/                            Documentation complète
│   ├── 📄 INDEX_DOCUMENTATION.md      Index complet de la documentation
│   ├── 👨‍💼 Documentation Administrateurs
│   │   ├── 📄 GUIDE_SETUP_TEAM.md     Guide de mise en place complet
│   │   ├── 📄 CONFIGURATION_CLASP.md  Configuration multi-projets clasp
│   │   ├── 📄 GUIDE_ORGANISATION_PROJET.md Comment organiser le projet Apps Script
│   │   ├── 📄 GUIDE_AJOUTER_BIBLIOTHEQUE.md Comment créer de nouvelles bibliothèques
│   │   ├── 📄 GUIDE_PARTAGE.md        Guide de partage détaillé
│   │   └── 📄 GUIDE_GITHUB.md         Guide pour publier sur GitHub
│   │
│   ├── 👥 Documentation Utilisateurs
│   │   └── 📄 GUIDE_RAPIDE_EQUIPE.md  Guide d'installation et d'utilisation
│   │
│   └── 📄 PUBLIER_GITHUB.md           Instructions rapides pour GitHub
│
├── 📁 scripts/                         Bibliothèques Apps Script
│   └── TVA.gs                          Bibliothèque TVA VIES
│
└── 📁 wrappers/                        Fonctions wrapper pour Google Sheets
    └── TVA_wrapper_functions.gs        Wrappers pour TVA
```

---

## 🔧 Installation et Configuration

### Prérequis

- Compte Google (pour accéder à Google Apps Script)
- Accès à [script.google.com](https://script.google.com)

### Installation Clasp (Pour développement)

Si vous voulez utiliser `clasp` pour synchroniser votre code local avec Apps Script :

```bash
# Installer clasp
npm install -g @google/clasp

# Se connecter
clasp login

# Synchroniser tous les projets
./sync-clasp.sh
```

Voir [CONFIGURATION_CLASP.md](./docs/CONFIGURATION_CLASP.md) pour la configuration multi-projets.

⚠️ **Note** : `.clasp.json` et `.clasp-projects.json` sont dans `.gitignore` pour des raisons de sécurité.

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

1. Créez un nouveau fichier dans `scripts/` (ex: `Odoo_Library.gs`)
2. Créez un nouveau projet Apps Script sur [script.google.com](https://script.google.com)
3. Ajoutez l'entrée dans `.clasp-projects.json` avec le Script ID
4. Créez les wrappers dans `wrappers/` (ex: `Odoo_wrapper_functions.gs`)
5. Suivez [GUIDE_AJOUTER_BIBLIOTHEQUE.md](./docs/GUIDE_AJOUTER_BIBLIOTHEQUE.md)
6. Testez votre bibliothèque
7. Mettez à jour la documentation
8. Synchronisez avec `./sync-clasp.sh`

### Mettre à Jour une Bibliothèque Existante

1. Modifiez les fichiers dans `scripts/nom-bibliotheque.gs`
2. Testez les modifications
3. Incrémentez la version dans le code
4. Mettez à jour la documentation
5. Synchronisez avec `./sync-clasp.sh`
6. Déployez une nouvelle version dans Apps Script

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
- 📖 Documentation : Consultez [INDEX_DOCUMENTATION.md](./docs/INDEX_DOCUMENTATION.md)

---

## 🎓 Ressources

- [Documentation Google Apps Script](https://developers.google.com/apps-script)
- [Guide des Bibliothèques Apps Script](https://developers.google.com/apps-script/guides/libraries)
- [Clasp Documentation](https://github.com/google/clasp)

---

**🎉 Bonne utilisation de la bibliothèque partagée !**
