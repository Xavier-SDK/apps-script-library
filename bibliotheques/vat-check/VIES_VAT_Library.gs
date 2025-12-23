/**
 * @fileoverview Bibliothèque Google Apps Script pour la validation des numéros de TVA via VIES
 * @author Votre Nom
 * @version 1.0.0
 * 
 * Cette bibliothèque fournit des fonctions pour valider les numéros de TVA de l'UE
 * via le service VIES (VAT Information Exchange System) de la Commission Européenne.
 * 
 * Installation :
 * 1. Créer un nouveau projet Apps Script
 * 2. Coller ce code
 * 3. Déployer comme bibliothèque (voir guide d'installation)
 * 4. Partager avec vos collègues via l'ID de déploiement
 * 
 * Usage dans un autre projet :
 * 1. Ressources > Bibliothèques
 * 2. Ajouter l'ID de déploiement de cette bibliothèque
 * 3. Utiliser les fonctions : VIES_VAT_Library.validateVAT("FR18417798402")
 */

/**
 * Namespace pour toutes les fonctions VIES
 */
var VIES_VAT_Library = (function() {
  'use strict';
  
  // Configuration
  const VIES_API_URL = 'https://ec.europa.eu/taxation_customs/vies/rest-api';
  const VERSION = '1.0.0';
  
  /**
   * Retourne la version de la bibliothèque
   * @return {string} Version de la bibliothèque
   */
  function getVersion() {
    return VERSION;
  }
  
  /**
   * Parse un numéro de TVA pour extraire le code pays et le numéro
   * @param {string} vat - Numéro de TVA complet
   * @return {object|null} {countryCode, vatNumber} ou null si invalide
   * @private
   */
  function parseVATNumber(vat) {
    if (!vat || typeof vat !== 'string') {
      return null;
    }
    
    vat = vat.trim().toUpperCase();
    
    // Ignorer les valeurs invalides
    if (vat === '' || vat === '0' || vat.indexOf('XXXXXXXX') !== -1 || 
        vat.indexOf('E+') !== -1) {
      return null;
    }
    
    // Extraire le code pays (2 premières lettres)
    const countryMatch = vat.match(/^([A-Z]{2})(.+)$/);
    if (countryMatch) {
      const vatNumber = countryMatch[2].replace(/[^0-9A-Z]/g, '');
      if (vatNumber.length >= 6) {
        return {
          countryCode: countryMatch[1],
          vatNumber: vatNumber
        };
      }
    }
    
    // Si pas de code pays mais format numérique, essayer FR
    const cleanVat = vat.replace(/[^0-9A-Z]/g, '');
    if (cleanVat.length >= 8 && /^[0-9A-Z]+$/.test(cleanVat)) {
      return {
        countryCode: 'FR',
        vatNumber: cleanVat
      };
    }
    
    return null;
  }
  
  /**
   * Valide un numéro de TVA via l'API VIES
   * @param {string} countryCode - Code pays (ex: "FR", "BE")
   * @param {string} vatNumber - Numéro de TVA sans préfixe pays
   * @return {object} {valid: boolean, companyName: string, address: string, error: string}
   * @private
   */
  function validateVATInternal(countryCode, vatNumber) {
    try {
      const url = VIES_API_URL + '/check-vat-number';
      const payload = {
        countryCode: countryCode,
        vatNumber: vatNumber
      };
      
      const options = {
        method: 'post',
        contentType: 'application/json',
        payload: JSON.stringify(payload),
        muteHttpExceptions: true
      };
      
      const response = UrlFetchApp.fetch(url, options);
      const responseCode = response.getResponseCode();
      
      if (responseCode === 200) {
        const data = JSON.parse(response.getContentText());
        return {
          valid: data.valid === true,
          companyName: data.name || '',
          address: data.address || '',
          requestDate: data.requestDate || '',
          error: null
        };
      } else {
        const errorData = JSON.parse(response.getContentText());
        return {
          valid: false,
          companyName: '',
          address: '',
          requestDate: '',
          error: errorData.error || 'Erreur API VIES'
        };
      }
    } catch (error) {
      return {
        valid: false,
        companyName: '',
        address: '',
        requestDate: '',
        error: error.toString()
      };
    }
  }
  
  /**
   * Valide un numéro de TVA et retourne VRAI ou FAUX
   * @param {string} vatNumber - Numéro de TVA complet (ex: "FR18417798402")
   * @return {boolean} VRAI si valide, FAUX sinon
   */
  function validateVAT(vatNumber) {
    const parsed = parseVATNumber(vatNumber);
    if (!parsed) {
      return false;
    }
    
    const result = validateVATInternal(parsed.countryCode, parsed.vatNumber);
    return result.valid;
  }
  
  /**
   * Valide un numéro de TVA et retourne le nom de l'entreprise
   * @param {string} vatNumber - Numéro de TVA complet
   * @return {string} Nom de l'entreprise si valide, "INVALIDE" sinon
   */
  function validateVATCompany(vatNumber) {
    const parsed = parseVATNumber(vatNumber);
    if (!parsed) {
      return 'INVALIDE';
    }
    
    const result = validateVATInternal(parsed.countryCode, parsed.vatNumber);
    if (result.valid) {
      return result.companyName || 'VALIDE';
    }
    
    return 'INVALIDE';
  }
  
  /**
   * Valide un numéro de TVA et retourne toutes les informations
   * @param {string} vatNumber - Numéro de TVA complet
   * @return {object} {valid: boolean, companyName: string, address: string, error: string}
   */
  function validateVATFull(vatNumber) {
    const parsed = parseVATNumber(vatNumber);
    if (!parsed) {
      return {
        valid: false,
        companyName: '',
        address: '',
        error: 'Format invalide'
      };
    }
    
    return validateVATInternal(parsed.countryCode, parsed.vatNumber);
  }
  
  /**
   * Valide plusieurs numéros de TVA en batch
   * @param {Array<string>} vatNumbers - Tableau de numéros de TVA
   * @return {Array<object>} Tableau de résultats {vatNumber, valid, companyName, address, error}
   */
  function validateVATBatch(vatNumbers) {
    if (!Array.isArray(vatNumbers)) {
      return [];
    }
    
    const results = [];
    for (var i = 0; i < vatNumbers.length; i++) {
      const vat = vatNumbers[i];
      const parsed = parseVATNumber(vat);
      
      if (!parsed) {
        results.push({
          vatNumber: vat,
          valid: false,
          companyName: '',
          address: '',
          error: 'Format invalide'
        });
        continue;
      }
      
      const result = validateVATInternal(parsed.countryCode, parsed.vatNumber);
      results.push({
        vatNumber: vat,
        valid: result.valid,
        companyName: result.companyName,
        address: result.address,
        error: result.error
      });
      
      // Délai pour éviter le rate limiting (200ms entre chaque requête)
      Utilities.sleep(200);
    }
    
    return results;
  }
  
  /**
   * Liste tous les codes pays UE supportés
   * @return {Array<string>} Tableau des codes pays
   */
  function getSupportedCountries() {
    return [
      'AT', 'BE', 'BG', 'CY', 'CZ', 'DE', 'DK', 'EE', 'EL', 'ES',
      'FI', 'FR', 'HR', 'HU', 'IE', 'IT', 'LT', 'LU', 'LV', 'MT',
      'NL', 'PL', 'PT', 'RO', 'SE', 'SI', 'SK'
    ];
  }
  
  // API publique
  return {
    getVersion: getVersion,
    validateVAT: validateVAT,
    validateVATCompany: validateVATCompany,
    validateVATFull: validateVATFull,
    validateVATBatch: validateVATBatch,
    getSupportedCountries: getSupportedCountries
  };
})();

