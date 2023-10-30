const User = require('../models/userModel');

// Create new user

const createUser = (req, res) => {
 
  if (!req.body.title) {
    res.status(400).send({
      status: "Failed",
      message: "Content can not be empty!"
    });
    return;
  }

  const user = {
    user_id: req.body.user_id,
    role_type: req.body.role_type,
    email: req.body.email,
    first_name: req.body.first_name,
    last_name: req.body.last_name
  };

  User.create(user)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User."
      });
    });
};

// Retrieve all users
const findAllUsers = (res) => {
  
  User.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Failed to retrieve data."
      });
    });
};

// Find a user with an id
const findUser = (req, res) => {
  const user_id = req.params.user_id;

  User.findByPk(user_id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find the user with id=${user_id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving the user with id=" + user_id
      });
    });
};

// Update a user by the id 
const updateUser = (req, res) => {
  const user_id = req.params.user_id;

  User.update(req.body, {
    where: { user_id: user_id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "User was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update the user with id=${user_id}. Maybe user was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating the user with id=" + user_id
      });
    });
};

// Delete a user with the specified id 
const deleteUser = (req, res) => {
  const user_id = req.params.user_id;

  User.destroy({
    where: { user_id: user_id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "User was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete user with id=${user_id}. User was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete user with id=" + user_id
      });
    });
};



module.exports = {
  createUser,
  findAllUsers,
  findUser,
  updateUser,
  deleteUser
};