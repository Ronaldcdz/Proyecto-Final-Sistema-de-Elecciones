const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const election = sequelize.define("Election", {

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

    date:{
        type: Sequelize.STRING,
        allowNull: false
    },

    state:{
        type: Sequelize.BOOLEAN,
        allowNull: false
    }

})

module.exports = election;