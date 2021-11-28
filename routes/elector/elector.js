const express = require("express");
const router = express.Router();

const electorController = require("../../controllers/elector/ElectorController");

const isAuth = require("../../middlewares/isAuth");     // vaiable que contiene el metodo de validacion para poder estar en una pagina

router.get("/", isAuth.isCitizien, electorController.GetHome);         // Se encarga de direccionar al controlador de la clase ElectorController para devolver el home


module.exports = router;
