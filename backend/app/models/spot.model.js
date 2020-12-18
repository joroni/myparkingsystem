module.exports = (sequelize, Sequelize) => {
  const Spot = sequelize.define("spot", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    spotid: {
      type: Sequelize.INTEGER,
    },
    name: {
      type: Sequelize.STRING,
    },
    
    state: {
      type: Sequelize.INTEGER,
    }
  });

  return Spot;
};