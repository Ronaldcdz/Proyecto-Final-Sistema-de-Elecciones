const Sequelize = require("sequelize");

const sequelize = new Sequelize("sadvodb", "root", "", {        // Nombre de la base de datos || Usuario || Contraseña
    dialect: "mysql",                                               // Motor de base de datos
    host: "localhost",
    port: 3306
});

module.exports = sequelize;