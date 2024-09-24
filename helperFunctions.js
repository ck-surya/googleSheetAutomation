function addDataValidationDropdown(dropdownOptions, sheetName, startRange) { //TODO: fix this to make it more generic
  var tab = getTab(sheetName);
  var lastRow = tab.getLastRow();
  var rangeForDropdown = tab.getRange(startRange + lastRow);

  var rule = SpreadsheetApp.newDataValidation()
    .requireValueInList(dropdownOptions)
    .setAllowInvalid(false)
    .build();

  rangeForDropdown.setDataValidation(rule);
}

function hideFirstfRow(tabName) {
  const tab = getTab(tabName)
  tab.hideRows(1, 1);  
}

function addDataToTab(data, sheetName) {
  var tab = getTab(sheetName);
  var rangeToAddData = tab.getRange(tab.getLastRow() + 1, 1, data.length, data[0].length);
  rangeToAddData.setValues(data);
}

function getActiveSs() {
  return SpreadsheetApp.getActiveSpreadsheet();
}

function formatOptions(options) {
  return options.split(",").map(option => option.trim());
}

function getTab(name) {
  var ss = getActiveSs();
  return ss.getSheetByName(name); //The name of the sheet tab where you are sending the info
}

function insertNewTab(name) {
  SpreadsheetApp.flush();
  ss = getActiveSs().insertSheet();
  SpreadsheetApp.flush();
  ss.setName(name);
}

function fetchValuesInRange(tab_name, range) {
  return getTab(tab_name).getRange(range).getValues();
}

function fetchCellValues(tab_name, range, make_2d = false) {
  var values = fetchValuesInRange(tab_name, range);
  var result = [];
  for (var row in values) {
    var inner = [];
    for (var col in values[row]) {
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
  // Logger.log(result);
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

