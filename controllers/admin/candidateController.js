const { Where } = require("sequelize/dist/lib/utils");
const candidates = require("../../models/Candidate");
const parties = require("../../models/Parties");
const position = require("../../models/ElectivePosition");

//GET Methods
exports.GetCandidateList = (req, res , next) => {
    candidates.findAll({include:[{model: position}]}).then((result) => {
        const ElectivePositionCandidate = result.map((result) => result.dataValues);
        
        candidates.findAll({include:[{model: parties}]}).then((result) => {
            const PartiesCandidate = result.map((result) => result.dataValues);

            res.status(200).render("admin/candidates/candidate-list", {
                pageTitle: "Candidates list",
                candidateEp: ElectivePositionCandidate,
                candidateP: PartiesCandidate
            });
        }).catch((err) => {
            console.log(err)
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
    const candidateIdPosition = req.body.Position;
    const imgProfilePicture = req.file;

    candidates.create({
        name: candidateName,
        lastName: candidateLastName,
        PartiesId: candidateIdParties,
        ElectivePositionId: candidateIdPosition,
        state: true,
        imgProfile: "\\" + imgProfilePicture.path,
    }).then((result) => {
        res.redirect("/admin/candidate-list");
    }).catch((err) => {
        console.log(err);
    });
}

exports.PostEditCandidate = (req, res, next) => {

}