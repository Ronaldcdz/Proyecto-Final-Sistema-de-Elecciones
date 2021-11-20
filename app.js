// Importando variables para configurar el express
const express = require("express");
const path = require("path");

const app = express();
const expressHbs = require("express-handlebars");


// Importando Rutas
const homeRoute = require("./routes/elector");



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
app.use(homeRoute);


// Importando el controlador de error
const errorController = require("./controllers/ErrorController");
app.use("/", errorController.Get404);



// Creando el servidor en el puerto 8080
app.listen(8080);
