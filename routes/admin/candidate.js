const express = require("express");

const router = express.Router();

const candidateController = require("../../controllers/admin/candidateController");
//GET Routers

router.get("/candidate-list", candidateController.GetCandidateList);
router.get("/add-candidate", candidateController.GetAddCandidate);

//POST Routers

module.exports = router;