module.exports = (app) => {
  const user = require("../controllers/user.controller.js");
  const { authenticate, authAdmin, authFaculty } = require("../authorization/authorization.js");
  var router = require("express").Router();

  // Create a new User
  router.post("/", /*[authenticate],*/ user.create);

  // Send mail
  router.post("/mail", [authAdmin], user.sendMail);

  // Retrieve all People
  router.get("/", [authFaculty], user.findAll);

  // Retrieve a single User with id
  router.get("/:id", [authenticate], user.findOne);

  // Retrieve all requests for user
  router.get("/:id/requests", [authenticate], user.findAllRequestsForUser);

  // Retrieve a single User's faculty for a semester
  router.get("/:id/semesters/:semesterId/faculty", [authenticate], user.findUserFacultyForSemester);

  // Retrieve a single User's students for a semester
  router.get("/:id/semesters/:semesterId/students", [authFaculty], user.findUserStudentsForSemester);

  // Update a User with id
  router.put("/:id", [authAdmin], user.update);

  // Update several Users' roles using ids
  router.put("/", [authAdmin], user.updateRoles);

  // Delete a User with id
  router.delete("/:id", [authAdmin], user.delete);

  // Delete all User
  router.delete("/", [authAdmin], user.deleteAll);

  app.use("/accommodations-t3/user", router);
};
