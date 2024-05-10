module.exports = (app) => {
    const request = require("../controllers/request.controller.js");
    const { authenticate, authStudent, authAdmin } = require("../authorization/authorization.js");
    var router = require("express").Router();
  
    // Create a new request
    router.post("/", [authStudent], request.create);
  
    // Retrieve all requests
    router.get("/", [authenticate], request.findAll);
  
    // Retrieve a single request with id
    router.get("/:id", [authenticate], request.findOne);
  
    // Update a request with id
    router.put("/:id", [authAdmin], request.update);
  
    // Delete a request with id
    router.delete("/:id", [authAdmin], request.delete);
  
    // Delete all requests
    router.delete("/", [authAdmin], request.deleteAll);
  
    app.use("/accommodations-t3/requests", router);
  };