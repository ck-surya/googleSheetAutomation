function updateStudentDropDownValues() {
  if (isScriptRunning) {
    SpreadsheetApp.getUi().alert(
      "Script is already running. Please wait until it finishes."
    );
    return;
  }

  isScriptRunning = true;
  SpreadsheetApp.getActiveSpreadsheet().toast(
    "Updating dropdown options...",
    "Loading..."
  );
  try {
    const emptyCellMap = fetchCourseWiseEmptyCellsForStudents();
    const availableSlotsMap = fetchAvailableSlotsForCourses();
    addDropdownValues(availableSlotsMap, emptyCellMap);
  } catch (error) {
    SpreadsheetApp.getUi().alert(
      "Error updating dropdown options: " + error.message
    );
  } finally {
    isScriptRunning = false;
    SpreadsheetApp.getActiveSpreadsheet().toast(
      "Dropdown options updated!",
      "Success"
    );
  }
}

function addDropdownValues(availableSlotsMap, emptyCellMap) {
  const keys = Object.keys(availableSlotsMap);
  keys.forEach(key => {
    const slots = availableSlotsMap[key];
    const cells = emptyCellMap[key];
    processCourses(slots, cells);
  });
}

function processCourses(slots, cells) {
  Object.keys(slots).forEach(course => {
    if (cells.hasOwnProperty(course)) {
      const cellsArray = cells[course];
      const slotsArray = slots[course];
      handleValidation(cellsArray, slotsArray);
    }
  });
}

function handleValidation(cellsArray, slotsArray) {
  if (cellsArray.length > 0 && slotsArray.length > 0) {
    addValidationToEmptyCells(cellsArray, constants.STUDENT_TAB_NAME, slotsArray);
  } else if (slotsArray.length === 0 && cellsArray.length > 0) {
    addValidationToEmptyCells(cellsArray, constants.STUDENT_TAB_NAME, ["Not Available"]);
  }
}

function addValidationToEmptyCells(array, tabName, options) {
  const emptyCellReferences = array;
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