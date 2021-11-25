const express = require("express");
const router = express.Router();

const adminController = require("../../controllers/admin/AdminController");

// El proposito de las rutas es que cuando llegue una peticion lo redireccione al action de un controller

router.get("/", adminController.GetHome);

module.exports = router;