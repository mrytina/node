var crypto = require('crypto'),
    hasher = {};

hasher.createSalt = function () {
    return crypto.randomBytes(64).toString('hex');
};

hasher.computeHash = function (source, salt, next) {
    crypto.pbkdf2(source, salt, 10000, 64, function (err, encodedPassword) {
        if (err) {
            next(err);
        }
        else {
            next(null, encodedPassword.toString('hex'));
        }
    });
};

module.exports = hasher;