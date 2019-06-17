insert into recipes (title, apiId, url, imgUrl, publisher, createdAt, updatedAt)
VALUES
("Mini Chocolate Chip Maple Pancake Cupcakes", '54456', "http://www.twopeasandtheirpod.com/mini-chocolate-chip-maple-pancake-cupcakes/", "http://static.food2fork.com/kevinandamandaMiniMapleChocolateChipPancakeCupcakes01d93e.jpg", "Two Peas and Their Pod", current_timestamp(), current_timestamp())
,("How to Make a Choco Taco", 'dd4918', "http://www.seriouseats.com/recipes/2009/02/how-to-make-a-choco-taco-from-scratch.html",  "http://static.food2fork.com/20090225chocotacothumbf665.jpg", "Serious Eats", current_timestamp(), current_timestamp());

insert into calendarrecipes( date, mealtime, createdAt, updatedAt, userId,recipeId )
VALUES( '2019-6-17', 'Dinner', current_timestamp(), current_timestamp(),1, 4)
,( '2019-6-17', 'Lunch', current_timestamp(), current_timestamp(),1,5);

SELECT * FROM platefuldb.calendarrecipes;