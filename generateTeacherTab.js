function generateTeacherTab() {
  const teacherInfo = getAllTeachers();
  const teacherTabTemplate = getTeacherTabTemplate();

  teacherInfo.forEach(teacher => {
    const teacherName = teacher[4]; //TODO: Move the harded value to contants. 
    if (getTab(teacherName) === null ) {
      const teacherEmail = teacher[3]; //TODO: Move the harded value to contants. 
      const courses = teacher[5]; //TODO: Move the harded value to contants. 
      const slots = teacher[6]; //TODO: Move the harded value to contants. 
      createTeacherTab(teacherName, teacherEmail, courses, slots, teacherTabTemplate);
    }
  });
}

function getAllTeachers() {
  var masterSheetName = constants.TEACHER_MASTER_TAB_NAME;
  var lastRow = getTab(masterSheetName).getLastRow();
  return fetchValuesInRange(masterSheetName, "A2:G" + lastRow); //TODO: Move the harded value to contants. 
}

function getTeacherTabTemplate() {
  return fetchCellValues(constants.GET_TEACHER_TEMPLATE_TAB_NAME,constants.TEACHER_DETAILS_RANGE, true);
}

function createTeacherTab(teacherName, teacherEmail, courses, slots, template) {
  insertNewTab(teacherName);
  addDataToTab([[teacherName,teacherEmail]], teacherName);
  hideFirstfRow(teacherName);

  const formattedSlots = formatSlots(slots);
  const courseOptions = formatCourseOptions(courses);

  addDataToTab(template, teacherName);
  addDataToTab(formattedSlots, teacherName);
  addDataValidationDropdown(dropdownOptions, teacherName, constants.COURSE_RANGE_IN_TEACHER_TAB);
  updateTeacherFormula(teacherName);
}

function formatSlots(slots) {
  return formatOptions(slots);
}

function formatCourseOptions(courses) {
  return formatOptions(courses);
}
