const { Where } = require("sequelize/dist/lib/utils");
const candidates = require("../../models/Candidate");
const parties = require("../../models/Parties");
const position = require("../../models/ElectivePosition");

//GET Methods
exports.GetCandidateList = (req, res , next) => {
    candidates.findAll({include:[parties, position]}).then((result) => {
        const Candidate = result.map((result) => result.dataValues);
        
        res.status(200).render("admin/candidates/candidate-list", {
            pageTitle: "Candidates list",
            candidate: Candidate,
        });

    }).catch((err) => {
        console.log(err)
    });
}

exports.GetAddCandidate = (req, res, next) => {
    parties.findAll({where: {state: 1}}).then((result) => {
        const partiesData = result.map((result) => result.dataValues);

        position.findAll({where: {state: 1}}).then((result) => {

            const positionData = result.map((result) => result.dataValues);

            res.status(200).render("admin/candidates/add-candidate", {
                pageTitle: "Add candidate",
                parties: partiesData,
                position: positionData,
                hasParties: partiesData.length > 0,
                hasPosition: positionData.length > 0,
                editMode: false
            })

        }).catch((err) => {
            console.log(err);
        })

    }).catch((err) => {
        console.log(err);
    })
}

exports.GetEditCandidate = (req, res, next) => {
    const idCandidate = req.params.candidateId
    const editMode = req.query.editMode

    if(!editMode){
        res.status(200).redirect("/admin/candidate-list")
    }

    candidates.findOne({where: {id: idCandidate}}).then((result) => {
        const candidates = result.dataValues;

        if(!candidates){
            res.status(200).redirect("/admin/candidate-list");
        }

        parties.findAll().then((result) => {
            const partiesData = result.map((result) => result.dataValues);
    
            position.findAll().then((result) => {
    
                const positionData = result.map((result) => result.dataValues);
    
                res.status(200).render("admin/candidates/add-candidate",{
                    pageTitle: "Edit Candidates",
                    editMode: editMode,
                    candidate: candidates,
                    parties: partiesData,
                    position: positionData
                })
    
            }).catch((err) => {
                console.log(err);
            })
    
        }).catch((err) => {
            console.log(err);
        })

    }).catch((err) => {
        console.log(err);
    })
}

//POST Methods

exports.PostCreateCandidate = (req, res, next) => {
    const candidateName = req.body.name;
    const candidateLastName = req.body.lastName;
    const candidateIdParties = req.body.Parties;
    const candidateIdPosition = req.body.Position;
    const imgProfilePicture = req.file;

    candidates.create({
        name: candidateName,
        lastName: candidateLastName,
        PartyId: candidateIdParties,
        ElectivePositionId: candidateIdPosition,
        state: true,
        imgProfile: "\\" + imgProfilePicture.path,
    }).then(() => {
        res.redirect("/admin/candidate-list");
    }).catch((err) => {
        console.log(err);
    });
}

exports.PostEditCandidate = (req, res, next) => {

    const id = req.body.id;
    const name = req.body.name;
    const lastName = req.body.lastName;
    const parties = req.body.Parties;
    const electivePosition = req.body.Position;
    const imgProfile = req.file;

    candidates.update({name: name, lastName: lastName, PartyId: parties, ElectivePositionId: electivePosition, imgProfile: "\\" + imgProfile.path},
        {where: {id: id}}).then((result) => {
            res.status(302).redirect("/admin/candidate-list");
        }).catch((err) => {
            console.log(err);
        });
}

exports.PostStateCandidate = (req, res, next) => {
    const state = req.body.state;
    const idCandidate = req.body.id;

    candidates.update({state: state}, {where: {id: idCandidate}}).then(() => {
        res.status(302).redirect("/admin/candidate-list");
    }).catch((err) => {
        console.log(err);
    });
}