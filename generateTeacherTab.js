function generateTeacherTab() {
  const teacherInfo = getAllTeachers();
  const teacherTabTemplate = getTeacherTabTemplate();

  teacherInfo.forEach(teacher => {
    const teacherName = teacher[constants.TEACHER_NAME_INDEX_IN_TEACHER_ARRAY];
    if (getTab(teacherName) === null) {
      const teacherEmail = teacher[constants.TEACHER_EMAIL_INDEX_IN_TEACHER_ARRAY];
      const courses = teacher[constants.TEACHER_COURSES_INDEX_IN_TEACHER_ARRAY];
      const slots = teacher[constants.TEACHER_SLOTS_INDEX_IN_TEACHER_ARRAY];
      createTeacherTab(teacherName, teacherEmail, courses, slots, teacherTabTemplate);
    }
  });
}

function getAllTeachers() {
  var masterSheetName = constants.TEACHER_MASTER_TAB_NAME;
  var lastRow = getTab(masterSheetName).getLastRow();
  return fetchValuesInRange(masterSheetName, TEACHER_DATA_RANGE_IN_MASTER_TAB + lastRow);
}

function getTeacherTabTemplate() {
  return fetchCellValues(constants.GET_TEACHER_TEMPLATE_TAB_NAME, constants.TEACHER_DETAILS_RANGE, true);
}

function createTeacherTab(teacherName, teacherEmail, courses, slots, template) {
  insertNewTab(teacherName);
  addDataToTab([[teacherName, teacherEmail]], teacherName);
  hideFirstfRow(teacherName);

  const formattedSlots = formatSlots(slots);
  const courseOptions = formatCourseOptions(courses);

  addDataToTab(template, teacherName);
  addDataToTab(formattedSlots, teacherName);

  lastRow = getTab(teacherName).getLastRow();
  addDataValidationDropdown(dropdownOptions, teacherName, constants.COURSE_RANGE_IN_TEACHER_TAB + lastRow);
  updateTeacherFormula(teacherName);
}

function formatSlots(slots) {
  return formatOptions(slots);
}

function formatCourseOptions(courses) {
  return formatOptions(courses);
}
