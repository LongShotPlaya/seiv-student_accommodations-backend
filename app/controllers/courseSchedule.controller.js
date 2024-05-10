const db = require("../models");
const CourseSchedule = db.courseSchedule;
const FacultyCourse = db.facultyCourse;
const StudentCourse = db.studentCourse;
const Op = db.Sequelize.Op;
// Create and Save a new courseschedule
exports.create = (req, res) => {
  // Validate request
  if (!req.body.semesterId || !req.body.courseId) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  // Create a courseschedule
  const courseschedule = {
    location: req.body.location,
    section: req.body.section,
    courseId: req.body.courseId,
  };
  // Save CourseSchedule in the database
  CourseSchedule.create(courseschedule)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Course Schedule.",
      });
    });
};
// Retrieve all CourseSchedules from the database.
exports.findAll = (req, res) => {
  //const title = req.query.title;
  //var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  CourseSchedule.findAll({ where: {} })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving course schedules.",
      });
    });
};

// Find a single CourseSchedule with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  CourseSchedule.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Course Schedule with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving Course Schedule with id=" + id,
      });
    });
};
// Update a CourseSchedule by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  CourseSchedule.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Course Schedule was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Course Schedule with id=${id}. Maybe Course Schedule was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating Course Schedule with id=" + id,
      });
    });
};
// Delete a CourseSchedule with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  CourseSchedule.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Course Schedule was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Course Schedule with id=${id}. Maybe Course Schedule was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Could not delete Course Schedule with id=" + id,
      });
    });
};
// Delete all CourseSchedules from the database.
exports.deleteAll = (req, res) => {
  CourseSchedule.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Course Schedules were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all course schedules.",
      });
    });
};

// Create and save multiple courseSchedules
exports.createMultiple = (req, res) => {
  let errs = [];
  let result = [];
  let newSchedules = req.body.filter(schedule => {
    // Validate request
    if (!schedule.courseId || !schedule.semesterId) {
      errs.push(`Cannot add course schedule with missing fields!`)
      return false;
    }
    return true;
  });

  // Create courseSchedules
  Promise.all(newSchedules.map(schedule => {
    // Grab only the data we need
    const parsedSchedule = {
      location: schedule.location,
      section: schedule.section,
      courseId: schedule.courseId,
      semesterId: schedule.semesterId
    };

    // Save courseSchedule in the database
    return CourseSchedule.create(parsedSchedule)
      .then((data) => {
        result.push(data.dataValues);
      })
      .catch((err) => {
        errs.push(err.message || "Some error occurred creating course schedule")
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


// Delete several courseSchedules from the database.
exports.deleteMultiple = (req, res) => {
  CourseSchedule.destroy({
    where: { id: req.body },
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Course Schedules were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing course schedules.",
      });
    });
};

exports.findAllFacultyCourseForSchedule = (req, res) => {
  const scheduleId = req.params.id;
  FacultyCourse.findAll({ where: { courseScheduleId: scheduleId } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving faculty courses.",
      });
    });
};

exports.findAllStudentCourseForSchedule = (req, res) => {
  const scheduleId = req.params.id;
  StudentCourse.findAll({ where: { courseScheduleId: scheduleId } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving student courses.",
      });
    });
};