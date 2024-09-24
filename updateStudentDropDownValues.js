function updateStudentDropDownValues() {
  var allTeacherTab = getAllTeacherIds();
  var courseMapWithCellRef = fetchCourseWiseEmptyCellsForStudents();
  const courseMappedWithTotalSeat = getMapForCourseSlot();
  var courses = courseMappedWithTotalSeat.map(course => course[0]);
  var courseMapWithAvailableSlot = initializeCourseMap(courses);

  allTeacherTab.forEach(teacherTab => {
    const tab = getTab(teacherTab);
    const data = tab.getDataRange().getValues();
    console.log(data)

    processTabData(data, teacherTab, courseMapWithAvailableSlot, courseMappedWithTotalSeat);
  });

  addDropdownValues(courseMapWithAvailableSlot, courseMapWithCellRef);
}

function getAllTeacherIds() {
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

function updateIndVAvailability(teacherTab, slot, course, studentsCount, courseMapWithAvailableSlot) {
  if (studentsCount === 0) {
    if (courseMapWithAvailableSlot && courseMapWithAvailableSlot.indV) {
      if (courseMapWithAvailableSlot.indV[course] !== undefined) {
        courseMapWithAvailableSlot.indV[course].push(teacherTab + "_" + slot + "_" + course);
      } else {
        console.log("Course does not exist in indV: " + course);
      }
    } else {
      console.log("courseMapWithAvailableSlot or indV is not defined");
    }
  }
}

function updateOtherVAvailability(course, studentsCount, courseMappedWithTotalSeat, teacherTab, slot, courseMapWithAvailableSlot) {
  courseMappedWithTotalSeat.forEach(mappedRow => {
    if (mappedRow[0] === course.trim() && mappedRow[1] > studentsCount) {
      courseMapWithAvailableSlot.otherV[course].push(teacherTab + "_" + slot + "_" + course);
    } else {

    }
  });
}

function countNonEmptyStudents(studentArray) {
  return studentArray.filter(student => student.length).length; // Counts non-empty entries  
}
