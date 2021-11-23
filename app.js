// Importando variables para configurar el express
const express = require("express");
const path = require("path");

const app = express();
const expressHbs = require("express-handlebars");

// Importando variables relacionadas a la base de datos
const sequelize = require("./util/database");                   //Objeto sequilize ya configurado
const ElectivePosition = require("./models/ElectivePosition");


// Importando Rutas
const electorRoute = require("./routes/elector/elector");
const electivePositionRoute = require("./routes/admin/electivePosition");
const partiesRoute = require("./routes/admin/parties");

// Configurando el engine (motor de renderización de vistas)
app.engine("hbs", expressHbs({
    layoutsDir: "views/layout",
    defaultLayout: "main-layout",
    extname: "hbs"
    }
));


// Configurando las vistas
app.set("view engine", "hbs");
app.set("views", "views");


app.use(express.urlencoded({ extended: false }));


// Configurando las carpetas públicas
app.use(express.static(path.join(__dirname, "public")));



// Usando las rutas para los middleware
app.use(electorRoute);                      // Midlleware para el Elector

app.use("/admin", electivePositionRoute);              // Middleware para el Admin

app.use("/admin", partiesRoute);                        // Midllewarre para los Partidos


// Importando el controlador de error
const errorController = require("./controllers/ErrorController");
app.use("/", errorController.Get404);



// Creando el servidor en el puerto 8080 si se sincroniza la base de datos

sequelize.sync().then(result => {
    
    app.listen(8080);

}).catch(error => {
    console.log("Acaba de ocurrir el siguiente error: "+ error);
});

