$(document).ready(function() {
  var datesToDisplay = getDatesToDisplay(3);
  datesToDisplay.forEach(day => {
    console.log(day.format("MMM Do YYYY"));
    console.log(day.format("YYYY-MM-DD"));//for mysql query
  });
  // var userRecipes = getUserRecipes(datesToDisplay);
  // diaplayUserRecipes(userRecipes);

  //get today's date, save today, tomorrow and the day after tomorrow
  //get recipes for the current user for the three days
  //display the dates
  //display recipes in calendar according to dates and mealtimes
});

function getDatesToDisplay(numDates) {
  var dates = [];
  for (var i = 0; i < numDates; i++) {
    dates.push(moment().add(i, "days"));
  }
  return dates;
}
