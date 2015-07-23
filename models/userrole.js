module.exports = function (sequelize, DataTypes) {
    return sequelize.define('user_role', {
            id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
            role: {type: DataTypes.STRING}
    },
    {
        underscore: true,
        freezeTableName: true
        /*classMethods: {
            associate: function(models){
            }
        }*/
    });
};