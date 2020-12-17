module.exports = (sequelize, Sequelize) => {
  const Type = sequelize.define("type", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
    }
  });

  return Type;
};
