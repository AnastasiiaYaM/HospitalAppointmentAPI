const express = require('express');
const userController = require('../controllers/user');
const router = express.Router();

// GET users
router.get('/', (req, res) => {
    userController.findAll(req, res);
})

// GET user
router.get('/:id', (req, res) => {
    userController.findOne(req, res);
})

// POST user
router.post('/', (req, res) => {
    userController.create(req, res);
})

// PUT user
router.put('/:id', (req, res) => {
    userController.update(req, res);
})

// DELETE user
router.delete('/:id', (req, res) => {
    userController.delete(req, res);
})

module.exports = router;