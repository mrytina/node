var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    hasher = require('./hasher'),
    models = require('../models'),
    auth = {};

auth.ensureAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) { //isAuthenticated comes from passports
        next();
    } else {
        res.redirect('/login');
    }
};

auth.ensureApiAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(401).send('Not authorized');
    }
};

auth.hasher = hasher;

//the next function here is used in passport.authenticate("local", function(err, user, info) in loginController
//the next passes to function(err, user, info)
passport.use(new LocalStrategy(function (username, password, next) {
    var user =
        models.user
            .find({
                where: {username: username}
            })
            .then(function (user) {
                if (user) {
                    hasher.computeHash(password, user.salt, function (err, hash) {
                        if (user.password_hash == hash) {
                            return next(null, user);
                        }

                        return next(null, false, {message: 'invalid Credentials'})
                    });
                }
                else {
                    return next(null, false, {message: 'invalid Credentails'})
                }
            });
}));

//serialize and deserialize used in sessions
passport.serializeUser(function (user, next) {
    next(null, user.id);
});

passport.deserializeUser(function (id, next) {
    models.user
        .find({
            where: {id: id}
        })
        .then(function (user) {
            return next(null, user);
        })
        .catch(function (err) {
            return next(null, false, {message: "Failed to retrieve user"});
        })
});

module.exports = auth;