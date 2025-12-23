/**
 * 🔧 Fonctions Wrapper pour Google Sheets - VIES VAT Library
 * 
 * Fonctions wrapper pour faciliter l'utilisation de VIES_VAT_Library
 * directement dans Google Sheets.
 */

// ============================================================================
// FONCTIONS POUR VALIDATION TVA VIES
// ============================================================================

/**
 * Valide un numéro de TVA (pour Google Sheets)
 * @param {string} vatNumber - Numéro de TVA complet (ex: "FR18417798402")
 * @return {boolean} VRAI si valide, FAUX sinon
 * @customfunction
 */
function VALIDATE_VAT(vatNumber) {
  if (!vatNumber) return false;
  return VIES_VAT_Library.validateVAT(vatNumber.toString().trim());
}

/**
 * Retourne le nom de l'entreprise à partir d'un numéro de TVA
 * @param {string} vatNumber - Numéro de TVA complet
 * @return {string} Nom de l'entreprise ou "INVALIDE"
 * @customfunction
 */
function VAT_COMPANY(vatNumber) {
  if (!vatNumber) return "";
  return VIES_VAT_Library.validateVATCompany(vatNumber.toString().trim());
}

/**
 * Retourne l'adresse de l'entreprise à partir d'un numéro de TVA
 * @param {string} vatNumber - Numéro de TVA complet
 * @return {string} Adresse de l'entreprise ou "INVALIDE"
 * @customfunction
 */
function VAT_ADDRESS(vatNumber) {
  if (!vatNumber) return "";
  var result = VIES_VAT_Library.validateVATFull(vatNumber.toString().trim());
  if (result.valid && result.address) {
    return result.address;
  }
  return "INVALIDE";
}

/**
 * Retourne toutes les informations TVA sous forme de texte formaté
 * @param {string} vatNumber - Numéro de TVA complet
 * @return {string} Informations complètes formatées
 * @customfunction
 */
function VAT_INFO(vatNumber) {
  if (!vatNumber) return "";
  var result = VIES_VAT_Library.validateVATFull(vatNumber.toString().trim());
  
  if (result.error) {
    return "ERREUR: " + result.error;
  }
  
  if (result.valid) {
    var info = result.companyName || "";
    if (result.address) {
      info += " - " + result.address;
    }
    return info;
  }
  
  return "INVALIDE";
}

/**
 * Retourne le statut de validation
 * @param {string} vatNumber - Numéro de TVA complet
 * @return {string} "VALIDE", "INVALIDE" ou "ERREUR"
 * @customfunction
 */
function VAT_STATUS(vatNumber) {
  if (!vatNumber) return "";
  var result = VIES_VAT_Library.validateVATFull(vatNumber.toString().trim());
  
  if (result.error) {
    return "ERREUR";
  }
  
  return result.valid ? "VALIDE" : "INVALIDE";
}

/**
 * Retourne la version de la bibliothèque VAT
 * @return {string} Version de la bibliothèque
 * @customfunction
 */
function VAT_LIBRARY_VERSION() {
  return VIES_VAT_Library.getVersion();
}

