function handleStudentTabEdits(column, row, editedValue) {
  let updateDropDown = false;
  if (isHourColumns(column)) {
    Logger.log("Updating values for the Slot Booking");
    handleSlotBooking(row, editedValue);    
    updateDropDown = true;    
  } else if (isWithdrawalStatus(column, editedValue)) {
    Logger.log("Updating values for the withdrawn status");
    handleWithdrawalStudent(row);
    updateDropDown = true;    
  }   
  if (updateDropDown) {
    updateStudentDropDownValues();  
  }
}

function handleSlotBooking(row, editedValue) {    
    handleIndV(row, editedValue);    
    notifyStudentSlotBookingToClient(getStudentName(row), editedValue);
}

function handleWithdrawalStudent(row) {
  const studentTabName = constants.STUDENT_TAB_NAME;
  const stdentTab = getTab(studentTabName);
  const range = stdentTab.getRange(constants.COLUMN_HOUR_FIRST_IN_STUDENT_TAB + row + ":" + constants.COLUMN_HOUR_LAST_IN_STUDENT_TAB + row);
  let values = range.getValues();
  const studentName = tab.getRange(constants.STUDENT_NAME_COL + row).getValue();  
  let totalHours = constants.TOTAL_HOURS;
  const valueToSet = Array(totalHours).fill("");
  range.setValues([valueToSet]);
  hideRow(studentTabName,row);
  notifyWithdrawnStudentToClient(studentName, values[0]);
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