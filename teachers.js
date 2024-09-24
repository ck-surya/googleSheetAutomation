function fetchAvailableSlotsForCourses() {
	const courseSlots = getMapForCourseSlot();
  	var courses = courseSlots.map(course => course[0]);
  	var courseMapWithAvailableSlot = initializeCourseMap(courses);

	var allTeachers = getAllTeacherIds();
  	allTeachers.forEach(teacherId => {
    	const teacherTab = getTab(teacherId);
    	const teacherData = tab.getDataRange().getValues();
    	//console.log(data)
    	processTabData(teacherId, teacherData, courseMapWithAvailableSlot, courseSlots);
  });
  return courseMapWithAvailableSlot;
}

function getAllTeacherIds() {
  return fetchCellValues(constants.TEACHER_MASTER_TAB_NAME, constants.TEACHER_ID_RANGE_STRING);
}

function processTabData(teacherId, teacherData, courseMapWithAvailableSlot, courseSlots) {
  teacherData.forEach((row, index) => {
    if (index < 2) return; // Skip header  

    const slot = row[0]; //TODO: rmeove hardcoding values to constants
    const course = row[1]; //TODO: rmeove hardcoding values to constants
    const studentsCount = countNonEmptyStudents(row.slice(2));
    //console.log(teacherTab + "_" + slot + "_" + course, studentsCount)

    updateIndVAvailability(teacherId, slot, course, studentsCount, courseMapWithAvailableSlot);
    updateOtherVAvailability(teacherId, slot, course, studentsCount, courseMapWithAvailableSlot, courseSlots);
  });
}

function updateIndVAvailability(teacherId, slot, course, studentsCount, courseMapWithAvailableSlot) {
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

function updateOtherVAvailability(teacherId, slot, course, studentsCount, courseMapWithAvailableSlot, courseSlots) {
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
