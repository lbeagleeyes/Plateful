$(document).ready(function() {
  // Function to display recipes
  function displayRecipes() {
    // Declares variable for queryURL
    $.ajax({
      type: "GET",
      url: "/recipes/" + ingredientsList,
      success: function(response) {
        console.log("Recipes loaded: " + response);
      }
    }).then(function(response) {
      // Testing response to make sure object is there
      console.log(response);

      // Sets up variable for response data
      var recipe = response.data;

      // Empties div so gifs don't stack
      $("#recipes").empty();

      // For loop to display recipes
      for (var i = 0; i < recipe.length; i++) {
        // Creates variabless
        var recipeDiv = $("<div>");
        var title = $("<p>").text(recipe[i].title);
        var image = $("<img>").attr("src", recipe[i].image_url);
        var recipeURL = $("<a href>").attr("src", recipe[i].source_url);

        recipeDiv.append(title);
        recipeDiv.append(image);
        recipeDiv.append(recipeURL);

        $("#recipes").append(recipeDiv);
      }
    });
  }
});
