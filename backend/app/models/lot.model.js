module.exports = (sequelize, Sequelize) => {
  const Lot = sequelize.define("lot", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
    },
    slots: {
      type: Sequelize.INTEGER,
    },
    isactive: {
      type: Sequelize.STRING,
    },
  });

  return Lot;
};
