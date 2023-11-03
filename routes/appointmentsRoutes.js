const express = require('express');
const appointmentController = require('../controllers/appointment');
const router = express.Router();


router.get('/', (req, res) => {
    appointmentController.findAll(req, res);
})


router.get('/:id', (req, res) => {
    appointmentController.findOne(req, res);
})


router.post('/', (req, res) => {
    appointmentController.create(req, res);
})


router.put('/:id', (req, res) => {
    appointmentController.update(req, res);
})


router.delete('/:id', (req, res) => {
    appointmentController.delete(req, res);
})

module.exports = router;