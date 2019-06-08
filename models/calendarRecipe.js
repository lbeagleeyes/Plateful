module.exports = function(sequelize, DataTypes) {
  var CalendarRecipe = sequelize.define("CalendarRecipe", {
    recipeName: DataTypes.STRING,
    recipeId: DataTypes.INTEGER,
    date: DataTypes.DATE,
    mealtime: DataTypes.STRING,
    UserId:DataTypes.INTEGER
  });
  return CalendarRecipe;
};
