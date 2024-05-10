const db = require("../models");
const Semester = db.semester;
const CourseSchedule = db.courseSchedule; 
const Request = db.request;
const StudentAccom = db.studentAccom;
const Op = db.Sequelize.Op;
// Create and Save a new semester
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name || !req.body.startDate || !req.body.endDate) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  // Create a semester
  const semester = {
    name: req.body.name,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
  };
  // Save Semester in the database
  Semester.create(semester)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Semester.",
      });
    });
};
// Retrieve all semesters from the database.
exports.findAll = (req, res) => {
  //const title = req.query.title;
  //var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  Semester.findAll({ where: {} })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving semester.",
      });
    });
};

// Find a single Semester with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  Semester.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Semester with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving Semester with id=" + id,
      });
    });
};
// Update a Semester by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  Semester.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Semester was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Semester with id=${id}. Maybe Semester was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating Semester with id=" + id,
      });
    });
};
// Delete a Semester with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  Semester.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Semester was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Semester with id=${id}. Maybe Semester was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Could not delete Semester with id=" + id,
      });
    });
};
// Delete all Semesters from the database.
exports.deleteAll = (req, res) => {
  Semester.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Semesters were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all semesters.",
      });
    });
};

exports.findAllSchedulesForSemester = (req, res) => {
  const semesterId = req.params.id;
  CourseSchedule.findAll({ where: { semesterId: semesterId } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving semester course schedule.",
      });
    });

};

exports.findAllRequestsForSemester = (req, res) => {
  const semesterId = req.params.id;
  Request.findAll({ where: { semesterId: semesterId } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving semester request.",
      });
    });
};

exports.findAllStudentAccomsForSemester = (req, res) => {
  const semesterId = req.params.id;
  StudentAccom.findAll({ where: { semesterId: semesterId } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving student accommodations.",
      });
    });
};