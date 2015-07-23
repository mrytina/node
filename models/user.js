module.exports = function (sequelize, DataTypes) {
    return sequelize.define('user', {
            id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
            username: {type: DataTypes.STRING, allowNull: false, unique: true},
            email: {type: DataTypes.STRING, allowNull: false, validate: {isEmail: true}},
            password_hash: {type: DataTypes.STRING, allowNull: false},
            salt: {type: DataTypes.STRING, allowNull: false}
        },
        {
            underscore: true,       //make properties underscored in the database so updateAt will be updated_at (property for timestamps is by default true which creates updatedAt and modifiedAt column)
            freezeTableName: true   //don't make the table names pluralized
            /*classMethods: {       //user doesn't need to have relationships
             associate: function (models) {
             User.belongsTo(models.something);
             }
             }*/
        });
};
