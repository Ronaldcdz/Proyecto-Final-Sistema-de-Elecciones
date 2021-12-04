const user = require("../../models/Users");

//GET Methods
exports.GetCitizenList = (req, res, next) =>{
    user.findAll().then((result) => {
        const user = result.map((result) => result.dataValues);
        res.status(200).render("admin/citizen/citizen-list", {
            pageTitle: "Citizen list",
            users: user,
        })
    }).catch((err) =>{
        console.log(err);
    })
};

exports.GetSaveCitizen = (req, res, next) =>{
    const citizenId = req.params.userId;

    user.findOne({where: {id: citizenId}}).then((result) =>{
        const user = result.dataValues;

        if(!user){
            res.redirect("/admin/citizen-list");
        }

        res.status(200).render("admin/citizen/save-citizen",{
            pageTitle: "Save citizen",
            userEdit: user
        })
    }).catch((err) =>{
        console.log(err)
    })
}

exports.PostSaveCitizen = (req, res, next) =>{
    const idCitizen = req.body.id;
    const nameCitizen = req.body.name;
    const lastNameCitizen = req.body.lastName;
    const emailCitizen = req.body.email;
    const stateCitizen = req.body.state;

    user.update({name: nameCitizen, lastname: lastNameCitizen, email: emailCitizen, state: stateCitizen}, {where: {id: idCitizen}}).then(() => {
        res.redirect("/admin/citizen-list");
    }).catch((err) =>{
        console.log(err);
    });
}

exports.PostStateCitizen = (req, res, next) =>{
    const idCitizen = req.body.id;
    const stateCitizen = req.body.state;

    user.update({state: stateCitizen}, {where: {id: idCitizen}}).then(() =>{
        res.redirect("/admin/citizen-list");
    }).catch((err) =>{
        console.log(err);
    });
}