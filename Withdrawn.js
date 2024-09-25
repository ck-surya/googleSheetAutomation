function markAsWithdrawn() {
  var ss = getActiveSs()
  var tab = getTab(constants.STUDENT_TAB_NAME);
  var dataRange = tab.getRange(constants.STUDENT_ROW_DATA_RANGE);

  var withdrawnSheet = ss.getSheetByName(constants.WITHDRAWN_TAB_NAME);

  var data = dataRange.getValues();

  for (var i = data.length - 1; i >= 0; i--) {
    if (data[i][9] === constants.STUDENT_STATUS_WITHDRAWN) {
      const student_slots = data[i].slice(constants.HOUR_START_COL_NUMBER, constants.HOUR_END_COL_NUMBER);
      const studentName = data[i][constants.STUDENT_NAME_INDEX_IN_STUDENT_ROW_DATA];
      var isNotified = notifyWithdrawnStudentToClient(studentName, student_slots);
      var reasonForWithdrawal = Browser.inputBox("Enter the reason for withdrawal for student: " + studentName);

      var willReturn = Browser.inputBox("Will the student return? (Yes/No) for: " + studentName);
      var withdrawalDate = new Date();

      var notifiedDuringNotice = isNotified;
      var withdrawnData = [
        ...data[i],
        withdrawalDate,
        reasonForWithdrawal,
        willReturn,
        notifiedDuringNotice
      ];

      withdrawnSheet.appendRow(withdrawnData);

      tab.deleteRow(i + 2);
    }
  }
}


