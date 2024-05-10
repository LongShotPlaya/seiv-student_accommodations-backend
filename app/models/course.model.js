module.exports = (sequelize, Sequelize) => {
    const Course = sequelize.define("course", {
      courseNo: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      creditHrs: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
    });
    return Course;
  };
  