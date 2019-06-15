use platefuldb;

insert into users (firstname, lastname, username, password, createdAt, updatedAt)
values("App", "User", "appUser", "psswd", current_timestamp(), current_timestamp());

SELECT * FROM platefuldb.users;

