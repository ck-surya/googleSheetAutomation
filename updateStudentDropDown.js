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

function fetchCourseWiseEmptyCellsForStudents() {
  const courseSlots = getMapForCourseSlot();
  const courses = courseSlots.map(course => course[0]);

  const studentTab = getTab(constants.STUDENT_TAB_NAME);
  const lastRow = studentTab.getLastRow();
  const dataRange = studentTab.getRange(constants.STUDENT_NAME_TO_HOURS_END_COL_RANGE + lastRow);

  const values = dataRange.getValues();
  const courseMapWithCell = initializeCourseMap(courses);

  populateCourseMap(values, courseMapWithCell);
  return courseMapWithCell;
}

function populateCourseMap(values, courseMapWithCell) {  
  values.forEach((row, rowIndex) => {
    const hoursValues = row.slice(constants.COLUMN_INDEX_FOR_STUDENT_HOURS);    
    hoursValues.forEach((cellValue, colIndex) => {
      const cellReference = fetchCellReferenceForEmptySlot(cellValue, colIndex, rowIndex);
      if (cellReference === false) return;
      if (row[constants.INDIVIDUAL_COL_NUMBER] === true) {
        courseMapWithCell.indV[row[2]].push(cellReference);
      } else {
        courseMapWithCell.otherV[row[2]].push(cellReference);
      }
    });
  });
}

function fetchCellReferenceForEmptySlot(cellValue, colIndex, rowIndex) {
  const rowNumber = rowIndex + 4;
  if (cellValue === "") {
    const cellReference = String.fromCharCode(constants.COLUMN_NUMBER_HOURS_STARTING_IN_STUDENT_TAB + colIndex) + rowNumber;
    const course = getCellValue(constants.STUDENT_TAB_NAME, constants.STUDENT_COURSE_COL_NAME + rowNumber);
    if (course.length > 0) {
      return cellReference;
    }
    return false;
  }
  return false;
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