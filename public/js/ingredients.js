var ingredientsList = [];

$(document).ready(function () {
  $.ajax({
    type: "GET",
    url: "/ingredients",
    success: function (response) {
      var ingredientArray = response;
      var dataIngredient = {};
      for (var i = 0; i < ingredientArray.length; i++) {
        //console.log(countryArray[i].name);
        dataIngredient[ingredientArray[i].name] = null; //countryArray[i].flag or null
      }
      $("input.autocomplete").autocomplete({
        data: dataIngredient,
        limit: 5, // The max amount of results that can be shown at once. Default: Infinity.
        onAutocomplete: function (value) {
          ingredientsList.push(value);
          addIngredientBtn(value);
          $("#ingredients").val("");
          $("#ingredients")
            .next()
            .removeClass("active");
        }
      });
    }
  });
});

function addIngredientBtn(ingredientName) {
  var optionBtn = new $("<button>", {
    class: "waves-effect waves-light btn-small",
    "data-name": ingredientName,
    id: ingredientName,
    text: ingredientName,
    click: function () {
      //var remove = confirm("Do you want to remove " + emotion + " button?");
      // if (remove) {
      $("#" + ingredientName).remove();
      $(this).remove();
      ingredientsList.splice(ingredientsList.indexOf(ingredientsList), 1);
      // }
    }
  });
  var closeBtn = new $("<i>", {
    class: "material-icons",
    text: "close"
  });
  optionBtn.append(closeBtn);
  $("#buttons-view").append(optionBtn);
}

function search() {
  event.preventDefault();
  $("#recipes").empty();

  //call api with ingredientsList
  $.ajax({
    type: "GET",
    url: "/recipes/" + ingredientsList,
    success: function (response) {
      console.log("Recipes loaded: " + response);
      if (response.length > 0) {
        response.forEach(recipe => {
          //call card creator here
          //console.log(recipe);

          var card = createCard(recipe);
         
          $('#recipes').append(card);
        });
      } else {
        var msg = $('<h3>').text("No recipes found.");
        $('#recipes').append(msg);
      }
    }
  });

  //clear ingredients list and recipes display area
  clearIngredientsList();
}

function createCard(recipe) {
  var card = new $('<div>', {
    class: 'card recipeCard',
    id: recipe.recipe_id
  });

  var cardImg = new $('<div>', {
    class: 'card-image waves-effect waves-block waves-light'
  });

  var image = new $('<img>', {
    class: 'activator',
    src: recipe.image_url
  });

  cardImg.append(image);
  card.append(cardImg);

  var cardContent = new $('<div>', {
    class:"card-content"
  });
  var title = new $('<span>', {
    class: 'card-title activator grey-text text-darken-4',
    text: recipe.title,
  });

  var moreIcon = new $('<i>', {
    class: 'material-icons right',
    text: 'more_vert'
  });

  title.append(moreIcon);
  cardContent.append(title);

  var link = $('<p>');
  var recipeURL = $("<a>", {
    href:recipe.source_url,
    text:recipe.publisher,
    target: "_blank"
  });

  link.append(recipeURL);
  cardContent.append(link);
  card.append(cardContent);

  var reveal = $('<div>').attr("class",'card-reveal');
  var revealTitle = new $('<span>', {
    class: "card-title grey-text text-darken-4",
    text: recipe.title
  });

  var closeIcon = new $('<i>', {
    class: "material-icons right",
    text: 'close'
  });

  var ingredients = $('<p>').text("Placeholder for ingredients detail");

  revealTitle.append(closeIcon);
  reveal.append(revealTitle);
  reveal.append(ingredients);
  card.append(reveal);

  return card;
}

function clearIngredientsList() {
  ingredientsList = [];
  $("#buttons-view").empty();
}
