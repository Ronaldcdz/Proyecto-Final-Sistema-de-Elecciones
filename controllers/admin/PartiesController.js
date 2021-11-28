const { Where } = require("sequelize/dist/lib/utils");
const PartiesModel = require("../../models/Parties");



exports.GetHome = (req, res, next) => {


    PartiesModel.findAll().then((result) => {

        const party = result.map((result) => result.dataValues);

        res.status(200).render("admin/parties-maintenance/parties",
            {
                pageTitle: "Partidos Politicos",
                editMode: false,
                parties: party,
                hasParties: party.length > 0
            });

    }).catch((error) => {
        console.log("Acaba de ocurrir el siguiente error: " + error);

    })
};


exports.GetCreateParties = (req, res, next) => {


    res.status(200).render("admin/parties-maintenance/add-parties",
        {
            pageTitle: "Agregar Partido Político"
        }
    )
}

exports.PostCreateParties = (req, res, next) => {

    const partyName = req.body.name;
    const partyDescription = req.body.description;
    const partyImage = req.file;

    PartiesModel.create({

        name: partyName,
        description: partyDescription,
        partylogo: "\\" + partyImage.path,
        state: true
    }).then(() => {

        res.redirect("/admin/parties")

    }).catch((error) => {

        console.log("Acaba de ocurrir el siguiente error: " + error);

    });

}




exports.GetEditParties = (req, res, next) => {

    const editMode = req.query.editMode;
    const partyId = req.params.partyId;

    if (!editMode) {

        res.status(302).redirect("/admin/parties");

    }

    PartiesModel.findOne({ where: { id: partyId } }).then((result) => {

        const party = result.dataValues;

        if (!party) {
            res.status(302).redirect("/admin/parties");

        }

        res.status(200).render("admin/parties-maintenance/add-parties",
            {
                pageTitle: "Editar Puesto Electivo",
                editMode: editMode,
                party: party

            })


    }).catch((error) => {

        console.log("Acaba de ocurrir el siguiente error: " + error);
    });
};


exports.PostEditParties = (req, res, next) => {

    const partyName = req.body.name;
    const partyDescription = req.body.description;
    const partyState = (req.body.selectState == "Activo") ? true : false;
    const partyId = req.body.partyId;
    const partyLogo = req.file;

    PartiesModel.findOne({ where: { id: partyId } }).then((result) => {

        const party = result.dataValues;

        if (!party) {
            res.redirect("/admin/parties");
        }

        const imagePath = partyLogo ? "\\" + partyLogo.path : party.partylogo;

        PartiesModel.update(
            { name: partyName, description: partyDescription, partylogo: imagePath, state: partyState }, { where: { id: partyId } }).then(() => {

                res.status(302).redirect("/admin/parties");

            }).catch((error) => {

                console.log("Acaba de ocurrir el siguiente error: " + error);

            });
    })



};


exports.PostDeleteParties = (req, res, next) => {

    const partyId = req.body.partyId;

    PartiesModel.update(

        { state: false },
        { where: { id: partyId } }).then(() => {

            res.status(302).redirect("/admin/parties");

        }).catch((error) => {

            console.log("Acaba de ocurrir el siguiente error: " + error);

        })


};
