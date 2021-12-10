const election = require("../../models/election");

//GET Methods

exports.GetElectionList = (req, res, next) => {

    election.findAll().then((result) => {
        const electionData = result.map((result) => result.dataValues);

        res.status(200).render("admin/election/election-list", {
            pageTitle: "Election",
            elections: electionData,
            hasElection: electionData.length > 0
        });
    }).catch((err) => {
        console.log(err);
    })
}

exports.GetAddElection = (req, res, next) => {
    const date = Date.now();
    const DateTime = new Date(date).toString();
    const DateTimeSplit = DateTime.split(":");

    res.status(200).render("admin/election/add-election", {
        pageTitle: "Save election",
        editMode: false,
        dateNow: DateTimeSplit[0]
    })
}

exports.GetEditElection = (req, res, next) => {

    const editMode = req.query.editMode;
    const electionId = req.params.idElection;

    if(!editMode){
        res.status(302).redirect("/admin/election-list");
    }

    election.findOne({where: {id: electionId}}).then((result) => {

        const electionSelected = result.dataValues;

        if(!electionSelected){
            res.status(302).redirect("/admin/election-list");
        }

        res.status(200).render("admin/election/add-election", {
            pageTitle: "Save election",
            editMode: editMode,
            election: electionSelected,
        })

    }).catch((err) => {
        console.log(err);
    })

}

//POST Methods

exports.PostAddElection = (req, res, next) =>{
    const nameElection = req.body.name;
    const dateElection = req.body.date;

    console.log(dateElection);

    election.create({
        name: nameElection, 
        date: dateElection,
        state: true
    }).then(() => {
        console.log("todo ok")
        res.status(302).redirect("/admin/election-list");
    }).catch((err) => {
        console.log(err);
    })
}

exports.PostEditElection = (req, res, next) =>{
    const nameElection = req.body.name;
    const dateElection = req.body.date;
    const idElection = req.body.id;

    election.update({name: nameElection, date: dateElection},{where: {id: idElection}}).then(() => {
        res.status(302).redirect("/admin/election-list");
    }).catch((err) => {
        console.log(err);
    })
}

exports.PostStateElection = (req, res, next) =>{
    const stateElection = req.body.state;
    const idElection = req.body.id;

    election.update({state: stateElection},{where: {id: idElection}}).then(() =>{
        res.status(302).redirect("/admin/election-list");
    }).catch((err) => {
        console.log(err);
    })
}