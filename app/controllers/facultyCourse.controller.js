const db = require("../models");
const FacultyCourse = db.facultyCourse;
const Op = db.Sequelize.Op;
// Create and Save a new facultycourse
exports.create = (req, res) => {
  // Validate request
  if (!req.body.userId || !req.body.courseScheduleId) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  // Create a facultycourse
  const facultyCourse = {
    userId: req.body.userId,
    courseScheduleId: req.body.courseScheduleId,
  };
  // Save FacultyCourse in the database
  FacultyCourse.create(facultyCourse)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Faculty Course.",
      });
    });
};
// Retrieve all FacultyCourses from the database.
exports.findAll = (req, res) => {
  //const title = req.query.title;
  //var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  FacultyCourse.findAll({ where: {} })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving faculty courses.",
      });
    });
};

// Find a single FacultyCourse with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  FacultyCourse.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Faculty Course with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving Faculty Course with id=" + id,
      });
    });
};
// Update a FacultyCourse by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  FacultyCourse.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Faculty Course was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Faculty Course with id=${id}. Maybe Faculty Course was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating Faculty Course with id=" + id,
      });
    });
};
// Delete a FacultyCourse with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  FacultyCourse.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Faculty Course was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Faculty Course with id=${id}. Maybe Faculty Course was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Could not delete Faculty Course with id=" + id,
      });
    });
};
// Delete all FacultyCourses from the database.
exports.deleteAll = (req, res) => {
  FacultyCourse.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Faculty Courses were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all faculty courses.",
      });
    });
};

// Create and save multiple facultyCourses
exports.createMultiple = (req, res) => {
  let errs = [];
  let result = [];
  let newFC = req.body.filter(fc => {
    // Validate request
    if (!fc.userId || !fc.courseScheduleId) {
      errs.push(`Cannot add faculty course with missing fields!`)
      return false;
    }
    return true;
  });

  // Create courseSchedules
  Promise.all(newFC.map(fc => {
    // Grab only the data we need
    const parsedFC = {
      userId: fc.userId,
      courseScheduleId: fc.courseScheduleId,
    };

    // Save courseSchedule in the database
    return FacultyCourse.create(parsedFC)
      .then((data) => {
        result.push(data.dataValues);
      })
      .catch((err) => {
        errs.push(err.message || "Some error occurred creating faculty course")
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
  FacultyCourse.destroy({
    where: { id: req.body },
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Faculty Courses were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing faculty courses.",
      });
    });
};