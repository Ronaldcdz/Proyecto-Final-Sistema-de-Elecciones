const Sequelize = require("sequelize");

const sequelize = require("../util/database");      // Importamos el objeto de sequilize ya configurado

const Users = sequelize.define("Users", {

    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    name: {
        type: Sequelize.STRING,
        allowNull: false
    },

    lastname: {
        type: Sequelize.STRING,
        allowNull: false
    },

    email: {
        type: Sequelize.STRING,
        allowNull: false,
        indexes: [{unique: true}]
    },

    password: {
        type: Sequelize.STRING,
        allowNull: false
    },

    documentid: {
        type: Sequelize.STRING,
        allowNull: true,
        indexes: [{unique: true}]

    },

    idusertype: {
        type: Sequelize.STRING,
        allowNull: true
    },

    state: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },

    vote: {
        type: Sequelize.BOOLEAN,
        allowNull: true
    },

    resetToken : {
        type: Sequelize.STRING,
        allowNull : true
    }, 

    resetTokenExpiration : {
        type: Sequelize.DATE,
        allowNull : true
    }, 
});

module.exports = Users;