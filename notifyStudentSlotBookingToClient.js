function notifyStudentSlotBookingToClient(studentName, studentSlot) {
  Logger.log("Added slot...")
  const emailAndIdObject = getMappedTeacherIdAndEmail()
  if (studentSlot.length) {
    const teacherId = studentSlot.split("_")[0];
    const teacherEmail = emailAndIdObject[teacherId.trim()]
    return handleSendingNotificationForSlotBooking(teacherEmail, studentName, studentSlot)
  }
}

function handleSendingNotificationForSlotBooking(teacherEmail, studentName, slotName) {
  console.log(slotName.split("_")[0].split("-")[1].trim())
  const teacherName = slotName.split("_")[0].split("-")[1].trim()
  const emailTemplate = `  

Hi ${teacherName},  

I wanted to inform you that the student, ${studentName}, has been added to your slot, ${slotName}.  

Thanks and regards,  
Upwork`;
  const emailSubject = "Notification of Student Slot Booking of Your Slot";
  return sendEmail(teacherEmail, "cksurya7319@gmail.com", emailSubject, emailTemplate)
}