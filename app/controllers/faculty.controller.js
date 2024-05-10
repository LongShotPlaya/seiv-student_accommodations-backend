const db = require("../models");
const Faculty = db.faculty;
const FacultyCourse = db.facultyCourse; 
const Op = db.Sequelize.Op;
// Create and Save a new faculty
exports.create = (req, res) => {
  // Validate request
  if (!req.body.officeNo || !req.body.userId) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  // Create a faculty
  const faculty = {
    officeNo: req.body.officeNo,
    userId: req.body.userId,
  };
  // Save Faculty in the database
  Faculty.create(faculty)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Faculty.",
      });
    });
};
// Retrieve all facultys from the database.
exports.findAll = (req, res) => {
  //const title = req.query.title;
  //var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  Faculty.findAll({ where: {} })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving faculty.",
      });
    });
};

// Find a single Faculty with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  Faculty.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Faculty with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving Faculty with id=" + id,
      });
    });
};
// Update a Faculty by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  Faculty.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Faculty was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Faculty with id=${id}. Maybe Faculty was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating Faculty with id=" + id,
      });
    });
};
// Delete a Faculty with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  Faculty.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Faculty was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Faculty with id=${id}. Maybe Faculty was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Could not delete Faculty with id=" + id,
      });
    });
};
// Delete all Facultys from the database.
exports.deleteAll = (req, res) => {
  Faculty.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Faculty were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all faculty.",
      });
    });
};

exports.findAllCoursesForFaculty = (req, res) => {
  const facultyId = req.params.id;
  FacultyCourse.findAll({ where: { facultyId: facultyId } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving faculty course.",
      });
    });

};

