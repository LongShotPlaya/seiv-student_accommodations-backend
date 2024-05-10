module.exports = (app) => {
    const student = require("../controllers/student.controller.js");
    const { authenticate, authAdmin, authStudent } = require("../authorization/authorization.js");
    var router = require("express").Router();
  
    // Create a new student
    router.post("/", [authAdmin], student.create);
  
    // Retrieve all students
    router.get("/", [authenticate], student.findAll);
  
    // Retrieve all requests for student
    router.get("/:id/requests", [authStudent], student.findAllRequestsForStudent);

    // Retrieve all accomodations for student
    router.get("/:id/accommodations", [authenticate], student.findAllAccomsForStudent);

    // Retrieve all courses for student
    router.get("/:id/courses", [authStudent], student.findAllCoursesForStudent);
 
    // Retrieve a single student with id
    router.get("/:id", [authenticate], student.findOne);
  
    // Update a student with id
    router.put("/:id", [authAdmin], student.update);
  
    // Delete a student with id
    router.delete("/:id", [authAdmin], student.delete);
  
    // Delete all students
    router.delete("/", [authAdmin], student.deleteAll);
  
    app.use("/accommodations-t3/students", router);
  };
  