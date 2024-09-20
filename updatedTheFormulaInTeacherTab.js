function updateTeacherFormula(tabName) {
  var tab = getTab(tabName)
  var startRow = 3;
  var lastRow = tab.getLastRow();
  for (var row = startRow; row <= lastRow; row++) {
    var formula = `=TRANSPOSE(IFERROR(ARRAYFORMULA(FILTER(FLATTEN({` +
      `IFERROR(FILTER(Student!$I$4:$I$25; Student!$L$4:$L$25=A1 & "_" & A${row} & "_" & B${row}); "");` +
      `IFERROR(FILTER(Student!$I$4:$I$25; Student!$K$4:$K$25=A1 & "_" & A${row} & "_" & B${row}); "");` +
      `IFERROR(FILTER(Student!$I$4:$I$25; Student!$M$4:$M$25=A1 & "_" & A${row} & "_" & B${row}); "");` +
      `IFERROR(FILTER(Student!$I$4:$I$25; Student!$N$4:$N$25=A1 & "_" & A${row} & "_" & B${row}); "")` +
      `}); LEN(FLATTEN({` +
      `IFERROR(FILTER(Student!$I$4:$I$25; Student!$L$4:$L$25=A1 & "_" & A${row} & "_" & B${row}); "");` +
      `IFERROR(FILTER(Student!$I$4:$I$25; Student!$K$4:$K$25=A1 & "_" & A${row} & "_" & B${row}); "");` +
      `IFERROR(FILTER(Student!$I$4:$I$25; Student!$M$4:$M$25=A1 & "_" & A${row} & "_" & B${row}); "");` +
      `IFERROR(FILTER(Student!$I$4:$I$25; Student!$N$4:$N$25=A1 & "_" & A${row} & "_" & B${row}); "")` +
      `})) > 0));""))`;

    tab.getRange(row, 3).setFormula(formula);
  }
}