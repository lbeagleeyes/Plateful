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
    class: "col s4 day",
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
        }).on("drop", function(ev){
          ev.preventDefault();
          var recipe = ev.originalEvent.dataTransfer.getData("recipe");
          var elementId = ev.originalEvent.dataTransfer.getData("elementId");
          ev.target.appendChild(document.getElementById(elementId));
        }).on("dragover", function(ev){
          ev.preventDefault();
        }));
      }else{
        console.log(response[0]);
        var recipeCell = new $('<div>', {
          class: "col s4"
        });
        var card = createCard(response[0]);
        recipeCell.append(card);
        
        $(row).append(recipeCell);
      }
    }
  });
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
