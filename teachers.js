function fetchCourseWiseAvailableSlots() {
  const courseSlots = getMapForCourseSlot();
  const courses = courseSlots.map(course => course[0]);
  const courseMapWithAvailableSlot = initializeCourseMap(courses);

  const allTeachers = getAllTeacherIds();
  allTeachers.forEach(teacherId => {
    const teacherTab = getTab(teacherId);
    const teacherData = teacherTab.getDataRange().getValues();
    processTabData(teacherId, teacherData, courseMapWithAvailableSlot, courseSlots);
  });
  return courseMapWithAvailableSlot;
}

function getAllTeacherIds() {
  return fetchCellValues(constants.TEACHER_MASTER_TAB_NAME, constants.TEACHER_ID_RANGE_STRING);
}

function processTabData(teacherId, teacherData, courseMapWithAvailableSlot, courseSlots) {
  teacherData.forEach((row, index) => {
    if (index < 2) return;

    const slot = row[constants.TEACHER_SLOTS_INDEX_IN_TEACHER_ARRAY_DATA_ARRAY];
    const course = row[constants.TEACHER_COURSE_INDEX_IN_TEACHER_ARRAY_DATA_ARRAY];
    const studentsCount = countNonEmptyStudents(row.slice(2));

    updateIndVAvailability(teacherId, slot, course, studentsCount, courseMapWithAvailableSlot);
    updateOtherVAvailability(teacherId, slot, course, studentsCount, courseMapWithAvailableSlot, courseSlots);
  });
}

function updateIndVAvailability(teacherId, slot, course, studentsCount, courseMapWithAvailableSlot) {
  if (studentsCount === 0) {
    if (courseMapWithAvailableSlot && courseMapWithAvailableSlot.indV) {
      if (courseMapWithAvailableSlot.indV[course] !== undefined) {
        courseMapWithAvailableSlot.indV[course].push(teacherId + "_" + slot + "_" + course);
      } else {
        Logger.log("Course does not exist in indV: " + course);
      }
    } else {
      Logger.log("courseMapWithAvailableSlot or indV is not defined");
    }
  }
}

function updateOtherVAvailability(teacherId, slot, course, studentsCount, courseMapWithAvailableSlot, courseSlots) {
  courseSlots.forEach(mappedRow => {
    if (mappedRow[0] === course.trim() && mappedRow[1] > studentsCount) {
      courseMapWithAvailableSlot.otherV[course].push(teacherId + "_" + slot + "_" + course);
    }
  });
}

function countNonEmptyStudents(studentArray) {
  return studentArray.filter(student => student.length).length;
}

function processHideTeachersTab(){
  const teacherIds = getAllTeacherIds()
  teacherIds.forEach(teacherId => {
    hideTab(teacherId)
  });
}

function processShowTeachersTab(){
  const teacherIds = getAllTeacherIds()
  teacherIds.forEach(teacherId => {
    showTab(teacherId)
  });
}

function processHideTeachersScheduleView(){
  const teacherIds = getAllTeacherIds()
  teacherIds.forEach(teacherId => {
    hideTab(teacherId+"_SCHEDULE_VIEW")
  });
}

function processShowTeachersScheduleView(){
  const teacherIds = getAllTeacherIds()
  teacherIds.forEach(teacherId => {
    showTab(teacherId+"_SCHEDULE_VIEW")
  });
}

