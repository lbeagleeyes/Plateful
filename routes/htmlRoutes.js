var db = require("../models");
require("dotenv").config();
var axios = require("axios");


module.exports = function (app) {
  // Load index page
  app.get("/", function (req, res) {
    res.render("index", {
      msg: "Welcome!"
    });
  });

  app.get('/recipes/:ingr', function (req, res) {
    var queryURL = `https://www.food2fork.com/api/search?key=${process.env.API_KEY}&q=${req.params.ingr}&count=10`;

    console.log("received requests. Params: " + req.params.ingr);
    console.log("Query = " + queryURL);

    axios.get(queryURL).then(function (response) {
      var recipes = response.data.recipes;
      console.log(recipes);
      res.send(recipes);
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

  app.get('/calendarRecipes/:usrId/:startDate/:endDate', function (req, res) {
    const Op = db.Sequelize.Op;
    db.CalendarRecipe.findAll({
      where: {
        userId: req.params.usrId,
        date: {
          [Op.between]: [req.params.startDate, req.params.endDate]
        }
      }
    }).then(function (result) {
      res.json(result);
    });
  });


  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};
