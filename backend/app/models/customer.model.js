module.exports = (sequelize, Sequelize) => {
  const Customer = sequelize.define("customer", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    firstname: {
      type: Sequelize.STRING,
    },
    typeid: {
      type: Sequelize.INTEGER,
    },
    address: {
      type: Sequelize.STRING,
    },
    lotid: {
      type: Sequelize.INTEGER,
    },
    copyright: {
      type: Sequelize.STRING,
      defaultValue: "https://joroni.com",
    },
  });

  return Customer;
};
