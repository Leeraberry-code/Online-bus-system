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
        const { Admin_ID, Route_ID, Bus_SpaceStatus, Bus_Time, Bus_Slot, Date } = data;

        if (!['Available', 'Not Available'].includes(Bus_SpaceStatus)) {
            return callback(new Error('Invalid Bus_SpaceStatus value'));
        }

        if (!['Morning', 'Afternoon'].includes(Bus_Slot)) {
            return callback(new Error('Invalid Bus_Slot value'));
        }

        const sql = 'INSERT INTO buses (Admin_ID, Route_ID, Bus_SpaceStatus, Bus_Time, Bus_Slot, Date) VALUES (?, ?, ?, ?, ?, ?)';
        connection.query(sql, [Admin_ID, Route_ID, Bus_SpaceStatus, Bus_Time, Bus_Slot, Date], (err, result) => {
            if (err) return callback(err);
            callback(null, result);
        });
    },

    updateBus: (id, data, callback) => {
        const updates = [];
        const values = [];
    
        if (data.Admin_ID !== undefined) {
            updates.push("Admin_ID = ?");
            values.push(data.Admin_ID);
        }
    
        if (data.Route_ID !== undefined) {
            updates.push("Route_ID = ?");
            values.push(data.Route_ID);
        }
    
        if (data.Bus_SpaceStatus !== undefined) {
            if (!['Available', 'Not Available'].includes(data.Bus_SpaceStatus)) {
                return callback(new Error('Invalid Bus_SpaceStatus value'));
            }
            updates.push("Bus_SpaceStatus = ?");
            values.push(data.Bus_SpaceStatus);
        }
    
        if (data.Bus_Time !== undefined) {
            updates.push("Bus_Time = ?");
            values.push(data.Bus_Time);
        }
    
        if (data.Bus_Slot !== undefined) {
            if (!['Morning', 'Afternoon'].includes(data.Bus_Slot)) {
                return callback(new Error('Invalid Bus_Slot value'));
            }
            updates.push("Bus_Slot = ?");
            values.push(data.Bus_Slot);
        }
    
        if (data.Date !== undefined) {
            updates.push("Date = ?");
            values.push(data.Date);
        }
    
        // If no fields to update, return an error
        if (updates.length === 0) {
            return callback(new Error('No fields to update'));
        }
    
        // Add the ID to the values array
        values.push(id);
    
        const sql = `UPDATE buses SET ${updates.join(", ")} WHERE Bus_ID = ?`;
        connection.query(sql, values, (err, result) => {
            if (err) {
                console.error("Database error:", err); // Log the database error
                return callback(err);
            }
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
