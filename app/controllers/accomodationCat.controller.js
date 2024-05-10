const db = require("../models");
const AccomodationCat = db.accomodationCat;
const Op = db.Sequelize.Op;
// Create and Save a new accomodationcat
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name || !req.body.description || !req.body.email) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  // Create a accomodationcat
  const accomodationcat = {
    name: req.body.name,
    description: req.body.description,
    email: req.body.email,
  };
  // Save AccomodationCat in the database
  AccomodationCat.create(accomodationcat)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Accommodation Category.",
      });
    });
};
// Retrieve all AccomodationCats from the database.
exports.findAll = (req, res) => {
  //const title = req.query.title;
  //var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  AccomodationCat.findAll({ where: {} })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving accommodation categories.",
      });
    });
};

// Find a single AccomodationCat with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  AccomodationCat.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Accomodation Category with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving Accomodation Category with id=" + id,
      });
    });
};
// Update a AccomodationCat by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  AccomodationCat.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Accomodation Category was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Accomodation Category with id=${id}. Maybe Accomodation Category was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating Accomodation Category with id=" + id,
      });
    });
};
// Delete a AccomodationCat with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  AccomodationCat.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Accomodation Category was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Accomodation Category with id=${id}. Maybe AccomodationCat was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Could not delete Accomodation Category with id=" + id,
      });
    });
};
// Delete all Accomodations from the database.
exports.deleteAll = (req, res) => {
  AccomodationCat.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Accomodation Categories were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all accomodation categories.",
      });
    });
};
