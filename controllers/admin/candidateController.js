//const candidates = require("../../models/Candidate");

//GET Methods
exports.GetCandidateList = (req, res , next) => {
    res.status(200).render("admin/candidates/candidate-list", {
        pageTitle: "Candidates list"
    });
}

exports.GetAddCandidate = (req, res, next) => {
    res.status(200).render("admin/candidates/add-candidate", {
        pageTitle: "Add candidate"
    })
}


//POST Methods