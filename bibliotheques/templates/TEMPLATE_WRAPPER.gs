/**
 * 🔧 Template de Fonctions Wrapper pour Google Sheets
 * 
 * Ce fichier contient des fonctions wrapper qui facilitent l'utilisation
 * de votre bibliothèque directement dans Google Sheets.
 * 
 * Instructions :
 * 1. Remplacez NAMESPACE_NAME par le namespace de votre bibliothèque
 * 2. Créez des fonctions wrapper avec l'annotation @customfunction
 * 3. Copiez ce fichier dans le même dossier que votre bibliothèque
 */

// ============================================================================
// FONCTIONS WRAPPER POUR GOOGLE SHEETS
// ============================================================================

/**
 * Exemple de fonction wrapper pour Google Sheets
 * ⚠️ Remplacez NAMESPACE_NAME par votre namespace réel
 * 
 * @param {string} param - Paramètre d'exemple
 * @return {string} Résultat
 * @customfunction
 */
function MON_OUTIL_EXEMPLE(param) {
  if (!param) return "";
  return NAMESPACE_NAME.exampleFunction(param.toString().trim());
}

/**
 * Retourne la version de la bibliothèque (utile pour vérifier la version installée)
 * @return {string} Version de la bibliothèque
 * @customfunction
 */
function MON_OUTIL_VERSION() {
  return NAMESPACE_NAME.getVersion();
}

// ============================================================================
// EXEMPLES D'UTILISATION DANS GOOGLE SHEETS
// ============================================================================

/**
 * Exemples d'utilisation :
 * 
 * Dans une cellule Google Sheets :
 * 
 * =MON_OUTIL_EXEMPLE("test")        → Utilise votre fonction
 * =MON_OUTIL_VERSION()               → Affiche la version
 * 
 * Avec référence de cellule :
 * 
 * =MON_OUTIL_EXEMPLE(A2)            → Utilise la valeur de A2
 * 
 * Documentation :
 * - Les fonctions avec @customfunction sont disponibles dans Google Sheets
 * - Utilisez des noms en MAJUSCULES avec des underscores pour les fonctions Sheets
 * - Les fonctions wrapper doivent être dans le même projet Apps Script que la bibliothèque
 */

