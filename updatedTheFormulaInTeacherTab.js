function updateTeacherFormula(tabName) {
  var tab = getTab(tabName)
  var startRow = 3;
  var lastRow = tab.getLastRow();
  for (var row = startRow; row <= lastRow; row++) {
    var formula = `=TRANSPOSE(IFERROR(ARRAYFORMULA(FILTER(FLATTEN({` +
      `IFERROR(FILTER(Student!$I$4:$I$100; Student!$N$4:$N$100=A1 & "_" & A${row} & "_" & B${row}); "");` +
      `IFERROR(FILTER(Student!$I$4:$I$100; Student!$O$4:$O$100=A1 & "_" & A${row} & "_" & B${row}); "");` +
      `IFERROR(FILTER(Student!$I$4:$I$100; Student!$P$4:$P$100=A1 & "_" & A${row} & "_" & B${row}); "");` +
      `IFERROR(FILTER(Student!$I$4:$I$100; Student!$Q$4:$Q$100=A1 & "_" & A${row} & "_" & B${row}); "")` +
      `}); LEN(FLATTEN({` +
      `IFERROR(FILTER(Student!$I$4:$I$100; Student!$N$4:$N$100=A1 & "_" & A${row} & "_" & B${row}); "");` +
      `IFERROR(FILTER(Student!$I$4:$I$100; Student!$O$4:$O$100=A1 & "_" & A${row} & "_" & B${row}); "");` +
      `IFERROR(FILTER(Student!$I$4:$I$100; Student!$P$4:$P$100=A1 & "_" & A${row} & "_" & B${row}); "");` +
      `IFERROR(FILTER(Student!$I$4:$I$100; Student!$Q$4:$Q$100=A1 & "_" & A${row} & "_" & B${row}); "")` +
      `})) > 0));""))`;

    tab.getRange(row, 3).setFormula(formula);
  }
}