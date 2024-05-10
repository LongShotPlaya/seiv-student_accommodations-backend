module.exports = (app) => {
    const course = require("../controllers/course.controller.js");
    const { authenticate, authAdmin } = require("../authorization/authorization.js");
    var router = require("express").Router();
  
    // Create a new course
    router.post("/", [authAdmin], course.create);
  
    // Retrieve all course
    router.get("/", [authenticate], course.findAll);
  
    // Retrieve a single course with id
    router.get("/:id", [authenticate], course.findOne);

    // Retrieve all course schedules for course
    router.get("/:id/schedules", [authenticate], course.findAllSchedulesForCourse);
 
    // Update a course with id
    router.put("/:id", [authAdmin], course.update);
  
    // Delete a course with id
    router.delete("/:id", [authAdmin], course.delete);
  
    // Delete all course
    router.delete("/", [authAdmin], course.deleteAll);
  
    app.use("/accommodations-t3/courses", router);
  };
  