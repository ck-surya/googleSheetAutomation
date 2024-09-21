function getStudentsCourse() {
  var tab = getTab("Student");
  var lastRow = tab.getLastRow();
  return fetchCellValues(constant.STUDENT_TAB_NAME,constant.COURSE_COLUMN_RANGE+lastRow);
}
