const db = require("../models");
const Accomodation = db.accomodation;
const Op = db.Sequelize.Op;
// Create and Save a new accomodation
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name || !req.body.accomodationCatId || !req.body.studentAccomId) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  // Create a accomodation
  const accomodation = {
    name: req.body.name,
    pdf: req.body.pdf,
    accomodationCatId: req.body.accomodationCatId,
  };
  // Save Accomodation in the database
  Accomodation.create(accomodation)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Accomodation.",
      });
    });
};
// Retrieve all Accomodations from the database.
exports.findAll = (req, res) => {
  //const title = req.query.title;
  //var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  Accomodation.findAll({ where: {} })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving accomodations.",
      });
    });
};

// Find a single Accomodation with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  Accomodation.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Accomodation with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving Accomodation with id=" + id,
      });
    });
};
// Update a Accomodation by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  Accomodation.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Accomodation was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Accomodation with id=${id}. Maybe Accomodation was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating Accomodation with id=" + id,
      });
    });
};
// Delete a Accomodation with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  Accomodation.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Accomodation was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Accomodation with id=${id}. Maybe Accomodation was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Could not delete Accomodation with id=" + id,
      });
    });
};
// Delete all Accomodations from the database.
exports.deleteAll = (req, res) => {
  Accomodation.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} (all) Accomodations were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all accomodations.",
      });
    });
};

// Create and save multiple accoms
exports.createMultiple = (req, res) => {
  let errs = [];
  let result = [];
  let newAccoms = req.body.filter(accom => {
    // Validate request
    if (!accom.name || !accom.accomodationCatId || !accom.studentAccomId) {
      errs.push(`Cannot add accommodation with missing fields!`)
      return false;
    }
    return true;
  });

  // Create accoms
  Promise.all(newAccoms.map(accom => {
    // Grab only the data we need
    const parsedAccom = {
      name: accom.name,
      pdf: accom.pdf,
      studentAccomId: accom.studentAccomId,
      accomodationCatId: accom.accomodationCatId
    };
    // Save Accom in the database
    Accomodation.create(parsedAccom)
      .then((data) => {
        result.push(data);
      })
      .catch((err) => {
        errs.push(err.message || "Some error occurred creating accommodation")
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


// Delete several Accoms from the database.
exports.deleteMultiple = (req, res) => {
  Accomodation.destroy({
    where: { id: req.body },
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Accomodations were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing accommodations.",
      });
    });
};
