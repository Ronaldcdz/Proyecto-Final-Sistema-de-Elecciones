const Sequelize = require("sequelize");

const sequelize = require("../util/database");          // Importamos el objeto de sequilize ya configurado

const Parties = sequelize.define("Parties", {

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

    description: {
        type: Sequelize.STRING,
        alloNull: false
    },

    partylogo: {
        type: Sequelize.STRING,
        allowNull: false,
    },

    state: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    }




});

module.exports = Parties;
