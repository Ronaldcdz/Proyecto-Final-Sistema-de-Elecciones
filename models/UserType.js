const Sequelize = require("sequelize");

const sequelize = require("../util/database");          // Importamos el objeto de sequilize ya configurado

const UserType = sequelize.define("UserType", {

    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

// Hay que agregar una manera de que se queden como datos permanentes lo que esta mas abajo

// UserType.create({                    
//     name: "Admin"
// });

// UserType.create({
//     name: "Citizien"
// });

module.exports = UserType;
