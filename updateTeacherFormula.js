function updateTeacherFormula(tabName) {
  var tab = getTab(tabName)
  var studentTab = getTab(constants.STUDENT_TAB_NAME)
  var studenTabLastRow = studentTab.getLastRow()
  var startRow = constants.START_ROW_FOR_UPDATING_FORMULA;
  var lastRow = tab.getLastRow();
  var studentNameRange = constants.STUDENT_NAME_RANGE_IN_STUDENT_TAB + studenTabLastRow;
  var studentHour1Range = constants.STUDENT_HOUR1_RANGE_IN_STUDENT_TAB + studenTabLastRow;
  var studentHour2Range = constants.STUDENT_HOUR4_RANGE_IN_STUDENT_TAB + studenTabLastRow;
  var studentHour3Range = constants.STUDENT_HOUR3_RANGE_IN_STUDENT_TAB + studenTabLastRow;
  var studentHour4Range = constants.STUDENT_HOUR4_RANGE_IN_STUDENT_TAB + studenTabLastRow;

  for (var row = startRow; row <= lastRow; row++) {
    var formula = `=TRANSPOSE(IFERROR(ARRAYFORMULA(FILTER(FLATTEN({` +
      `IFERROR(FILTER(Student!{studentNameRange}; Student!{studentHour1Range}=A1 & "_" & A${row} & "_" & B${row}); "");` +
      `IFERROR(FILTER(Student!{studentNameRange}; Student!{studentHour2Range}=A1 & "_" & A${row} & "_" & B${row}); "");` +
      `IFERROR(FILTER(Student!{studentNameRange}; Student!{studentHour3Range}=A1 & "_" & A${row} & "_" & B${row}); "");` +
      `IFERROR(FILTER(Student!{studentNameRange}; Student!{studentHour4Range}=A1 & "_" & A${row} & "_" & B${row}); "")` +
      `}); LEN(FLATTEN({` +
      `IFERROR(FILTER(Student!{studentNameRange}; Student!{studentHour1Range}=A1 & "_" & A${row} & "_" & B${row}); "");` +
      `IFERROR(FILTER(Student!{studentNameRange}; Student!{studentHour2Range}=A1 & "_" & A${row} & "_" & B${row}); "");` +
      `IFERROR(FILTER(Student!{studentNameRange}; Student!{studentHour3Range}=A1 & "_" & A${row} & "_" & B${row}); "");` +
      `IFERROR(FILTER(Student!{studentNameRange}; Student!{studentHour4Range}=A1 & "_" & A${row} & "_" & B${row}); "")` +
      `})) > 0));""))`;
    tab.getRange(row, constants.START_COL_FOR_UPDATING_FORMULA).setFormula(formula);
  }
}