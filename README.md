# RateMyLandLord

A simple web app to rate your landlord and to find housing

## To Configure

- Make sure you have the latest LTS version of node.js
- Pull to get the files
- Install all the dependencies, by typing this into a bash terminal under the RateMyLandLord dir

  ```s
  $ npm install
  ```

- Setup the enviroment variables, which are local to your system. In the config/ dir, add a new file named 'default.json'. Put your details where there are [ ]. Should look like this ...

  ```json
  {
    "ssh_host": "ada.gonzaga.edu",
    "ssh_user": "[SSH_USER_NAME]",
    "db_host": "cps-database",
    "db_user": "[DB_USER_NAME]",
    "db_password": "[DB_PASSWORD]",
    "db": "[DB_NAME]"
  }
  ```

- Finally, you need to create a ssh-keys for the app. This will work for linux/macos systems, probably not for Winblows (Windows)

  - Generate a ssh key. Just hit enter when prompted

    ```s
    $ ssh-keygen
    ```

  - Now copy this to ada server

    ```s
    $ ssh-copy-id -i ~/.ssh/id_rsa [SSH_USER_NAME]@ada.gonzaga.edu
    ```

  - Finally check that this works by ssh-ing into ada. This time, you shouldn't be prompted for a password.

    ```s
    $ ssh [SSH_USER_NAME]@ada.gonzaga.edu
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
