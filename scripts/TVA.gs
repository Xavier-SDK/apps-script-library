/**
 * @fileoverview Bibliothèque Google Apps Script pour la validation des numéros de TVA via VIES
 * @author Xavier ROUX
 * @version 2.0.0
 * 
 * Cette bibliothèque fournit des fonctions pour valider les numéros de TVA de l'UE
 * via le service VIES (VAT Information Exchange System) de la Commission Européenne.
 * 
 * La validation inclut :
 * - Vérification du format selon le pays
 * - Validation algorithmique de la clé de contrôle (quand disponible)
 * - Vérification via l'API VIES pour confirmer l'existence
 * 
 * Usage dans un autre projet :
 * 1. Éditeur > Bibliothèques (puis cliquez sur "+")
 * 2. Ajouter l'ID de déploiement de cette bibliothèque
 * 3. Utiliser les fonctions : TVA.validateVAT("FR18417798402")
 */

/**
 * @typedef {Object} TVAObject
 * @property {function(string, string=): boolean|Object} validateVAT - Valide un numéro de TVA et retourne VRAI ou FAUX (ou objet en mode debug)
 * @property {function(string): string} validateVATCompany - Valide un numéro de TVA et retourne le nom de l'entreprise
 * @property {function(string): Object} validateVATFull - Valide un numéro de TVA et retourne toutes les informations
 * @property {function(Array<string>): Array<Object>} validateVATBatch - Valide plusieurs numéros de TVA en batch
 * @property {function(string): string} generateVATNumber - Génère un numéro de TVA valide pour un pays donné
 * @property {function(): string} getVersion - Retourne la version de la bibliothèque
 * @property {function(): Array<string>} getSupportedCountries - Retourne la liste des codes pays supportés
 */

/**
 * Namespace pour toutes les fonctions VIES
 * @type {TVAObject}
 */
var TVA = (function() {
  'use strict';
  
  // Configuration
  const VIES_API_URL = 'https://ec.europa.eu/taxation_customs/vies/rest-api';
  const VERSION = '2.0.0';
  
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
   * Valide le format d'un numéro de TVA selon le pays
   * @param {string} countryCode - Code pays (ex: "FR", "BE")
   * @param {string} vatNumber - Numéro de TVA sans préfixe pays
   * @return {boolean} VRAI si le format est correct, FAUX sinon
   * @private
   */
  function validateVATFormat(countryCode, vatNumber) {
    if (!vatNumber || vatNumber.length === 0) {
      return false;
    }
    
    // Formats par pays (longueur et caractères autorisés)
    const formats = {
      'AT': { length: 9, pattern: /^U\d{8}$/ },
      'BE': { length: 10, pattern: /^\d{10}$/ },
      'BG': { length: [9, 10], pattern: /^\d{9,10}$/ },
      'CY': { length: 9, pattern: /^\d{8}[A-Z]$/ },
      'CZ': { length: [8, 9, 10], pattern: /^\d{8,10}$/ },
      'DE': { length: 9, pattern: /^\d{9}$/ },
      'DK': { length: 8, pattern: /^\d{8}$/ },
      'EE': { length: 9, pattern: /^\d{9}$/ },
      'EL': { length: 9, pattern: /^\d{9}$/ },
      'ES': { length: 9, pattern: /^[A-Z0-9]\d{7}[A-Z0-9]$/ },
      'FI': { length: 8, pattern: /^\d{8}$/ },
      'FR': { length: 11, pattern: /^[0-9A-Z]{2}\d{9}$/ },
      'HR': { length: 11, pattern: /^\d{11}$/ },
      'HU': { length: 8, pattern: /^\d{8}$/ },
      'IE': { length: [8, 9], pattern: /^[0-9A-Z]{8,9}$/ },
      'IT': { length: 11, pattern: /^\d{11}$/ },
      'LT': { length: [9, 12], pattern: /^(\d{9}|\d{12})$/ },
      'LU': { length: 8, pattern: /^\d{8}$/ },
      'LV': { length: 11, pattern: /^\d{11}$/ },
      'MT': { length: 8, pattern: /^\d{8}$/ },
      'NL': { length: 12, pattern: /^\d{9}B\d{2}$/ },
      'PL': { length: 10, pattern: /^\d{10}$/ },
      'PT': { length: 9, pattern: /^\d{9}$/ },
      'RO': { length: [2, 10], pattern: /^\d{2,10}$/ },
      'SE': { length: 12, pattern: /^\d{12}$/ },
      'SI': { length: 8, pattern: /^\d{8}$/ },
      'SK': { length: 10, pattern: /^\d{10}$/ }
    };
    
    const format = formats[countryCode];
    if (!format) {
      // Pays non listé : vérification basique (au moins 4 caractères alphanumériques)
      return /^[0-9A-Z]{4,}$/.test(vatNumber);
    }
    
    // Vérifier la longueur
    if (Array.isArray(format.length)) {
      if (!format.length.includes(vatNumber.length)) {
        return false;
      }
    } else {
      if (vatNumber.length !== format.length) {
        return false;
      }
    }
    
    // Vérifier le pattern
    return format.pattern.test(vatNumber);
  }
  
  /**
   * Valide algorithmiquement un numéro de TVA selon le pays
   * @param {string} countryCode - Code pays (ex: "FR", "BE")
   * @param {string} vatNumber - Numéro de TVA sans préfixe pays
   * @return {boolean} VRAI si la clé de contrôle est valide, FAUX sinon
   * @private
   */
  function validateVATAlgorithm(countryCode, vatNumber) {
    if (!vatNumber || vatNumber.length === 0) {
      return false;
    }
    
    // Extraire uniquement les chiffres pour les calculs
    const digits = vatNumber.replace(/[^0-9]/g, '');
    
    switch (countryCode) {
      case 'FR': // France : Modulo 97 avec formule (12 + 3 * (SIREN % 97)) % 97
        if (digits.length !== 11) return false;
        const frSiren = parseInt(digits.substring(2, 11));
        const frCheck = parseInt(digits.substring(0, 2));
        const frCalculated = (12 + 3 * (frSiren % 97)) % 97;
        return frCalculated === frCheck;
        
      case 'DE': // Allemagne : Modulo 11
        if (digits.length !== 9) return false;
        let deSum = 0;
        const deWeights = [1, 2, 1, 2, 1, 2, 1, 2];
        for (let i = 0; i < 8; i++) {
          let product = parseInt(digits[i]) * deWeights[i];
          deSum += Math.floor(product / 10) + (product % 10);
        }
        const deCheck = (10 - (deSum % 10)) % 10;
        return deCheck === parseInt(digits[8]);
        
      case 'IT': // Italie : Modulo 11
        if (digits.length !== 11) return false;
        let itSum = 0;
        const itWeights = [1, 2, 1, 2, 1, 2, 1, 2, 1, 2];
        for (let i = 0; i < 10; i++) {
          let product = parseInt(digits[i]) * itWeights[i];
          itSum += Math.floor(product / 10) + (product % 10);
        }
        const itCheck = (10 - (itSum % 10)) % 10;
        return itCheck === parseInt(digits[10]);
        
      case 'ES': // Espagne : Modulo 11 avec lettres
        if (vatNumber.length !== 9) return false;
        const esDigits = vatNumber.substring(0, 8).replace(/[^0-9]/g, '');
        if (esDigits.length !== 8) return false;
        let esSum = 0;
        const esWeights = [2, 1, 2, 1, 2, 1, 2];
        for (let i = 0; i < 7; i++) {
          let product = parseInt(esDigits[i]) * esWeights[i];
          esSum += Math.floor(product / 10) + (product % 10);
        }
        const esCheck = (10 - (esSum % 10)) % 10;
        const esLastChar = vatNumber.substring(8, 9);
        if (/[0-9]/.test(esLastChar)) {
          return parseInt(esLastChar) === esCheck;
        } else {
          // Lettre de contrôle
          const letters = 'TRWAGMYFPDXBNJZSQVHLCKE';
          return letters[esCheck] === esLastChar;
        }
        
      case 'BE': // Belgique : Modulo 97
        if (digits.length !== 10) return false;
        const beKey = parseInt(digits.substring(0, 8));
        const beCheck = parseInt(digits.substring(8, 10));
        return (97 - (beKey % 97)) === beCheck;
        
      case 'NL': // Pays-Bas : Modulo 11
        if (vatNumber.length !== 12) return false;
        const nlDigits = vatNumber.substring(0, 9);
        let nlSum = 0;
        const nlWeights = [9, 8, 7, 6, 5, 4, 3, 2];
        for (let i = 0; i < 8; i++) {
          nlSum += parseInt(nlDigits[i]) * nlWeights[i];
        }
        const nlCheck = nlSum % 11;
        if (nlCheck < 10) {
          return parseInt(nlDigits[8]) === nlCheck;
        }
        return false;
        
      case 'PT': // Portugal : Modulo 11
        if (digits.length !== 9) return false;
        let ptSum = 0;
        const ptWeights = [9, 8, 7, 6, 5, 4, 3, 2];
        for (let i = 0; i < 8; i++) {
          ptSum += parseInt(digits[i]) * ptWeights[i];
        }
        const ptCheck = 11 - (ptSum % 11);
        if (ptCheck >= 10) return parseInt(digits[8]) === 0;
        return parseInt(digits[8]) === ptCheck;
        
      case 'AT': // Autriche : Modulo 11
        if (vatNumber.length !== 9 || !vatNumber.startsWith('U')) return false;
        const atDigits = vatNumber.substring(1);
        let atSum = 0;
        const atWeights = [1, 2, 1, 2, 1, 2, 1, 2];
        for (let i = 0; i < 8; i++) {
          let product = parseInt(atDigits[i]) * atWeights[i];
          atSum += Math.floor(product / 10) + (product % 10);
        }
        const atCheck = (10 - (atSum % 10)) % 10;
        return atCheck === parseInt(atDigits[8]);
        
      case 'DK': // Danemark : Modulo 11
        if (digits.length !== 8) return false;
        let dkSum = 0;
        const dkWeights = [2, 7, 6, 5, 4, 3, 2];
        for (let i = 0; i < 7; i++) {
          dkSum += parseInt(digits[i]) * dkWeights[i];
        }
        const dkCheck = dkSum % 11;
        if (dkCheck === 0) return parseInt(digits[7]) === 0;
        if (dkCheck === 1) return false; // Invalide
        return parseInt(digits[7]) === (11 - dkCheck);
        
      case 'FI': // Finlande : Modulo 11
        if (digits.length !== 8) return false;
        let fiSum = 0;
        const fiWeights = [7, 9, 10, 5, 8, 4, 2];
        for (let i = 0; i < 7; i++) {
          fiSum += parseInt(digits[i]) * fiWeights[i];
        }
        const fiCheck = fiSum % 11;
        if (fiCheck === 0) return parseInt(digits[7]) === 0;
        if (fiCheck === 1) return false; // Invalide
        return parseInt(digits[7]) === (11 - fiCheck);
        
      case 'SE': // Suède : Modulo 10
        if (digits.length !== 12) return false;
        let seSum = 0;
        for (let i = 0; i < 11; i++) {
          let digit = parseInt(digits[i]);
          if (i % 2 === 0) {
            digit *= 2;
            if (digit > 9) digit = Math.floor(digit / 10) + (digit % 10);
          }
          seSum += digit;
        }
        const seCheck = (10 - (seSum % 10)) % 10;
        return seCheck === parseInt(digits[11]);
        
      case 'PL': // Pologne : Modulo 11
        if (digits.length !== 10) return false;
        let plSum = 0;
        const plWeights = [6, 5, 7, 2, 3, 4, 5, 6, 7];
        for (let i = 0; i < 9; i++) {
          plSum += parseInt(digits[i]) * plWeights[i];
        }
        const plCheck = plSum % 11;
        if (plCheck === 10) return false; // Invalide
        return parseInt(digits[9]) === plCheck;
        
      case 'CZ': // République tchèque : Modulo 11
        if (digits.length < 8 || digits.length > 10) return false;
        // Algorithme simplifié pour CZ
        return digits.length >= 8;
        
      case 'SK': // Slovaquie : Modulo 11
        if (digits.length !== 10) return false;
        let skSum = 0;
        const skWeights = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        for (let i = 0; i < 9; i++) {
          skSum += parseInt(digits[i]) * skWeights[i];
        }
        const skCheck = skSum % 11;
        if (skCheck === 10) return parseInt(digits[9]) === 0;
        return parseInt(digits[9]) === skCheck;
        
      default:
        // Pour les pays sans algorithme connu, on retourne true
        // La validation se fera uniquement via le format et l'API
        return true;
    }
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
   * @param {string=} mode - Mode de validation : "debug" (détails), "force" (ignore format/clé), ou vide (normal)
   * @return {boolean|Object} VRAI si valide, FAUX sinon. En mode "debug", retourne {valid: boolean, step: string, reason: string}
   */
  function validateVAT(vatNumber, mode) {
    mode = mode || '';
    
    // Mode debug : retourner des détails
    if (mode === 'debug') {
      const parsed = parseVATNumber(vatNumber);
      if (!parsed) {
        return {
          valid: false,
          step: 'PARSE',
          reason: 'INVALID_FORMAT'
        };
      }
      
      // 0. Vérifier si le pays est dans la liste des 27 pays UE supportés
      if (!isSupportedCountry(parsed.countryCode)) {
        return {
          valid: false,
          step: 'COUNTRY',
          reason: 'NOT_EU'
        };
      }
      
      // 1. Vérifier le format du numéro
      if (!validateVATFormat(parsed.countryCode, parsed.vatNumber)) {
        return {
          valid: false,
          step: 'FORMAT',
          reason: 'INVALID_FORMAT_' + parsed.countryCode
        };
      }
      
      // 2. Vérifier la clé de contrôle algorithmique (si algorithme disponible)
      if (!validateVATAlgorithm(parsed.countryCode, parsed.vatNumber)) {
        return {
          valid: false,
          step: 'ALGORITHM',
          reason: 'INVALID_CHECKSUM_' + parsed.countryCode
        };
      }
      
      // 3. Si format et clé valides, vérifier via l'API VIES
      const result = validateVATInternal(parsed.countryCode, parsed.vatNumber);
      if (result.valid) {
        return {
          valid: true,
          step: 'API',
          reason: 'VALID'
        };
      } else {
        // Convertir l'erreur en mot-clé
        let reason = 'NOT_FOUND';
        if (result.error) {
          const errorLower = result.error.toLowerCase();
          if (errorLower.indexOf('invalid') !== -1) {
            reason = 'API_INVALID';
          } else if (errorLower.indexOf('not found') !== -1 || errorLower.indexOf('notfound') !== -1) {
            reason = 'NOT_FOUND';
          } else if (errorLower.indexOf('timeout') !== -1) {
            reason = 'API_TIMEOUT';
          } else if (errorLower.indexOf('error') !== -1) {
            reason = 'API_ERROR';
          }
        }
        return {
          valid: false,
          step: 'API',
          reason: reason
        };
      }
    }
    
    // Mode force : ignorer format et clé, aller directement à l'API
    if (mode === 'force') {
      const parsed = parseVATNumber(vatNumber);
      if (!parsed) {
        return false;
      }
      
      // Vérifier si le pays est dans la liste des 27 pays UE supportés
      if (!isSupportedCountry(parsed.countryCode)) {
        return false;
      }
      
      // Aller directement à l'API VIES
      const result = validateVATInternal(parsed.countryCode, parsed.vatNumber);
      return result.valid;
    }
    
    // Mode normal : validation complète
    const parsed = parseVATNumber(vatNumber);
    if (!parsed) {
      return false;
    }
    
    // 0. Vérifier si le pays est dans la liste des 27 pays UE supportés
    if (!isSupportedCountry(parsed.countryCode)) {
      return false;
    }
    
    // 1. Vérifier le format du numéro
    if (!validateVATFormat(parsed.countryCode, parsed.vatNumber)) {
      return false;
    }
    
    // 2. Vérifier la clé de contrôle algorithmique (si algorithme disponible)
    if (!validateVATAlgorithm(parsed.countryCode, parsed.vatNumber)) {
      return false;
    }
    
    // 3. Si format et clé valides, vérifier via l'API VIES
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
    
    // 0. Vérifier si le pays est dans la liste des 27 pays UE supportés
    if (!isSupportedCountry(parsed.countryCode)) {
      return 'INVALIDE';
    }
    
    // 1. Vérifier le format du numéro
    if (!validateVATFormat(parsed.countryCode, parsed.vatNumber)) {
      return 'INVALIDE';
    }
    
    // 2. Vérifier la clé de contrôle algorithmique (si algorithme disponible)
    if (!validateVATAlgorithm(parsed.countryCode, parsed.vatNumber)) {
      return 'INVALIDE';
    }
    
    // 3. Si format et clé valides, vérifier via l'API VIES
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
    
    // 0. Vérifier si le pays est dans la liste des 27 pays UE supportés
    if (!isSupportedCountry(parsed.countryCode)) {
      return {
        valid: false,
        companyName: '',
        address: '',
        error: 'Pays non UE: ' + parsed.countryCode
      };
    }
    
    // 1. Vérifier le format du numéro
    if (!validateVATFormat(parsed.countryCode, parsed.vatNumber)) {
      return {
        valid: false,
        companyName: '',
        address: '',
        error: 'Format invalide pour ' + parsed.countryCode
      };
    }
    
    // 2. Vérifier la clé de contrôle algorithmique (si algorithme disponible)
    if (!validateVATAlgorithm(parsed.countryCode, parsed.vatNumber)) {
      return {
        valid: false,
        companyName: '',
        address: '',
        error: 'Clé de contrôle invalide pour ' + parsed.countryCode
      };
    }
    
    // 3. Si format et clé valides, vérifier via l'API VIES
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
      
      // Vérifier si le pays est dans la liste des 27 pays UE supportés
      if (!isSupportedCountry(parsed.countryCode)) {
        results.push({
          vatNumber: vat,
          valid: false,
          companyName: '',
          address: '',
          error: 'Pays non UE: ' + parsed.countryCode
        });
        continue;
      }
      
      // Vérifier le format et la clé de contrôle avant d'appeler l'API
      if (!validateVATFormat(parsed.countryCode, parsed.vatNumber)) {
        results.push({
          vatNumber: vat,
          valid: false,
          companyName: '',
          address: '',
          error: 'Format invalide pour ' + parsed.countryCode
        });
        continue;
      }
      
      if (!validateVATAlgorithm(parsed.countryCode, parsed.vatNumber)) {
        results.push({
          vatNumber: vat,
          valid: false,
          companyName: '',
          address: '',
          error: 'Clé de contrôle invalide pour ' + parsed.countryCode
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
   * Génère un numéro de TVA valide (format + clé de contrôle) pour un pays donné
   * @param {string} countryCode - Code pays (ex: "FR", "DE", "IT")
   * @return {string} Numéro de TVA valide avec préfixe pays (ex: "FR18417798402")
   */
  function generateVATNumber(countryCode) {
    if (!countryCode || countryCode.length !== 2) {
      throw new Error('Code pays invalide. Utilisez un code à 2 lettres (ex: "FR", "DE")');
    }
    
    countryCode = countryCode.toUpperCase();
    
    // Générer un numéro de base aléatoire et calculer la clé de contrôle
    switch (countryCode) {
      case 'FR': // France : Modulo 97 avec formule (12 + 3 * (SIREN % 97)) % 97
        // Générer 9 chiffres aléatoires (SIREN)
        const frBase = Math.floor(Math.random() * 900000000) + 100000000;
        const frKey = (12 + 3 * (frBase % 97)) % 97;
        const frKeyStr = frKey.toString().padStart(2, '0');
        return countryCode + frKeyStr + frBase.toString();
        
      case 'DE': // Allemagne : Modulo 11
        // Générer 8 chiffres aléatoires
        let deBase = '';
        for (let i = 0; i < 8; i++) {
          deBase += Math.floor(Math.random() * 10).toString();
        }
        let deSum = 0;
        const deWeights = [1, 2, 1, 2, 1, 2, 1, 2];
        for (let i = 0; i < 8; i++) {
          let product = parseInt(deBase[i]) * deWeights[i];
          deSum += Math.floor(product / 10) + (product % 10);
        }
        const deCheck = (10 - (deSum % 10)) % 10;
        return countryCode + deBase + deCheck.toString();
        
      case 'IT': // Italie : Modulo 11
        // Générer 10 chiffres aléatoires
        let itBase = '';
        for (let i = 0; i < 10; i++) {
          itBase += Math.floor(Math.random() * 10).toString();
        }
        let itSum = 0;
        const itWeights = [1, 2, 1, 2, 1, 2, 1, 2, 1, 2];
        for (let i = 0; i < 10; i++) {
          let product = parseInt(itBase[i]) * itWeights[i];
          itSum += Math.floor(product / 10) + (product % 10);
        }
        const itCheck = (10 - (itSum % 10)) % 10;
        return countryCode + itBase + itCheck.toString();
        
      case 'ES': // Espagne : Modulo 11 avec lettres
        // Générer 8 chiffres aléatoires
        let esBase = '';
        for (let i = 0; i < 8; i++) {
          esBase += Math.floor(Math.random() * 10).toString();
        }
        let esSum = 0;
        const esWeights = [2, 1, 2, 1, 2, 1, 2];
        for (let i = 0; i < 7; i++) {
          let product = parseInt(esBase[i]) * esWeights[i];
          esSum += Math.floor(product / 10) + (product % 10);
        }
        const esCheck = (10 - (esSum % 10)) % 10;
        const letters = 'TRWAGMYFPDXBNJZSQVHLCKE';
        const esLastChar = letters[esCheck];
        return countryCode + esBase + esLastChar;
        
      case 'BE': // Belgique : Modulo 97
        // Générer 8 chiffres aléatoires
        const beBase = Math.floor(Math.random() * 90000000) + 10000000;
        const beKey = 97 - (beBase % 97);
        const beKeyStr = beKey.toString().padStart(2, '0');
        return countryCode + beBase.toString() + beKeyStr;
        
      case 'NL': // Pays-Bas : Modulo 11
        // Générer 9 chiffres aléatoires
        let nlBase = '';
        for (let i = 0; i < 9; i++) {
          nlBase += Math.floor(Math.random() * 10).toString();
        }
        let nlSum = 0;
        const nlWeights = [9, 8, 7, 6, 5, 4, 3, 2];
        for (let i = 0; i < 8; i++) {
          nlSum += parseInt(nlBase[i]) * nlWeights[i];
        }
        const nlCheck = nlSum % 11;
        if (nlCheck >= 10) {
          // Régénérer si le check est invalide
          return generateVATNumber(countryCode);
        }
        return countryCode + nlBase + nlCheck.toString() + 'B' + Math.floor(Math.random() * 90 + 10).toString();
        
      case 'PT': // Portugal : Modulo 11
        // Générer 8 chiffres aléatoires
        let ptBase = '';
        for (let i = 0; i < 8; i++) {
          ptBase += Math.floor(Math.random() * 10).toString();
        }
        let ptSum = 0;
        const ptWeights = [9, 8, 7, 6, 5, 4, 3, 2];
        for (let i = 0; i < 8; i++) {
          ptSum += parseInt(ptBase[i]) * ptWeights[i];
        }
        let ptCheck = 11 - (ptSum % 11);
        if (ptCheck >= 10) ptCheck = 0;
        return countryCode + ptBase + ptCheck.toString();
        
      case 'AT': // Autriche : Modulo 11
        // Générer 8 chiffres aléatoires
        let atBase = '';
        for (let i = 0; i < 8; i++) {
          atBase += Math.floor(Math.random() * 10).toString();
        }
        let atSum = 0;
        const atWeights = [1, 2, 1, 2, 1, 2, 1, 2];
        for (let i = 0; i < 8; i++) {
          let product = parseInt(atBase[i]) * atWeights[i];
          atSum += Math.floor(product / 10) + (product % 10);
        }
        const atCheck = (10 - (atSum % 10)) % 10;
        return countryCode + 'U' + atBase + atCheck.toString();
        
      case 'DK': // Danemark : Modulo 11
        // Générer 7 chiffres aléatoires
        let dkBase = '';
        for (let i = 0; i < 7; i++) {
          dkBase += Math.floor(Math.random() * 10).toString();
        }
        let dkSum = 0;
        const dkWeights = [2, 7, 6, 5, 4, 3, 2];
        for (let i = 0; i < 7; i++) {
          dkSum += parseInt(dkBase[i]) * dkWeights[i];
        }
        let dkCheck = dkSum % 11;
        if (dkCheck === 0) {
          dkCheck = 0;
        } else if (dkCheck === 1) {
          // Régénérer si invalide
          return generateVATNumber(countryCode);
        } else {
          dkCheck = 11 - dkCheck;
        }
        return countryCode + dkBase + dkCheck.toString();
        
      case 'FI': // Finlande : Modulo 11
        // Générer 7 chiffres aléatoires
        let fiBase = '';
        for (let i = 0; i < 7; i++) {
          fiBase += Math.floor(Math.random() * 10).toString();
        }
        let fiSum = 0;
        const fiWeights = [7, 9, 10, 5, 8, 4, 2];
        for (let i = 0; i < 7; i++) {
          fiSum += parseInt(fiBase[i]) * fiWeights[i];
        }
        let fiCheck = fiSum % 11;
        if (fiCheck === 0) {
          fiCheck = 0;
        } else if (fiCheck === 1) {
          // Régénérer si invalide
          return generateVATNumber(countryCode);
        } else {
          fiCheck = 11 - fiCheck;
        }
        return countryCode + fiBase + fiCheck.toString();
        
      case 'SE': // Suède : Modulo 10
        // Générer 11 chiffres aléatoires
        let seBase = '';
        for (let i = 0; i < 11; i++) {
          seBase += Math.floor(Math.random() * 10).toString();
        }
        let seSum = 0;
        for (let i = 0; i < 11; i++) {
          let digit = parseInt(seBase[i]);
          if (i % 2 === 0) {
            digit *= 2;
            if (digit > 9) digit = Math.floor(digit / 10) + (digit % 10);
          }
          seSum += digit;
        }
        const seCheck = (10 - (seSum % 10)) % 10;
        return countryCode + seBase + seCheck.toString();
        
      case 'PL': // Pologne : Modulo 11
        // Générer 9 chiffres aléatoires
        let plBase = '';
        for (let i = 0; i < 9; i++) {
          plBase += Math.floor(Math.random() * 10).toString();
        }
        let plSum = 0;
        const plWeights = [6, 5, 7, 2, 3, 4, 5, 6, 7];
        for (let i = 0; i < 9; i++) {
          plSum += parseInt(plBase[i]) * plWeights[i];
        }
        let plCheck = plSum % 11;
        if (plCheck === 10) {
          // Régénérer si invalide
          return generateVATNumber(countryCode);
        }
        return countryCode + plBase + plCheck.toString();
        
      case 'SK': // Slovaquie : Modulo 11
        // Générer 9 chiffres aléatoires
        let skBase = '';
        for (let i = 0; i < 9; i++) {
          skBase += Math.floor(Math.random() * 10).toString();
        }
        let skSum = 0;
        const skWeights = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        for (let i = 0; i < 9; i++) {
          skSum += parseInt(skBase[i]) * skWeights[i];
        }
        let skCheck = skSum % 11;
        if (skCheck === 10) {
          skCheck = 0;
        }
        return countryCode + skBase + skCheck.toString();
        
      default:
        // Pour les pays sans algorithme connu, générer un format basique
        // Format générique : 8-10 chiffres aléatoires
        const length = Math.floor(Math.random() * 3) + 8; // 8, 9 ou 10 chiffres
        let genericBase = '';
        for (let i = 0; i < length; i++) {
          genericBase += Math.floor(Math.random() * 10).toString();
        }
        return countryCode + genericBase;
    }
  }
  
  /**
   * Liste des 27 codes pays UE supportés
   * @type {Array<string>}
   * @private
   */
  const SUPPORTED_COUNTRIES = [
    'AT', 'BE', 'BG', 'CY', 'CZ', 'DE', 'DK', 'EE', 'EL',
    'ES', 'FI', 'FR', 'HR', 'HU', 'IE', 'IT', 'LT', 'LU',
    'LV', 'MT', 'NL', 'PL', 'PT', 'RO', 'SE', 'SI', 'SK'
  ];
  
  /**
   * Vérifie si un code pays est dans la liste des pays UE supportés
   * @param {string} countryCode - Code pays à vérifier
   * @return {boolean} VRAI si le pays est supporté, FAUX sinon
   * @private
   */
  function isSupportedCountry(countryCode) {
    return SUPPORTED_COUNTRIES.indexOf(countryCode.toUpperCase()) !== -1;
  }
  
  /**
   * Liste les 27 codes pays UE supportés
   * @return {Array<string>} Tableau des codes pays
   */
  function getSupportedCountries() {
    return SUPPORTED_COUNTRIES.slice(); // Retourner une copie
  }
  
  // API publique
  return {
    getVersion: getVersion,
    validateVAT: validateVAT,
    validateVATCompany: validateVATCompany,
    validateVATFull: validateVATFull,
    validateVATBatch: validateVATBatch,
    generateVATNumber: generateVATNumber,
    getSupportedCountries: getSupportedCountries
  };
})();