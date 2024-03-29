# OffCampus

A simple web app to for college students to find cheap affordable off-campus housing. OffCampus is inspired by RateMyProfessor in the sense of commuity review. Post houses you've lived in and look at other peoples experiences at that house. Lastly, get connected with a landlord.

## Features

- Find Reviews of a Property
  - Search by address
  - Add a review with authenticated account
  - Add a review with ReCAPTCHA
  - Like reviews with authenticated account
- Search for Properties
  - Select properties by certain search criteria
  - Save properties for later viewing
  - Look at landlords for their associated property, get contacted
- Add an unlisted Property
  - Submit property with authenticated account
  - Submit property with ReCAPTCHA
  - This will require a picture of the house

## To Configure

- Make sure you have the latest LTS version of node.js
- Git clone or pull to get server files
- Install all the dependencies, by typing this into a bash terminal under the OffCampus dir

  ```s
  $ npm install
  ```

- Setup enviroment variables, which are local to your system. In the config/ dir, add a new file named 'default.json'. Put your details where there are [ ]. The file should look like this ...

  ```json
  {
    "captcha_secret_key": "[CAPTCHA_SECRET]",
    "db_host": "[DB_IP_ADDRESS]",
    "db_user": "[DB_USER_NAME]",
    "db_password": "[DB_PASSWORD]",
    "db": "[DB_NAME]",
    "jwtSecret": "[JWT_SECRET_PASSPHRASE]"
  }
  ```

  ### About Current DB

  - Only for development are we running a mysql server locally, officially off of gonzaga :). I have a file which contains all of the Data from the cps-database. If others join I will add them later.
  - I am sticking with MySQL for now, although I hope to change that. Plans are to deploy initially with MySQL or MariaDB, the first MVP, then finally switching the code base to Postgres afterwards.

## Server Droplet Configuration/Info

- Current Users for the Server
  - dev: for devop troglodytes who need to do routine server management, ie anything with pm2, mysql server, dependencies, nginx, etc...
  - git: for programmers who want to update the website. Keep in mind they will only have access to the headless git repo that will be in sync with the master branch on github.
  - root: this is only for me. Because I want the power and its my server, me, me, me!
- MySQL users
  - 'dev'@'localhost': used as the user admin account for the production DB
  - 'git'@'localhost': used as the production account for the running WAP, reduced priviledges

## To Run

- To Run both client and server

  ```s
  $ npm run dev
  ```

- To run only client

  ```s
  $ npm run client
  ```

- To run only server

  ```s
  $ npm run server
  ```
