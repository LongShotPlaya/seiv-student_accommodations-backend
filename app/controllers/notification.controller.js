const db = require("../models");
const Notification = db.notification;
const Mailer = require("../utils/mailer");
const Op = db.Sequelize.Op;
// Create and Save a new notification
exports.create = (req, res) => {
  // Validate request
  if (!req.body.studentAccomId || !req.body.email || !req.body.message || !req.body.fromUser) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Send the notification out and, if successful, create a new notification in the database
  Mailer.sendEmail(req.body.fromUser, req.body.email, req.body.message)
    .then((response) => {
      // Create a notification
      const notification = {
        studentAccomId: req.body.studentAccomId,
        email: req.body.email,
      };
      // Save Notification in the database
      Notification.create(notification)
        .then((data) => {
          res.send(data);
        })
        .catch((err) => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the Notification.",
          });
        });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while sending Notification.",
      });
    });

};
// Retrieve all Notifications from the database.
exports.findAll = (req, res) => {
  //const title = req.query.title;
  //var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  Notification.findAll({ where: {} })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving notifications.",
      });
    });
};

// Find a single Notification with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  Notification.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Notification with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving Notification with id=" + id,
      });
    });
};
// Update a Notification by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  Notification.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Notification was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Notification with id=${id}. Maybe Notification was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating Notification with id=" + id,
      });
    });
};
// Delete a Notification with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  Notification.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Notification was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Notification with id=${id}. Maybe Notification was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Could not delete Notification with id=" + id,
      });
    });
};
// Delete all Notifications from the database.
exports.deleteAll = (req, res) => {
  Notification.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Notifications were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all notifications.",
      });
    });
};
