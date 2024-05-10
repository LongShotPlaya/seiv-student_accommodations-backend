const db = require("../models");
const Student = db.student;
const StudentCourse = db.studentCourse; 
const StudentAccom = db.studentAccom;
const Request = db.request;
const Op = db.Sequelize.Op;
// Create and Save a new student
exports.create = (req, res) => {
  // Validate request
  if (!req.body.givenPermission || !req.body.userId) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  // Create a student
  const student = {
    givenPermission: req.body.givenPermission,
    userId: req.body.userId,
  };
  // Save Student in the database
  Student.create(student)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Student.",
      });
    });
};
// Retrieve all students from the database.
exports.findAll = (req, res) => {
  //const title = req.query.title;
  //var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  Student.findAll({ where: {} })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving student.",
      });
    });
};

// Find a single Student with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  Student.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Student with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving Student with id=" + id,
      });
    });
};
// Update a Student by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  Student.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Student was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Student with id=${id}. Maybe Student was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating Student with id=" + id,
      });
    });
};
// Delete a Student with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  Student.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Student was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Student with id=${id}. Maybe Student was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Could not delete Student with id=" + id,
      });
    });
};
// Delete all Students from the database.
exports.deleteAll = (req, res) => {
  Student.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Student were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all student.",
      });
    });
};

exports.findAllCoursesForStudent = (req, res) => {
  const studentId = req.params.id;
  StudentCourse.findAll({ where: { studentId: studentId } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving student courses.",
      });
    });

};

exports.findAllRequestsForStudent = (req, res) => {
    const studentId = req.params.id;
    Request.findAll({ where: { studentId: studentId } })
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving requests.",
        });
      });
  
};

exports.findAllAccomsForStudent = (req, res) => {
    const studentId = req.params.id;
    StudentAccom.findAll({ where: { studentId: studentId } })
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving student accommodations.",
        });
      });
  
};
