const db = require('../models');
const Specialty = db.specialties;
const Validator = require('validator');

exports.findAll = (req, res) => {
    const id = req.query.id;
    const condition = id ? {id: id} : null;
    Specialty.findAll({where: condition}).then(data => {
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

	  if (error) res.status(400).json({ success: false, error: "bad request", data: {} });
       
    Specialty.findByPk(id).then(data => {
        res.status(200).send({
        message: 'Successfully found the specialty',
        patient: data
        });
    }).catch(error =>{res.send(error.name)});
    };

exports.create = (req, res) => {
    const { specialty_id, specialty_title, disease_id } = req.body;
    Specialty.create({
        specialty_id: specialty_id,
        specialty_title: specialty_title,
        disease_id: disease_id
    }).then((specialty)=>{
        Specialty.findByPk(specialty.specialty_id).then(data => {
                res.status(200).send({
                message: 'Successfully created specialty',
                specialty: data
                });
            });
    }).catch(error =>{res.send(error.name)});
    };

exports.update = (req, res) => {
    let error = null;
    let id = req.params.id || null;

    if (!id) error = "Invalid request.";
    else if (Validator.isEmpty(id)) error = "Invalid request.";
	  else if (!Validator.isInt(id)) error = "Value must be integer.";
	  else if (id <= 0) error = "Invalid value.";

	  if (error) res.status(400).json({ success: false, error: "bad request", data: {} });
       
    Specialty.update(req.body, {where: { id: id }}).then(num => {
        if (num == 1) {
          res.send({
            message: "Specialty was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Specialty with id=${id}. Maybe Specialty was not found or req.body is empty!`
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

    Specialty.destroy({where: { id: id }}).then(num => {
        if (num == 1) {
          res.send({
            message: "Specialty was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Specialty with id=${id}. Maybe Specialty was not found!`
          });
        }
      })
      .catch(error =>{res.send(error.name)});
  };