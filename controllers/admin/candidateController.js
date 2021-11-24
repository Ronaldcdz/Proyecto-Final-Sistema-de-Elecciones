const candidates = require("../../models/Candidate");

//GET Methods
exports.GetCandidateList = (req, res , next) => {
    candidates.findAll().then((result) => {

        const candidates = result.map((result) => result.dataValues);

        res.status(200).render("admin/candidates/candidate-list", {
            pageTitle: "Candidates list",
            candidate: candidates
        });
    }).catch((err) => {
        console.log(err)
    });
}

exports.GetAddCandidate = (req, res, next) => {
    res.status(200).render("admin/candidates/add-candidate", {
        pageTitle: "Add candidate"
    })
}

//POST Methods

exports.PostCreateCandidate = (req, res, next) => {
    const candidateName = req.body.name;
    const candidateLastName = req.body.lastName;
    const candidateIdParties = 1;
    const candidateIdPosition = 1;

    candidates.create({
        name: candidateName,
        lastName: candidateLastName,
        idParties: candidateIdParties,
        idPosition: candidateIdPosition
    }).then((result) => {
        res.redirect("/");
    }).catch((err) => {
        console.log(err);
    });
}