function addDropdownValues(courseMapWithAvailableSlot, courseMapWithCellRef) {
  const keys = Object.keys(courseMapWithAvailableSlot);
  keys.forEach(key => {
    const slots = courseMapWithAvailableSlot[key];
    const cells = courseMapWithCellRef[key];

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
  const tab = getTab(tabName)
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

