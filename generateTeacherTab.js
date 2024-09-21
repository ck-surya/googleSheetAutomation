function generateTeacherTab() {
  const teacherInfo = getAllTeachers();
  const teacherTabTemplate = getTeacherTabTemplate();

  teacherInfo.forEach(teacher => {
    const teacherName = teacher[4];
    const teacherEmail = teacher[3];
    if (getTab(teacherName) === null ) {
      createTeacherTab(teacherName, teacher, teacherTabTemplate,teacherEmail);
    }
  });
}

function createTeacherTab(teacherName, teacher, template,teacherEmail) {
  var constant = getConstants()
  insertNewTab(teacherName);
  addDataToTab([[teacherName,teacherEmail]], teacherName);
  hideRangeOfRows(teacherName);

  const formattedSlots = formatSlots(teacher[6]);
  const dropdownOptions = formatDropdownOptions(teacher[5]);

  addDataToTab(template, teacherName);
  addDataToTab(formattedSlots, teacherName);
  addDataValidationDropdown(dropdownOptions, teacherName,constant.COURSE_RANGE_IN_TEACHER_TAB );
  updateTeacherFormula(teacherName);
}

function formatSlots(slotsString) {
  const slotsArray = slotsString.split(",");
  return slotsArray.map(slot => [slot.trim()]);
}

function formatDropdownOptions(optionsString) {
  return optionsString.split(",").map(option => option.trim());
}