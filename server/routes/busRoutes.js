const express = require('express');
const busController = require('../controllers/busController');
const router = express.Router();

// Define routes and map them to controller functions
router.get('/buses', busController.getAllBuses);
router.get('/buses/:id', busController.getBusById);
router.post('/buses', busController.createBus);
router.put('/buses/:id', busController.updateBus);
router.delete('/buses/:id', busController.deleteBus);

module.exports = router;
