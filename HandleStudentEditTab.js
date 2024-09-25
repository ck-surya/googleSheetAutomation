function handleStudentTabEdits(e, column, row, editedValue) {
  if (column >= constants.HOUR_START_COL_NUMBER && column <= constants.HOUR_END_COL_NUMBER) {
    notifyStudentSlotBookingToClient(getCellValue(constants.STUDENT_TAB_NAME, constants.STUDENT_NAME_COL + row), editedValue)
    handleIndV(row, editedValue);
  }
  if (editedValue == "Withdrawn") {
    markAsWithdrawn()
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
      console.log(`Cell L${row} is not true, no update made.`);
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

    const slot = rowData[TEACHER_SLOTS_INDEX_IN_TEACHER_ARRAY_DATA_ARRAY];
    const course = rowData[TEACHER_COURSE_INDEX_IN_TEACHER_ARRAY_DATA_ARRAY];

    if (slot === editedSlot && course === editedCourse) {
      entryFound = true;
      updateValuesInTab(tab, index, course);
    }
  });

  if (!entryFound) {
    console.log(`No matching slot/course found for ${editedSlot} and ${editedCourse} in tab ${tab.getName()}.`);
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

