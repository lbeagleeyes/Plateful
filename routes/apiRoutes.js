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
    console.log(req.body);
    // db.User.findByPk(req.body.userId).then(function(result){
          // });
    // db.Recipe.

    // db.User.create(

    // ).then(function(dbExample) {
    //   res.json(dbExample);
    // });
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
