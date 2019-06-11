module.exports = function(sequelize, DataTypes) {
  var CalendarRecipe = sequelize.define("CalendarRecipe", {
    recipeName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    recipeId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    date: DataTypes.DATE,
    mealtime: DataTypes.STRING,
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });

  CalendarRecipe.associate = function(models) {
    CalendarRecipe.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return CalendarRecipe;
};
