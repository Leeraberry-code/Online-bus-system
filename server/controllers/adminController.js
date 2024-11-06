const Admin = require('../models/admin');
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");

// Controller functions
exports.getAllAdmins = async (req, res) => {
    try {
        const admins = await new Promise((resolve, reject) => {
            Admin.getAllAdmins((err, result) => {
                if (err) reject(err);
                resolve(result);
            });
        });
        res.json(admins);
    } catch (err) {
        res.status(500).json({ message:"Server error. Please try again later."});    }
};

exports.getAdminById = async (req, res) => {
    try {
        const { id } = req.params;
        const admin = await new Promise((resolve, reject) => {
            Admin.getAdminById(id, (err, result) => {
                if (err) reject(err);
                resolve(result);
            });
        });
        res.json(admin);
    } catch (err) {
        res.status(500).json({ message:"Server error. Please try again later."});    }
};

exports.createAdmin = async (req, res) => {
    try {
        const adminData = req.body;
        const result = await new Promise((resolve, reject) => {
            Admin.createAdmin(adminData, (err, result) => {
                if (err) reject(err);
                resolve(result);
            });
        });
        res.json({ message: 'Admin created successfully', id: result.insertId });
    } catch (err) {
        res.status(500).json({ message:err.message});    }
};

exports.updateAdmin = async (req, res) => {
    try {
        const { id } = req.params;
        const adminData = req.body;
        const result = await new Promise((resolve, reject) => {
            Admin.updateAdmin(id, adminData, (err, result) => {
                if (err) reject(err);
                resolve(result);
            });
        });
        res.json({ message: 'Admin updated successfully' });
    } catch (err) {
        res.status(500).json({ message:"Server error. Please try again later."});    }
};

exports.deleteAdmin = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await new Promise((resolve, reject) => {
            Admin.deleteAdmin(id, (err, result) => {
                if (err) reject(err);
                resolve(result);
            });
        });
        res.json({ message: 'Admin deleted successfully' });
    } catch (err) {
        res.status(500).json({ message:"Server error. Please try again later."});    }
};
