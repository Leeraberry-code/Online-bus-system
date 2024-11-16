const { StatusChangeTemplate } = require("./templates.js");
const { transporter, sender } = require("./emailService.js");

exports.sendStatusChangeEmail = (
    parentEmail,
    parentName,
    childName,
    newStatus,
    reason,
    additionalInfo
  ) => {
    return new Promise((resolve, reject) => {
      const mailOptions = {
        from: `"${sender.name}" <${sender.email}>`,
        to: parentEmail,
        subject: "Notification of learner status change",
        html: StatusChangeTemplate.replace("[Parent's Name]", parentName)
          .replace("[Child's Name]", childName)
          .replace("[New Status]", newStatus)
          .replace("[Reason for change]", reason)
          .replace("[Any additional information]", additionalInfo)
          .replace("[Your Name]", sender.name),
      };
  
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          reject(`Failed to send email to ${parentEmail}. Error: ${error.message}`);
        } else {
          resolve(`Email sent successfully to: ${parentEmail}`);
        }
      });
    });
  };


  