const StatusChangeTemplate = `
<!DOCTYPE html>
<html>
<head>
    <title>Change of Status</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
<div style="background: linear-gradient(to right, #4CAF50, #45a049); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Notification of learner status change</h1>
  </div>
  <div style="padding: 20px;">
    <p>Dear [Parent's Name],</p>
    <p>This is to inform you that your child, [Child's Name], has had a change in their status.</p>
    <p>Their new status is: [New Status].</p>
    <p>Please find more information about this change below:</p>
    <ul style="list-style-type: disc; padding-left: 20px;">
      <li>[Reason for change]</li>
      <li>[Any additional information]</li>
    </ul>
    <p>If you have any questions or concerns, please do not hesitate to reach out to us.</p>
    <p>Thank you for your understanding.</p>
    <p>Best regards,</p>
    <p>[Your Name]</p>
  </div>
</body>
</html>`;

module.exports = {
  StatusChangeTemplate,
};
