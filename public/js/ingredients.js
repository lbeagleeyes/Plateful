document.addEventListener("DOMContentLoaded", function() {
  var elems = document.querySelectorAll(".autocomplete");
  //var instances = M.Autocomplete.init(elems, options);
});

// Or with jQuery

$(document).ready(function() {
  $.ajax({
    type: "GET",
    url: "/ingredients",
    success: function(response) {
      var ingredientArray = response;
      var dataIngredient = {};
      for (var i = 0; i < ingredientArray.length; i++) {
        //console.log(countryArray[i].name);
        dataIngredient[ingredientArray[i].name] = null; //countryArray[i].flag or null
      }
      $("input.autocomplete").autocomplete({
        data: dataIngredient,
        limit: 5 // The max amount of results that can be shown at once. Default: Infinity.
      });
    }
  });
});
