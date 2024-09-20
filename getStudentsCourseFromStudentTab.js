function getStudentsCourse() {
  var tab = getTab("Student");

  var lastRow = tab.getLastRow();
  return fetchCellValues("Student", getCourseColumnRange(lastRow));
}
