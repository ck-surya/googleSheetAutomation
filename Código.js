function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu("Custom Filter")
    .addItem("Generate Teacher Tab", "generateTeacherTab")
    .addItem("Update Dropdown option", "updateStudentDropDownValues")
    .addToUi();
}

var constants = getConstants();

function handleEdit(e) {
  Logger.log("Trigger the Edit Event");

  const range = e.range;
  const editedTab = range.getSheet();
  const editedValue = range.getValue();

  const teacherEmailAndId = getAllTeacherIdsAndEmails();
  const column = range.getColumn();
  const row = range.getRow();

  if (isTeacherTab(editedTab, teacherEmailAndId)) {
    Logger.log("updating values for the teacher tab")
    processTeacherEdit(column);
  }

  if (isStudentTab(editedTab)) {
    Logger.log("updating values for the student tab")
    handleStudentTabEdits(e, column, row, editedValue);
  }
}