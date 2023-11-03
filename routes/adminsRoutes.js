const express = require('express');
const adminController = require('../controllers/admin');
const router = express.Router();


router.get('/', (req, res) => {
    adminController.findAll(req, res);
})


router.get('/:id', (req, res) => {
    adminController.findOne(req, res);
})


router.post('/', (req, res) => {
    adminController.create(req, res);
})


router.put('/:id', (req, res) => {
    adminController.update(req, res);
})


router.delete('/:id', (req, res) => {
    adminController.delete(req, res);
})

module.exports = router;