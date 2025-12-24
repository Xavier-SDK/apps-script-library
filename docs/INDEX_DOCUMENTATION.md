# 📚 Index de la Documentation

## 🎯 Vue d'ensemble

Ce repository contient une bibliothèque Google Apps Script partagée que votre équipe peut utiliser dans **tous leurs Google Sheets** après une configuration unique.

---

## 📖 Documentation par Rôle

### 👨‍💼 Pour les Administrateurs / Responsables IT

**Vous créez et maintenez la bibliothèque partagée :**

1. **[GUIDE_SETUP_TEAM.md](./GUIDE_SETUP_TEAM.md)** ⭐ **COMMENCEZ ICI**
   - Guide complet de mise en place
   - Comment créer et déployer la bibliothèque
   - Comment la partager avec l'équipe
   - Gestion des versions et mises à jour

2. **[CONFIGURATION_CLASP.md](./CONFIGURATION_CLASP.md)** ⚙️
   - Configuration multi-projets avec clasp
   - Synchronisation de chaque bibliothèque dans son propre projet
   - Scripts de push/pull automatisés

3. **[GUIDE_AJOUTER_BIBLIOTHEQUE.md](./GUIDE_AJOUTER_BIBLIOTHEQUE.md)** 📦
   - Comment créer une nouvelle bibliothèque
   - Structure modulaire
   - Intégration dans le système

4. **[GUIDE_PARTAGE.md](./GUIDE_PARTAGE.md)**
   - Guide détaillé sur le partage de bibliothèques Apps Script
   - Gestion des versions
   - Sécurité et bonnes pratiques

5. **[DEPLOIEMENT_ID.md](./DEPLOIEMENT_ID.md)** 🔑
   - ID de déploiement de la bibliothèque
   - Instructions d'installation rapide

---

### 👥 Pour les Chefs de Projet / Utilisateurs

**Vous utilisez la bibliothèque dans vos Google Sheets :**

1. **[GUIDE_RAPIDE_EQUIPE.md](./GUIDE_RAPIDE_EQUIPE.md)** ⭐ **COMMENCEZ ICI**
   - Installation express en 5 minutes
   - Comment ajouter la bibliothèque à un Google Sheet
   - Utilisation des fonctions au quotidien

2. **[GUIDE_DEPANNAGE.md](./GUIDE_DEPANNAGE.md)** 🆘
   - Résolution des problèmes courants
   - Erreurs fréquentes et solutions
   - Checklist de vérification

---

## 📂 Structure du Repository

```
apps-script-library/
├── scripts/                         Bibliothèques Apps Script
│   └── TVA.gs                       Bibliothèque TVA VIES
│
├── wrappers/                        Fonctions wrapper pour Google Sheets
│   └── TVA_wrapper_functions.gs    Wrappers pour TVA
│
├── docs/                           Documentation complète
│   ├── GUIDE_SETUP_TEAM.md         Guide de mise en place
│   ├── GUIDE_RAPIDE_EQUIPE.md      Guide utilisateur
│   ├── GUIDE_DEPANNAGE.md          Guide de dépannage
│   └── ...
│
└── .clasp-projects.json            Configuration multi-projets
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
3. Copiez les fonctions wrapper depuis `wrappers/TVA_wrapper_functions.gs`
4. Utilisez les fonctions dans vos Google Sheets !

---

## 🎯 Fonctionnalités Disponibles

### Validation TVA VIES

- ✅ Validation de numéros de TVA européens
- ✅ Récupération du nom d'entreprise
- ✅ Récupération de l'adresse
- ✅ Validation en batch

**Fonctions Google Sheets :**
- `=ESTTVA("FR18417798402")` → VRAI/FAUX
- `=TVA_SOCIETE("FR18417798402")` → Nom de l'entreprise
- `=TVA_ADDRESSE("FR18417798402")` → Adresse
- `=TVA_INFO("FR18417798402")` → Toutes les infos
- `=TVA_STATUS("FR18417798402")` → VALIDE/INVALIDE

---

## 📋 Checklist de Mise en Place

### Pour l'Administrateur

- [ ] Bibliothèque créée et testée
- [ ] Bibliothèque déployée (ID de déploiement obtenu)
- [ ] Projet partagé avec l'équipe
- [ ] Documentation partagée
- [ ] ID de déploiement communiqué à l'équipe

### Pour les Utilisateurs

- [ ] ID de déploiement reçu
- [ ] Bibliothèque ajoutée à un projet Apps Script
- [ ] Fonctions wrapper copiées-collées
- [ ] Test réussi avec une formule

---

## 🆘 Support

Consultez **[GUIDE_DEPANNAGE.md](./GUIDE_DEPANNAGE.md)** pour :
- Résolution des problèmes courants
- Erreurs fréquentes et solutions
- Checklist de vérification

---

## 🎓 Ressources

- [Documentation Google Apps Script](https://developers.google.com/apps-script)
- [Guide des Bibliothèques Apps Script](https://developers.google.com/apps-script/guides/libraries)
- [Clasp Documentation](https://github.com/google/clasp)

---

**🎉 Bonne utilisation de la bibliothèque partagée !**
