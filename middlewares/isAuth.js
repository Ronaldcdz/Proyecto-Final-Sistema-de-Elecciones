

// Modulo a exportar para poder validar de que el usuario no puede estar en esa pagina sin antes estar registrado
exports.isAdmin = (req, res, next) => {

    if (!req.session.isLoggedIn) {

        req.flash("errors", "No est\u00E1 autorizado para estar en esa p\u00E1gina, primero debe iniciar sesi\u00F3n");
        return res.redirect("/login");
    }
    

    else {
        
        if(req.session.userLoggedIn.idusertype == 2) {

        req.flash("errors", "No est\u00E1 autorizado para estar en la p\u00E1gina del admin");
        return res.redirect("/");
        }

        next();
    }
};

exports.isCitizien = (req, res, next) => {

    if (!req.session.isLoggedIn) {

        req.flash("errors", "No est\u00E1 autorizado para estar en esa p\u00E1gina, primero debe iniciar sesi\u00F3n");        
        return res.redirect("/login");
    }
    

    else {
        
        if(req.session.userLoggedIn.idusertype == 1) {

        req.flash("errors", "No est\u00E1 autorizado para estar en la p\u00E1gina de los electores porque eres el Admin");        
        return res.redirect("/admin");
        }

        next();
    }
};