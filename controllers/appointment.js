const db = require('../models');
const Appointment = db.appointments;
const Validator = require('validator');

exports.findAll = (req, res) => {
    const id = req.query.id;
    const condition = id ? {id: id} : null;
    Appointment.findAll({where: condition}).then(data => {
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

    Appointment.findByPk(id).then(data => {
        if (data)
        res.status(200).send({
            message: 'Successfully found the appointment',
            user: data
        });
    }).catch(error =>{res.send(error.name)});
}

exports.create = (req, res) => {
    const {  appointment_id, patient_id, doctor_id, appointment_status, date, start, end } = req.body;
    Appointment.create({
        appointment_id: appointment_id,
        patient_id: patient_id,
        doctor_id: doctor_id,
        appointment_status: appointment_status,
        date: date,
        start: start,
        end: end
    }).then((appointment)=>{
        User.findByPk(appointment.appointment_id).then(data => {
            res.status(200).send({
                message: 'Successfully created Appointment',
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

    Appointment.update(req.body, {where: { id: id }}).then(num => {
        if (num == 1) {
          res.send({
            message: "Appointment was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Appointment with id=${id}. Maybe Appointment was not found or req.body is empty!`
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

    Appointment.destroy({where: { id: id }}).then(num => {
        if (num == 1) {
          res.send({
            message: "Appointment was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Appointment with id=${id}. Maybe Appointment was not found!`
          });
        }
      })
      .catch(error =>{res.send(error.name)});
}