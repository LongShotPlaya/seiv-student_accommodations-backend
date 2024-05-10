module.exports = (sequelize, Sequelize) => {
    const Student = sequelize.define("student", {
      givenPermission: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
    });
    return Student;
  };
  