insert into calendarrecipes(title, apiId, date, mealtime, createdAt, updatedAt, UserId)
VALUES("Black Bean Brownies", '54456', '2019-6-17', 'Dinner', current_timestamp(), current_timestamp(),1)
,("Mini Chocolate Chip Maple Pancake Cupcakes", '54456', '2019-6-16', 'Breakfast', current_timestamp(), current_timestamp(),1)
,("How to Make a Choco Taco", 'dd4918', '2019-6-17', 'Lunch', current_timestamp(), current_timestamp(),1);

SELECT * FROM platefuldb.calendarrecipes;