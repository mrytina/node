var fs = require('fs'),
    path = require('path'),
    controllers = {};

console.log("reading c-----------------------");

controllers.init = function (app) {
    fs.readdirSync(__dirname)
        .filter(function (file) {
            return (file.indexOf(".") !== 0) && (file !== "index.js");
        })
        .forEach(function (file) {
            require(path.join(__dirname, file))(app);
        });
};

module.exports = controllers;
