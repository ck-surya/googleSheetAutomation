function notifyWithdrawnStudentToClient(studentName, studentSlots) {
  const emailAndIdObject = getAllTeacherIdsAndEmailsMap();
  studentSlots.forEach(studentSlot => {
    if (studentSlot.length) {
      const [tabName, slotName, courseName] = studentSlot.split("_");
      handleUpdateStudentSlotsInTeacherTab(tabName, slotName, courseName);
      const teacherEmail = emailAndIdObject[tabName.trim()];
      handleSendingNotification(teacherEmail, studentName, studentSlot);
    }
  });
}

function handleUpdateStudentSlotsInTeacherTab(tabName, slotName, courseName) {
  const tab = getTab(tabName);
  const data = tab.getDataRange().getValues();
  processDataEntries(data, slotName, courseName, tab, true);
}

function handleSendingNotification(teacherEmail, studentName, slotName) {
  const teacherName = slotName.split("_")[0].split("-")[1].trim();
  const emailTemplate = `  

Hi ${teacherName},  

I wanted to inform you that the student, ${studentName}, is withdrawing from your slot, ${slotName}.  

Thanks and regards,  
Upwork  
  `;
  const emailSubject = "Notification of Student Withdrawal from Your Slot";
  return sendEmail(teacherEmail, constants.EMAIL_ADDRESS_FROM, emailSubject, emailTemplate);
}