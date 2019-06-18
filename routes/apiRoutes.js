var db = require("../models");

module.exports = function(app) {
  app.get("/dates", function(req, res) {
    db.CalendarRecipe.findAll({
      where: {
        date: {
          $between: [req.params.startDate, req.params.endDate]
        }
      }
    }).then(function(results) {
      res.json(results);
    });
  });
  // Create a new example
  app.post("/api/newCalendarRecipe", function(req, res) {
    
    var recipeReceived = JSON.parse(req.body.recipe);
    console.log("Recipe Recieved:" + JSON.stringify(recipeReceived));
    db.Recipe.findOrCreate({
      where: { apiId: recipeReceived.apiId },
      defaults: recipeReceived
    }).then(function([recipe, created]) {
      db.CalendarRecipe.create({
        mealtime: req.body.mealtime,
        date: req.body.date,
        userId: req.body.userId,
        recipeId: recipe.id
      });
    });
  });

  app.post("/newuser", function(req, res) {
    db.User.create(req.body).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  app.get("/ingredients", function(req, res) {
    db.Ingredient.findAll({}).then(function(results) {
      res.json(results);
    });
  });

  app.get("/api/uid", function(req, res) {
    console.log(
      "=========================================\n======================================="
    );
    console.log("Current user is: ");
    console.log(req.user);
    console.log("=================");
    console.log("Current user ID is: " + req.user.id);
    console.log(
      "=========================================\n======================================="
    );
    res.json(req.user.id);
  });

  // Create a new example
  // app.post("/api/examples", function(req, res) {
  //   db.Example.create(req.body).then(function(dbExample) {
  //     res.json(dbExample);
  //   });
  // });

  // // Delete an example by id
  // app.delete("/api/examples/:id", function(req, res) {
  //   db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
  //     res.json(dbExample);
  //   });
  // });
};
