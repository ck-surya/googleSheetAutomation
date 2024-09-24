function markAsWithdrawn(e) {
  var ss = getActiveSs()
  var tab = getTab(constants.STUDENT_TAB_NAME);
  var dataRange = tab.getRange('A2:S');   

  var withdrawnSheet = ss.getSheetByName(constants.WITHDRAWN_TAB_NAME);

  var data = dataRange.getValues();

  for (var i = data.length - 1; i >= 0; i--) {
    if (data[i][9] === constants.STUDENT_STATUS) {
      const student_slots = data[i].slice(13,17);
      const studentName = data[i][8];
      var isNotified = notifyWithdrawnStudentToClient(studentName,student_slots);
      var reasonForWithdrawal = Browser.inputBox("Enter the reason for withdrawal for student: " + data[i][8]);

      var willReturn = Browser.inputBox("Will the student return? (Yes/No) for: " + data[i][8]);
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

      // sendEmailNotification(data[i][8], withdrawalDate, reasonForWithdrawal);

      tab.deleteRow(i + 2);
    }
  }
}


