function processStudentTabEdits(column, row, editedValue) {  
  if (isHourColumn(column)) { 
    Logger.log("Updating values for the Slot Booking");
    processSlotBooking(row, editedValue);        
  } else if (isStatusColumn(column) && hasStudentWithdrawn(editedValue)) { 
    Logger.log("Updating values for the withdrawn status");
    processStudentWithdrawal(row);
  }   
}

function processSlotBooking(row, editedSlotName) { 
  if (studentHasIndividualSlot(row)) {
    updateTeacherTabWithIndividualSlot(row, editedSlotName);    
  }  
  updateStudentDropDownValues();
  notifyTeacherOfSlotBooking(getStudentName(row), slotName);
}

function studentHasIndividualSlot(row) {
  return isCellTrue(constants.STUDENT_TAB_NAME, row, constants.COLUMN_NAME_INDIVIDUAL_IN_STUDENT_TAB);
}

function updateTeacherTabWithIndividualSlot(row, slotName) {
  try {    
    const [teacherTabName, editedSlot, editedCourse] = slotName.split("_");    
    updateTeacherTabWithValue(teacherTabName, editedSlot, editedCourse, "___");
  } catch (error) {
    console.error("Error in handleIndV:", error.message);
  }
}

function processStudentWithdrawal(row) {
  let deletedSlots = deleteStudentHours(row);
  updateTeacherTabWithWithdrawnSlots(row, deletedSlots);
  updateStudentDropDownValues();
  notifyTeachersOfWithdrawnStudent(getStudentName(row), deletedSlots);  
}

function updateTeacherTabWithWithdrawnSlots(row, withdrawnSlots) {
  withdrawnSlots.forEach(studentSlot => {
    if (studentSlot.length) {
      const [teacherTabName, slotName, courseName] = studentSlot.split("_");
      updateTeacherTabWithValue(teacherTabName, slotName, courseName, "");      
    }
  });  
}

function deleteStudentHours(row) {
  const studentTabName = constants.STUDENT_TAB_NAME;
  const studentTab = getTab(studentTabName);
  const range = studentTab.getRange(constants.COLUMN_HOUR_FIRST_IN_STUDENT_TAB + row + ":" + constants.COLUMN_HOUR_LAST_IN_STUDENT_TAB + row);
  let values = range.getValues();  
  let totalHours = constants.TOTAL_HOURS;
  setValuesForRange(range, "", totalHours);  
  return values[0];
}