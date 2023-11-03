const express = require('express');
const conflictController = require('../controllers/conflict');
const router = express.Router();


router.get('/', (req, res) => {
    conflictController.findAll(req, res);
})


router.get('/:id', (req, res) => {
    conflictController.findOne(req, res);
})


router.post('/', (req, res) => {
    conflictController.create(req, res);
})


router.put('/:id', (req, res) => {
    conflictController.update(req, res);
})


router.delete('/:id', (req, res) => {
    conflictController.delete(req, res);
})

module.exports = router;