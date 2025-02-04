const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { checkToken } = require('../utils/middleware');

// Return a list of all users
router.get('/users', userController.getAllUsers);

// Create a new user
router.post('/users', userController.createUser);

// Check the login data
router.post('/users/login', userController.loginUser);

module.exports = router;