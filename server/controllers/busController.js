const Bus = require('../models/bus');

// Get all buses
exports.getAllBuses = (req, res) => {
    Bus.getAllBuses((err, buses) => {
        if (err) return res.status(500).json({ error: err });
        res.json(buses);
    });
};

// Get bus by ID
exports.getBusById = (req, res) => {
    const { id } = req.params;
    Bus.getBusById(id, (err, bus) => {
        if (err) return res.status(500).json({ error: err });
        res.json(bus);
    });
};

// Create new bus
exports.createBus = (req, res) => {
    const busData = req.body;
    Bus.createBus(busData, (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: 'Bus created successfully', id: result.insertId });
    });
};

// Update existing bus
exports.updateBus = (req, res) => {
    const { id } = req.params;
    const busData = req.body;
    Bus.updateBus(id, busData, (err, result) => {
        if (err) {
            console.error("Error updating bus:", err); // Log the error for debugging
            return res.status(500).json({ error: err.message || "An error occurred while updating the bus." });
        }
        res.json({ message: 'Bus updated successfully' });
    });
};

// Delete bus by ID
exports.deleteBus = (req, res) => {
    const { id } = req.params;
    Bus.deleteBus(id, (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: 'Bus deleted successfully' });
    });
};
