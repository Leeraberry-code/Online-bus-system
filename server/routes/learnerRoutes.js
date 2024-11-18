const express = require('express');
const learnerController = require('../controllers/learnerController');
const router = express.Router();

// Define routes for admin operations
router.get('/learners', learnerController.getAllLearners);
router.get('/learners/:id', learnerController.getLearnerById);
router.get('/learners/parent/:parentId', learnerController.getLearnersByParentId);
router.post('/learners', learnerController.createLearner);
router.put('/learners/:id', learnerController.updateLearner);
router.delete('/learners/:id', learnerController.deleteLearner);

module.exports = router;
