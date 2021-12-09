const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const votesCandidates = sequelize.define("Votes", {

    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
    },

})

module.exports = votesCandidates;