module.exports = (app) => {
    const accomodationCat = require("../controllers/accomodationCat.controller.js");
    const { authenticate, authAdmin } = require("../authorization/authorization.js");
    var router = require("express").Router();
  
    // Create a new accomodationCat
    router.post("/", [authAdmin], accomodationCat.create);
  
    // Retrieve all accomodationCat
    router.get("/", [authenticate], accomodationCat.findAll);
  
    // Retrieve a single accomodationCat with id
    router.get("/:id", [authenticate], accomodationCat.findOne);
  
    // Update a accomodationCat with id
    router.put("/:id", [authAdmin], accomodationCat.update);
  
    // Delete a accomodationCat with id
    router.delete("/:id", [authAdmin], accomodationCat.delete);
  
    // Delete all accomodationCat
    router.delete("/", [authAdmin], accomodationCat.deleteAll);
  
    app.use("/accommodations-t3/accomodationCats", router);
  };
  