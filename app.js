// Importando variables para configurar el express
const express = require("express");
const path = require("path");

const app = express();
const expressHbs = require("express-handlebars");

// Importando variables relacionadas a la base de datos
const sequelize = require("./util/database");                   //Objeto sequilize ya configurado
const ElectivePosition = require("./models/ElectivePosition");          // Importacion del modelo de Puestos Electivos
const Parties = require("./models/Parties");
const candidate = require("./models/Candidate");


// Importando variable multer para el manejo de subida de archivos
const multer = require("multer");
const {v4: uuidv4} = require("uuid");


// Importando Rutas
const electorRoute = require("./routes/elector/elector");
const electivePositionRoute = require("./routes/admin/electivePosition");
const partiesRoute = require("./routes/admin/parties");
const candidateRoute = require("./routes/admin/candidate");

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


const fileStorage = multer.diskStorage(
    {
        destination: (req, file, callBack) => {

            callBack(null, "images");
        },
        filename: (req, file, callBack) => {

            callBack(null, `${uuidv4()}-${file.originalname}`);
        }
    }
)


app.use(multer({ storage: fileStorage }).single("image"));      // Configurando el multer para que en cualquier request maneje
// la subida de imagenes


// Configurando las carpetas públicas
app.use(express.static(path.join(__dirname, "public")));
app.use("/images", express.static(path.join(__dirname, "images")));



// Usando las rutas para los middleware
app.use(electorRoute);                      // Midlleware para el Elector

app.use("/admin", electivePositionRoute);              // Middleware para el Admin

app.use("/admin", partiesRoute);                        // Midllewarre para los Partidos

app.use("/admin", candidateRoute);                  //Midllewarre para los candidatos
// Importando el controlador de error
const errorController = require("./controllers/ErrorController");
app.use("/", errorController.Get404);

//Relacion entre entidades
//candidate.belongsTo(Parties, {constraint:true, onDelete:"CASCADE"});
//Parties.hasMany(candidate);
candidate.belongsTo(ElectivePosition,{constraint:true, onDelete:"CASCADE"});
//ElectivePosition.hasMany(candidate);
// Creando el servidor en el puerto 8080 si se sincroniza la base de datos

sequelize.sync().then(result => {

    app.listen(8080);

}).catch(error => {
    console.log("Acaba de ocurrir el siguiente error: " + error);
});

