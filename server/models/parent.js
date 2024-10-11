const connection = require('../config/db');

// Define all methods for parent operations
const Parent = {
    getAllParents: (callback) => {
        const sql = 'SELECT * FROM parent';
        connection.query(sql, (err, results) => {
            if (err) return callback(err);
            callback(null, results);
        });
    },

    getParentById: (id, callback) => {
        const sql = 'SELECT * FROM parent WHERE Parent_ID = ?';
        connection.query(sql, [id], (err, result) => {
            if (err) return callback(err);
            callback(null, result);
        });
    },

    createParent: (data, callback) => {
        const { Parent_Name, Parent_Surname, Parent_Passcode, Parent_CellNo, Parent_Email } = data;
        const sql = 'INSERT INTO parent (Parent_Name, Parent_Surname, Parent_Passcode, Parent_CellNo, Parent_Email) VALUES (?, ?, ?, ?, ?)';
        connection.query(sql, [Parent_Name, Parent_Surname, Parent_Passcode, Parent_CellNo, Parent_Email], (err, result) => {
            if (err) return callback(err);
            callback(null, result);
        });
    },

    updateParent: (id, data, callback) => {
        const { Parent_Name, Parent_Surname, Parent_Passcode, Parent_CellNo, Parent_Email } = data;
        const sql = 'UPDATE parent SET Parent_Name = ?, Parent_Surname = ?, Parent_Passcode = ?, Parent_CellNo = ?, Parent_Email = ? WHERE Parent_ID = ?';
        connection.query(sql, [Parent_Name, Parent_Surname, Parent_Passcode, Parent_CellNo, Parent_Email, id], (err, result) => {
            if (err) return callback(err);
            callback(null, result);
        });
    },

    deleteParent: (id, callback) => {
        const sql = 'DELETE FROM parent WHERE Parent_ID = ?';
        connection.query(sql, [id], (err, result) => {
            if (err) return callback(err);
            callback(null, result);
        });
    }
};

module.exports = Parent;
