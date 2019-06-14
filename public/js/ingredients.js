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
  //call api with ingredientsList
  event.preventDefault();
  $.ajax({
    type: "GET",
    url: "/recipes/" + ingredientsList,
    success: function (response) {
      console.log("Recipes loaded: ");
      response.forEach(recipe => {
        //call card creator here
        console.log(recipe);
      });
      //reloading of partial:
      // var list_partial = Handlebars.partials.index;
      // $view.find("#recipes").html(list_partial(response));
    }
  });
}
