var db = require("../models");
require("dotenv").config();
var axios = require("axios");
var authController = require("../controllers/authcontroller");

module.exports = function(app, passport) {
  app.get("/", isLoggedIn, function(req, res) {
    // db.Example.findAll({}).then(function(dbExamples) {
    res.render("index", {
      msg: "Welcome!"
      // ,
      // examples: dbExamples
    });
  });

  // Auth Routes
  app.get("/signup", authController.signup);
  app.post(
    "/signup",
    passport.authenticate("local-signup", {
      successRedirect: "/",
      failureRedirect: "/signup"
    })
  );

  app.get("/signin", authController.signin);

  app.get("/logout", authController.logout);

  // // Load example page and pass in an example by id
  // app.get("/example/:id", function(req, res) {
  //   db.Example.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
  //     res.render("example", {
  //       example: dbExample
  //     });
  //   });
  // });

  app.get("/recipes/:ingr", function(req, res) {
    var queryURL =
      "https://www.food2fork.com/api/search?key=${process.env.API_KEY}&q=${req.params.ingr}";

    console.log("received requests. Params: " + req.params.ingr);
    console.log("Query = " + queryURL);

    axios.get(queryURL).then(function(response) {
      var recipes = response.data.recipes;
      console.log(recipes);
      res.send(recipes);
    });
  });

  app.get("/recipe/:id", function(req, res) {
    var queryURL =
      "https://www.food2fork.com/api/get?key=${process.env.API_KEY}&rId=${req.params.id}";

    console.log("Query = " + queryURL);

    axios.get(queryURL).then(function(response) {
      console.log(response.data.recipe);
      res.json(response.data.recipe);
    });
  });

  //use when loading calendar recipes
  // var hbsObject = {
  //   recipes: response.data.recipes
  // };
  // //console.log(hbsObject);
  // res.render("index", hbsObject);

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    console.log("sending 404.");
    res.render("404");
  });

  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect("/signin");
  }
};
