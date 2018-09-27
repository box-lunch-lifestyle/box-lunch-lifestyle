# Box Lunch Lifestyle

The Box Lunch Lifestyle mobile-first application is a web application designed to provide it's users with an easy to use timer to track their lunch break, dividing their time evenly between lunch and themselves, and provides a few ways of tracking progress via use of a Notes page as well as a Milestones page.

Live beta demo:
https://box-lunch-lifestyle.herokuapp.com/#/login

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

Before you get started, make sure you have the following software installed on your computer:

- [Node.js](https://nodejs.org/en/)
- [PostrgeSQL](https://www.postgresql.org/)
- [Nodemon](https://nodemon.io/)

### Create database and table

Create a new database called `box_lunch_lifestyle` and create a `person` table:

```SQL
CREATE TABLE person (
    id SERIAL PRIMARY KEY,
    username VARCHAR (80) UNIQUE NOT NULL,
    password VARCHAR (1000) NOT NULL,
    name VARCHAR (200),
    is_admin BOOLEAN NOT NULL DEFAULT 'false',
    date_joined DATE NOT NULL DEFAULT NOW()
);

CREATE TABLE entries (
    id SERIAL PRIMARY KEY,
    person_id INTEGER REFERENCES "public"."person"("id") ON DELETE CASCADE,
    date_posted DATE NOT NULL DEFAULT NOW(),
    lunch_complete BOOLEAN NOT NULL DEFAULT 'false',
    activity_complete BOOLEAN NOT NULL DEFAULT 'false'
);

CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    date_posted DATE NOT NULL DEFAULT NOW(),
    comment VARCHAR(2000) NOT NULL,
    person_id INT REFERENCES "public"."person"("id") ON DELETE CASCADE
);
```

If you would like to name your database something else, you will need to change `box_lunch_lifestyle` to the name of your new database name in `server/modules/pool.js`

### Download (Don't Clone) This Repository

* Don't Fork or Clone. Instead, click the `Clone or Download` button and select `Download Zip`.
* Unzip the project and start with the code in that folder.
* Create a new GitHub project and push this code to the new repository.

### Development Setup Instructions

* Run `npm install`
* Create a `.env` file at the root of the project and paste this line into the file:
    ```
    SERVER_SESSION_SECRET=superDuperSecret
    ```
    While you're in your new `.env` file, take the time to replace `superDuperSecret` with some long random string like `25POUbVtx6RKVNWszd9ERB9Bb6` to keep your application secure. Here's a site that can help you: [https://passwordsgenerator.net/](https://passwordsgenerator.net/). If you don't do this step, create a secret with less than eight characters, or leave it as `superDuperSecret`, you will get a warning.
* Start postgres if not running already by using `brew services start postgresql`
* Run `npm run server`
* Run `npm run client`
* Navigate to `localhost:3000`

### Debugging

To debug, you will need to run the client-side separately from the server. Start the client by running the command `npm run dev:client`. Start the debugging server by selecting the Debug button.

![VSCode Toolbar](documentation/images/vscode-toolbar.png)

Then make sure `Launch Program` is selected from the dropdown, then click the green play arrow.

![VSCode Debug Bar](documentation/images/vscode-debug-bar.png)

### Linting

The Airbnb ESLint for react is a part of this project. If you would like to take advantage of this in VS Code, you can add the `ESLint` extension. Click the `Extensions` button (the button right below the `Debug`) and search for `ESLint`. Click `install` for the first result and then click `Reload`. Then it should be all set up!

![VSCode Toolbar](documentation/images/vscode-toolbar.png)

### Production Build

Before pushing to Heroku, run `npm run build` in terminal. This will create a build folder that contains the code Heroku will be pointed at. You can test this build by typing `npm start`. Keep in mind that `npm start` will let you preview the production build but will **not** auto update.

* Start postgres if not running already by using `brew services start postgresql`
* Run `npm start`
* Navigate to `localhost:5000`

### Lay of the Land

* `src/` contains the React application
* `public/` contains static assets for the client-side
* `build/` after you build the project, contains the transpiled code from `src/` and `public/` that will be viewed on the production site
* `server/` contains the Express App

## Deployment

1. Create a new Heroku project
1. Link the Heroku project to the project GitHub Repo
1. Create a Heroku Postgres database
1. Connect to the Heroku Postgres database from Postico
1. Create the necessary tables
1. Add an environment variable for `SERVER_SESSION_SECRET` with a nice random string for security
1. In the deploy section, select manual deploy

## Built With

* Javascript
* CSS
* HTML
* React
* Material-UI
* Redux/Sagas
* Moment.js
* SQL
* PostgreSQL
* Sweetalert2
* Express
* Node.js
* Nodemon
* Passport

## Authors

- **[Cory Booth](https://github.com/superginrai)** 
- **[Kevin Dexter](https://github.com/KevinJDexter)** 
- **[Torben Jepsen](https://github.com/TorbenJepsen)** 
- **[Bree Melechinsky](https://github.com/juniormince)** 
- **[Ilana Nagib](https://github.com/ilananagib)** 

## Acknowledgements
* Sairam Krish (Countdown logic)
* Prime Digital Academy (User login logic)
