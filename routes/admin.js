const express = require("express");
const router = express.Router();

const adminController = require("../controllers/admin/AdminController");

// El proposito de las rutas es que cuando llegue una peticion lo redireccione al action de un controller

router.get("/", adminController.GetHome);

router.get("/elective-position", adminController.GetElectivePosition);

// Ruta encargada de redireccionar a los metodos de crear del controlador Admin 
router.get("/elective-position/add-elective-position", adminController.GetCreateElectivePosition);
router.post("/elective-position/add-elective-position", adminController.PostCreateElectivePosition);


// Ruta encargada de redireccionar a los metodos de editar del controlador Admin 
router.get("/elective-position/edit-elective-position/:electivePositionId", adminController.GetEditElectivePosition);
router.post("/elective-position/edit-elective-position", adminController.PostEditElectivePosition);



// Ruta encargada de redireccionar al  de editar del controlador Admin 
router.post("/elective-position/delete-elective-position", adminController.PostDeleteElectivePosition);

module.exports = router;