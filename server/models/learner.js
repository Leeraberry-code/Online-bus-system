const connection = require('../config/db');
const { sendStatusChangeEmail } = require('../services/email');


// Define the Admin model with database queries
const Learner = {
    getAllLearners: (callback) => {
        const sql = 'SELECT * FROM learner';
        connection.query(sql, (err, results) => {
            if (err) return callback(err);
            callback(null, results);
        });
    },

    // getLearnerByIdAndParentId: (learnerId, parentId, callback) => {
    //     const sql = `
    //     SELECT l.* 
    //     FROM learner l
    //     JOIN Parent_Student_App_Reg psar ON l.Learner_ID = psar.Learner_ID
    //     WHERE l.Learner_ID = ? AND psar.Parent_ID = ?;
    //     `;
    //     connection.query(sql, [learnerId, parentId], (err, result) => {
    //         if (err) return callback(err);
    //         callback(null, result.length ? result[0] : null); // Return null if not found
    //     });
    // },
    

    createLearner: (data, callback) => {
        const {
            Bus_ID = null,        
            Admin_ID = null,   
            Learner_Name,
            Learner_Surname,
            Learner_CellNo,
            Learner_Grade,
            Parent_ID,
        } = data;
    
        const defaultStatus = "Waitlisted";
        const sql = `
            INSERT INTO learner (Bus_ID, Admin_ID, Learner_Name, Learner_Surname, Learner_CellNo, Learner_Grade, Status, Parent_ID)
            VALUES (?, ?, ?, ?, ?, ?, ?,?)
        `;
    
        connection.query(
            sql,
            [Bus_ID, Admin_ID, Learner_Name, Learner_Surname, Learner_CellNo, Learner_Grade, defaultStatus,Parent_ID],
            (err, result) => {
                if (err) return callback(err);
                callback(null, result);
            }
        );
    },
    

    updateLearner: (id, data, callback) => {
        const { Bus_ID, Admin_ID, Learner_CellNo, Learner_Grade, Status } = data;
    
        // Prepare the update fields and values
        const updateFields = [];
        const updateValues = [];
    
        if (Bus_ID !== undefined) {
            updateFields.push('Bus_ID = ?');
            updateValues.push(Bus_ID);
        }
        if (Admin_ID !== undefined) {
            updateFields.push('Admin_ID = ?');
            updateValues.push(Admin_ID);
        }
        if (Learner_CellNo !== undefined) {
            updateFields.push('Learner_CellNo = ?');
            updateValues.push(Learner_CellNo);
        }
        if (Learner_Grade !== undefined) {
            updateFields.push('Learner_Grade = ?');
            updateValues.push(Learner_Grade);
        }
        if (Status !== undefined) {
            updateFields.push('Status = ?');
            updateValues.push(Status);
        }
    
        // If no fields to update, return an error
        if (updateFields.length === 0) {
            return callback(new Error('No fields to update.'));
        }
    
        // Fetch the current status before updating
        const currentStatusSql = 'SELECT Status, Parent_ID, Learner_Name FROM learner WHERE Learner_ID = ?';
        connection.query(currentStatusSql, [id], (err, statusResult) => {
            if (err) return callback(err);
            const currentStatus = statusResult[0]?.Status;
            const parentId = statusResult[0]?.Parent_ID;
            const learnerName = statusResult[0]?.Learner_Name;
    
            // Proceed with the update if status has changed
            if (currentStatus !== Status) {
                // Add Learner_ID to the update values
                updateValues.push(id);
                const sql = `UPDATE learner SET ${updateFields.join(', ')} WHERE Learner_ID = ?`;
                connection.query(sql, updateValues, (err, result) => {
                    if (err) return callback(err);
    
                    // Send email notification to parent
                    const parentSql = 'SELECT Parent_Email, Parent_Name FROM parent WHERE Parent_ID = ?';
                    console.log(parentSql, parentId)
                    connection.query(parentSql, [parentId], (err, parentResult) => {
                        if (err) return callback(err);
                        const parentEmail = parentResult[0]?.Parent_Email;
                        const parentName = parentResult[0]?.Parent_Name;
    
                        if (parentEmail) {
                            const reason = "Status updated by the admin";
                            const additionalInfo = "Please check the dashboard for more details.";
                            sendStatusChangeEmail(
                                parentEmail,
                                parentName,
                                learnerName,
                                Status,
                                reason,
                                additionalInfo
                            )
                                .then((successMessage) => {
                                    console.log(successMessage);
                                    callback(null, result);
                                })
                                .catch((errorMessage) => {
                                    console.error(errorMessage);
                                    callback(null, result); // Proceed even if email fails
                                });
                        } else {
                            callback(null, result); // Proceed without sending an email
                        }
                    });
                });
            } else {
                callback(null, { message: "No status change detected." });
            }
        });
    },
    

    // get all learners connected to a specific parent
    getLearnersByParentId: (parentId, callback) => {
        const sql = `
            SELECT 
                l.Learner_ID, 
                l.Learner_Name, 
                l.Learner_Surname, 
                l.Learner_Grade, 
                l.Learner_CellNo,
                l.Status
            FROM 
                Learner l
            INNER JOIN 
                parent_student_app_reg psar ON l.Learner_ID = psar.Learner_ID
            WHERE 
                psar.Parent_ID = ?
        `;
        connection.query(sql, [parentId], (err, results) => {
            if (err) return callback(err);
            callback(null, results);
        });
        
    },

    deleteLearner: (learnerId, callback) => {
        const sql = 'DELETE FROM learner WHERE Learner_ID = ?';
        connection.query(sql, [learnerId], (err, result) => {
            if (err) return callback(err);
            callback(null, result);
        });
    }
};

module.exports = Learner;