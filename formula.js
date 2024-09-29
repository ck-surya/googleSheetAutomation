function updateTeacherFormula(tabName) {
  const tab = getTab(tabName);
  const startRow = constants.START_ROW_FOR_UPDATING_FORMULA;
  const lastRow = tab.getLastRow();
  const studentNameRange = constants.STUDENT_NAME_RANGE_IN_STUDENT_TAB;
  const studentHour1Range = constants.STUDENT_HOUR1_RANGE_IN_STUDENT_TAB;
  const studentHour2Range = constants.STUDENT_HOUR2_RANGE_IN_STUDENT_TAB;
  const studentHour3Range = constants.STUDENT_HOUR3_RANGE_IN_STUDENT_TAB;
  const studentHour4Range = constants.STUDENT_HOUR4_RANGE_IN_STUDENT_TAB;

  for (let row = startRow; row <= lastRow; row++) {
    const formula = `=TRANSPOSE(IFERROR(ARRAYFORMULA(FILTER(FLATTEN({` +
      `IFERROR(FILTER(Student!${studentNameRange}; Student!${studentHour1Range}=A1 & "_" & A${row} & "_" & B${row}); "");` +
      `IFERROR(FILTER(Student!${studentNameRange}; Student!${studentHour2Range}=A1 & "_" & A${row} & "_" & B${row}); "");` +
      `IFERROR(FILTER(Student!${studentNameRange}; Student!${studentHour3Range}=A1 & "_" & A${row} & "_" & B${row}); "");` +
      `IFERROR(FILTER(Student!${studentNameRange}; Student!${studentHour4Range}=A1 & "_" & A${row} & "_" & B${row}); "")` +
      `}); LEN(FLATTEN({` +
      `IFERROR(FILTER(Student!${studentNameRange}; Student!${studentHour1Range}=A1 & "_" & A${row} & "_" & B${row}); "");` +
      `IFERROR(FILTER(Student!${studentNameRange}; Student!${studentHour2Range}=A1 & "_" & A${row} & "_" & B${row}); "");` +
      `IFERROR(FILTER(Student!${studentNameRange}; Student!${studentHour3Range}=A1 & "_" & A${row} & "_" & B${row}); "");` +
      `IFERROR(FILTER(Student!${studentNameRange}; Student!${studentHour4Range}=A1 & "_" & A${row} & "_" & B${row}); "")` +
      `})) > 0));""))`;
    tab.getRange(row, constants.START_COL_FOR_UPDATING_FORMULA).setFormula(formula);
  }
}