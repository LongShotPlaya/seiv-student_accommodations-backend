require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

const db = require("./app/models");

db.sequelize.sync();

var corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));
app.options("*", cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

require("./app/routes/auth.routes.js")(app);
require("./app/routes/user.routes.js")(app);
//require("./app/routes/tutorial.routes")(app);
//require("./app/routes/lesson.routes")(app);
require("./app/routes/accomodation.routes.js")(app);
require("./app/routes/accomodationCat.routes.js")(app);
require("./app/routes/course.routes.js")(app);
require("./app/routes/courseSchedule.routes.js")(app);
require("./app/routes/faculty.routes.js")(app);
require("./app/routes/facultyCourse.routes.js")(app);
require("./app/routes/notification.routes.js")(app);
require("./app/routes/request.routes.js")(app);
require("./app/routes/semester.routes.js")(app);
require("./app/routes/student.routes.js")(app);
require("./app/routes/studentAccom.routes.js")(app);
require("./app/routes/studentCourse.routes.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 3023;
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });
}

module.exports = app;
