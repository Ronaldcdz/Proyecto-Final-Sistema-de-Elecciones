const express = require("express");
const router = express.Router();

const authController = require("../controllers/AuthController");



router.get("/login", authController.GetLogin);         // Se encarga de direccionar al controlador de la clase ElectorController para devolver el home
router.post("/login", authController.PostLogin);
router.post("/logout", authController.PostLogOut);

router.get("/signup", authController.GetSignup);
router.post("/signup", authController.PostSignup);


module.exports = router;
