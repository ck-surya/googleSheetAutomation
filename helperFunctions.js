function protectRange(tab_name, range_string) {
  Logger.log(tab_name);
  ss = getTab(tab_name);  
  var range = ss.getRange(range_string);
  var protection = range.protect().setDescription('protected range');
  var me = Session.getEffectiveUser();
  protection.addEditor(me);
  protection.removeEditors(protection.getEditors());    
  protection.setWarningOnly(true);
}

function addDataValidationDropdown(dropdownOptions, tabName, rangeForDropdown) {
  const tab = getTab(tabName);
  const lastRow = tab.getLastRow();
  var rangeForDropdown = tab.getRange(rangeForDropdown);

  const rule = SpreadsheetApp.newDataValidation()
    .requireValueInList(dropdownOptions)
    .setAllowInvalid(false)
    .build();

  rangeForDropdown.setDataValidation(rule);
}

function addValidationToEmptyCells(emptyCellReferences, tabName, options) {  
  const tab = getTab(tabName);
  const rangeString = emptyCellReferences.join(',');

  const rule = SpreadsheetApp.newDataValidation()
    .requireValueInList(options, true)
    .setAllowInvalid(false)
    .build();

  emptyCellReferences.forEach(cell => {
    tab.getRange(cell).setDataValidation(rule);
  });

  Logger.log("Validation added to: " + rangeString);
}

function isCellTrue(tabName, row, column) {
  return getCellValue(tabName, column + row) === true;
}

function getCellValue(tabName, cell) {
  const tab = getTab(tabName);
  const cellReference = cell;
  const cellValue = tab.getRange(cellReference).getValue();
  return cellValue;
}

function isValueEmpty(value) {
  return value.length === 0;
}

function hideRow(tabName,rowNumber) {
  const tab = getTab(tabName);
  if (!tab) {  
    Logger.log('Tab not found: ' + tabName);  
    return;  
  }  
  
  if (rowNumber < 1) {  
    Logger.log('Invalid row number: ' + rowNumber);  
    return;  
  }  

  tab.hideRows(rowNumber);  
  Logger.log('Row ' + rowNumber + ' hidden in tab: ' + tabName);  
}

function addDataToTab(data, tabName) {
  const tab = getTab(tabName);
  const rangeToAddData = tab.getRange(tab.getLastRow() + 1, 1, data.length, data[0].length);
  rangeToAddData.setValues(data);
}

function getActiveSs() {
  return SpreadsheetApp.getActiveSpreadsheet();
}

function formatOptions(options) {
  return options.split(",").map(option => option.trim());
}

function getTab(name) {
  const ss = getActiveSs();
  return ss.getSheetByName(name);
}

function insertNewTab(name) {
  SpreadsheetApp.flush();
  const ss = getActiveSs().insertSheet();
  SpreadsheetApp.flush();
  ss.setName(name);
}

function fetchValuesInRange(tab_name, range) {
  return getTab(tab_name).getRange(range).getValues();
}

function fetchCellValues(tab_name, range, make_2d = false) {
  const values = fetchValuesInRange(tab_name, range);
  const result = [];

  for (let row in values) {
    const inner = [];
    for (let col in values[row]) {
      if (values[row][col]) {
        if (make_2d) {
          inner.push(values[row][col]);
        } else {
          result.push(values[row][col]);
        }
      }
    }
    if (make_2d) {
      result.push(inner);
    }
  }
  return result;
}

function fetchCellValue(tab_name, range) {
  return getTab(tab_name).getRange(range).getValue();
}

function getColumnFromIndex(index) {
  let column = "";
  while (index > 0) {
    index--;
    column = String.fromCharCode((index % 26) + 'A'.charCodeAt(0)) + column;
    index = Math.floor(index / 26);
  }
  return column;
}

function createValueSet(valueCount, value) {  
  return Array(valueCount).fill(value);
} 

function setValuesForRange(range, value, valueCount) {  
  const valueToSet = createValueSet(valueCount, value);  
  range.setValues([valueToSet]);   
}

function showTab(tabName){
  getTab(tabName).showSheet()
}

function hideTab(tabName){
  getTab(tabName).hideSheet()
}
