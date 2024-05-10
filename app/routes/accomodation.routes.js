module.exports = (app) => {
    const accomodation = require("../controllers/accomodation.controller.js");
    const { authenticate, authAdmin } = require("../authorization/authorization.js");
    var router = require("express").Router();
  
    // Create a new accomodation
    router.post("/", [authAdmin], accomodation.create);

    // Create multiple accommodations
    router.post("/mult", [authAdmin], accomodation.createMultiple);
  
    // Retrieve all accomodation
    router.get("/", [authenticate], accomodation.findAll);
  
    // Retrieve a single accomodation with id
    router.get("/:id", [authenticate], accomodation.findOne);
  
    // Update a accomodation with id
    router.put("/:id", [authAdmin], accomodation.update);
    
    // Delete multiple accommodations
    router.delete("/mult", [authAdmin], accomodation.deleteMultiple);
  
    // Delete multiple accommodations
    router.delete("/mult", [authAdmin], accomodation.deleteMultiple);
  
    // Delete a accomodation with id
    router.delete("/:id", [authAdmin], accomodation.delete);

    // Delete multiple accommodations
    router.delete("/mult", [authAdmin], accomodation.deleteMultiple);
  
    // Delete all accomodation
    router.delete("/", [authAdmin], accomodation.deleteAll);
  
    app.use("/accommodations-t3/accomodations", router);
  };
  