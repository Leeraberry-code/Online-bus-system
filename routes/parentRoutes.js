const express = require('express');
const parentController = require('../controllers/parentController');
const router = express.Router();

// Define routes and map them to controller functions
router.get('/parents', parentController.getAllParents);
router.get('/parents/:id', parentController.getParentById);
router.post('/parents', parentController.createParent);
router.put('/parents/:id', parentController.updateParent);
router.delete('/parents/:id', parentController.deleteParent);

module.exports = router;
