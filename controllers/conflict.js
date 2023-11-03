const db = require('../models');
const Conflict = db.conflicts;
const Validator = require('validator');

exports.findAll = (req, res) => {
    const id = req.query.id;
    const condition = id ? {id: id} : null;
    Conflict.findAll({where: condition}).then(data => {
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

    Conflict.findByPk(id).then(data => {
        if (data)
        res.status(200).send({
            message: 'Successfully found Conflict',
            conflict: data
        });
    }).catch(error =>{res.send(error.name)});
}

exports.create = (req, res) => {
    const {  conflict_id, admin_id, appointment_id, reason, conflict_status } = req.body;
    Conflict.create({
        conflict_id: conflict_id,
        admin_id: admin_id,
        appointment_id: appointment_id,
        reason: reason,
        conflict_status: conflict_status
    }).then((conflict)=>{
        Conflict.findByPk(conflict.conflict_id).then(data => {
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

    Conflict.update(req.body, {where: { id: id }}).then(num => {
        if (num == 1) {
          res.send({
            message: "Conflict was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Conflict with id=${id}. Maybe Conflict was not found or req.body is empty!`
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

    Conflict.destroy({where: { id: id }}).then(num => {
        if (num == 1) {
          res.send({
            message: "Conflict was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Conflict with id=${id}. Maybe Conflict was not found!`
          });
        }
      })
      .catch(error =>{res.send(error.name)});
}