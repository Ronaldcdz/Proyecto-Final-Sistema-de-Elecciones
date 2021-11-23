

exports.GetHome = (req, res, next) => {

    res.status(200).render("admin/parties-maintenance/parties", 
    {
        pageTitle: "Partidos Políticos"
    })
};