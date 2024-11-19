const connection = require('../config/db');

const Route = {
    getAllroutes: (callback) => {
        const sql = 'SELECT * FROM routes';
        connection.query(sql, (err, results) => {
            if (err) return callback(err);
            callback(null, results);
        });
    },

    getrouteById: (id, callback) => {
        const sql = 'SELECT * FROM routes WHERE Route_ID = ?';
        connection.query(sql, [id], (err, result) => {
            if (err) return callback(err);
            callback(null, result);
        });
    },

    createroute: (data, callback) => {
        const { Route_ID, Pickup_No, DropOff_No, Route_Name, Date } = data;

        const sql = 'INSERT INTO routees (Route_ID, Pickup_No, DropOff_No, Route_Name, Date) VALUES (?, ?, ?, ?, ?, ?)';
        connection.query(sql, [Admin_ID, Route_ID, Route_ID, Pickup_No, DropOff_No, Route_Name,  Date], (err, result) => {
            if (err) return callback(err);
            callback(null, result);
        });
    },

    updateroute: (id, data, callback) => {
        const { Route_ID, Pickup_No, DropOff_No, Route_Name, Date } = data;

        const sql = 'UPDATE routees SET Route_ID = ?, Pickup_No = ?, DropOff_No = ?, Route_Name = ?, Date = ? WHERE Route_ID = ?';
        connection.query(sql, [Route_ID, Pickup_No, DropOff_No, Route_Name, Date, id], (err, result) => {
            if (err) return callback(err);
            callback(null, result);
        });
    },

    deleteRoute: (id, callback) => {
        const sql = 'DELETE FROM routes WHERE Route_ID = ?';
        connection.query(sql, [id], (err, result) => {
            if (err) return callback(err);
            callback(null, result);
        });
    }
};

module.exports = Route;
