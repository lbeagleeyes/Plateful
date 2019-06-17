module.exports = function(sequelize, DataTypes) {
  var Recipe = sequelize.define("Recipe", {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    apiId: {
      type: DataTypes.STRING
    },
    url: {
      type: DataTypes.STRING
    },
    imgUrl: {
      type: DataTypes.STRING
    },
    publisher: {
      type: DataTypes.STRING
    }
  });

  Recipe.associate = (models) => {
    Recipe.belongsToMany(models.User, {
      through: 'CalendarRecipe',
      // as: 'recipes',
      foreignKey: 'recipeId'
    });
  };
  return Recipe;
};
