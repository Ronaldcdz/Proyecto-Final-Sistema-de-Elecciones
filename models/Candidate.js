//E.N 
const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const candidate = sequelize.define("candidate", {

    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    name:{
        type: Sequelize.STRING,
        allowNull: false
    },

    lastName: {
        type: Sequelize.STRING,
        allowNull: false
    },
});

module.exports = candidate;
//E.N