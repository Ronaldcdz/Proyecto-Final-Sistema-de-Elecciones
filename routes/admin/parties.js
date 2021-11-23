const express = require("express");
const router = express.Router();

const partiesController = require("../../controllers/admin/PartiesController");

router.get("/parties", partiesController.GetHome);





module.exports = router;