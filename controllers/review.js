const db = require('../models');
const Review = db.reviews;
const Validator = require('validator');

exports.findAll = (req, res) => {
    const id = req.params.id;
    const condition = id ? {id: id} : null;
    Review.findAll({where: condition}).then(data => {
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

    Review.findByPk(id).then(data => {
        if (data)
        res.status(200).send({
            message: 'Successfully found Review',
            review: data
        });
    }).catch(error =>{res.send(error.name)});
}

exports.create = (req, res) => {
    const { review_id, appointment_id, review_creator, rate, message } = req.body;
    Review.create({
        review_id: review_id,
        appointment_id: appointment_id,
        review_creator: review_creator,
        rate: rate,
        message: message
    }).then((review)=>{
        User.findByPk(review.review_id).then(data => {
            res.status(200).send({
                message: 'Successfully created Review',
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

    Review.update(req.body, {where: { id: id }}).then(num => {
        if (num == 1) {
          res.send({
            message: "Review was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Review with id=${id}. Maybe Review was not found or req.body is empty!`
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

    Review.destroy({where: { id: id }}).then(num => {
        if (num == 1) {
          res.send({
            message: "Review was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Review with id=${id}. Maybe Review was not found!`
          });
        }
      })
      .catch(error =>{res.send(error.name)});
}