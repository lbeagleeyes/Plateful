module.exports = function(sequelize, DataTypes) {
  var CalendarRecipe = sequelize.define("CalendarRecipe", {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    apiId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    date: {
      type: DataTypes.DATE
    },
    mealtime: DataTypes.STRING
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
