const express = require("express");
const router = express.Router();

const electivePositionController = require("../../controllers/admin/ElectivePositionController");

// El proposito de las rutas es que cuando llegue una peticion lo redireccione al action de un controller

router.get("/", electivePositionController.GetHome);

router.get("/elective-position", electivePositionController.GetElectivePosition);

// Ruta encargada de redireccionar a los metodos de crear del controlador Admin 
router.get("/elective-position/add-elective-position", electivePositionController.GetCreateElectivePosition);
router.post("/elective-position/add-elective-position", electivePositionController.PostCreateElectivePosition);


// Ruta encargada de redireccionar a los metodos de editar del controlador Admin 
router.get("/elective-position/edit-elective-position/:electivePositionId", electivePositionController.GetEditElectivePosition);
router.post("/elective-position/edit-elective-position", electivePositionController.PostEditElectivePosition);



// Ruta encargada de redireccionar al  de editar del controlador Admin 
router.post("/elective-position/delete-elective-position", electivePositionController.PostDeleteElectivePosition);

module.exports = router;