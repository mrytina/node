var models = require('../models'),
    auth = require('../auth');

module.exports = function (app) {
    app.get('/register', function (req, res) {
        res.render('register', {title: 'Register', message: req.flash('registrationError')});
    });

    app.post("/register", function (req, res) {

        var salt = auth.hasher.createSalt();

        auth.hasher.computeHash(req.body.password, salt, function (err, hash) {
            if(err){
                req.flash('registrationError', 'Password invalid');
                res.redirect('/register');
            }

            models.user
                .create({
                    username: req.body.username,
                    email: req.body.email,
                    password_hash: hash,
                    salt: salt
                })
                .then(function (user) {
                    res.redirect("/login")
                })
                .catch(function (err) {
                    req.flash("registrationError", "Could not save user to database");
                    res.redirect("/register");
                });
        });
    });
};
