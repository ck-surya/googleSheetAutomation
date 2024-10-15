function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu("Custom Filter")
    .addItem("Generate Teacher Tab", "generateTeacherTab")
    .addItem("Export Teachers Schedule View", "exportSchedule")
    .addItem("Update Dropdown option", "updateStudentDropDownValues")
    .addItem("Hide Teachers Tab Name", "processHideTeachersTab")
    .addItem("show Teachers Tab Name", "processShowTeachersTab")
    .addItem("Hide Teachers Schedule View Tab Name", "processHideTeachersScheduleView")
    .addItem("Show Teachers Schedule View Tab Name", "processShowTeachersScheduleView")
    .addToUi();
    
    protectRange(constants.TEACHER_MASTER_TAB_NAME,constants.RANGE_TO_PROTECT_IN_MASTER_TAB)
  } 

let isScriptRunning = false;

function handleEdit(e) {
  Logger.log("Trigger the Edit Event");
  const range = e.range;
  const editedTab = range.getSheet();
  if (isStudentTab(editedTab)) {
    Logger.log("updating values for the student tab");
    const oldValue = e.oldValue;
    const editedValue = range.getValue();
    const column = range.getColumn();
    const row = range.getRow();
    processStudentTabEdits(column, row, editedValue, oldValue);
  }
}

function test() {
  protectRange("1 - Paula", "A1:K2");
}
