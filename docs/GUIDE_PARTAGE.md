# Guide de Partage de la Bibliothèque VIES VAT

## 🎯 Objectif

Ce guide explique comment partager votre bibliothèque Google Apps Script avec vos collègues pour qu'ils puissent l'utiliser dans leurs propres projets.

## 📋 Prérequis

- ✅ Projet Google Apps Script créé avec le code de la bibliothèque
- ✅ Bibliothèque déployée (voir README.md)
- ✅ ID de déploiement copié

## 🔗 Partage avec vos collègues

### Méthode 1 : Partage direct (Recommandé)

1. **Partager le projet Apps Script**
   - Ouvrez votre projet de bibliothèque sur [script.google.com](https://script.google.com)
   - Cliquez sur le bouton **Partager** (en haut à droite)
   - Ajoutez les adresses email de vos collègues
   - Donnez-leur le rôle **Lecteur** (ils n'ont pas besoin de modifier le code)
   - Cliquez sur **Envoyer**

2. **Partager l'ID de déploiement**
   - Copiez l'ID de déploiement (ex: `1AbC2dEf3GhI4jKl5MnOp6QrSt7UvWxYz`)
   - Partagez-le avec vos collègues par email, Slack, etc.

3. **Instructions pour vos collègues**
   - Ouvrir leur projet Google Apps Script
   - Aller dans **Éditeur** > **Bibliothèques**
   - Coller l'ID de déploiement
   - Cliquer sur **Rechercher** puis **Ajouter**

### Méthode 2 : Partage via Google Drive

1. **Créer un document de référence**
   - Créez un Google Doc avec :
     - L'ID de déploiement
     - Les instructions d'installation
     - Des exemples d'utilisation
   - Partagez ce document avec vos collègues

2. **Créer un Google Sheet d'exemple**
   - Créez un Google Sheet avec des exemples d'utilisation
   - Ajoutez le script Apps Script avec les fonctions personnalisées
   - Partagez ce fichier comme modèle

## 📧 Email type à envoyer

```
Objet : Bibliothèque Apps Script - Validation TVA VIES

Bonjour,

Je partage avec vous une bibliothèque Google Apps Script pour valider 
les numéros de TVA via le service VIES.

Pour l'utiliser dans vos projets :

1. Ouvrez votre projet Google Apps Script
2. Allez dans Éditeur > Bibliothèques
3. Ajoutez l'ID suivant : [VOTRE_ID_DE_DEPLOIEMENT]
4. Cliquez sur Rechercher puis Ajouter

Une fois ajoutée, vous pourrez utiliser les fonctions :
- VIES_VAT_Library.validateVAT("FR18417798402")
- VIES_VAT_Library.validateVATCompany("FR18417798402")
- etc.

Voir le fichier example_usage.gs pour des exemples complets.

Bonne utilisation !
```

## 🔄 Gestion des versions

### Quand mettre à jour la bibliothèque

- Correction de bugs
- Ajout de nouvelles fonctionnalités
- Amélioration des performances
- Changements dans l'API VIES

### Processus de mise à jour

1. **Créateur de la bibliothèque**
   - Modifier le code
   - Déployer une nouvelle version (incrémenter le numéro)
   - Informer les utilisateurs de la nouvelle version

2. **Utilisateurs de la bibliothèque**
   - Ouvrir leur projet
   - Aller dans **Éditeur** > **Bibliothèques**
   - Cliquer sur ✏️ (Modifier) de la bibliothèque
   - Sélectionner la nouvelle version
   - Enregistrer

## 📊 Suivi de l'utilisation

Pour savoir qui utilise votre bibliothèque :

1. Ouvrez votre projet de bibliothèque
2. Allez dans **Déployer** > **Gérer les déploiements**
3. Cliquez sur le déploiement
4. Vous verrez les statistiques d'utilisation

## 🔒 Sécurité

### Bonnes pratiques

- ✅ Partagez uniquement l'ID de déploiement, pas le code source
- ✅ Donnez le rôle **Lecteur** aux utilisateurs (pas besoin d'éditeur)
- ✅ Gardez le contrôle sur les mises à jour
- ✅ Documentez les changements entre les versions

### Ce que les utilisateurs peuvent faire

- ✅ Utiliser toutes les fonctions de la bibliothèque
- ✅ Voir la version installée
- ✅ Mettre à jour vers une nouvelle version

### Ce que les utilisateurs ne peuvent pas faire

- ❌ Modifier le code de la bibliothèque
- ❌ Voir le code source (sauf si vous leur donnez le rôle Éditeur)
- ❌ Créer de nouveaux déploiements

## 🆘 Support

### Problèmes courants

**"Bibliothèque introuvable"**
- Vérifiez que l'ID de déploiement est correct
- Vérifiez que la bibliothèque est bien partagée avec l'utilisateur

**"Erreur d'autorisation"**
- L'utilisateur doit autoriser l'accès à l'API VIES lors de la première utilisation
- Vérifiez que l'utilisateur a bien accès au projet de la bibliothèque

**"Fonction non définie"**
- Vérifiez que la bibliothèque est bien ajoutée dans Éditeur > Bibliothèques
- Vérifiez que vous utilisez le bon namespace : `VIES_VAT_Library.functionName()`

## 📝 Checklist de partage

- [ ] Bibliothèque créée et testée
- [ ] Bibliothèque déployée
- [ ] ID de déploiement copié
- [ ] Projet partagé avec les collègues (rôle Lecteur)
- [ ] Instructions d'installation envoyées
- [ ] Exemples d'utilisation fournis
- [ ] Documentation partagée

## 🎓 Formation

Pour aider vos collègues à utiliser la bibliothèque :

1. Organisez une session de formation (15-30 min)
2. Montrez comment ajouter la bibliothèque
3. Montrez des exemples d'utilisation
4. Partagez le fichier `example_usage.gs`
5. Créez un Google Sheet d'exemple qu'ils peuvent copier

