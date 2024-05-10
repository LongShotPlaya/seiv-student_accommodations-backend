module.exports = (sequelize, Sequelize) => {
    const FacultyCourse = sequelize.define("facultyCourse", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
    });
    return FacultyCourse;
  };