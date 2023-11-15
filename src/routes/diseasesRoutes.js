const express = require('express');
const diseaseController = require('../controllers/disease');
const router = express.Router();


router.get('/', (req, res) => {
    diseaseController.findAll(req, res);
})


router.get('/:id', (req, res) => {
    diseaseController.findOne(req, res);
})


router.post('/', (req, res) => {
    diseaseController.create(req, res);
})


router.put('/:id', (req, res) => {
    diseaseController.update(req, res);
})


router.delete('/:id', (req, res) => {
    diseaseController.delete(req, res);
})

module.exports = router;