const express = require("express");
const router = express.Router();

const partiesController = require("../../controllers/admin/PartiesController");

const isAuth = require("../../middlewares/isAuth");     // vaiable que contiene el metodo de validacion para poder estar en una pagina


router.get("/parties", isAuth.isAdmin, partiesController.GetHome);

router.get("/parties/add-parties", isAuth.isAdmin, partiesController.GetCreateParties);
router.post("/parties/add-parties", isAuth.isAdmin, partiesController.PostCreateParties);

router.get("/parties/edit-parties/:partyId", isAuth.isAdmin, partiesController.GetEditParties);
router.post("/parties/edit-parties", isAuth.isAdmin, partiesController.PostEditParties);

router.post("/parties/delete-parties", isAuth.isAdmin, partiesController.PostDeleteParties);

module.exports = router;