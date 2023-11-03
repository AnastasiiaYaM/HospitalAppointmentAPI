const express = require('express');
const authController = require('../controllers/auth');
const router = express.Router();

//register
router.post('/register', (req, res) => {
    authController.register(req, res);
})
 

// login
router.get('/login/:id', (req, res) => {
    authController.login(req, res);
})


module.exports = router;
