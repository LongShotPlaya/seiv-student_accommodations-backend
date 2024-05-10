module.exports = (app) => {
    const studentAccom = require("../controllers/studentAccom.controller.js");
    const { authenticate, authAdmin } = require("../authorization/authorization.js");
    var router = require("express").Router();
  
    // Create a new studentAccom
    router.post("/", [authAdmin], studentAccom.create);

    // Create several new studentAccoms
    router.post("/mult", [authAdmin], studentAccom.createMultiple);
  
    // Retrieve all studentAccom
    router.get("/", [authenticate], studentAccom.findAll);
  
    // Retrieve a single studentAccom with id
    router.get("/:id", [authenticate], studentAccom.findOne);
  
    // Update a studentAccom with id
    router.put("/:id", [authAdmin], studentAccom.update);
  
    // Delete a studentAccom with id
    router.delete("/:id", [authAdmin], studentAccom.delete);

    // Delete multiple studentAccoms with ids
    router.delete("/mult", [authAdmin], studentAccom.deleteMultiple);
  
    // Delete all studentAccom
    router.delete("/", [authAdmin], studentAccom.deleteAll);
  
    app.use("/accommodations-t3/studentAccoms", router);
  };
  