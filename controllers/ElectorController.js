
// Método para invocar al Home de la página
exports.GetHome = (req, res, next) => {

    res.status(200).render("elector/home", {pageTitle: "Home"});
};