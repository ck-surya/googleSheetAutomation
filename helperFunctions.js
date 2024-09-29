function isWithinHourColumns(column) {
  return column >= constants.HOUR_START_COL_NUMBER && column <= constants.HOUR_END_COL_NUMBER;
}

function getStudentName(row) {
  return getCellValue(constants.STUDENT_TAB_NAME, constants.STUDENT_NAME_COL + row);
}

function isWithdrawalStatus(column, editedValue) {
  return column === constants.COLUMN_STATUS_IN_SUDENT_TAB && editedValue.trim() === constants.STUDENT_STATUS_WITHDRAWN.trim();
}

function addDataValidationDropdown(dropdownOptions, sheetName, rangeForDropdown) {
  const tab = getTab(sheetName);
  const lastRow = tab.getLastRow();
  var rangeForDropdown = tab.getRange(rangeForDropdown);

  const rule = SpreadsheetApp.newDataValidation()
    .requireValueInList(dropdownOptions)
    .setAllowInvalid(false)
    .build();

  rangeForDropdown.setDataValidation(rule);
}

function isCellTrue(sheetName, row, column) {
  return getCellValue(sheetName, column + row) === true;
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

function hideFirstfRow(tabName) {
  const tab = getTab(tabName);
  tab.hideRows(1, 1);
}

function addDataToTab(data, sheetName) {
  const tab = getTab(sheetName);
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