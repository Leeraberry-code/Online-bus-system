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

exports.getLearnerById = async (req, res) => {
    try {
        const { id } = req.params;
        const learner = await new Promise((resolve, reject) => {
            Learner.getAdminById(id, (err, result) => {
                if (err) reject(err);
                resolve(result);
            });
        });
        res.json(learner);
    } catch (err) {
        res.status(500).json({ message:"Server error. Please try again later."});    }
};

exports.createLearner = async (req, res) => {
    try {
        const learnerData = req.body;
        const result = await new Promise((resolve, reject) => {
            Learner.createLearner(learnerData, (err, result) => {
                if (err) reject(err);
                resolve(result);
            });
        });
        res.json({ message: 'Learner created successfully', id: result.insertId });
    } catch (err) {
        res.status(500).json({ message:"Server error. Please try again later."});    }
};

exports.updateLearner = async (req, res) => {
    try {
        const { id } = req.params;
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
        const { id } = req.params;
        const result = await new Promise((resolve, reject) => {
            Learner.deleteLearner(id, (err, result) => {
                if (err) reject(err);
                resolve(result);
            });
        });
        res.json({ message: 'Learner deleted successfully' });
    } catch (err) {
        res.status(500).json({ message:"Server error. Please try again later."});
    }
};
