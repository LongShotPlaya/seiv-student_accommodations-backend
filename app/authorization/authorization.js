const db = require("../models");
const Session = db.session;
const User = db.user;

authenticate = (req, res, next) => {
  let token = null;
  console.log("authenticate");
  let authHeader = req.get("authorization");
  if (authHeader != null) {
    if (authHeader.startsWith("Bearer ")) {
      token = authHeader.slice(7);

      Session.findAll({ where: { token: token } })
        .then((data) => {
          let session = data[0];
          console.log(session.expirationDate);
          if (session != null) {
            if (session.expirationDate >= Date.now()) {
              next();
              return;
            } else
              return res.status(401).send({
                message: "Unauthorized! Expired Token, Logout and Login again",
              });
          }
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  } else {
    return res.status(401).send({
      message: "Unauthorized! No Auth Header",
    });
  }
};

// Get token, get session, get user from session, and checks users role to be Faculty or higher
authFaculty = (req, res, next) => {
  let token = null;
  console.log("authenticate");
  let authHeader = req.get("authorization");
  if (authHeader != null) {
    if (authHeader.startsWith("Bearer ")) {
      token = authHeader.slice(7);

      Session.findAll({ where: { token: token } })
        .then((data) => {
          let session = data[0];
          console.log(session.expirationDate);
          if (session != null) {
            if (session.expirationDate >= Date.now()) {

              User.findAll({ where: { id: session.userId }})
                .then((users) => {
                  const user = users[0];
                  if (user != null) {
                    if (user.role == "Faculty" || user.role == "Administrator") {
                      next();
                      return;
                    }
                    else {
                      return res.status(401).send({
                        message: "Unauthorized! User does not have faculty or administrator privileges",
                      });
                    }
                  }
                  else {
                    return res.status(401).send({
                      message: "Unauthorized! User does not exist",
                    });
                  }
                })
                .catch((error) => {
                  return res.status(401).send({
                    message: "Unauthorized! User does not exist",
                  });
                })
              
            } else
              return res.status(401).send({
                message: "Unauthorized! Expired Token, Logout and Login again",
              });
          }
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  } else {
    return res.status(401).send({
      message: "Unauthorized! No Auth Header",
    });
  }
};

// Get token, get session, get user from session, and checks users role to be Admin
authAdmin = (req, res, next) => {
  let token = null;
  console.log("authenticate");
  let authHeader = req.get("authorization");
  if (authHeader != null) {
    if (authHeader.startsWith("Bearer ")) {
      token = authHeader.slice(7);

      Session.findAll({ where: { token: token } })
        .then((data) => {
          let session = data[0];
          console.log(session.expirationDate);
          if (session != null) {
            if (session.expirationDate >= Date.now()) {

              User.findAll({ where: { id: session.userId }})
                .then((users) => {
                  const user = users[0];
                  if (user != null) {
                    if (user.role == "Administrator") {
                      next();
                      return;
                    }
                    else {
                      return res.status(401).send({
                        message: "Unauthorized! User does not have administrator privileges",
                      });
                    }
                  }
                  else {
                    return res.status(401).send({
                      message: "Unauthorized! User does not exist",
                    });
                  }
                })
                .catch((error) => {
                  return res.status(401).send({
                    message: "Unauthorized! User does not exist",
                  });
                })
              
            } else
              return res.status(401).send({
                message: "Unauthorized! Expired Token, Logout and Login again",
              });
          }
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  } else {
    return res.status(401).send({
      message: "Unauthorized! No Auth Header",
    });
  }
};

// Get token, get session, get user from session, and checks users role to be students or admin
authStudent = (req, res, next) => {
  let token = null;
  console.log("authenticate");
  let authHeader = req.get("authorization");
  if (authHeader != null) {
    if (authHeader.startsWith("Bearer ")) {
      token = authHeader.slice(7);

      Session.findAll({ where: { token: token } })
        .then((data) => {
          let session = data[0];
          console.log(session.expirationDate);
          if (session != null) {
            if (session.expirationDate >= Date.now()) {

              User.findAll({ where: { id: session.userId }})
                .then((users) => {
                  const user = users[0];
                  if (user != null) {
                    if (user.role == "Student" || user.role == "Administrator") {
                      next();
                      return;
                    }
                    else {
                      return res.status(401).send({
                        message: "Unauthorized! User does not have student or administrator privileges",
                      });
                    }
                  }
                  else {
                    return res.status(401).send({
                      message: "Unauthorized! User does not exist",
                    });
                  }
                })
                .catch((error) => {
                  return res.status(401).send({
                    message: "Unauthorized! User does not exist",
                  });
                })
              
            } else
              return res.status(401).send({
                message: "Unauthorized! Expired Token, Logout and Login again",
              });
          }
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  } else {
    return res.status(401).send({
      message: "Unauthorized! No Auth Header",
    });
  }
};

const auth = {
  authenticate: authenticate,
  authFaculty: authFaculty, 
  authAdmin: authAdmin,
  authStudent: authStudent,
};

module.exports = auth;
