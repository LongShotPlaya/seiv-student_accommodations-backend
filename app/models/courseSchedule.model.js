module.exports = (sequelize, Sequelize) => {
    const CourseSchedule = sequelize.define("courseSchedule", {
      location: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      section: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
    });
    return CourseSchedule;
  };