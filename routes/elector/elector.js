const express = require("express");
const router = express.Router();

const electorController = require("../../controllers/elector/ElectorController");



router.get("/", electorController.GetHome);         // Se encarga de direccionar al controlador de la clase ElectorController para devolver el home


module.exports = router;
