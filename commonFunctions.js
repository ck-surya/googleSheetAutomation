function isTeacherTab(sheet, teacherEmailAndId) {
  const teacherTabNames = teacherEmailAndId.map(tab => tab[1]);
  return teacherTabNames.includes(sheet.getName());
}

function isStudentTab(sheet) {
  return sheet.getName() === constants.STUDENT_TAB_NAME;
}

function getMapForCourseSlot() {
  return fetchCellValues(constants.META_TAB_NAME, constants.HOURS_CELL_REFRENCE_IN_META_SHEET, true);
}

function getSlotColumn() {
  return fetchCellValues(constants.META_TAB_NAME, constants.SLOT_RANGE_IN_META_TAB, true);
}

function getAllCourses() {
  const courseMappedWithTotalSeat = getMapForCourseSlot();
  return courseMappedWithTotalSeat.map(course => course[0]);
}

function initializeCourseMap(courses) {
  const courseMapWithCell = {
    indV: {},
    otherV: {}
  };
  courses.forEach(course => {
    courseMapWithCell.indV[course] = [];
    courseMapWithCell.otherV[course] = [];
  });
  return courseMapWithCell;
}

