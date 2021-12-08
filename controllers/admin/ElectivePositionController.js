const ElectivePosition = require("../../models/ElectivePosition");      // Importando el modelo para usar todos sus metodos


//Método del controlador encargado de devolver el home de los Puestos Electivos cumpliendo con ciertas restricciones
exports.GetElectivePosition = (req, res, next) => {

    ElectivePosition.findAll().then((result) => {

        const electivePosition = result.map((result) => result.dataValues);

        res.status(200).render("admin/elective-position-maintenance/elective-position",
            {
                pageTitle: "Puestos Electivos",
                editMode: false,
                electivePositions: electivePosition,
                hasElectivePositions: electivePosition.length > 0
            });

    }).catch((error) => {
        console.log("Acaba de ocurrir el siguiente error: " + error);

    })

};


//Método del controlador encargado de devolver el formulario para agregar los Puestos Electivos cumpliendo con ciertas restricciones
exports.GetCreateElectivePosition = (req, res, next) => {

    res.status(200).render("admin/elective-position-maintenance/add-elective-position",
        {
            pageTitle: "Agregar Partido",
            editMode: false
        });
};

//Método del controlador encargado de devolver los datos del formulario de los Puestos Electivos cumpliendo con ciertas restricciones
exports.PostCreateElectivePosition = (req, res, next) => {

    const electivePositionName = req.body.electivePosition;
    const electivePositionDescription = req.body.description;
    const electivePositionState = true;
    ElectivePosition.create(
        {
            name: electivePositionName,
            description: electivePositionDescription,
            state: electivePositionState
        }
    ).then((result) => {
        res.redirect("/admin/elective-position");

    }).catch((error) => {
        console.log("Acaba de ocurrir el siguiente error: " + error);
    });



};


//Método del controlador encargado de enviar al formulario de editar con los datos del Puesto Electivo seleccionado cumpliendo con ciertas restricciones
exports.GetEditElectivePosition = (req, res, next) => {

    const editMode = req.query.editMode;
    const electivePositionId = req.params.electivePositionId;

    if (!editMode) {

        res.status(302).redirect("/admin/elective-position");

    }

    ElectivePosition.findOne({ where: { id: electivePositionId } }).then((result) => {

        const electivePosition = result.dataValues;

        if (!electivePosition) {
            res.status(302).redirect("/admin/elective-position");

        }

        res.status(200).render("admin/elective-position-maintenance/add-elective-position",
            {
                pageTitle: "Editar Puesto Electivo",
                editMode: editMode,
                electivePosition: electivePosition

            })


    }).catch((error) => {

        console.log("Acaba de ocurrir el siguiente error: " + error);
    });


};


//Método del controlador encargado de devolver los datos editados del formulario del Puesto Electivo seleccionado cumpliendo con ciertas restricciones
exports.PostEditElectivePosition = (req, res, next) => {

    const electivePositionName = req.body.name;
    const electivePositionDescription = req.body.description;
    const electivePositionId = req.body.electivePositionId;
    const electivePositionState = (req.body.selectState == "Activo") ? true : false;       // Usando un Operador condicional (ternario)

    
    ElectivePosition.update(

        { name: electivePositionName, description: electivePositionDescription, state: electivePositionState },
        { where: { id: electivePositionId } }).then((result) => {

            res.status(302).redirect("/admin/elective-position");

        }).catch((error) => {

            console.log("Acaba de ocurrir el siguiente error: " + error);

        })

};


//Método del controlador encargado de borrar un Puesto Electivo seleccionado cumpliendo con ciertas restricciones
exports.PostDeleteElectivePosition = (req, res, next) =>{
    const idElectivePosition = req.body.id;
    const stateElectivePosition = req.body.state;

    ElectivePosition.update({state: stateElectivePosition}, {where: {id: idElectivePosition}}).then(() =>{
        res.redirect("/admin/elective-position");
    }).catch((err) =>{
        console.log(err);
    });
}