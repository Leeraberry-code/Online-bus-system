const Parent = require('../models/parent');

exports.getAllParents = async (req, res) => {
    try {
        const parents = await new Promise((resolve, reject) => {
            Parent.getAllParents((err, result) => {
                if (err) reject(err);
                resolve(result);
            });
        });
        res.json(parents);
    } catch (err) {
        res.status(500).json({ message:"Server error. Please try again later."});    }
};

exports.getParentById = async (req, res) => {
    try {
        const { id } = req.params;
        const parent = await new Promise((resolve, reject) => {
            Parent.getParentById(id, (err, result) => {
                if (err) reject(err);
                resolve(result);
            });
        });
        res.json(parent);
    } catch (err) {
        res.status(500).json({ message:"Server error. Please try again later."});    }
};

exports.createParent = async (req, res) => {
    try {
        const parentData = req.body;
        const result = await new Promise((resolve, reject) => {
            Parent.createParent(parentData, (err, result) => {
                if (err) reject(err);
                resolve(result);
            });
        });
        res.json({ message: 'Parent created successfully', id: result.insertId });
    } catch (err) {
        res.status(500).json({ message:err.message});    }
};

exports.updateParent = async (req, res) => {
    try {
        const { id } = req.params;
        const {Parent_Passcode, Parent_CellNo, Parent_Email} = req.body;
        const result = await new Promise((resolve, reject) => {
            Parent.updateParent(id, {Parent_Passcode, Parent_CellNo, Parent_Email}, (err, result) => {
                if (err) reject(err);
                resolve(result);
            });
        });
        res.json({ message: 'Parent updated successfully' });
    } catch (err) {
        res.status(500).json({ message:"Server error. Please try again later."});    }
};

exports.deleteParent = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await new Promise((resolve, reject) => {
            Parent.deleteParent(id, (err, result) => {
                if (err) reject(err);
                resolve(result);
            });
        });
        res.json({ message: 'Parent deleted successfully' });
    } catch (err) {
        res.status(500).json({ message:"Server error. Please try again later."});    }
};
