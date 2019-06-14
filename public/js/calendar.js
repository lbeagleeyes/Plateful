$(document).ready(function() {
  $("#calendar").fullCalendar({  
    header:  
        { 
        },  
    events: function (start, end, timezone, callback)  
    {  
      $.ajax({  
        url: "/dates",  
        type: "GET",  
        dataType: "JSON",  

        success: function (result)  
        {} 
      });
    }
  });
});
