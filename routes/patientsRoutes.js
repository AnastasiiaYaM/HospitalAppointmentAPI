const express = require('express');
const patientController = require('../controllers/patient');
const router = express.Router();


router.get('/', (req, res) => {
    patientController.findAll(req, res);
})


router.get('/:id', (req, res) => {
    patientController.findOne(req, res);
})


router.post('/', (req, res) => {
    patientController.create(req, res);
})


router.put('/:id', (req, res) => {
    patientController.update(req, res);
})


router.delete('/:id', (req, res) => {
    patientController.delete(req, res);
})

module.exports = router;