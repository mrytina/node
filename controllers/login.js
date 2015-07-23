var models = require('../models'), //I'm requiring here instead of the function as preference var's would still be local
    passport = require('passport');

module.exports = function(app){
    app.get('/login', function(req, res){
        res.render('login', {title: 'Login', message: req.flash('loginError')});
    });

    //make sure to never do get's on logins because you'll be allowing users to pass the params in the url if they don't use ajax
    app.post("/login", function(req, res, next) {
        passport.authenticate("local", function(err, user, info) {
            if (err) {
                next(err);
            }
            if (!user) {
                req.flash('loginError', info.message);
                /*req.flash('username', req.body.username);
                 req.flash('password', req.body.password);*/
                res.redirect("/login");
            } else {
                //logIn is part of passport middleware tracks the sesion
                req.logIn(user, function(err) {
                    if (err) {
                        next(err);
                    } else {
                        res.redirect("/");
                    }
                });
            }
        })(req, res, next);
    });

    app.get("/logout", function(req, res, next){
        //logout part of passport
        req.logout();
        res.redirect('/');
    })
};