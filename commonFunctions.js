function getAllTeacherIdsAndEmailsMap() {
  const teacherInfo = getAllTeacherIdsAndEmails();
  return mappedIdAndEmail(teacherInfo)
}

function mappedIdAndEmail(data) {
  const object = {}
  data.map((el) => {
    if (el.length) {
      object[el[constants.TEACHER_ID_INDEX_IN_EMAIL_AND_ID_DATA]] = el[constants.TEACHER_EMAIL_INDEX_IN_EMAIL_AND_ID_DATA];
    }
  })
  return object
}

function getAllTeacherIdsAndEmails() {
  try {
    const result = fetchCellValues(constants.TEACHER_MASTER_TAB_NAME, constants.TEACHER_EMAIL_AND_ID_RANGE, true);
    if (result.length === 0) {
      Logger.log("No teacher data found in the specified range.");
    } else {
      Logger.log("Teacher data fetched successfully.");
    }
    return result;
  } catch (error) {
    console.error("Error in getAllTeacherIdsAndEmails:", error.message);
    return [];
  }
}

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

