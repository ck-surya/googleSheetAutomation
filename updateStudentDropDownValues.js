function updateStudentDropDownValues() {
  var allTeacherTab = getTeacherTabNameFromMasterTab();
  var courseMapWithCellRef = checkEmptyCells();
  const courseMappedWithTotalSeat = getMapForCourseSlot();
  var courses = courseMappedWithTotalSeat.map(course => course[0]);

  var courseMapWithAvailableSlot = {
    indV: {},
    otherV: {}
  };

  courses.forEach(course => {
    courseMapWithAvailableSlot.indV[course] = [];
    courseMapWithAvailableSlot.otherV[course] = [];
  });

  console.log(courseMapWithAvailableSlot);

  allTeacherTab.forEach(teacherTab => {
    const tab = getTab(teacherTab);
    const data = tab.getDataRange().getValues();
    console.log(data)

    processTabData(data, teacherTab, courseMapWithAvailableSlot, courseMappedWithTotalSeat);
  });

  addDropdownValues(courseMapWithAvailableSlot, courseMapWithCellRef);
}

function getTeacherTabNameFromMasterTab() {
  return fetchCellValues(constants.TEACHER_MASTER_TAB_NAME, constants.TEACHER_ID_RANGE_STRING);
}

function processTabData(data, teacherTab, courseMapWithAvailableSlot, courseMappedWithTotalSeat) {
  countNonEmptyStudents
  data.forEach((row, index) => {
    if (index < 2) return; // Skip header  

    const slot = row[0];
    const course = row[1];
    const studentsCount = countNonEmptyStudents(row.slice(2));
    console.log(teacherTab + "_" + slot + "_" + course, studentsCount)

    updateIndVAvailability(teacherTab, slot, course, studentsCount, courseMapWithAvailableSlot);
    updateOtherVAvailability(course, studentsCount, courseMappedWithTotalSeat, teacherTab, slot, courseMapWithAvailableSlot);
  });
}

function countNonEmptyStudents(studentArray) {
  return studentArray.filter(student => student.length).length; // Counts non-empty entries  
}
