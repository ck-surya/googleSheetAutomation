function handleStudentTabEdits(e, column, row, editedValue) {
  if (column >= constants.HOUR_START_COL_NUMBER && column <= constants.HOUR_END_COL_NUMBER) {
    notifyStudentSlotBookingToClient(getCellValue(constants.STUDENT_TAB_NAME, constants.STUDENT_NAME_COL + row), editedValue)
    handleIndV(row, editedValue);
  }  
  if (editedValue === constants.STUDENT_STATUS) {
    Logger.log("updating values for the withdrawn tab")
    markAsWithdrawn();
  }
  updateStudentDropDownValues();
}

function handleIndV(row, editedValue) {
  try {
    if (isCellTrue(constants.STUDENT_TAB_NAME, row)) {
      const [tabName, editedSlot, editedCourse] = editedValue.split("_");
      const tab = getTab(tabName);

      if (!tab) {
        throw new Error(`Tab "${tabName}" not found.`);
      }
      const data = tab.getDataRange().getValues();
      processDataEntries(data, editedSlot, editedCourse, tab);
    } else {
      Logger.log(`Cell L${row} is not true, no update made.`);
    }
  } catch (error) {
    console.error("Error in handleIndV:", error.message);
  }
}

function isCellTrue(sheetName, row) {
  return getCellValue(sheetName, constants.INDIVIDUAL_CELL + row) === true;
}

function processDataEntries(data, editedSlot, editedCourse, tab) {
  let entryFound = false;
  data.forEach((rowData, index) => {
    if (index === 0) return; // Skip header row  

    const slot = rowData[constants.TEACHER_SLOTS_INDEX_IN_TEACHER_ARRAY_DATA_ARRAY];
    const course = rowData[constants.TEACHER_COURSE_INDEX_IN_TEACHER_ARRAY_DATA_ARRAY];

    if (slot === editedSlot && course === editedCourse) {
      entryFound = true;
      updateValuesInTab(tab, index, course);
    }
  });

  if (!entryFound) {
    Logger.log(`No matching slot/course found for ${editedSlot} and ${editedCourse} in tab ${tab.getName()}.`);
  }
}

function updateValuesInTab(tab, index, course) {
  const courseMappedWithTotalSeat = getMapForCourseSlot();

  if (!courseMappedWithTotalSeat) {
    throw new Error("Course mapping data not found.");
  }

  courseMappedWithTotalSeat.forEach((courseRow) => {
    if (courseRow[0] === course) {
      const repeatValue = courseRow[1] - 1;
      const range = tab.getRange(constants.RANGE_FOR_ADDING_UNDERSCORE_IN_TEACHER_TAB + (index + 1) + ":" + getColumnFromIndex(3 + repeatValue) + (index + 1));
      const valueToSet = repeatValue > 0 ? Array(repeatValue).fill("___") : [];
      range.setValues([valueToSet]);
      updateStudentDropDownValues();
    }
  });
}

function fetchCourseWiseEmptyCellsForStudents() {
  const courseSlots = getMapForCourseSlot();
  var courses = courseSlots.map(course => course[0]);

  const tab = getTab(constants.STUDENT_TAB_NAME);
  const lastRow = tab.getLastRow();
  const dataRange = tab.getRange(constants.STUDENT_NAME_TO_HOURS_END_COL_RANGE + lastRow);

  const values = dataRange.getValues();
  const courseMapWithCell = initializeCourseMap(courses);

  populateCourseMap(values, courseMapWithCell);
  Logger.log(courseMapWithCell)
  return courseMapWithCell;
}

function populateCourseMap(values, courseMapWithCell) {
  values.forEach((row, rowIndex) => {
    const hoursValues = row.slice(constants.SLICE_TEACHER_DATA_FOR_THE_STUDENT_COUNT);

    hoursValues.forEach((cellValue, colIndex) => {
      const cellReference = fetchCellReferenceForEmptySlot(cellValue, colIndex, rowIndex);
      if (cellReference === false)
        return;
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
    const cellReference = String.fromCharCode(constants.HOURS_STARTING_COL_INTGER_IN_STUDENT_TAB + colIndex) + rowNumber; 
    var course = getCellValue(constants.STUDENT_TAB_NAME, constants.STUDENT_COURSE_COL_NAME + rowNumber) 
    if (course.length > 0) {
      return cellReference;
    } return false
  } return false
}
