module.exports = (app) => {
    const courseSchedule = require("../controllers/courseSchedule.controller.js");
    const { authenticate, authAdmin } = require("../authorization/authorization.js");
    var router = require("express").Router();
  
    // Create a new courseSchedule
    router.post("/", [authAdmin], courseSchedule.create);

    // Create multiple courseSchedules
    router.post("/mult", [authAdmin], courseSchedule.createMultiple);
  
    // Retrieve all courseSchedules
    router.get("/", [authenticate], courseSchedule.findAll);
  
    // Retrieve a single courseSchedule with id
    router.get("/:id", [authenticate], courseSchedule.findOne);

    // Retrieve all faculty courses for semester
    router.get("/:id/faculty", [authenticate], courseSchedule.findAllFacultyCourseForSchedule);

    // Retrieve all student courses for semester
    router.get("/:id/students", [authenticate], courseSchedule.findAllStudentCourseForSchedule);
  
    // Update a courseSchedule with id
    router.put("/:id", [authAdmin], courseSchedule.update);
    
    // Delete multiple courseSchedules
    router.delete("/mult", [authAdmin], courseSchedule.deleteMultiple);
  
    // Delete a courseSchedule with id
    router.delete("/:id", [authAdmin], courseSchedule.delete);
  
    // Delete all courseSchedule
    router.delete("/", [authAdmin], courseSchedule.deleteAll);
  
    app.use("/accommodations-t3/courseSchedules", router);
  };
  