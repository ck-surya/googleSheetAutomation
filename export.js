function exportSchedule() {
  const ss = getActiveSs();
  const sheet = getTab(constants.STUDENT_TAB_NAME);
  const exportFolderId = constants.EXPORT_ID;

  const currentDate = new Date();
  const weekName = "Week of " + currentDate.toDateString();

  const spreadsheetId = ss.getId();
  const url = 'https://docs.google.com/spreadsheets/d/' + spreadsheetId + '/export?';

  const params = {
    'format': 'pdf',
    'size': 'A4',
    'portrait': true,
    'fitw': true,
    'sheetnames': false,
    'printtitle': false,
    'pagenumbers': false,
    'gridlines': false,
    'fzr': false,
    'gid': sheet.getSheetId()
  };

  const exportUrl = url + Object.keys(params).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(params[key])).join('&');

  const pdfBlob = UrlFetchApp.fetch(exportUrl, {
    headers: {
      'Authorization': 'Bearer ' + ScriptApp.getOAuthToken()
    }
  }).getBlob().setName(weekName + '.pdf');

  const folder = DriveApp.getFolderById(exportFolderId);
  folder.createFile(pdfBlob);

  Logger.log("PDF File created: " + folder.getUrl() + '/' + weekName + '.pdf');
}
