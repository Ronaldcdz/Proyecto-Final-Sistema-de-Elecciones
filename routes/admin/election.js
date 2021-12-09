const express = require("express");
const router = express.Router();
const electionController = require("../../controllers/admin/electionController"); 

//GET Methods

router.get("/election-list", electionController.GetElectionList);
router.get("/add-election", electionController.GetAddElection);
router.get("/edit-election/:idElection", electionController.GetEditElection)

//POST Methods
router.post("/add-election", electionController.PostAddElection);
router.post("/edit-election", electionController.PostEditElection);
router.post("/state-election", electionController.PostStateElection);

module.exports = router;