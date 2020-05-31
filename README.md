# DataExpert
Data Analytics E-Learning Website.

For all the commands below, if you are using a Windows machine, then replace `pip3` with `pip`, and `python3` with
 `python`.

To run the application locally:
* Clone the repository on your local machine: `git clone https://github.com/dirmi513/DataExpert.git` 
    * I highly recommend that you create and use a Python virtual environment for running the app locally. Before
     cloning the repository, do the following:
        * Check if you already have virtualenv installed on your machine by opening a command line terminal and
        executing the following command: `virtualenv --version`.  If you see a version number, then go on to the next
         step. Otherwise, install it on your machine with pip: `sudo pip3 install virtualenv`.
        * Now to create a virtual environment, go to the directory that will be the parent directory of the virtual
        environment (the virtual environment will be the parent directory of the local app), open a command line
        terminal, and run the following command: `virtualenv name_of_virtual_env_directory`. So if you wanted to name
         your virtual environment my-virtual-env, then the command would be `virtualenv my-virtual-env`. This will
         create a new directory within the parent directory and will be your virutal environment for the app.
        * Active the virtual environment by running: `source name_of_virtual_env_directory/bin/activate`
        * Now change the directory to your virtual environment, `cd name_of_virtual_env_directory`, and clone the
         repository `git clone https://github.com/dirmi513/DataExpert.git`.
        * Change directory to the DataExpert directory within the virtual environment: `cd DataExpert`, and run the
         following command: `pip3 install -r requirements.txt`, which will install all the necessary Python modules
          and packages in your virtual environment for you to be able to run the app. 
* Install [PostgreSQL RDBMS](https://www.postgresql.org/download/) on your local machine, and then create a local
 database with the database name = dataexpert.
* Install [Node.js](https://nodejs.org/en/download/) on your machine, and then make sure `npm` is also installed.
  * Open the command line, activate your virtual environment (if it isn't already), and change directory to the local
   DataExpert repo. Run `npm install`, which should install all the packages in the package.json file (all necessary
    javascript dependencies for the frontend).
  * If you make any changes to the Javascript/CSS files within the frontend app, make sure to run `npm run dev` before running `python3 manage.py runserver`.
* Create a superuser with your credentials so that you can log in to DataExpert and view slides, as well as access
 protected API endpoints, and add/modify/delete
 slides and blog posts. Execute `python3 manage.py createsuperuser`, which will then prompt you to enter an email
 , name, and password.  The email and password are your credentials to sign in to DataExpert and be able to view the
  slides.  Once logged in, you can also access the various REST API endpoints for slides and blog posts.
* Dump the data from the [db.json](https://github.com/dirmi513/DataExpert-Material/blob/master/db.json) file (in the
 DataExpert-Material GitHub repo) into the database: `python3 manage.py loaddata db.json`.  If the db.json file is
  not in the current directory (which it shouldn't be because it is obtained from a different repo), update the
   command: `python3 manage.py loaddata path/to/db.json`.
* Execute `python3 manage.py runserver` from the command line, which ["starts a lightweight development Web
 server
 on the local machine. By default, the server runs on port 8000 on the IP address 127.0.0.1."](https://docs.djangoproject.com/en/3.0/ref/django-admin/#runserver)
* Now open any of your web browsers, and go to http://localhost:8000/, which should display the homepage (still a
 blank page) for DataExpert.  You can now log in, view the slides, and access the REST API endpoints. 
* When you are done, if you have updated/added/deleted any slide or blog post, export the data from the database into
 the db.json file in the DataExpert-Material repo.  The db.json file should not be in the main DataExpert repo, but
  the DataExpert-Material one.  First run `python3 manage.py migrate`, then `python3 manage.py dumpdata --exclude
   auth.permission --exclude contenttypes > path/to/DataExpert-Material/repo/db.json`.
