function markAsWithdrawn(row, column) {
  Logger.log(`Marking student in row ${row} as withdrawn`);
  const ss = getActiveSs();
  const tab = getTab(constants.STUDENT_TAB_NAME);
  const range = `${constants.STUDENT_ROW_DATA_FIRST_COL}${row}:${getColumnFromIndex(tab.getLastColumn())}${row}`;
  const withdrawnSheet = ss.getSheetByName(constants.WITHDRAWN_TAB_NAME);
  const data = fetchCellValues(constants.STUDENT_TAB_NAME, range, true);
  const studentSlots = data[0].slice(constants.HOUR_START_COL_NUMBER, constants.HOUR_END_COL_NUMBER);
  const studentName = data[0][constants.STUDENT_NAME_INDEX_IN_STUDENT_ROW_DATA];
  const isNotified = notifyWithdrawnStudentToClient(studentName, studentSlots);
  const reasonForWithdrawal = Browser.inputBox("Enter the reason for withdrawal for student: " + studentName);
  const willReturn = Browser.inputBox("Will the student return? (Yes/No) for: " + studentName);
  const withdrawalDate = new Date();
  const notifiedDuringNotice = isNotified;
  const withdrawnData = [...data[0], withdrawalDate, reasonForWithdrawal, willReturn, notifiedDuringNotice];
  withdrawnSheet.appendRow(withdrawnData);
  tab.deleteRow(row + 1);
  Logger.log("Student marked as withdrawn and added to Withdrawn Students tab.");
}