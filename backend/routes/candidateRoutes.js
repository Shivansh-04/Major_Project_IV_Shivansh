const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth');
const upload = require('../middleware/upload');
const { uploadResume, getProfile, getRecommendedJobs } = require('../controllers/candidateController');

router.post('/resume', protect, upload.single('resume'), uploadResume);
router.get('/profile', protect, getProfile);
router.get('/jobs', protect, getRecommendedJobs);

module.exports = router;