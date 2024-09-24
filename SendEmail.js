function sendEmail(toSent, sentBy, subject, body) {
  try {
    MailApp.sendEmail({
      to: toSent,
      from: sentBy,
      subject: subject,
      body: body
    });
    return true;
  } catch (error) {
    console.error("Error sending email: ", error);
    return false;
  }
}  