module.exports = (sequelize, Sequelize) => {
    const Faculty = sequelize.define("faculty", {
      officeNo: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
    });
    return Faculty;
  };
  