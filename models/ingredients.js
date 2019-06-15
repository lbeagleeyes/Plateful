module.exports = function(sequelize, DataTypes) {
  var Ingredient = sequelize.define("Ingredient", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    apiId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });
  return Ingredient;
};
