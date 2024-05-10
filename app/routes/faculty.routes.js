module.exports = (app) => {
    const faculty = require("../controllers/faculty.controller.js");
    const { authenticate, authAdmin, authFaculty } = require("../authorization/authorization.js");
    var router = require("express").Router();
  
    // Create a new faculty
    router.post("/", [authAdmin], faculty.create);
  
    // Retrieve all faculty
    router.get("/", [authenticate], faculty.findAll);
  
    // Retrieve all courses for faculty
    router.get("/:id/courses", [authFaculty], faculty.findAllCoursesForFaculty);
 
    // Retrieve a single faculty with id
    router.get("/:id", [authenticate], faculty.findOne);
  
    // Update a faculty with id
    router.put("/:id", [authAdmin], faculty.update);
  
    // Delete a faculty with id
    router.delete("/:id", [authAdmin], faculty.delete);
  
    // Delete all faculty
    router.delete("/", [authAdmin], faculty.deleteAll);
  
    app.use("/accommodations-t3/faculty", router);
  };
  