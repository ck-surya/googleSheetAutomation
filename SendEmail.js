function sendEmail(toSent, sentBy, subject, body) {   
  MailApp.sendEmail({  
    to: toSent,  
    from: sentBy,  
    subject: subject,  
    body: body  
  });  
}