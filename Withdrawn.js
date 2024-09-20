function markAsWithdrawn(e) {
  var ss = getActiveSs()
  var sheet = getTab("Student");
  var dataRange = sheet.getRange('A2:S'); // Adjust the range as necessary  

  var withdrawnSheet = ss.getSheetByName('Withdrawn Students');

  var data = dataRange.getValues();

  for (var i = data.length - 1; i >= 0; i--) {
    if (data[i][9] === "Withdrawn") {
      var reasonForWithdrawal = Browser.inputBox("Enter the reason for withdrawal for student: " + data[i][8]);

      var willReturn = Browser.inputBox("Will the student return? (Yes/No) for: " + data[i][8]);
      var withdrawalDate = new Date();

      var notifiedDuringNotice = false;
      var withdrawnData = [
        ...data[i],
        withdrawalDate,
        reasonForWithdrawal,
        willReturn,
        notifiedDuringNotice
      ];

      withdrawnSheet.appendRow(withdrawnData);

      sendEmailNotification(data[i][8], withdrawalDate, reasonForWithdrawal);

      sheet.deleteRow(i + 2);
    }
  }
}


