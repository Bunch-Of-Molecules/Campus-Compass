# Campus Compass
A webapp where users can add location-based reviews in IITK.
Authentication is setup such that features can only be used by logged in users


## Frontend (React + Vite + Leaflet):

Setup:
Navigate to "campus-compass" folder


    -npm install
    -npm run dev
Forntend runs at: http://localhost:5173 (Vite default)

## Backend (Node.js + Express):

Setup:
Navigate to "Backend" folder

    -npm install
    -npm start
By default, it runs at: http://localhost:3000

**Local Database Setup:**

Make sure you have MySQL and MySQL Workbench installed

- Make a new MySQL Connection in the Workbench app
- Create a schema named "table"
- Under this schema create 2 Tables, named 'locations' and 'users'

'locations' Table:
    
    CREATE TABLE `table`.`locations` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `locname` VARCHAR(45) NOT NULL,
    `latitude` DOUBLE NOT NULL,
    `longitude` DOUBLE NOT NULL,
    `review` VARCHAR(255) NOT NULL,
    `image` VARCHAR(45) NULL,
    PRIMARY KEY (`id`));

'users' Table:

    CREATE TABLE `table`.`users` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(45) NOT NULL UNIQUE,
    `password` VARCHAR(255) NOT NULL
    PRIMARY KEY (`id`));

A possible issue can be authentication, to fix that

    ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'your_password';
Run this, and replace 'your_password' and make the change accordingly in ./Backend/index.js