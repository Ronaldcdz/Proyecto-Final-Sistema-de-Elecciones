const express = require("express");
const router = express.Router();

const usersController = require("../../controllers/admin/usersController");
const { route } = require("./parties");

//GET Methods
router.get("/citizen-list", usersController.GetCitizenList);
router.get("/save-citizen/:userId", usersController.GetSaveCitizen);

//POST Methods
router.post("/save-citizen", usersController.PostSaveCitizen);
router.post("/state-citizen", usersController.PostStateCitizen);

module.exports = router;