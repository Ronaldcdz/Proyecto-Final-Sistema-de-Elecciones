const express = require("express");

const router = express.Router();

const candidateController = require("../../controllers/admin/candidateController");
//GET Routers

router.get("/candidate-list", candidateController.GetCandidateList);
router.get("/add-candidate", candidateController.GetAddCandidate);
router.get("/edit-candidate/:candidateId", candidateController.GetEditCandidate);
//POST Routers
router.post("/add-candidate", candidateController.PostCreateCandidate);

module.exports = router;