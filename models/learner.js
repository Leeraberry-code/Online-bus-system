const connection = require('../config/db');

// Define the Admin model with database queries
const Learner = {
    getAllLearners: (callback) => {
        const sql = 'SELECT * FROM learner';
        connection.query(sql, (err, results) => {
            if (err) return callback(err);
            callback(null, results);
        });
    },

    getLearnerById: (id, callback) => {
        const sql = 'SELECT * FROM learner WHERE Learner_ID = ?';
        connection.query(sql, [id], (err, result) => {
            if (err) return callback(err);
            callback(null, result);
        });
    },

    createLearner: (data, callback) => {
        const { 
            Bus_ID,
            Admin_ID,
            Learner_Name,
            Learner_Surname,
            Learner_CellNo,
            Learner_Grade } = data;
        const sql = 'INSERT INTO learner (Learner_ID, Bus_ID, Admin_ID, Learner_Name, Learner_Surname, Learner_CellNo, Learner_Grade) VALUES (?, ?, ?, ?, ?, ?)';
        connection.query(sql, [Learner_ID, Bus_ID, Admin_ID, Learner_Name, Learner_Surname, Learner_CellNo, Learner_Grade], (err, result) => {
            if (err) return callback(err);
            callback(null, result);
        });
    },

    updateLearner: (id, data, callback) => {
        const {Bus_ID, Admin_ID,Learner_CellNo, Learner_Grade} = data;
        const sql = 'UPDATE learner SET Bus_ID = ?, Admin_ID = ?, Learner_CellNo = ?, Learner_Grade = ? WHERE Learner_ID = ?';
        connection.query(sql, [Bus_ID, Admin_ID, Learner_CellNo, Learner_Grade, id], (err, result) => {
            if (err) return callback(err);
            callback(null, result);
        });
    },

    deleteAdmin: (id, callback) => {
        const sql = 'DELETE FROM learner WHERE Learner_ID = ?';
        connection.query(sql, [id], (err, result) => {
            if (err) return callback(err);
            callback(null, result);
        });
    }
};

module.exports = Learner;