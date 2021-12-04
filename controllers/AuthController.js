
const UsersModel = require("../models/Users");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const { Op } = require("sequelize");

const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({

    service: "gmail",
    auth: {
        user: "20209277@itla.edu.do",
        pass: "Coronelxerx26"
    }
})


// Método para invocar al Home de la página con el login
exports.GetLogin = (req, res, next) => {

    res.status(200).render("auth/login",
        {
            pageTitle: "Inicio de sesion",
            loginActive: true
        });
};


// Metodo para loguearse
exports.PostLogin = (req, res, next) => {

    const userEmail = req.body.email;
    const userPassword = req.body.password;




    UsersModel.findOne({ where: { email: userEmail } }).then((user) => {

        if (user == null || user == undefined) {

            req.flash("errors", "El correo electr\u00F3nico no es v\u00E1lido");
            return res.redirect("/login");
        }



        bcrypt.compare(userPassword, user.password).then((result) => {


            if (result) {

                req.session.isLoggedIn = true;
                req.session.userLoggedIn = user.dataValues;
                req.session.isAdmin = (user.dataValues.idusertype == 1) ? true : false

                return req.session.save(error => {

                    console.log(error);
                    (user.idusertype == 2) ? res.redirect("/") : res.redirect("/admin");

                })
            }

            else {

                req.flash("errors", "La contrase\u00F1a no es correcta");
                return res.redirect("/login");

            }

        }).catch((error) => {

            console.log("Acaba de ocurrir el siguiente error: " + error);

        });

    }).catch((error) => {

        console.log("Acaba de ocurrir el siguiente error: " + error);

    });


};


// Metodo para salir del login
exports.PostLogOut = (req, res, next) => {

    req.session.destroy((error) => {

        if (error == undefined) {
            res.status(302).redirect("/");

        }

        else {
            console.log("Acaba de ocurrir el siguiente error: " + error);
        }

    });
};

// Método para invocar al Home de la página con el registro de usuario
exports.GetSignup = (req, res, next) => {

    res.status(200).render("auth/signup",
        {
            pageTitle: "Crear Cuenta",
        });
};


// Metodo POST para registro de cuenta 
exports.PostSignup = (req, res, next) => {

    const userDocumentId = req.body.documentId;
    const userName = req.body.name;
    const userlastName = req.body.lastName;
    const userEmail = req.body.email;
    const userPassword = req.body.password;
    const userConfirmPassword = req.body.confirmPassword;
    const userState = true;
    const userIdUserType = 2;

    if (userPassword !== userConfirmPassword) {

        req.flash("errors", "Las contrase\u00F1as no coinciden");

        return res.redirect("/signup");
    }

    bcrypt
        .hash(userPassword, 12).then(hashedPassword => {

            UsersModel.findOne({ where: { email: userEmail } }).then((user) => {

                if (user) {

                    req.flash("errors", "Este correo ya est\u00E1 registrado");

                    return res.redirect("/signup");             // Si existe un usuario con el mismo correo se reiniciara el formulario
                }

                else {

                    UsersModel.findOne({ where: { documentid: userDocumentId } }).then((user) => {

                        if (user) {

                            req.flash("errors", "Esta c\u00E9dula ya est\u00E1 registrada");

                            return res.redirect("/signup");     // Si existe un usuario con la misma cedula se reiniciara el formulario

                        }

                        else {
                            UsersModel.create(
                                {
                                    name: userName,
                                    lastname: userlastName,
                                    email: userEmail,
                                    password: hashedPassword,
                                    documentid: userDocumentId,
                                    idusertype: userIdUserType,
                                    state: userState

                                }).then(() => {

                                    res.redirect("/login");

                                }).catch((error) => {

                                    console.log("Acaba de ocurrir el siguiente error: " + error);

                                });
                        }

                    }).catch((error) => {
                        console.log("Acaba de ocurrir el siguiente error: " + error);

                    })



                }

            }).catch((error) => {

                console.log("Acaba de ocurrir el siguiente error: " + error);
            });



        }).catch((error) => {

            console.log("Acaba de ocurrir el siguiente error: " + error);
        });


};

// Método para invocar a la página de cambiar contraseña 
exports.GetReset = (req, res, next) => {

    res.status(200).render("auth/reset",
        {
            pageTitle: "Cambiar contraseña",
        });
};

// Método para mandar un token por correo electronico para el cambio de contraseña a la página de cambiar contraseña 
exports.PostReset = (req, res, next) => {

    const userEmail = req.body.email;

    crypto.randomBytes(32, (error, buffer) => {

        if (error) {

            console.log("Acaba de ocurrir el siguiente error: " + error);
            return res.redirect("/reset");
        }

        const token = buffer.toString("hex");

        UsersModel.findOne({ where: { email: userEmail } }).then((user) => {

            if (!user) {

                req.flash("errors", "No existe una cuenta creada con este correo electrónico");
                return null;
            }

            else {

                user.resetToken = token;
                user.resetTokenExpiration = Date.now() + 7200000;
                return user.save();
            }

        }).then((result) => {

            let urlRedirect = "/reset";

            if (result) {
                urlRedirect = "/login";

                transporter.sendMail({
                    from: "20209277@itla.edu.do",
                    to: userEmail,
                    subject: "Cambio de Contraseña",
                    html: `<h3>Usted acaba de solicitar un cambio de contraseña</h3>
                    
                            <p>Haga click en este <a href="http://localhost:8080/reset/${token}">enlace</a> para cambiar su contraseña</p>
                    `
                });


            }

            res.redirect(urlRedirect);

        }).catch((error) => {

            console.log("Acaba de ocurrir el siguiente error: " + error);

        });

    });

};

exports.GetNewPassword = (req, res, next) => {

    const userPasswordToken = req.params.token;

    UsersModel.findOne({
        where: {
            resetToken: userPasswordToken,
            resetTokenExpiration: { [Op.gte]: Date.now() }
        }
    }).then((user) => {

        if (!user) {

            req.flash("errors", "El Token es inválido");
        }

        else {
            res.status(200).render("auth/new-password",
                {
                    pageTitle: "Nueva Contraseña",
                    userPasswordToken: userPasswordToken,
                    userId: user.id
                });
        }


    }).catch((error) => {

        console.log("Acaba de ocurrir el siguiente error: " + error);
    });


};

exports.PostNewPassword = (req, res, next) => {

    const userPasswordToken = req.body.passwordToken;
    const userId = req.body.userId;

    const userNewPassword = req.body.password;
    const userConfirmNewPassword = req.body.confirmPassword;

    if (userNewPassword !== userConfirmNewPassword) {

        req.flash("errors", "Las contraseñas no coinciden");
        return res.redirect("back");
    }

    else {

        UsersModel.findOne({
            where: {
                resetToken: userPasswordToken,
                id: userId,
                resetTokenExpiration: { [Op.gte]: Date.now() }
            }
        }).then((usuario) => {

            if (!usuario) {

                req.flash("errors", "Información inválida");
                return res.redirect("/reset");
            }

            else {

                bcrypt.hash(userNewPassword, 12).then((hashedPassword) => {

                    usuario.password = hashedPassword;
                    usuario.resetToken = null;
                    usuario.resetTokenExpiration = null
                    return usuario.save();

                }).catch((error) => {

                    console.log("Acaba de ocurrir el siguiente error: " + error);
        
                });

                res.redirect("/login");

            }
        }).catch((error) => {

            console.log("Acaba de ocurrir el siguiente error: " + error);

        });

    }


};

