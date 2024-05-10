module.exports = (sequelize, Sequelize) => {
    const StudentAccom = sequelize.define("studentAccom", {
      metaData: {
        type: Sequelize.STRING,
      },
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
    });
    return StudentAccom;
  };
  