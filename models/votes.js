const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const votesCandidates = sequelize.define("Votes", {

    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

})

module.exports = votesCandidates;