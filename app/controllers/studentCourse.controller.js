const db = require("../models");
const StudentCourse = db.studentCourse;
const Op = db.Sequelize.Op;
// Create and Save a new studentcourse
exports.create = (req, res) => {
  // Validate request
  if (!req.body.userId || !req.body.courseScheduleId) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  // Create a studentcourse
  const studentCourse = {
    userId: req.body.userId,
    courseScheduleId: req.body.courseScheduleId,
  };
  // Save StudentCourse in the database
  StudentCourse.create(studentCourse)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Student Course.",
      });
    });
};
// Retrieve all StudentCourses from the database.
exports.findAll = (req, res) => {
  //const title = req.query.title;
  //var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  StudentCourse.findAll({ where: {} })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving student courses.",
      });
    });
};

// Find a single StudentCourse with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  StudentCourse.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Student Course with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving Student Course with id=" + id,
      });
    });
};
// Update a StudentCourse by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  StudentCourse.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Student Course was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Student Course with id=${id}. Maybe Student Course was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating Student Course with id=" + id,
      });
    });
};
// Delete a StudentCourse with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  StudentCourse.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Student Course was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Student Course with id=${id}. Maybe Student Course was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Could not delete Student Course with id=" + id,
      });
    });
};
// Delete all StudentCourses from the database.
exports.deleteAll = (req, res) => {
  StudentCourse.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Student Courses were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all student courses.",
      });
    });
};

// Create and save multiple studentCourses
exports.createMultiple = (req, res) => {
  let errs = [];
  let result = [];
  let newSC = req.body.filter(sc => {
    // Validate request
    if (!sc.userId || !sc.courseScheduleId) {
      errs.push(`Cannot add student course with missing fields!`)
      return false;
    }
    return true;
  });

  // Create courseSchedules
  Promise.all(newSC.map(sc => {
    // Grab only the data we need
    const parsedSC = {
      userId: sc.userId,
      courseScheduleId: sc.courseScheduleId,
    };

    // Save courseSchedule in the database
    return StudentCourse.create(parsedSC)
      .then((data) => {
        result.push(data.dataValues);
      })
      .catch((err) => {
        errs.push(err.message || "Some error occurred creating student course")
      });
  }))
    .then((data) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || errs
      });
    });
};


// Delete several facultyCourses from the database.
exports.deleteMultiple = (req, res) => {
  StudentCourse.destroy({
    where: { id: req.body },
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Student Courses were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing student courses.",
      });
    });
};