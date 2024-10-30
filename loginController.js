const User = require('../models/login');

const loginController = {
  login: (req, res) => {
    const { email, password } = req.body;

    // Ensure both email and password are provided
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required' });
    }

    // Use the model's loginUser function to authenticate
    User.loginUser(email, password, (err, result) => {
      if (err) {
        return res.status(500).json({ success: false, message: 'Server error', error: err });
      }

      if (!result.success) {
        // If login fails (invalid email or password)
        return res.status(401).json({ success: false, message: result.message });
      }

      // Successful login
      const { user_type, user_id } = result;
      
      // Create session or token (optional, depending on how you handle authentication)
      // For simplicity, we'll assume sessions.
      req.session.user = { user_id, user_type };

      // Redirect based on user type (admin or parent)
      if (user_type === 'admin') {
        return res.json({
          success: true,
          message: 'Login successful. Redirecting to admin dashboard...',
          redirect: '/admin/dashboard',
        });
      } else if (user_type === 'parent') {
        return res.json({
          success: true,
          message: 'Login successful. Redirecting to parent dashboard...',
          redirect: '/parent/dashboard',
        });
      } else {
        return res.json({
          success: false,
          message: 'Unknown user type',
        });
      }
    });
  }
};

module.exports = loginController;
