function notifyStudentSlotBookingToClient(studentName, studentSlot) {
  const emailAndIdObject = getAllTeacherIdsAndEmailsMap();
  if (studentSlot.length) {
    const teacherId = studentSlot.split("_")[0];
    const teacherEmail = emailAndIdObject[teacherId.trim()];
    return handleSendingNotificationForSlotBooking(teacherEmail, studentName, studentSlot);
  }
}

function handleSendingNotificationForSlotBooking(teacherEmail, studentName, slotName) {
  const teacherName = slotName.split("_")[0].split("-")[1].trim();
  const emailTemplate = `  

Hi ${teacherName},  

I wanted to inform you that the student, ${studentName}, has been added to your slot, ${slotName}.  

Thanks and regards,  
Upwork`;
  const emailSubject = "Notification of Student Slot Booking of Your Slot";
  return sendEmail(teacherEmail, constants.EMAIL_ADDRESS_FROM, emailSubject, emailTemplate);
}
