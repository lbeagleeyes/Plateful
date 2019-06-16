// var User = require("user.js");
// var Recipe = require("recipe.js");
module.exports = function(sequelize, DataTypes) {
  var CalendarRecipe = sequelize.define("CalendarRecipe", {
    date: {
      type: DataTypes.DATEONLY
    },
    mealtime: DataTypes.STRING,
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "User",
        key: "id"
      }
    },
    recipeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Recipe",
        key: "id"
      }
    }
  });
  return CalendarRecipe;
};
