function processTeacherEdit(range, editedTab, editedValue, teacherEmailAndId) {
  updateStudentDropDownValues();
  sendEmail(range, editedTab, editedValue, teacherEmailAndId);
}
