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
    endtime: {
      type: Sequelize.DATE,
      
    },
    lotid: {
      type: Sequelize.INTEGER,
    },
    starttime: {
	  type: Sequelize.DATE,
	  defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    //  defaultValue: "https://joroni.com",
    },
  });

  return Customer;
};
