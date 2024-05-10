const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user.model.js")(sequelize, Sequelize);
db.session = require("./session.model.js")(sequelize, Sequelize);
db.student = require("./student.model.js")(sequelize, Sequelize);
db.semester = require("./semester.model.js")(sequelize, Sequelize);
db.studentCourse = require("./studentCourse.model.js")(sequelize, Sequelize);
db.studentAccom = require("./studentAccom.model.js")(sequelize, Sequelize);
db.request = require("./request.model.js")(sequelize, Sequelize);
db.notification = require("./notification.model.js")(sequelize, Sequelize);
db.facultyCourse = require("./facultyCourse.model.js")(sequelize, Sequelize);
db.faculty = require("./faculty.model.js")(sequelize, Sequelize);
db.courseSchedule = require("./courseSchedule.model.js")(sequelize, Sequelize);
db.course = require("./course.model.js")(sequelize, Sequelize);
db.accomodationCat = require("./accomodationCat.model.js")(sequelize, Sequelize);
db.accomodation = require("./accomodation.model.js")(sequelize, Sequelize);

// foreign key for session
db.user.hasMany(
  db.session,
  { as: "session", foreignKey: { allowNull: false }, onDelete: "CASCADE", hooks: true }
);

// foreign keys for user
db.user.hasMany(
  db.student,
  { as: "student", foreignKey: { allowNull: false }, onDelete: "CASCADE", hooks: true }
);
db.user.hasMany(
  db.faculty,
  { as: "faculty", foreignKey: { allowNull: false }, onDelete: "CASCADE", hooks: true }
);
db.user.hasMany(
  db.request,
  { as: "request", foreignKey: { allowNull: false }, onDelete: "CASCADE", hooks: true }
);
db.user.hasMany(
  db.studentAccom,
  { as: "studentAccom", foreignKey: { allowNull: false }, onDelete: "CASCADE", hooks: true }
);
db.user.hasMany(
  db.facultyCourse,
  { as: "facultyCourse", foreignKey: { allowNull: false }, onDelete: "CASCADE", hooks: true }
);

// foreign key for facultyCourse
db.facultyCourse.belongsTo(
  db.courseSchedule,
  { as: "courseSchedule", foreignKey: { allowNull: false }, onDelete: "CASCADE", hooks: true }
);

// foreign key for courseSchedule
db.courseSchedule.hasMany(
  db.studentCourse,
  { as: "studentCourse", foreignKey: { allowNull: false }, onDelete: "CASCADE", hooks: true }
);

// foreign key for course
db.course.hasMany(
  db.courseSchedule,
  { as: "courseSchedule", foreignKey: { allowNull: false }, onDelete: "CASCADE", hooks: true }
);

// foreign key for studentCourse
db.studentCourse.belongsTo(
  db.user,
  { as: "user", foreignKey: { allowNull: false }, onDelete: "CASCADE", hooks: true }
);

// foreign key for student
db.student.belongsTo(
  db.user,
  { as: "user", foreignKey: { allowNull: false }, onDelete: "CASCADE", hooks: true }
);

// foreign key for studentAccom
db.studentAccom.hasMany(
  db.accomodation,
  { as: "accomodation", foreignKey: { allowNull: false }, onDelete: "CASCADE", hooks: true }
);
db.studentAccom.hasMany(
  db.notification,
  { as: "notification", foreignKey: { allowNull: false }, onDelete: "CASCADE", hooks: true }
);

// foreign key for accomodationCat
db.accomodationCat.hasMany(
  db.accomodation,
  { as: "accomodation", foreignKey: { allowNull: false }, onDelete: "CASCADE", hooks: true }
);

// foreign key for semester
db.semester.hasMany(
  db.courseSchedule,
  { as: "courseSchedule", foreignKey: { allowNull: false }, onDelete: "CASCADE", hooks: true }
);
db.semester.hasMany(
  db.request,
  { as: "request", foreignKey: { allowNull: false }, onDelete: "CASCADE", hooks: true }
);
db.semester.hasMany(
  db.studentAccom,
  { as: "studentAccom", foreignKey: { allowNull: false }, onDelete: "CASCADE", hooks: true }
);

module.exports = db;
