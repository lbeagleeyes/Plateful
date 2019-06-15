var NUM_DAYS = 3;
$(document).ready(function() {
  var datesToDisplay = getDatesToDisplay();
  datesToDisplay.forEach(day => {
    console.log(day.format("MMM Do YYYY"));
    console.log(day.format("YYYY-MM-DD"));//for mysql query
  });
  getUserRecipes(datesToDisplay);
  // diaplayUserRecipes(datesToDisplay);

  //get today's date, save today, tomorrow and the day after tomorrow
  //get recipes for the current user for the three days
  //display the dates
  //display recipes in calendar according to dates and mealtimes
});

function getUserRecipes(datesToDisplay){
  var currentUserId = 1;
  $.ajax({
    type: "GET",
    url: `/calendarRecipes/${currentUserId}/${datesToDisplay[0].format("YYYY-MM-DD")}/${datesToDisplay[datesToDisplay.length-1].format("YYYY-MM-DD")}`,
    success: function (response) {
     displayRecipes(response);
     return response;
    }});
}

function displayRecipes(userRecipes){

}

function getDatesToDisplay() {
  var dates = [];
  for (var i = 0; i < NUM_DAYS; i++) {
    dates.push(moment().add(i, "days"));
  }
  return dates;
}
