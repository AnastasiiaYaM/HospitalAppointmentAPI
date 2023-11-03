const express = require('express');
const doctorController = require('../controllers/doctor');
const router = express.Router();


router.get('/', (req, res) => {
    doctorController.findAll(req, res);
})


router.get('/:id', (req, res) => {
    doctorController.findOne(req, res);
})


router.post('/', (req, res) => {
    doctorController.create(req, res);
})


router.put('/:id', (req, res) => {
    doctorController.update(req, res);
})


router.delete('/:id', (req, res) => {
    doctorController.delete(req, res);
})

module.exports = router;