function sendEmail(toSent, subject, body) {
  Logger.log(`Sending email to ${toSent}, subject: ${subject}`);
  try {
    MailApp.sendEmail({
      to: toSent,
      subject: subject,
      body: body
    });
    Logger.log("Email sent successfully.");
    return true;
  } catch (error) {
    console.error("Error sending email: ", error);
    Logger.log("Error sending email: ", error.message);
    return false;
  }
}