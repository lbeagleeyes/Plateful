var db = require("../models");
require("dotenv").config();
var axios = require("axios");
var authController = require("../controllers/authcontroller");

module.exports = function(app, passport) {
  // Load index page
  app.get("/", isLoggedIn, function(req, res) {
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

    res.render("index", {
      msg: "Welcome!",
      json: {
        userid: req.user.id
      }
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
    // .then(function() {
    //   console.log(
    //     "=========================================\n======================================="
    //   );
    //   console.log("Current user is: ");
    //   console.log(req.user);
    //   console.log("=================");
    //   console.log("Current user ID is: " + req.user.id);
    //   console.log(
    //     "=========================================\n======================================="
    //   );
    // })
  );

  app.get("/signin", authController.signin);
  app.post(
    "/signin",
    passport.authenticate("local-signin", {
      successRedirect: "/",
      failureRedirect: "/signin"
    })
    // .then(function() {
    //   console.log(
    //     "=========================================\n======================================="
    //   );
    //   console.log("Current user is: ");
    //   console.log(req.user);
    //   console.log("=================");
    //   console.log("Current user ID is: " + req.user.id);
    //   console.log(
    //     "=========================================\n======================================="
    //   );
    // })
  );

  app.get("/logout", authController.logout);

  // // Load example page and pass in an example by id
  // app.get("/example/:id", function(req, res) {
  //   db.Example.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
  //     res.render("example", {
  //       example: dbExample
  //     });
  //   });
  // });

  // app.get("/recipes/:ingr", function(req, res) {
  //   var queryURL =
  //     "https://www.food2fork.com/api/search?key=${process.env.API_KEY}&q=${req.params.ingr}";
  app.get('/recipes/:ingr', function (req, res) {
    var queryURL = `https://www.food2fork.com/api/search?key=${process.env.API_KEY}&q=${req.params.ingr}&count=10`;

    console.log("received requests. Params: " + req.params.ingr);
    console.log("Query = " + queryURL);

    axios.get(queryURL).then(function (response) {
      res.send(response.data.recipes.map(recipe => {
        return {
          title: recipe.title,
          apiId: recipe.recipe_id,
          url: recipe.source_url,
          imgUrl: recipe.image_url,
          publisher: recipe.publisher
        }
      }));
    });
  });

  app.get("/recipe/:id", function(req, res) {
    var queryURL =
      `https://www.food2fork.com/api/get?key=${process.env.API_KEY}&rId=${req.params.id}`;

    console.log("Query = " + queryURL);

    axios.get(queryURL).then(function(response) {
      console.log(response.data.recipe);
      res.json(response.data.recipe);
    });
  });

  // app.get('/calendarRecipes/:usrId/:startDate/:endDate', function (req, res) {
  //   const Op = db.Sequelize.Op;
  //   db.CalendarRecipe.findAll({
  //     where: {
  //       userId: req.params.usrId,
  //       date: {
  //         [Op.between]: [req.params.startDate, req.params.endDate]
  //       }
  //     }
  //   }).then(function (result) {
  //     res.json(result);
  //   });
  // });

  // app.get('/calendarRecipesInDay/:usrId/:date', function (req, res) {
  //   db.CalendarRecipe.findAll({
  //     where: {
  //       userId: req.params.usrId,
  //       date: req.params.date
  //     }
  //   }).then(function (result) {
  //     res.json(result);
  //   });
  // });

  app.get('/calendarRecipesInDayForMealtime/:usrId/:date/:mealtime', function (req, res) {
    console.log("date: " + req.params.date);
    db.User.findOne({
      where: {
        id: req.params.usrId,
      },
      include: [{
        model: db.Recipe,
        through: { where: { date: req.params.date, mealtime: req.params.mealtime } }
      }
      ]
    }).then(function (result) {
      // console.log(result);
      res.json(result.Recipes);
    });
  });





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
