# RateMyLandLord

A simple web app to for college students to find cheap affordable off-campus housing. RML is inspired by RateMyProfessor in the sense of commuity review. Post houses you've lived in and look other peoples experiences at that house and then get connected to a landlord.

## To Configure

- Make sure you have the latest LTS version of node.js
- Pull to get the files
- Install all the dependencies, by typing this into a bash terminal under the RateMyLandLord dir

  ```s
  $ npm install
  ```

- Setup enviroment variables, which are local to your system. In the config/ dir, add a new file named 'default.json'. Put your details where there are [ ]. The file should look like this ...

  ```json
  {
    "db_host": "[DB_IP_ADDRESS]",
    "db_user": "[DB_USER_NAME]",
    "db_password": "[DB_PASSWORD]",
    "db": "[DB_NAME]",
    "jwtSecret": "[JWT_SECRET_PASSPHRASE]"
  }
  ```

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
