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
    addValidationToEmptyCells(cellsArray, "Student", slotsArray);
  } else if (slotsArray.length === 0 && cellsArray.length > 0) {
    addValidationToEmptyCells(cellsArray, "Student", ["Not Available"]);
  }
}

function addValidationToEmptyCells(array, tabName, options) {
  //console.log(options)
  const emptyCellReferences = array;
  //console.log(array)
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

