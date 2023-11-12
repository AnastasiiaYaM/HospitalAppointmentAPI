const db = require('../models');
const Disease = db.diseases;
const Validator = require('validator');

exports.findAll = (req, res) => {
    const id = req.params.id;
    const condition = id ? {id: id} : null;
    Disease.findAll({where: condition}).then(data => {
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

    Disease.findByPk(id).then(data => {
        if (data)
        res.status(200).send({
            message: 'Successfully found the disease',
            user: data
        });
    }).catch(error =>{res.send(error.name)});
}

exports.create = (req, res) => {
    const {  disease_id, disease_title, specialty_id, password, first_name, last_name } = req.body;
    Disease.create({
        disease_id: disease_id,
        disease_title: disease_title,
        specialty_id: specialty_id,
        password: password,
        first_name: first_name,
        last_name: last_name
    }).then((disease)=>{
        User.findByPk(disease.disease_id).then(data => {
            res.status(200).send({
                message: 'Successfully created Disease',
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

    Disease.update(req.body, {where: { id: id }}).then(num => {
        if (num == 1) {
          res.send({
            message: "Disease was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Disease with id=${id}. Maybe Disease was not found or req.body is empty!`
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

    Disease.destroy({where: { id: id }}).then(num => {
        if (num == 1) {
          res.send({
            message: "Disease was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Disease with id=${id}. Maybe Disease was not found!`
          });
        }
      })
      .catch(error =>{res.send(error.name)});
}