const express = require("express");
const router = express.Router();

const partiesController = require("../../controllers/admin/PartiesController");
const Parties = require("../../models/Parties");

router.get("/parties", partiesController.GetHome);

router.get("/parties/add-parties", partiesController.GetCreateParties);
router.post("/parties/add-parties", partiesController.PostCreateParties);

router.get("/parties/edit-parties/:partyId", partiesController.GetEditParties);
router.post("/parties/edit-parties", partiesController.PostEditParties);

router.post("/parties/delete-parties", partiesController.PostDeleteParties);

module.exports = router;