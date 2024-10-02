function updateTeacherFormula(tabName) {
  const tab = getTab(tabName);
  const startRow = constants.START_ROW_FOR_UPDATING_FORMULA;
  const lastRow = tab.getLastRow();
  const studentNameRange = constants.STUDENT_NAME_RANGE_IN_STUDENT_TAB;
  const studentHour1Range = constants.STUDENT_HOUR1_RANGE_IN_STUDENT_TAB;
  const studentHour2Range = constants.STUDENT_HOUR2_RANGE_IN_STUDENT_TAB;
  const studentHour3Range = constants.STUDENT_HOUR3_RANGE_IN_STUDENT_TAB;
  const studentHour4Range = constants.STUDENT_HOUR4_RANGE_IN_STUDENT_TAB;
  const studentTrialDateRange = constants.COLUMN_TRIAL_DATE_IN_TEACHER_TAB;
  const dateFormat = constants.DATE_FORMAT;
  const trailStatus = constants.TRAIL_STATUS;
  const statusRange = constants.COLUMN_STATUS_RANGE_IN_SUDENT_TAB;


  for (let row = startRow; row <= lastRow; row++) {
    const studentFilterFormula = `IFERROR(FILTER(ARRAYFORMULA(  
      IF(  
          Student!${statusRange} = "${trailStatus}" &;   
          Student!$${studentNameRange} & "_" & TEXT(Student!$${studentTrialDateRange}; "${dateFormat}");   
          Student!${studentNameRange}  
      )  
  ); Student!$studentHourRange=A1 & "_" & A${row} & "_" & B${row}); "")`;
    const formula =
      `=TRANSPOSE(IFERROR(ARRAYFORMULA(FILTER(FLATTEN({` +
      studentFilterFormula.replace(/studentHourRange/g, studentHour1Range) +
      `;` +
      studentFilterFormula.replace(/studentHourRange/g, studentHour2Range) +
      `;` +
      studentFilterFormula.replace(/studentHourRange/g, studentHour3Range) +
      `;` +
      studentFilterFormula.replace(/studentHourRange/g, studentHour4Range) +
      `}); LEN(FLATTEN({` +
      studentFilterFormula.replace(/studentHourRange/g, studentHour1Range) +
      `;` +
      studentFilterFormula.replace(/studentHourRange/g, studentHour2Range) +
      `;` +
      studentFilterFormula.replace(/studentHourRange/g, studentHour3Range) +
      `;` +
      studentFilterFormula.replace(/studentHourRange/g, studentHour4Range) +
      `})) > 0));""))`;
    tab
      .getRange(row, constants.START_COL_FOR_UPDATING_FORMULA)
      .setFormula(formula);
  }
}
