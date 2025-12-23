/**
 * 📦 Template de Bibliothèque Google Apps Script
 * 
 * Utilisez ce template pour créer une nouvelle bibliothèque partagée.
 * 
 * Instructions :
 * 1. Copiez ce fichier dans un nouveau dossier (ex: bibliotheques/mon-outil/)
 * 2. Renommez le fichier (ex: MonOutil_Library.gs)
 * 3. Remplacez NAMESPACE_NAME par le nom de votre namespace
 * 4. Ajoutez vos fonctions dans le namespace
 * 5. Suivez le guide GUIDE_AJOUTER_BIBLIOTHEQUE.md
 */

/**
 * Namespace pour toutes les fonctions de cette bibliothèque
 * ⚠️ IMPORTANT : Remplacez NAMESPACE_NAME par un nom unique (ex: MonOutil_Library)
 */
var NAMESPACE_NAME = (function() {
  'use strict';
  
  // ============================================================================
  // CONFIGURATION
  // ============================================================================
  
  const VERSION = '1.0.0';
  const LIBRARY_NAME = 'Nom de la Bibliothèque';
  
  // ============================================================================
  // FONCTIONS PUBLIQUES
  // ============================================================================
  
  /**
   * Retourne la version de la bibliothèque
   * @return {string} Version de la bibliothèque
   */
  function getVersion() {
    return VERSION;
  }
  
  /**
   * Retourne le nom de la bibliothèque
   * @return {string} Nom de la bibliothèque
   */
  function getName() {
    return LIBRARY_NAME;
  }
  
  /**
   * Exemple de fonction publique
   * @param {string} param - Paramètre d'exemple
   * @return {string} Résultat
   */
  function exampleFunction(param) {
    // Votre code ici
    return "Résultat pour : " + param;
  }
  
  // ============================================================================
  // FONCTIONS PRIVÉES (Helpers)
  // ============================================================================
  
  /**
   * Fonction privée (non exportée)
   * @private
   */
  function privateHelper() {
    // Code privé ici
  }
  
  // ============================================================================
  // EXPOSITION DES FONCTIONS PUBLIQUES
  // ============================================================================
  
  // ⚠️ IMPORTANT : Liste toutes les fonctions que vous voulez exposer publiquement
  return {
    getVersion: getVersion,
    getName: getName,
    exampleFunction: exampleFunction
    // Ajoutez ici toutes vos fonctions publiques
  };
})();

