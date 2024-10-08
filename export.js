function exportSchedule() {
  const ss = getActiveSs();
  const exportFolderId = DriveApp.getFolderById(constants.EXPORT_ID);
  const currentDate = new Date().toISOString();

  try {
    const newFolder = exportFolderId.createFolder(currentDate);
    const newFolderId = newFolder.getId();
    Logger.log("New folder created: " + newFolder.getUrl());

    const allTeachersData = getAllTeachers();
    const spreadsheetId = ss.getId();
    const url = "https://docs.google.com/spreadsheets/d/" + spreadsheetId + "/export?";

    allTeachersData.forEach((teacherId) => {
      if (teacherId.length >= 5) {
        let teacherViewTabName = teacherId[4] + "_SCHEDULE_VIEW";
        const teacherTabName = getTab(teacherViewTabName);

        if (teacherTabName) {
          const params = {
            format: "pdf",
            size: "A4",
            portrait: true,
            fitw: true,
            sheetnames: false,
            printtitle: false,
            pagenumbers: false,
            gridlines: false,
            gid: teacherTabName.getSheetId(),
          };

          const exportUrl =
            url +
            Object.keys(params)
              .map(
                (key) =>
                  encodeURIComponent(key) + "=" + encodeURIComponent(params[key])
              )
              .join("&");

          Logger.log("Export URL: " + exportUrl);

          try {
            const pdfBlob = UrlFetchApp.fetch(exportUrl, {
              headers: {
                Authorization: "Bearer " + ScriptApp.getOAuthToken(),
              },
              muteHttpExceptions: true, 
            }).getBlob().setName(teacherId[4] + ".pdf");

            const folder = DriveApp.getFolderById(newFolderId);
            folder.createFile(pdfBlob);
            Logger.log("PDF File created: " + folder.getUrl() + "/" + teacherId[4] + ".pdf");

            Utilities.sleep(1000); 
          } catch (fetchError) {
            Logger.log("Error during PDF creation: " + fetchError + ". Full Response: " + fetchError.responseText);
          }
        } else {
          Logger.log("Tab name does not exist: " + teacherViewTabName);
        }
      } else {
        Logger.log("Invalid teacher data format: " + teacherId);
      }
    });
  } catch (error) {
    Logger.log("Error during folder creation or exporting: " + error);
  }
}
