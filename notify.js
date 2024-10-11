
function notifyTeacher(studentName, studentSlots, sendNotificationCallback) {
  const emailAndIdObject = getAllTeacherIdsAndEmailsMap();
  studentSlots.forEach(studentSlot => {
    if (studentSlot.length) {
      const teacherId = studentSlot.split("_")[0];
      const teacherEmail = emailAndIdObject[teacherId.trim()];
      sendNotificationCallback(teacherEmail, studentName, studentSlot);
    }
  });  
}

function notifyTeacherOfSlotBooking(studentName, studentSlot) {
  notifyTeacher(studentName, [studentSlot], sendNotificationForSlotBooking);
}

function sendNotificationForSlotBooking(teacherEmail, studentName, slotName) {
  const teacherName = slotName.split("_")[0].split("-")[1].trim();
  const emailTemplate = `  

Hi ${teacherName},  

I wanted to inform you that the student, ${studentName}, has been added to your slot, ${slotName}.  

Thanks and regards,  
Activatic`;
  const emailSubject = "Notification of Student Slot Booking of Your Slot";
  return sendEmail(teacherEmail, emailSubject, emailTemplate);
}

function notifyTeachersOfWithdrawnStudent(studentName, studentSlots) {
  notifyTeacher(studentName, studentSlots, sendNotificationForWithdrawnStudent);
}

function sendNotificationForWithdrawnStudent(teacherEmail, studentName, slotName) {
  const teacherName = slotName.split("_")[0].split("-")[1].trim();
  const emailTemplate = `  

Hi ${teacherName},  

I wanted to inform you that the student, ${studentName}, is withdrawing from your slot, ${slotName}.  

Thanks and regards,  
Upwork  
  `;
  const emailSubject = "Notification of Student Withdrawal from Your Slot";
  return sendEmail(teacherEmail, emailSubject, emailTemplate);
}

function notifyTeachersOfExitingHourStudent(studentName, studentSlots) {
  notifyTeacher(studentName, studentSlots, sendNotificationForExitingHourStudent);
}

function sendNotificationForExitingHourStudent(teacherEmail, studentName, slotName) {
  const teacherName = slotName.split("_")[0].split("-")[1].trim();
  const emailTemplate = `  

Hi ${teacherName},  

I wanted to inform you that the student, ${studentName}, has been removed from your slot, ${slotName}.  

Thanks and regards,  
Upwork  
  `;
  const emailSubject = "Notification of Student has been removed from Your Slot";
  return sendEmail(teacherEmail, emailSubject, emailTemplate);
}