const Route = require('../models/routes');

// Get all Routes
exports.getAllRoutes = (req, res) => {
    Route.getAllroutes((err, Routes) => {
        if (err) return res.status(500).json({ error: err });
        res.json(Routes);
    });
};

// Get Route by ID
exports.getRouteById = (req, res) => {
    const { id } = req.params;
    Route.getrouteById(id, (err, Route) => {
        if (err) return res.status(500).json({ error: err });
        res.json(Route);
    });
};

// Create new Route
exports.createRoute = (req, res) => {
    const RouteData = req.body;
    Route.createroute(RouteData, (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: 'Route created successfully', id: result.insertId });
    });
};

// Update existing Route
exports.updateRoute = (req, res) => {
    const { id } = req.params;
    const RouteData = req.body;
    Route.updateroute(id, RouteData, (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: 'Route updated successfully' });
    });
};

// Delete Route by ID
exports.deleteRoute = (req, res) => {
    const { id } = req.params;
    Route.deleteRoute(id, (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: 'Route deleted successfully' });
    });
};
