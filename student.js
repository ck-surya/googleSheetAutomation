function fetchCourseWiseEmptyCellsForStudents() {
  const courseSlots = getMapForCourseSlot();
  var courses = courseSlots.map(course => course[0]);

  const tab = getTab(constants.STUDENT_TAB_NAME);
  const lastRow = tab.getLastRow();
  const dataRange = tab.getRange(constants.STUDENT_NAME_TO_HOURS_END_COL_RANGE + lastRow);

  const values = dataRange.getValues();
  const courseMapWithCell = initializeCourseMap(courses);

  populateCourseMap(values, courseMapWithCell);
  console.log(courseMapWithCell)
  return courseMapWithCell;
}

function populateCourseMap(values, courseMapWithCell) {
  values.forEach((row, rowIndex) => {
    const hoursValues = row.slice(4);

    hoursValues.forEach((cellValue, colIndex) => {
      const cellReference = fetchCellReferenceForEmptySlot(cellValue, colIndex, rowIndex);
      if (cellReference === false)
        return;
      if (row[4] === true) {
        courseMapWithCell.indV[row[2]].push(cellReference);
      } else {
        courseMapWithCell.otherV[row[2]].push(cellReference);
      }
    });
  });
}

function fetchCellReferenceForEmptySlot(cellValue, colIndex, rowIndex) {
  const rowNumber = rowIndex + 4; //TODO: Move the harded value to contants. 
  if (cellValue === "") {
    const cellReference = String.fromCharCode(constants.HOURS_STARTING_COL_INTGER_IN_STUDENT_TAB + colIndex) + rowNumber; 
    var course = getCellValue(constants.STUDENT_TAB_NAME, constants.STUDENT_COURSE_COL_NAME + rowNumber) 
    if (course.length > 0) {
      return cellReference;
    } return false
  } return false
}
