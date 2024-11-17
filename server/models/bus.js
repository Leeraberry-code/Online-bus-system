const connection = require('../config/db');

const Bus = {
    getAllBuses: (callback) => {
        const sql = 'SELECT * FROM buses';
        connection.query(sql, (err, results) => {
            if (err) return callback(err);
            callback(null, results);
        });
    },

    getBusById: (id, callback) => {
        const sql = 'SELECT * FROM buses WHERE Bus_ID = ?';
        connection.query(sql, [id], (err, result) => {
            if (err) return callback(err);
            callback(null, result);
        });
    },

    createBus: (data, callback) => {
        const { Admin_ID, Route_ID, Bus_SpaceStatus, Bus_Time, Bus_Slot, PickUp_time, DropOff_time, Date } = data;

        if (!['Available', 'Not Available'].includes(Bus_SpaceStatus)) {
            return callback(new Error('Invalid Bus_SpaceStatus value'));
        }

        if (!['Morning', 'Afternoon'].includes(Bus_Slot)) {
            return callback(new Error('Invalid Bus_Slot value'));
        }

        const sql = 'INSERT INTO buses (Admin_ID, Route_ID, Bus_SpaceStatus, Bus_Time, Bus_Slot, PickUp_time, DropOff_time, Date) VALUES (?, ?, ?, ?, ?, ?)';
        connection.query(sql, [Admin_ID, Route_ID, Bus_SpaceStatus, Bus_Time, Bus_Slot, PickUp_time, DropOff_time,  Date], (err, result) => {
            if (err) return callback(err);
            callback(null, result);
        });
    },

    updateBus: (id, data, callback) => {
        const { Admin_ID, Route_ID, Bus_SpaceStatus, Bus_Time, Bus_Slot,  PickUp_time, DropOff_time, Date } = data;

        if (!['Available', 'Not Available'].includes(Bus_SpaceStatus)) {
            return callback(new Error('Invalid Bus_SpaceStatus value'));
        }

        if (!['Morning', 'Afternoon'].includes(Bus_Slot)) {
            return callback(new Error('Invalid Bus_Slot value'));
        }

        const sql = 'UPDATE buses SET Admin_ID = ?, Route_ID = ?, Bus_SpaceStatus = ?, Bus_Time = ?, Bus_Slot = ?,  PickUp_time = ?, DropOff_time = ?, Date = ? WHERE Bus_ID = ?';
        connection.query(sql, [Admin_ID, Route_ID, Bus_SpaceStatus, Bus_Time, Bus_Slot, PickUp_time, DropOff_time, Date, id], (err, result) => {
            if (err) return callback(err);
            callback(null, result);
        });
    },

    deleteBus: (id, callback) => {
        const sql = 'DELETE FROM buses WHERE Bus_ID = ?';
        connection.query(sql, [id], (err, result) => {
            if (err) return callback(err);
            callback(null, result);
        });
    }
};

module.exports = Bus;
