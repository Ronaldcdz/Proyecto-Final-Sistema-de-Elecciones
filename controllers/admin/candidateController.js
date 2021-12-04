const candidates = require("../../models/Candidate");
const parties = require("../../models/Parties");
const position = require("../../models/ElectivePosition");

//GET Methods
exports.GetCandidateList = (req, res , next) => {
    candidates.findAll({include:[{model: position}]}).then((result) => {
        const Cand = result.map((result) => result.dataValues);

        res.status(200).render("admin/candidates/candidate-list", {
            pageTitle: "Candidates list",
            candidate: Cand
        });
    }).catch((err) => {
        console.log(err)
    });
}

exports.GetAddCandidate = (req, res, next) => {
    parties.findAll().then((result) => {
        const partiesData = result.map((result) => result.dataValues);

        position.findAll().then((result) => {

            const positionData = result.map((result) => result.dataValues);

            res.status(200).render("admin/candidates/add-candidate", {
                pageTitle: "Add candidate",
                parties: partiesData,
                position: positionData
            })

        }).catch((err) => {
            console.log(err);
        })

    }).catch((err) => {
        console.log(err);
    })
}

exports.GetEditCandidate = (req, res, next) => {

}

//POST Methods

exports.PostCreateCandidate = (req, res, next) => {
    const candidateName = req.body.Name;
    const candidateLastName = req.body.LastName;
    const candidateIdParties = req.body.Parties;
    const candidateIdPosition = req.body.Position

    candidates.create({
        name: candidateName,
        lastName: candidateLastName,
        idParties: candidateIdParties,
        idPosition: candidateIdPosition
    }).then((result) => {
        res.redirect("/admin/candidate-list");
    }).catch((err) => {
        console.log(err);
    });
}

exports.PostEditCandidate = (req, res, next) => {

}