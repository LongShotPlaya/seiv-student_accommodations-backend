module.exports = (sequelize, Sequelize) => {
    const Accomodation = sequelize.define("accomodation", {
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      pdf: {
        type: Sequelize.STRING,
      },
    });
    return Accomodation;
  };
  