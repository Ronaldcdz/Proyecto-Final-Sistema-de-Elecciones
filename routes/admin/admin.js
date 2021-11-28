const express = require("express");
const router = express.Router();

const adminController = require("../../controllers/admin/AdminController");
const isAuth = require("../../middlewares/isAuth");

// El proposito de las rutas es que cuando llegue una peticion lo redireccione al action de un controller

router.get("/", isAuth.isAdmin, adminController.GetHome);

module.exports = router;