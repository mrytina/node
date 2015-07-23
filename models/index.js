var fs = require('fs'),
    path = require('path'),
    Sequelize = require('sequelize'),
    sequelize = new Sequelize('framework', 'root', 'whatever', {
        host: 'localhost',
        dialect: 'mysql'
    }),
    models = {};

console.log("reading m-----------------------");

fs.readdirSync(__dirname)
    .filter(function (file) {
        return (file.indexOf(".") !== 0) && (file !== "index.js");
    })
    .forEach(function (file) {
        var model = sequelize.import(path.join(__dirname, file));
        models[model.name] = model;
    });

Object.keys(models).forEach(function (modelName) {
    if ("associate" in models[modelName]) {
        models[modelName].associate(models);
    }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

module.exports = models;