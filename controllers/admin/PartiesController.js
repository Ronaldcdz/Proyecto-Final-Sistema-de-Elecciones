



exports.GetHome = (req, res, next) => {

    res.status(200).render("admin/parties-maintenance/parties",
        {
            pageTitle: "Partidos Políticos"
        })
};


exports.GetCreateParties = (req, res, next) => {

    const partyName = req.body.name;
    const partyDescription = req.body.description;
    


    res.status(200).render("admin/parties-maintenance/add-parties",
        {
            pageTitle: "Agregar Partido Político"
        }
    )

    


}