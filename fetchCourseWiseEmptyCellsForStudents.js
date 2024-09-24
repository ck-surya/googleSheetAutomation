function fetchCourseWiseEmptyCellsForStudents() {
  const courseSlots = getMapForCourseSlot();
  var courses = courseSlots.map(course => course[0]);

  const tab = getTab("Student");
  const lastRow = tab.getLastRow();
  const dataRange = tab.getRange("I4:" + getCellValue("Meta", "S2") + lastRow);

  const values = dataRange.getValues();
  const courseMapWithCell = initializeCourseMap(courses);

  populateCourseMap(values, courseMapWithCell);
  console.log(courseMapWithCell)
  return courseMapWithCell;
}

function populateCourseMap(values, courseMapWithCell) {
  values.forEach((row, rowIndex) => {
    //console.log(row);
    const hoursValues = row.slice(4);

    hoursValues.forEach((cellValue, colIndex) => {
      const cellReference = fetchCellReferenceForEmptySlot(cellValue, colIndex, rowIndex);
      if (cellReference === false) 
        return;
      if (row[4] === true) {
        courseMapWithCell.indV[row[2]].push(isEmpty);
      } else {
        courseMapWithCell.otherV[row[2]].push(isEmpty);
      }
    });
  });
}

function fetchCellReferenceForEmptySlot(cellValue, colIndex, rowIndex) {
  const rowNumber = rowIndex + 4; //TODO: Move the harded value to contants. 
  if (cellValue === "") {
    const cellReference = String.fromCharCode(77 + colIndex) + rowNumber; //TODO: Move the harded value to contants. 
    var course = getCellValue("Student", "K" + rowNumber) //TODO: Move the harded value to contants. 
    if (course.length > 0) {
      return cellReference;
    } return false
  } return false
}
