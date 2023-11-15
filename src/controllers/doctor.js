const db = require('../models');
const Doctor = db.doctors;
const Validator = require('validator');

exports.findAll = (req, res) => {
    const id = req.params.id;
    const condition = id ? {id: id} : null;
    Doctor.findAll({where: condition}).then(data => {
        res.send(data);
    }).catch(error =>{res.send(error.name)});
}

exports.findOne = (req, res) => {
    let error = null;
    let id = req.params.id || null;

    if (!id) error = "Invalid request.";
    else if (Validator.isEmpty(id)) error = "Invalid request.";
	  else if (!Validator.isInt(id)) error = "Value must be integer.";
	  else if (id <= 0) error = "Invalid value.";

	  if (error) res.status(400).json({ success: false, error: error, data: {} });

    Doctor.findByPk(id).then(data => {
        if (data)
        res.status(200).send({
            message: 'Successfully found the doctor',
            user: data
        });
    }).catch(error =>{res.send(error.name)});
}

exports.create = (req, res) => {
    const {  doctor_id, user_id, specialty_id, working_hours, availability } = req.body;
    Doctor.create({
        doctor_id: doctor_id,
        user_id: user_id,
        specialty_id: specialty_id,
        working_hours: working_hours,
        availability: availability
    }).then((user)=>{
        Doctor.findByPk(user.user_id).then(data => {
            res.status(200).send({
                message: 'Successfully created User',
                specialty: data
                });
            });
    }).catch(error =>{res.send(error.name)});
}

exports.update = (req, res) => {
    let error = null;
    let id = req.params.id || null;

    if (!id) error = "Invalid request.";
    else if (Validator.isEmpty(id)) error = "Invalid request.";
	  else if (!Validator.isInt(id)) error = "Value must be integer.";
	  else if (id <= 0) error = "Invalid value.";

	  if (error) res.status(400).json({ success: false, error: error, data: {} });

    Doctor.update(req.body, {where: { id: id }}).then(num => {
        if (num == 1) {
          res.send({
            message: "Doctor was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Doctor with id=${id}. Maybe Doctor was not found or req.body is empty!`
          });
        }
      }).catch(error =>{res.send(error.name)});
}

exports.delete = (req, res) => {
    let error = null;
    let id = req.params.id || null;

    if (!id) error = "Invalid request.";
    else if (Validator.isEmpty(id)) error = "Invalid request.";
	  else if (!Validator.isInt(id)) error = "Value must be integer.";
	  else if (id <= 0) error = "Invalid value.";

	  if (error) res.status(400).json({ success: false, error: error, data: {} });

    Doctor.destroy({where: { id: id }}).then(num => {
        if (num == 1) {
          res.send({
            message: "Doctor was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Doctor with id=${id}. Maybe Doctor was not found!`
          });
        }
      })
      .catch(error =>{res.send(error.name)});
}