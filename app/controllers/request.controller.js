const db = require("../models");
const Request = db.request;
const Mailer = require("../utils/mailer");
const Op = db.Sequelize.Op;
// Create and Save a new request
exports.create = (req, res) => {
  // Validate request
  if (!req.body.userId || !req.body.status || !req.body.semesterId || !req.body.requestDate) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Send the notification out and, if successful, create a new notification in the database
  Mailer.sendEmail(req.body.fromUser, req.body.toUsers, req.body.message)
    .then((response) => {
      // Create a request
      const request = {
        userId: req.body.userId,
        status: req.body.status,
        semesterId: req.body.semesterId,
        requestDate: req.body.requestDate,
      };
      // Save Request in the database
      Request.create(request)
        .then((data) => {
          res.send(data);
        })
        .catch((err) => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the Request.",
          });
        });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while notifying the student of their request.",
      });
    });
};
// Retrieve all Requests from the database.
exports.findAll = (req, res) => {
  //const title = req.query.title;
  //var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  Request.findAll({ where: {} })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving requests.",
      });
    });
};

// Find a single Request with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  Request.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Request with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving Request with id=" + id,
      });
    });
};
// Update a Request by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  Request.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Request was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Request with id=${id}. Maybe Request was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating Request with id=" + id,
      });
    });
};
// Delete a Request with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  Request.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Request was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Request with id=${id}. Maybe Request was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Could not delete Request with id=" + id,
      });
    });
};
// Delete all Requests from the database.
exports.deleteAll = (req, res) => {
  Request.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Requests were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all requests.",
      });
    });
};
