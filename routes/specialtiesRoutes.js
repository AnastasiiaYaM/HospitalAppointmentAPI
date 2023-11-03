const express = require('express');
const specialtyController = require('../controllers/specialty');
const router = express.Router();


router.get('/', (req, res) => {
    specialtyController.findAll(req, res);
})


router.get('/:id', (req, res) => {
    specialtyController.findOne(req, res);
})


router.post('/', (req, res) => {
    specialtyController.create(req, res);
})


router.put('/:id', (req, res) => {
    specialtyController.update(req, res);
})


router.delete('/:id', (req, res) => {
    specialtyController.delete(req, res);
})

module.exports = router;