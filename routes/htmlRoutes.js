var db = require("../models");
require("dotenv").config();
var axios = require("axios");

module.exports = function (app) {
  // Load index page
  app.get("/", function (req, res) {
    // db.Example.findAll({}).then(function(dbExamples) {
    res.render("index", {
      msg: "Welcome!"
      // ,
      // examples: dbExamples
    });
  });
  // });

  // // Load example page and pass in an example by id
  // app.get("/example/:id", function(req, res) {
  //   db.Example.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
  //     res.render("example", {
  //       example: dbExample
  //     });
  //   });
  // });

  app.get('/recipes/:ingr', function (req, res) {
    var queryURL = `https://www.food2fork.com/api/search?key=${process.env.API_KEY}&q=${req.params.ingr}`;

    console.log("received requests. Params: " + req.params.ingr);
    console.log("Query = " + queryURL);

    axios.get(queryURL).then(function (response) {
      var hbsObject = {
        recipes: response.data.recipes
      };
      //console.log(hbsObject);
      res.render("index", hbsObject);
    });
  });

  app.get('/recipe/:id', function (req, res) {
    var queryURL = `https://www.food2fork.com/api/get?key=${process.env.API_KEY}&rId=${req.params.id}`;

    console.log("Query = " + queryURL);

    axios.get(queryURL).then(function (response) {
      console.log(response.data.recipe);
      res.json(response.data.recipe);
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};
