var NUM_DAYS = 3;
var currentUserId = 1;
$(document).ready(function () {
  var datesToDisplay = getDatesToDisplay();
  datesToDisplay.forEach(day => {
    displayDay(day);
    displayMealtime("Breakfast", day);
    displayMealtime("Lunch", day);
    displayMealtime("Dinner", day);
  });

  //get today's date, save today, tomorrow and the day after tomorrow
  //get recipes for the current user for the three days
  //display the dates
  //display recipes in calendar according to dates and mealtimes
});

function displayDay(day){
  var dayCol = new $('<div>', {
    class: "col s4",
    text: day.format("MMMM Do YYYY")
  });
  $('#days').append(dayCol);
}

function displayMealtime(mealtime, day){
  var date = day.format("YYYY-MM-DD");
  console.log("Date being queried: " + date);
  $.ajax({
    type: "GET",
    url: `/calendarRecipesInDayForMealtime/${currentUserId}/${date}/${mealtime}`,
    success: function (response) {
      console.log(date + " - " + mealtime + " : " + JSON.stringify(response));
      var row = "#"+mealtime.toLowerCase();
      if(response.length === 0){
        $(row).append($('<div>', {
          class: "col s4", 
          text: ""
        }));
      }else{
        console.log(response[0]);
        var recipeCell = new $('<div>', {
          class: "col s4"
        });
        var card = createCalendarCard(response[0]);
        recipeCell.append(card);
        
        $(row).append(recipeCell);
      }
    }
  });
}

function createCalendarCard(recipe){
  var card = new $('<div>', {
    class: 'card small recipeCard',
    id: recipe.id
  });

  var cardImg = new $('<div>', {
    class: 'card-image waves-effect waves-block cyan darken-2'
  });

  var image = new $('<img>', {
    class: 'activator',
    src: recipe.imgUrl
  });

  cardImg.append(image);
  card.append(cardImg);

  var cardContent = new $('<div>', {
    class:"card-content "
  });
  var title = new $('<span>', {
    class: 'card-title activator grey-text text-darken-4 flow-text ',
    text: recipe.title,
  });
  cardContent.append(title);

  var link = $('<p>');
  var recipeURL = $("<a>", {
    href:recipe.url,
    text:recipe.publisher,
    target: "_blank"
  });

  link.append(recipeURL);
  cardContent.append(link);
  card.append(cardContent);

  return card;

}
function getUserRecipes(day) {
  $.ajax({
    type: "GET",
    url: `/calendarRecipesInDay/${currentUserId}/${day.format("YYYY-MM-DD")}`,
    success: function (response) {
      displayRecipes(day, response);
      return response;
    }
  });
}


function getUserRecipesInDateRange(datesToDisplay) {
  $.ajax({
    type: "GET",
    url: `/calendarRecipes/${currentUserId}/${datesToDisplay[0].format("YYYY-MM-DD")}/${datesToDisplay[datesToDisplay.length - 1].format("YYYY-MM-DD")}`,
    success: function (response) {
      displayRecipes(response);
      return response;
    }
  });
}

function displayRecipes(day, userRecipes) {
  //display date in calendar
  for (var i = 0; i < userRecipes.length; i++) {
    //create card for each recipe and display in day column

  }

}

function getDatesToDisplay() {
  var dates = [];
  for (var i = 0; i < NUM_DAYS; i++) {
    dates.push(moment().add(i, "days"));
  }
  return dates;
}
