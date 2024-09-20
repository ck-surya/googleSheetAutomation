function onOpen() {
  SpreadsheetApp.getUi().createMenu("Custom Filter")
    .addItem("Generate Teacher Tab", "generateTeacherTab")
    .addToUi();
}

var constant = getConstants()

function generateTeacherTab() {
  const teacherInfo = getAllTeachers();
  const teacherTabTemplate = getTeacherTabTemplate();

  teacherInfo.forEach(teacher => {
    const teacherName = teacher[0];
    if (getTab(teacherName) === null) {
      createTeacherTab(teacherName, teacher, teacherTabTemplate);
    }
  });
}

function createTeacherTab(teacherName, teacher, template) {
  var constant = getConstants()
  insertNewTab(teacherName);
  addDataToTab([[teacherName]], teacherName);
  hideRangeOfRows(teacherName);

  const formattedSlots = formatSlots(teacher[2]);
  const dropdownOptions = formatDropdownOptions(teacher[1]);

  addDataToTab(template, teacherName);
  addDataToTab(formattedSlots, teacherName);
  addDataValidationDropdown(dropdownOptions, teacherName,constant.COURSE_RANGE_IN_TEACHER_TAB );
  updateTeacherFormula(teacherName);
}

function formatSlots(slotsString) {
  const slotsArray = slotsString.split(",");
  return slotsArray.map(slot => [slot.trim()]);
}

function formatDropdownOptions(optionsString) {
  return optionsString.split(",").map(option => option.trim());
}

function handleEdit(e) {
  var constant = getConstants()
  console.log("Trigger the Edit Event");

  const range = e.range;
  const editedTab = range.getSheet();
  const editedValue = range.getValue();
  //console.log(editedValue)
  // if (isValueEmpty(editedValue)) return;

  const teacherEmailAndId = getTeacherNameAndEmailId();
  const column = range.getColumn();
  const row = range.getRow();

  if (isTeacherTab(editedTab, teacherEmailAndId)) {
    console.log("updating values for the teacher tab")
    processTeacherEdit(range, editedTab, editedValue, teacherEmailAndId);
  }

  if (isStudentTab(editedTab)) {
    console.log("updating values for the student tab")
    handleStudentTabEdits(e, column, row, editedValue);
  }

  if (editedValue ===constant.STUDENT_STATUS) {
    console.log("updating values for the withdrawn tab")
    markAsWithdrawn();
  }
}

function isValueEmpty(value) {
  return value.length === 0;
}

function isTeacherTab(sheet, teacherEmailAndId) {
  const teacherTabNames = teacherEmailAndId.map(tab => tab[1]);
  return teacherTabNames.includes(sheet.getName());
}


function isStudentTab(sheet) {
  return sheet.getName() === STUDENT_TAB_NAME;
}











function getCellValue(tabName, cell) {
  const tab = getTab(tabName);
  const cellReference = cell;
  const cellValue = tab.getRange(cellReference).getValue();
  return cellValue;
}

function getStudentsCourse() {
  var tab = getTab("Student");

  var lastRow = tab.getLastRow();
  return fetchCellValues("Student", getCourseColumnRange(lastRow));
}

function getCourseColumnRange(lastRow) {
  return "K4:K" + lastRow;
}
function getTeacherTabNameFromMasterTab() {
  return fetchCellValues(getTeacherMasterTabName(), constant.TEACHER_ID_RANGE_STRING);
}


function getMapForCourseSlot() {
  return fetchCellValues(constant.META_TAB_NAME, constant.HOURS_CELL_REFRENCE_IN_META_SHEET, true);
}

function getSlotColumn() {
  return fetchCellValues(constant.META_TAB_NAME, "P2:S2", true);
}

function addDataValidationDropdown(dropdownOptions, sheetName, startCell) {
  var tab = getTab(sheetName);
  var lastRow = tab.getLastRow();
  var rangeForDropdown = tab.getRange(startCell + lastRow);

  var rule = SpreadsheetApp.newDataValidation()
    .requireValueInList(dropdownOptions)
    .setAllowInvalid(false)
    .build();

  rangeForDropdown.setDataValidation(rule);
}

function getAllTeachers() {
  var masterSheetName = getTeacherMasterTabName();
  var lastRow = getTab(masterSheetName).getLastRow();
  return fetchValuesInRange(masterSheetName, "E2:G" + lastRow);
}

function addDataToTab(data, sheetName) {
  var tab = getTab(sheetName);
  var rangeToAddData = tab.getRange(tab.getLastRow() + 1, 1, data.length, data[0].length);
  rangeToAddData.setValues(data);
}

function getTeacherTabTemplate() {
  return fetchCellValues(getTeacherTemplateTabName(), "A2:K2", true);
}

function getTeacherMasterTabName() {
  return "Teacher Master";
}

function getTeacherTemplateTabName() {
  return "Teacher Template";
}

function getMetaTabName() {
  return "Meta";
}

function getActiveSs() {
  return SpreadsheetApp.getActiveSpreadsheet();
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


function hideRangeOfRows(tabName) {
  const tab = getTab(tabName)
  tab.hideRows(1, 1); // Hides rows 5 to 10 (6 rows total)  
}

function unhideSpecificRow() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  sheet.hideRows(5); // Unhides row 5  
}

function generarListado() {
  var hojaOrigen = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("alumnes"); // Cambia "Hoja Origen" al nombre real de tu hoja
  var hojaIndex = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("index"); // Cambia "index" al nombre real de tu hoja

  var datosOrigen = hojaOrigen.getRange("I4:N200").getValues(); // Obtener los datos del rango I3:N200

  var listado = [];
  for (var i = 0; i < datosOrigen.length; i++) {
    var alumno = datosOrigen[i][0];
    for (var j = 2; j < datosOrigen[i].length; j++) {
      var clase = datosOrigen[i][j];
      if (clase != "") {
        listado.push([alumno, clase]);
      }
    }
  }

  // Limpiar la hoja "index" antes de escribir el nuevo listado
  hojaIndex.getRange("A:B").clear();

  // Escribir el nuevo listado en la hoja "index"
  hojaIndex.getRange(1, 1, listado.length, 2).setValues(listado);
}



