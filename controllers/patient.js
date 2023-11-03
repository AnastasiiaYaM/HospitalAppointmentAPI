const db = require('../models');
const Patient = db.patients;
const Validator = require('validator');

exports.findAll = (req, res) => {
    const id = req.query.id;
    const condition = id ? {id: id} : null;
    Patient.findAll({where: condition}).then(data => {
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

    Patient.findByPk(id).then(data => {
        if (data)
        res.status(200).send({
            message: 'Successfully found the patient',
            patient: data
        });
    }).catch(error =>{res.send(error.name)});
}

exports.create = (req, res) => {
    const {  patient_id, user_id, disease_id, info } = req.body;
    Patient.create({
        patient_id: patient_id,
        user_id: user_id,
        disease_id: disease_id,
        info: info
    }).then((patient)=>{
        Patient.findByPk(patient.patient_id).then(data => {
            res.status(200).send({
                message: 'Successfully created user',
                patient: data
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

    Patient.update(req.body, {where: { id: id }}).then(num => {
        if (num == 1) {
          res.send({
            message: "Patient was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Patient with id=${id}. Maybe Patient was not found or req.body is empty!`
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

    Patient.destroy({where: { id: id }}).then(num => {
        if (num == 1) {
          res.send({
            message: "Patient was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Patient with id=${id}. Maybe Patient was not found!`
          });
        }
      })
      .catch(error =>{res.send(error.name)});
}