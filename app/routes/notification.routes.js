module.exports = (app) => {
    const notification = require("../controllers/notification.controller.js");
    const { authenticate, authAdmin, authFaculty } = require("../authorization/authorization.js");
    var router = require("express").Router();
  
    // Create a new notification
    router.post("/", [authAdmin], notification.create);
  
    // Retrieve all notification
    router.get("/", [authFaculty], notification.findAll);
  
    // Retrieve a single notification with id
    router.get("/:id", [authFaculty], notification.findOne);
  
    // Update a notification with id
    router.put("/:id", [authAdmin], notification.update);
  
    // Delete a notification with id
    router.delete("/:id", [authAdmin], notification.delete);
  
    // Delete all notification
    router.delete("/", [authAdmin], notification.deleteAll);
  
    app.use("/accommodations-t3/notifications", router);
  };
  