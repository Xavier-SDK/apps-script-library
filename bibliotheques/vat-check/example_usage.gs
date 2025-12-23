/**
 * Exemples d'utilisation de la bibliothèque VIES_VAT_Library
 * 
 * Ce fichier contient des exemples de code pour utiliser la bibliothèque
 * dans vos propres projets Google Apps Script.
 */

/**
 * Exemple 1 : Fonctions personnalisées pour Google Sheets
 * 
 * Ajoutez ces fonctions à votre projet Apps Script lié à un Google Sheets.
 * Elles seront disponibles comme formules dans votre feuille.
 */

/**
 * Valide un numéro de TVA (pour utilisation dans Google Sheets)
 * @param {string} vatNumber - Numéro de TVA complet
 * @return {boolean} VRAI si valide, FAUX sinon
 * @customfunction
 */
function VALIDATE_VAT(vatNumber) {
  return VIES_VAT_Library.validateVAT(vatNumber);
}

/**
 * Retourne le nom de l'entreprise (pour utilisation dans Google Sheets)
 * @param {string} vatNumber - Numéro de TVA complet
 * @return {string} Nom de l'entreprise ou "INVALIDE"
 * @customfunction
 */
function VALIDATE_VAT_COMPANY(vatNumber) {
  return VIES_VAT_Library.validateVATCompany(vatNumber);
}

/**
 * Retourne l'adresse de l'entreprise (pour utilisation dans Google Sheets)
 * @param {string} vatNumber - Numéro de TVA complet
 * @return {string} Adresse de l'entreprise ou "INVALIDE"
 * @customfunction
 */
function VALIDATE_VAT_ADDRESS(vatNumber) {
  var result = VIES_VAT_Library.validateVATFull(vatNumber);
  if (result.valid) {
    return result.address || '';
  }
  return 'INVALIDE';
}

/**
 * Exemple 2 : Validation en batch d'une colonne dans Google Sheets
 * 
 * Cette fonction lit tous les numéros de TVA de la colonne A
 * et écrit les résultats dans les colonnes B (valide/invalide) et C (nom entreprise)
 */
function validateColumnVATs() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var lastRow = sheet.getLastRow();
  
  if (lastRow < 2) {
    SpreadsheetApp.getUi().alert('Aucune donnée à traiter');
    return;
  }
  
  // Lire les numéros de TVA (colonne A, à partir de la ligne 2)
  var vatRange = sheet.getRange(2, 1, lastRow - 1, 1);
  var vatNumbers = vatRange.getValues().flat();
  
  // Valider en batch
  var results = VIES_VAT_Library.validateVATBatch(vatNumbers);
  
  // Préparer les données pour l'écriture
  var statusValues = [];
  var companyValues = [];
  
  for (var i = 0; i < results.length; i++) {
    statusValues.push([results[i].valid ? 'VALIDE' : 'INVALIDE']);
    companyValues.push([results[i].valid ? results[i].companyName : '']);
  }
  
  // Écrire les résultats
  sheet.getRange(2, 2, statusValues.length, 1).setValues(statusValues);
  sheet.getRange(2, 3, companyValues.length, 1).setValues(companyValues);
  
  SpreadsheetApp.getUi().alert('Validation terminée !');
}

/**
 * Exemple 3 : Validation avec gestion d'erreurs détaillée
 */
function validateVATWithDetails(vatNumber) {
  var result = VIES_VAT_Library.validateVATFull(vatNumber);
  
  if (result.error) {
    Logger.log('Erreur lors de la validation : ' + result.error);
    return {
      status: 'ERREUR',
      message: result.error
    };
  }
  
  if (result.valid) {
    return {
      status: 'VALIDE',
      companyName: result.companyName,
      address: result.address,
      requestDate: result.requestDate
    };
  } else {
    return {
      status: 'INVALIDE',
      message: 'Le numéro de TVA n\'est pas valide'
    };
  }
}

/**
 * Exemple 4 : Créer un menu personnalisé dans Google Sheets
 */
function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Validation TVA')
    .addItem('Valider la colonne A', 'validateColumnVATs')
    .addItem('Tester un numéro', 'testVATNumber')
    .addToUi();
}

/**
 * Exemple 5 : Boîte de dialogue pour tester un numéro
 */
function testVATNumber() {
  var ui = SpreadsheetApp.getUi();
  var response = ui.prompt(
    'Test de validation TVA',
    'Entrez un numéro de TVA à valider :',
    ui.ButtonSet.OK_CANCEL
  );
  
  if (response.getSelectedButton() === ui.Button.OK) {
    var vatNumber = response.getResponseText();
    var result = VIES_VAT_Library.validateVATFull(vatNumber);
    
    var message = 'Numéro : ' + vatNumber + '\n\n';
    if (result.valid) {
      message += '✅ VALIDE\n';
      message += 'Entreprise : ' + result.companyName + '\n';
      message += 'Adresse : ' + result.address;
    } else {
      message += '❌ INVALIDE';
      if (result.error) {
        message += '\nErreur : ' + result.error;
      }
    }
    
    ui.alert('Résultat de la validation', message, ui.ButtonSet.OK);
  }
}

/**
 * Exemple 6 : Validation automatique lors de la saisie (via trigger)
 * 
 * Configurez un trigger "onEdit" pour cette fonction dans :
 * Modifications > Déclencheurs > Ajouter un déclencheur
 */
function onEdit(e) {
  var sheet = e.source.getActiveSheet();
  var range = e.range;
  var row = range.getRow();
  var col = range.getColumn();
  
  // Si on modifie la colonne A (numéro de TVA)
  if (col === 1 && row > 1) {
    var vatNumber = range.getValue();
    
    if (vatNumber && vatNumber.toString().trim() !== '') {
      var isValid = VIES_VAT_Library.validateVAT(vatNumber.toString());
      
      // Écrire le résultat dans la colonne B
      sheet.getRange(row, 2).setValue(isValid ? 'VALIDE' : 'INVALIDE');
      
      // Si valide, récupérer le nom de l'entreprise
      if (isValid) {
        var companyName = VIES_VAT_Library.validateVATCompany(vatNumber.toString());
        sheet.getRange(row, 3).setValue(companyName);
      }
    }
  }
}

/**
 * Exemple 7 : Vérifier la version de la bibliothèque
 */
function checkLibraryVersion() {
  var version = VIES_VAT_Library.getVersion();
  Logger.log('Version de la bibliothèque VIES : ' + version);
  return version;
}

/**
 * Exemple 8 : Lister tous les pays supportés
 */
function listSupportedCountries() {
  var countries = VIES_VAT_Library.getSupportedCountries();
  Logger.log('Pays supportés : ' + countries.join(', '));
  return countries;
}

