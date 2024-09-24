function onOpen() {  
  var ui = SpreadsheetApp.getUi();  context  
  ui.createMenu("Custom Filter")  
    .addItem("Generate Teacher Tab", "generateTeacherTab")  
    .addItem("Update Dropdown option","updateStudentDropDownValues")  
    .addToUi();  
}  

var constants = getConstants();

function handleEdit(e) {
  console.log("Trigger the Edit Event");

  const range = e.range;
  const editedTab = range.getSheet();
  const editedValue = range.getValue();

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

  if (editedValue ===constants.STUDENT_STATUS) {
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
  return sheet.getName() ===constants.STUDENT_TAB_NAME;
}

function getCellValue(tabName, cell) {
  const tab = getTab(tabName);
  const cellReference = cell;
  const cellValue = tab.getRange(cellReference).getValue();
  return cellValue;
}

function getMapForCourseSlot() {
  return fetchCellValues(constants.META_TAB_NAME, constants.HOURS_CELL_REFRENCE_IN_META_SHEET, true);
}

function getSlotColumn() {
  return fetchCellValues(constants.META_TAB_NAME, constants.SLOT_RANGE_IN_META_TAB, true);
}