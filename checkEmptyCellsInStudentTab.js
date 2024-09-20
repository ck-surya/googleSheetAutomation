function checkEmptyCells() {
  const studentCourse = getStudentsCourse();
  const courseMappedWithTotalSeat = getMapForCourseSlot();
  var courses = courseMappedWithTotalSeat.map(course => course[0]);


  const tab = getTab("Student");
  const lastRow = tab.getLastRow();
  console.log("I4:" + getCellValue("Meta", "S2") + lastRow)
  const dataRange = tab.getRange("I4:" + getCellValue("Meta", "S2") + lastRow);

  const values = dataRange.getValues();
  const courseMapWithCell = initializeCourseMap(courses);

  populateCourseMap(values, courseMapWithCell);
  console.log(courseMapWithCell)
  return courseMapWithCell;
}

function initializeCourseMap(studentCourses) {
  const courseMapWithCell = {
    indV: {},
    otherV: {}
  };

  studentCourses.forEach(course => {
    courseMapWithCell.indV[course] = [];
    courseMapWithCell.otherV[course] = [];
  });

  return courseMapWithCell;
}

function populateCourseMap(values, courseMapWithCell) {
  values.forEach((row, rowIndex) => {
    //console.log(row);
    const hoursValues = row.slice(4);

    hoursValues.forEach((cellValue, colIndex) => {
      const isEmpty = checkEmpty(cellValue, colIndex, rowIndex);
      if (isEmpty === false) return
      else if (row[4] === true) {
        courseMapWithCell.indV[row[2]].push(isEmpty);
      } else {
        courseMapWithCell.otherV[row[2]].push(isEmpty);
      }
    });
  });
}


function checkEmpty(cellValue, colIndex, rowIndex) {
  const rowNumber = rowIndex + 4;
  if (cellValue === "") {

    const cellReference = String.fromCharCode(77 + colIndex) + rowNumber;
    var course = getCellValue("Student", "K" + rowNumber)

    if (course.length > 0) {
      return cellReference;
    } return false
  } return false
}
