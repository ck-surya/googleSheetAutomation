function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu("Custom Filter")
    .addItem("Generate Teacher Tab", "generateTeacherTab")
    .addItem("Update Dropdown option", "updateStudentDropDownValues")
    .addToUi();
}
let isScriptRunning = false; 


function handleEdit(e) {
  Logger.log("Trigger the Edit Event");
  const range = e.range;
  const editedTab = range.getSheet();
  const teacherEmailAndId = getAllTeacherIdsAndEmails();

  if (isTeacherTab(editedTab, teacherEmailAndId)) {
    Logger.log("updating values for the teacher tab");
    processTeacherEdit(column);
  } else if (isStudentTab(editedTab)) {
    Logger.log("updating values for the student tab");
    const editedValue = range.getValue();
    const column = range.getColumn();
    const row = range.getRow();    
    handleStudentTabEdits(e, column, row, editedValue);
  }
}

function test() {
  protectRange("1 - Paula", "A1:K2");
}