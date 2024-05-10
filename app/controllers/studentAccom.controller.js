const db = require("../models");
const StudentAccom = db.studentAccom;
const Op = db.Sequelize.Op;
// Create and Save a new studentaccom
exports.create = (req, res) => {
  // Validate request
  if (!req.body.userId || !req.body.semesterId) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  // Create a studentaccom
  const studentaccom = {
    userId: req.body.userId,
    metaData: req.body.metaData,
    semesterId: req.body.semesterId,
  };
  // Save StudentAccom in the database
  StudentAccom.create(studentaccom)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Student Accommodation.",
      });
    });
};
// Retrieve all StudentAccoms from the database.
exports.findAll = (req, res) => {
  //const title = req.query.title;
  //var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  StudentAccom.findAll({ where: {} })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving student accommodations.",
      });
    });
};

// Find a single StudentAccom with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  StudentAccom.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Student Accommodation with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving Student Accommodation with id=" + id,
      });
    });
};
// Update a StudentAccom by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  StudentAccom.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Student Accommodation was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Student Accommodation with id=${id}. Maybe Student Accommodation was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating Student Accommodation with id=" + id,
      });
    });
};
// Delete a StudentAccom with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  StudentAccom.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Student Accommodation was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Student Accommodation with id=${id}. Maybe Student Accommodation was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Could not delete Student Accommodation with id=" + id,
      });
    });
};
// Delete all StudentAccoms from the database.
exports.deleteAll = (req, res) => {
  StudentAccom.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Student Accomodations were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all student accommodations.",
      });
    });
};

// Create and save multiple studentaccoms
exports.createMultiple = (req, res) => {
  let errs = [];
  let result = [];
  let newAccoms = req.body.filter(sAccom => {
    // Validate request
    if (!sAccom.studentId || !sAccom.accomodationId || !sAccom.semesterId) {
      errs.push(`Cannot add student accommodation with missing fields!`)
      return false;
    }
    return true;
  });

  // Create studentaccoms
  Promise.all(newAccoms.map(sAccom => {
    // Save StudentAccom in the database
    StudentAccom.create(sAccom)
      .then((data) => {
        result.push(data);
      })
      .catch((err) => {
        errs.push(err.message || "Some error occurred creating student accommodation")
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

// Delete all StudentAccoms from the database.
exports.deleteMultiple = (req, res) => {
  StudentAccom.destroy({
    where: { id: req.body },
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Student Accomodations were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing student accommodations.",
      });
    });
};