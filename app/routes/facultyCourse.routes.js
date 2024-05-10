module.exports = (app) => {
    const facultyCourse = require("../controllers/facultyCourse.controller.js");
    const { authenticate, authAdmin } = require("../authorization/authorization.js");
    var router = require("express").Router();
  
    // Create a new facultyCourse
    router.post("/", [authAdmin], facultyCourse.create);

    // Create multiple facultyCourses
    router.post("/mult", [authAdmin], facultyCourse.createMultiple);
  
    // Retrieve all facultyCourse
    router.get("/", [authenticate], facultyCourse.findAll);
  
    // Retrieve a single facultyCourse with id
    router.get("/:id", [authenticate], facultyCourse.findOne);
  
    // Update a facultyCourse with id
    router.put("/:id", [authAdmin], facultyCourse.update);

    // Delete multiple facultyCourses
    router.delete("/mult", [authAdmin], facultyCourse.deleteMultiple);
  
    // Delete a facultyCourse with id
    router.delete("/:id", [authAdmin], facultyCourse.delete);
  
    // Delete all facultyCourse
    router.delete("/", [authAdmin], facultyCourse.deleteAll);
  
    app.use("/accommodations-t3/facultyCourses", router);
  };
  