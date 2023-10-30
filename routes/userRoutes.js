const express = require("express");
const router = express.Router();

const users = require("../controllers/userController");

  
    router.post("/api/v1/users", users.createUser);
  

    router.get("/api/v1/users", users.findAllUsers);
  

    router.get("/api/v1/users/:id", users.findUser);
  

    router.put("/api/v1/users/:id", users.updateUser);
  
    // Delete a Tutorial with id
    router.delete("/api/v1/users/:id", users.deleteUser);
  

  
  module.exports = router;