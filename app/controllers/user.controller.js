const db = require("../models");
const User = db.user;
const Request = db.request;
const StudentCourse = db.studentCourse;
const CourseSchedule = db.courseSchedule;
const FacultyCourse = db.facultyCourse;
const Mailer = require("../utils/mailer");
const Op = db.Sequelize.Op;

// Create and Save a new User
exports.create = (req, res) => {
  // Validate request
  if (!req.body.fName || !req.body.lName || !req.body.email || !req.body.role) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a User
  const user = {
    fName: req.body.fName,
    lName: req.body.lName,
    email: req.body.email,
    role: req.body.role,
    // refresh_token: req.body.refresh_token,
    // expiration_date: req.body.expiration_date
  };

  // Save User in the database
  User.create(user)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the User.",
      });
    });
};

// Retrieve all People from the database.
exports.findAll = (req, res) => {
  const id = req.query.id;

  User.findAll({ where: {} })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving people.",
      });
    });
};

// Find a single User with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  User.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find User with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving User with id=" + id,
      });
    });
};

// Find a single User with an email
exports.findByEmail = (req, res) => {
  const email = req.params.email;

  User.findOne({
    where: {
      email: email,
    },
  })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.send({ email: "not found" });
        /*res.status(404).send({
          message: `Cannot find User with email=${email}.`
        });*/
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving User with email=" + email,
      });
    });
};

// Update a User by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  User.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "User was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating User with id=" + id,
      });
    });
};

exports.findAllRequestsForUser = (req, res) => {
  const userId = req.params.id;
  Request.findAll({ where: { userId: userId } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving requests.",
      });
    });
};

// Updates the roles of all specified users to their specified roles
exports.updateRoles = (req, res) => {
  errors = []

  Promise.all(
    req.body.users.map((user) => User.update({ role: user.role }, { where: { id: user.id } })
      .catch((err) => {errors.push(user.id)})
      ))
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "All user roles were updated successfully.",
        });
      } else {
        res.send({
          message: `Failed to update one or more Users: ${errors}`,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: `Error updating one or more Users: ${errors}`,
      });
    });
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  User.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "User was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete User with id=${id}. Maybe User was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete User with id=" + id,
      });
    });
};

// Delete all People from the database.
exports.deleteAll = (req, res) => {
  User.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} People were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all people.",
      });
    });
};

exports.findUserFacultyForSemester = async (req, res) => {
  let userScheduleIds = [];
  let facultyIds = [];
  let error = false;

  // Get user's student courses
  await StudentCourse.findAll({ where: { userId: req.params.id } })
    .then((data) => {
      userScheduleIds = data.map(sc => sc.courseScheduleId);
      console.log(userScheduleIds)
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving student courses.",
      });
      error = true;
      console.log(err)
    });
  if (error) return;

  // Get user's course schedules for the specified semester
  await CourseSchedule.findAll({ where: { semesterId: req.params.semesterId, id: userScheduleIds } })
    .then((data) => {
      userScheduleIds = data.map(cs => cs.id);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving semester course schedule.",
      });
      error = true;
    });
  if (error) return;
  
  // Get faculty courses which have courseScheduleIds which match the array
  await FacultyCourse.findAll({ where: { courseScheduleId: userScheduleIds } })
    .then((data) => {
      facultyIds = data.map(fc => fc.userId);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving faculty courses.",
      });
      error = true;
    })
  if (error) return;

  User.findAll({ where: { id: facultyIds } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving faculty.",
      });
    });
};

exports.findUserStudentsForSemester = async (req, res) => {
  let userScheduleIds = [];
  let studentIds = [];
  let error = false;
  
  // Get user's faculty courses
  await FacultyCourse.findAll({ where: { userId: req.params.id } })
    .then((data) => {
      userScheduleIds = data.map(sc => sc.courseScheduleId);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving faculty courses.",
      });
      error = true;
    })
  if (error) return;

  // Get user's course schedules for the specified semester
  await CourseSchedule.findAll({ where: { semesterId: req.params.semesterId, id: userScheduleIds } })
    .then((data) => {
      userScheduleIds = data.map(cs => cs.id);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving semester course schedule.",
      });
      error = true;
    });
  if (error) return;

  // Get student courses which have courseScheduleIds which match the array
  await StudentCourse.findAll({ where: { courseScheduleId: userScheduleIds } })
    .then((data) => {
      studentIds = data.map(sc => sc.userId);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving student courses.",
      });
      error = true;
    });
  if (error) return;

  User.findAll({ where: { id: studentIds } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving students.",
      });
    });
};

exports.sendMail = (req, res) => {
  Mailer.sendEmail(req.body.fromUser, req.body.toUsers, req.body.message)
    .then((response) => {
      res.send({message: "Successfully sent message!"});
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while sending Notification.",
      });
    })
};