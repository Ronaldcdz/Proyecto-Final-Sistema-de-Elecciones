const express = require("express");
const router = express.Router();

const electivePositionController = require("../../controllers/admin/ElectivePositionController");

const isAuth = require("../../middlewares/isAuth");     // vaiable que contiene el metodo de validacion para poder estar en una pagina

// El proposito de las rutas es que cuando llegue una peticion lo redireccione al action de un controller


router.get("/elective-position", isAuth.isAdmin, electivePositionController.GetElectivePosition);

// Ruta encargada de redireccionar a los metodos de crear del controlador Admin 
router.get("/elective-position/add-elective-position", isAuth.isAdmin, electivePositionController.GetCreateElectivePosition);
router.post("/elective-position/add-elective-position", isAuth.isAdmin, electivePositionController.PostCreateElectivePosition);


// Ruta encargada de redireccionar a los metodos de editar del controlador Admin 
router.get("/elective-position/edit-elective-position/:electivePositionId", isAuth.isAdmin, electivePositionController.GetEditElectivePosition);
router.post("/elective-position/edit-elective-position", isAuth.isAdmin, electivePositionController.PostEditElectivePosition);



// Ruta encargada de redireccionar al  de editar del controlador Admin 
router.post("/elective-position/delete-elective-position", isAuth.isAdmin, electivePositionController.PostDeleteElectivePosition);

module.exports = router;