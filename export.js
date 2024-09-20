function exportSchedule() {  
  var ss = getActiveSs();  
  var sheet = getTab("Student");  
  var exportFolderId = '1jfAdP08QXm7vQ8ju5zqOyqbShI1yRIAa';  
 
  var currentDate = new Date();  
  var weekName = "Week of " + currentDate.toDateString();  

  var spreadsheetId = ss.getId();  
  var url = 'https://docs.google.com/spreadsheets/d/' + spreadsheetId + '/export?';  
  
  var params = {  
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
  

  var exportUrl = url + Object.keys(params).map(function(key) {  
    return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);  
  }).join('&');  
  
  var pdfBlob = UrlFetchApp.fetch(exportUrl, {  
    headers: {  
      'Authorization': 'Bearer ' + ScriptApp.getOAuthToken()  
    }  
  }).getBlob().setName(weekName + '.pdf');  
  
  var folder = DriveApp.getFolderById(exportFolderId);  
  folder.createFile(pdfBlob);  
  
  Logger.log("PDF File created: " + folder.getUrl() + '/' + weekName + '.pdf');  
}