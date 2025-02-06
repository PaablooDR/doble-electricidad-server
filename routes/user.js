const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { checkToken } = require('../utils/middleware');

// Return a list of all users
router.get('/users', userController.getAllUsers);

// Return user
router.get('/users/user', checkToken, userController.getUser);

// Create a new user
router.post('/users', userController.createUser);

// Check the login data
router.post('/users/login', userController.loginUser);

// Edit user data
router.put('/users/edit', checkToken, userController.editUser);

module.exports = router;