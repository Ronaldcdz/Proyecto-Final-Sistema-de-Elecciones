//E.N 
const sequelize = require("sequelize");

const sequelize = require("../util/database");

const candidate = sequelize.define("candidate", {

    id:{
        type: sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    name:{
        type: sequelize.STRING,
        allowNull: false
    },

    lastName: {
        type: sequelize.STRING,
        allowNull: false
    },

    idParties: {
        type: sequelize.INTEGER,
        allowNull: false
    },

    idPosition: {
        type: sequelize.INTEGER,
        allowNull: false
    }

})

module.exports = candidate;
//E.N