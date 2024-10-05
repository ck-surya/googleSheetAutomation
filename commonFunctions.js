function isHourColumn(column) {
  return (
    column >= constants.COLUMN_NUMBER_HOUR_START &&
      column <= constants.COLUMN_NUMBER_HOUR_END
  );
}

function isStatusColumn(column) {
  return (
    column === constants.COLUMN_STATUS_IN_SUDENT_TAB 
  );
}

function getStudentName(row) {
  return getCellValue(
    constants.STUDENT_TAB_NAME,
    constants.STUDENT_NAME_COL + row
  );
}

function hasStudentWithdrawn(editedValue) {
  return (    
      editedValue.trim() === constants.STUDENT_STATUS_WITHDRAWN.trim()
  );
}

function getAllTeacherIdsAndEmailsMap() {
  const teacherInfo = getAllTeacherIdsAndEmails();
  return mappedIdAndEmail(teacherInfo);
}

function mappedIdAndEmail(data) {
  const object = {};
  data.forEach((el) => {
    if (el.length) {
      object[el[constants.TEACHER_ID_INDEX_IN_EMAIL_AND_ID_DATA]] =
        el[constants.TEACHER_EMAIL_INDEX_IN_EMAIL_AND_ID_DATA];
    }
  });
  return object;
}

function getAllTeacherIdsAndEmails() {
  try {
    const result = fetchCellValues(
      constants.TEACHER_MASTER_TAB_NAME,
      constants.TEACHER_EMAIL_AND_ID_RANGE,
      true
    );
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
  const teacherTabNames = teacherEmailAndId.map((tab) => tab[1]);
  return teacherTabNames.includes(sheet.getName());
}

function isStudentTab(sheet) {
  return sheet.getName() === constants.STUDENT_TAB_NAME;
}

function getMapForCourseSlot() {
  return fetchCellValues(
    constants.META_TAB_NAME,
    constants.HOURS_CELL_REFRENCE_IN_META_SHEET,
    true
  );
}

function getSlotColumn() {
  return fetchCellValues(
    constants.META_TAB_NAME,
    constants.SLOT_RANGE_IN_META_TAB,
    true
  );
}

function getAllCourses() {
  const courseMappedWithTotalSeat = getMapForCourseSlot();
  return courseMappedWithTotalSeat.map((course) => course[0]);
}

function initializeCourseMap(courses) {
  const courseMapWithCell = {
    indV: {},
    otherV: {},
  };
  courses.forEach((course) => {
    courseMapWithCell.indV[course] = [];
    courseMapWithCell.otherV[course] = [];
  });
  return courseMapWithCell;
}

function updateTeacherTabWithValue(
  teacherTabName, 
  editedSlot, 
  editedCourse, 
  value = ""
) {
  const teacherTab = getTab(teacherTabName);
    if (!teacherTab) {
      throw new Error(`Tab "${teacherTabName}" not found.`);
    }
    const teacherData = teacherTab.getDataRange().getValues();
    const entryIndex = findEntryIndex(teacherData, editedSlot, editedCourse);
    if (entryIndex !== -1) {
      updateValuesInTab(tab, entryIndex, editedCourse, value);
    } else {
      logError(
        `No matching slot/course found for ${editedSlot} and ${editedCourse} in tab ${tab.getName()}.`
      );
    }
}

function findEntryIndex(data, editedSlot, editedCourse) {
  for (let index = 1; index < data.length; index++) {
    const rowData = data[index];
    const slot =
      rowData[constants.TEACHER_SLOTS_INDEX_IN_TEACHER_ARRAY_DATA_ARRAY];
    const course =
      rowData[constants.TEACHER_COURSE_INDEX_IN_TEACHER_ARRAY_DATA_ARRAY];

    if (slot === editedSlot && course === editedCourse) {
      return index;
    }
  }
  return -1;
}

function updateValuesInTab(tab, index, course, value) {  
  const courseMappedWithTotalSeat = getMapForCourseSlot();  
  if (!courseMappedWithTotalSeat) {  
      throw new Error("Course mapping data not found.");  
  }  
  const courseRow = courseMappedWithTotalSeat.find(row => row[0] === course);  

  if (courseRow) {  
      const valueCount = courseRow[1] - 1;  
      const range = tab.getRange(`${constants.RANGE_FOR_ADDING_UNDERSCORE_IN_TEACHER_TAB}${index + 1}:${getColumnFromIndex(3 + repeatValue)}${index + 1}`);  
      setValuesForRange(range, value, valueCount);
  }  
}  

