function sendEmail(toSent, sentBy, subject, body) {   
  try {  
    MailApp.sendEmail({  
      to: toSent,  
      from: sentBy,  
      subject: subject,  
      body: body  
    });  
    return true; // Return true if the email is sent successfully  
  } catch (error) {  
    console.error("Error sending email: ", error);  
    return false; // Return false if there was an error  
  }  
}  