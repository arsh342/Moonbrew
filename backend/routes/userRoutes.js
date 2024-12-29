const express = require('express');
const router = express.Router();
const { register, login, getProfile, updateProfile } = require('../controllers/userController');

// POST /api/users/register - Register new user
router.post('/register', register);

// POST /api/users/login - Login user
router.post('/login', login);

// GET /api/users/profile - Get user profile
router.get('/profile', getProfile);

// PUT /api/users/profile - Update user profile
router.put('/profile', updateProfile);

module.exports = router; 