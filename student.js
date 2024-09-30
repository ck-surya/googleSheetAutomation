function handleStudentTabEdits(e, column, row, editedValue) {
  if (isWithinHourColumns(column)) {
    notifyStudentSlotBookingToClient(getStudentName(row), editedValue);
    handleIndV(row, editedValue);
  } else if (isWithdrawalStatus(column, editedValue)) {
    Logger.log("Updating values for the withdrawn tab");
    handleWithdrawalStudent(row);
  }
  updateStudentDropDownValues();
}

function handleWithdrawalStudent(row) {
  const studentTabName = constants.STUDENT_TAB_NAME
  const tab = getTab(studentTabName)
  const range = tab.getRange(constants.HOURS_FIRST_COL_NAME_IN_STUDENT_TAB+row+":"+constants.HOURS_LAST_COL_NAME_IN_STUDENT_TAB+row);
  data = range.getValues()
  const studentName = tab.getRange(constants.STUDENT_NAME_COL + row).getValue();
  notifyWithdrawnStudentToClient(studentName, data)
  totalHours = constants.TOTAL_HOURS
  const valueToSet = Array(totalHours).fill("");
  range.setValues([valueToSet]);
  console.log(range.getValues());
  hideRow(studentTabName,row);
}

function handleIndV(row, editedValue) {
  try {
    if (isCellTrue(constants.STUDENT_TAB_NAME, row, constants.COLUMN_NAME_INDIVIDUAL_IN_STUDENT_TAB)) {
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

function updateValuesInTab(tab, index, course, isWithdrawn) {
  const courseMappedWithTotalSeat = getMapForCourseSlot();

  if (!courseMappedWithTotalSeat) {
    throw new Error("Course mapping data not found.");
  }

  const courseRow = courseMappedWithTotalSeat.find(row => row[0] === course);

  if (courseRow) {
    const repeatValue = courseRow[1] - 1;
    const range = tab.getRange(`${constants.RANGE_FOR_ADDING_UNDERSCORE_IN_TEACHER_TAB}${index + 1}:${getColumnFromIndex(3 + repeatValue)}${index + 1}`);

    const valueToSet = isWithdrawn ? Array(repeatValue).fill("") : (repeatValue > 0 ? Array(repeatValue).fill("___") : []);
    range.setValues([valueToSet]);
    updateStudentDropDownValues();
  }
}

function fetchCourseWiseEmptyCellsForStudents() {
  const courseSlots = getMapForCourseSlot();
  const courses = courseSlots.map(course => course[0]);

  const tab = getTab(constants.STUDENT_TAB_NAME);
  const lastRow = tab.getLastRow();
  const dataRange = tab.getRange(constants.STUDENT_NAME_TO_HOURS_END_COL_RANGE + lastRow);

  const values = dataRange.getValues();
  const courseMapWithCell = initializeCourseMap(courses);

  populateCourseMap(values, courseMapWithCell);
  return courseMapWithCell;
}

function populateCourseMap(values, courseMapWithCell) {
  values.forEach((row, rowIndex) => {
    const hoursValues = row.slice(constants.SLICE_TEACHER_DATA_FOR_THE_STUDENT_COUNT);

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
    const cellReference = String.fromCharCode(constants.HOURS_STARTING_COL_INTGER_IN_STUDENT_TAB + colIndex) + rowNumber;
    const course = getCellValue(constants.STUDENT_TAB_NAME, constants.STUDENT_COURSE_COL_NAME + rowNumber);
    if (course.length > 0) {
      return cellReference;
    }
    return false;
  }
  return false;
}