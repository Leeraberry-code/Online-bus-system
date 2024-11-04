const connection = require('../config/db');

const User = {
  loginUser: (email, password, callback) => {
    // 1. Check if the email exists in either the parent or admin tables
    const checkEmailSql = `
      SELECT 'parent' AS user_type, Parent_ID AS user_id FROM parent WHERE Parent_Email = ?
      UNION ALL
      SELECT 'admin' AS user_type, Admin_ID AS user_id FROM admin WHERE Admin_Email = ?
    `;

    connection.query(checkEmailSql, [email, email], (err, emailResults) => {
      if (err) return callback(err);

      if (emailResults.length === 0) {
        // Email not found in either table
        return callback(null, { success: false, message: 'Invalid email or password' });
      }

      const user = emailResults[0]; // Get the user type and ID

      // 2. Check the password against the corresponding table
      let checkPasswordSql;
      let passwordField;

      if (user.user_type === 'parent') {
        checkPasswordSql = 'SELECT * FROM parent WHERE Parent_ID = ? AND Parent_Passcode = ?';
        passwordField = 'Parent_Passcode'; 
      } else {
        checkPasswordSql = 'SELECT * FROM admin WHERE Admin_ID = ? AND Admin_Passcode = ?';
        passwordField = 'Admin_Passcode';
      }

      connection.query(checkPasswordSql, [user.user_id, password], (err, passwordResults) => {
        if (err) return callback(err);

        if (passwordResults.length === 0) {
          // Incorrect password
          return callback(null, { success: false, message: 'Invalid email or password' });
        }

        // 3. Successful login - return user information and type
        const loggedUser = passwordResults[0];
        callback(null, { 
          success: true, 
          user_type: user.user_type, 
          user_id: user.user_id,
          // Include other relevant user data from loggedUser
          // For example:
          // name: loggedUser.Parent_Name || loggedUser.Admin_Initials, 
          // ... other fields
        });
      });
    });
  }
};

module.exports = User;
