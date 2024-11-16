const express = require('express');
const routesController = require('../controllers/routesController');
const router = express.Router();

// Define routes and map them to controller functions
router.get('/routes', routesController.getAllRoutes);
router.get('/routes/:id', routesController.getRouteById);
router.post('/routes', routesController.createRoute);
router.put('/routes/:id', routesController.updateRoute);
router.delete('/routes/:id', routesController.deleteRoute);

module.exports = router;
