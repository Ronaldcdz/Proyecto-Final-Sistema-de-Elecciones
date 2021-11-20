const express = require("express");
const router = express.Router();

const electorController = require("../controllers/ElectorController");

router.get("/", electorController.GetHome);


module.exports = router;
