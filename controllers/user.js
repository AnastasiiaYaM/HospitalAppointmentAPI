const db = require('../models');
const User = db.users;
const Validator = require('validator');

exports.findAll = (req, res) => {
    const id = req.query.id;
    const condition = id ? {id: id} : null;
    User.findAll({where: condition}).then(data => {
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

    User.findByPk(id).then(data => {
        if (data)
        res.status(200).send({
            message: 'Successfully found the user',
            user: data
        });
    }).catch(error =>{res.send(error.name)});
}

exports.create = (req, res) => {
    const {  user_id, role_type, email, password, first_name, last_name } = req.body;
    User.create({
        user_id: user_id,
        role_type: role_type,
        email: email,
        password: password,
        first_name: first_name,
        last_name: last_name
    }).then((user)=>{
        User.findByPk(user.user_id).then(data => {
            res.status(200).send({
                message: 'Successfully created User',
                user: data
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

	  if (error) res.status(400).json({ success: false, error: "bad request", data: {} });
       
    User.update(req.body, {where: { id: id }}).then(num => {
        if (num == 1) {
          res.send({
            message: "User was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`
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

    User.destroy({where: { id: id }}).then(num => {
        if (num == 1) {
          res.send({
            message: "User was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete User with id=${id}. Maybe User was not found!`
          });
        }
      })
      .catch(error =>{res.send(error.name)});
}