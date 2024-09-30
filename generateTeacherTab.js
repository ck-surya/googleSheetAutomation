function generateTeacherTab() {
  const teacherInfo = getAllTeachers();
  const teacherTabTemplate = getTeacherTabTemplate();

  teacherInfo.forEach(teacher => {
    const teacherId = teacher[constants.TEACHER_ID_INDEX_IN_TEACHER_ARRAY];
    if (getTab(teacherId) === null) {
      const teacherEmail = teacher[constants.TEACHER_EMAIL_INDEX_IN_TEACHER_ARRAY];
      const courses = teacher[constants.TEACHER_COURSES_INDEX_IN_TEACHER_ARRAY];
      const slots = teacher[constants.TEACHER_SLOTS_INDEX_IN_TEACHER_ARRAY];
      createTeacherTab(teacherId, teacherEmail, courses, slots, teacherTabTemplate);
      createCopyOfViewTemplate(constants.VIEW_TEMPLATE_TAB_NAME,teacherId,teacherId);
      protectRange(teacherId, "A1:K2");
      protectRange(teacherId, "A3:A");
      protectRange(teacherId, "C3:K");
    }
  });
}

function getAllTeachers() {
  const masterSheetName = constants.TEACHER_MASTER_TAB_NAME;
  const lastRow = getTab(masterSheetName).getLastRow();
  return fetchValuesInRange(masterSheetName, constants.TEACHER_DATA_RANGE_IN_MASTER_TAB + lastRow);
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

  const lastRow = getTab(teacherName).getLastRow();
  addDataValidationDropdown(courseOptions, teacherName, constants.COURSE_RANGE_IN_TEACHER_TAB + lastRow);
  updateTeacherFormula(teacherName);
}

function formatSlots(slotsString) {
  const slotsArray = slotsString.split(",");
  return slotsArray.map(slot => [slot.trim()]);
}

function formatCourseOptions(optionsString) {
  return optionsString.split(",").map(option => option.trim());
}


function createCopyOfViewTemplate(templateTabName,nameToChangeNameOfTemplateCopy,teacherId) {  
  var spreadsheet = getActiveSs();  
  var templateSheetName = templateTabName;  
  var newSheetName = nameToChangeNameOfTemplateCopy;    
  
  var templateSheet = getTab(templateSheetName);  
  templateSheet.getRange(constants.CELL_TO_SET_THE_TEACHER_ID_IN_VIEW_TEMPLATE).setValue(teacherId);
  
  if (!templateSheet) {  
    throw new Error('Template sheet not found: ' + templateSheetName);  
  }  
  
  var newSheet = templateSheet.copyTo(spreadsheet);  
  
  newSheet.setName(newSheetName);  
} 