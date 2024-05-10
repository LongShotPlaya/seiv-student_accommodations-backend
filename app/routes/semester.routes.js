module.exports = (app) => {
    const semester = require("../controllers/semester.controller.js");
    const { authenticate, authAdmin, authStudent } = require("../authorization/authorization.js");
    var router = require("express").Router();
  
    // Create a new semester
    router.post("/", [authAdmin], semester.create);
  
    // Retrieve all semester
    router.get("/", [authenticate], semester.findAll);
  
    // Retrieve a single semester with id
    router.get("/:id", [authenticate], semester.findOne);

    // Retrieve all course schedules for semester
    router.get("/:id/schedules", [authenticate], semester.findAllSchedulesForSemester);

    // Retrieve all requests for semester
    router.get("/:id/requests", [authStudent], semester.findAllRequestsForSemester);

    // Retrieve all student accommodations for semester
    router.get("/:id/studentAccoms", [authenticate], semester.findAllStudentAccomsForSemester);
  
    // Update a semester with id
    router.put("/:id", [authAdmin], semester.update);
  
    // Delete a semester with id
    router.delete("/:id", [authAdmin], semester.delete);
  
    // Delete all semesters
    router.delete("/", [authAdmin], semester.deleteAll);
  
    app.use("/accommodations-t3/semesters", router);
  };
  