module.exports = (app) => {
    const studentCourse = require("../controllers/studentCourse.controller.js");
    const { authenticate, authAdmin } = require("../authorization/authorization.js");
    var router = require("express").Router();
  
    // Create a new studentCourse
    router.post("/", [authAdmin], studentCourse.create);

    // Create multiple studentCourses
    router.post("/mult", [authAdmin], studentCourse.createMultiple);
  
    // Retrieve all studentCourse
    router.get("/", [authenticate], studentCourse.findAll);
  
    // Retrieve a single studentCourse with id
    router.get("/:id", [authenticate], studentCourse.findOne);
  
    // Update a studentCourse with id
    router.put("/:id", [authAdmin], studentCourse.update);

    // Delete multiple studentCourses
    router.delete("/mult", [authAdmin], studentCourse.deleteMultiple);
  
    // Delete a studentCourse with id
    router.delete("/:id", [authAdmin], studentCourse.delete);
  
    // Delete all studentCourse
    router.delete("/", [authAdmin], studentCourse.deleteAll);
  
    app.use("/accommodations-t3/studentCourses", router);
  };
  