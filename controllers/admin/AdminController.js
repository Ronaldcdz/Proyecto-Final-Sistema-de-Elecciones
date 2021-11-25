

//Método del controlador encargado de devolver el home del admin cumpliendo con ciertas restricciones
exports.GetHome = (req, res, next) => {

    res.status(200).render("admin/home-admin", { pageTitle: "Admin Home" });            // HAY QUE MOVER ESTE METODO DEL CONTROLADOR A OTRO CONTROLADOR
};   