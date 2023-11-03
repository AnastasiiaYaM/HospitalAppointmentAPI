const express = require('express');
const reviewController = require('../controllers/review');
const router = express.Router();


router.get('/', (req, res) => {
    reviewController.findAll(req, res);
})


router.get('/:id', (req, res) => {
    reviewController.findOne(req, res);
})


router.post('/', (req, res) => {
    reviewController.create(req, res);
})


router.put('/:id', (req, res) => {
    reviewController.update(req, res);
})


router.delete('/:id', (req, res) => {
    reviewController.delete(req, res);
})

module.exports = router;