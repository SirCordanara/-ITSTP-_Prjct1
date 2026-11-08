const { Router } = require('express');
const authController = require('../controllers/tasks.js');

const router = Router();

//маршруты регистрации
router.get('/register', authController.renderRegister);router.post('/register', authController.handleRegister);
//маршруты авторизации
router.get('/login', authController.renderLogin);router.post('/login', authController.handleLogin);
//выход 
router.get('/logout', authController.handleLogout);

module.exports = router;
