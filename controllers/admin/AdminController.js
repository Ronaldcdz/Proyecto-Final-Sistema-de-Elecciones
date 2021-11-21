

//Método del controlador encargado de devolver el home del admin cumpliendo con ciertas restricciones
exports.GetHome = (req, res, next) => {

    res.status(200).render("admin/home-admin", {pageTitle: "Admin Home"});
};


exports.GetElectivePosition = (req, res, next) => {

    res.status(200).render("admin/elective_position/elective-position", {pageTitle: "Puestos Electivos"})
}