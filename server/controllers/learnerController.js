const Learner = require('../models/learner')

exports.getAllLearners = async (req, res) => {
    try {
        const learners = await new Promise((resolve, reject) => {
            Learner.getAllLearners((err, result) => {
                if (err) reject(err);
                resolve(result);
            });
        });
        res.json(learners);
    } catch (err) {
        res.status(500).json({message:"Server error. Please try again later." });
    }
};

// exports.getLearnersByParentId = async (req, res) => {
//     try {
//         const parentId = req.params.parentId; // Get parentId from the URL parameters
//         const learners = await new Promise((resolve, reject) => {
//             Learner.getLearnersByParentId(parentId, (err, result) => {
//                 if (err) return reject(err);
//                 resolve(result);
//             });
//         });

//         // Respond with the learners or a 404 if none are found.
//         if (!learners || learners.length === 0) {  // Handle both null and empty array
//           return res.status(404).json({ message: "No learners found for this parent." });
//         }
//         res.json(learners);

//     } catch (err) {
//         console.error("Error retrieving learners by parent ID:", err);
//         res.status(500).json({ message: "Server error. Please try again later." });
//     }
// };

exports.getLearnerById = async (req, res) => {
    try {
        const { id } = req.params;
        const parentId = req.session.user.user_id; // Get the logged-in parent's ID

        const learner = await new Promise((resolve, reject) => {
            Learner.getLearnerByIdAndParentId(id, parentId, (err, result) => { // Modified model method
                if (err) reject(err);
                resolve(result);
            });
        });

        if (!learner) {
            return res.status(404).json({ message: "Learner not found or unauthorized access." });
        }

        res.json(learner);
    } catch (err) {
        res.status(500).json({ message:"Server error. Please try again later."});
    }
};


exports.getLearnersByParentId = async (req, res) => {
    try {
        const parentId  = req.params.parentId;
        //console.log("Parent ID:", parentId)
        const learners = await new Promise((resolve, reject) => {
            Learner.getLearnersByParentId(parentId, (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });

        if (learners.length === 0) {
            return res.status(404).json({ message: "No learners found for this parent." });
            
        }

        res.json(learners);
    } catch (err) {
        console.error("Error retrieving learners by parent ID:", err);
        res.status(500).json({ message: "Server error. Please try again later." });
    }
};

exports.createLearner = async (req, res) => {
    try {
        const learnerData = req.body;

        // Call the model method
        const result = await new Promise((resolve, reject) => {
            Learner.createLearner(learnerData, (err, result) => {
                if (err) reject(err);
                resolve(result);
            });
        });

        // Return the response
        res.json({
            message: "Learner created successfully",
            id: result.insertId, // MySQL auto-incremented ID
        });
    } catch (err) {
        console.error("Error creating learner:", err.message);
        res.status(500).json({ message: "Server error. Please try again later." });
    }
};

exports.updateLearner = async (req, res) => {
    try {
        const  id  = req.params.id;
        console.log("Learner ID:", id)
        const learnerData = req.body;
        const result = await new Promise((resolve, reject) => {
            Learner.updateLearner(id, learnerData, (err, result) => {
                if (err) reject(err);
                resolve(result);
            });
        });
        res.json({ message: 'Learner updated successfully' });
    } catch (err) {
        res.status(500).json({ message:"Server error. Please try again later."});    }
};

exports.deleteLearner = async (req, res) => {
    try {
        const learnerId  = req.params.learnerId;
        const result = await new Promise((resolve, reject) => {
            Learner.deleteLearner(learnerId, (err, result) => {
                if (err) reject(err);
                resolve(result);
            });
        });
        res.json({ message: 'Learner deleted successfully' });
    } catch (err) {
        res.status(500).json({ message:"Server error. Please try again later."});
    }
};
