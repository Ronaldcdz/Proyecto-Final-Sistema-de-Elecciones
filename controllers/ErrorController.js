
exports.Get404 = (req, res, next) => {

    res.status(404).render("error/404", {pageTitle: "Error 404"});
}