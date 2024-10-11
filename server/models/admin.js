const connection = require('../config/db');

// Define the Admin model with database queries
const Admin = {
    getAllAdmins: (callback) => {
        const sql = 'SELECT * FROM admin';
        connection.query(sql, (err, results) => {
            if (err) return callback(err);
            callback(null, results);
        });
    },

    getAdminById: (id, callback) => {
        const sql = 'SELECT * FROM admin WHERE Admin_ID = ?';
        connection.query(sql, [id], (err, result) => {
            if (err) return callback(err);
            callback(null, result);
        });
    },

    createAdmin: (data, callback) => {
        const { Parent_ID, Learner_ID, Admin_Initials, Admin_Surname, Admin_Passcode, Admin_Email } = data;
        const sql = 'INSERT INTO admin (Parent_ID, Learner_ID, Admin_Initials, Admin_Surname, Admin_Passcode, Admin_Email) VALUES (?, ?, ?, ?, ?, ?)';
        connection.query(sql, [Parent_ID, Learner_ID, Admin_Initials, Admin_Surname, Admin_Passcode, Admin_Email], (err, result) => {
            if (err) return callback(err);
            callback(null, result);
        });
    },

    updateAdmin: (id, data, callback) => {
        const { Parent_ID, Learner_ID, Admin_Initials, Admin_Surname, Admin_Passcode, Admin_Email } = data;
        const sql = 'UPDATE admin SET Parent_ID = ?, Learner_ID = ?, Admin_Initials = ?, Admin_Surname = ?, Admin_Passcode = ?, Admin_Email = ? WHERE Admin_ID = ?';
        connection.query(sql, [Parent_ID, Learner_ID, Admin_Initials, Admin_Surname, Admin_Passcode, Admin_Email, id], (err, result) => {
            if (err) return callback(err);
            callback(null, result);
        });
    },

    deleteAdmin: (id, callback) => {
        const sql = 'DELETE FROM admin WHERE Admin_ID = ?';
        connection.query(sql, [id], (err, result) => {
            if (err) return callback(err);
            callback(null, result);
        });
    }
};

module.exports = Admin;
