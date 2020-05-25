# DataExpert
Data Analytics E-Learning Website.

To run locally, make sure you have:
* A local postgres database set up with the database name = dataexpert.
* Install Node.js on your machine and then make sure `npm` is also installed.
  * Open the command line and go to the directory of the repository. Run `npm install`, which should install all of the packages in the package.json file.
  * If you make any changes to the Javascript/CSS files within the frontend app, make sure to run `npm run dev` before running `python3 manage.py runserver`.
* Execute `python3 manage.py runserver` from the command line, which ["starts a lightweight development Web server on the local machine. By default, the server runs on port 8000 on the IP address 127.0.0.1."](https://docs.djangoproject.com/en/3.0/ref/django-admin/#runserver)

To load data from a JSON file, e.g. db.json, into the database tables: 
* `python3 manage.py loaddata db.json`

To export the data from the db a JSON file, e.g. db.json:
* `python3 manage.py migrate` then 
* `python3 manage.py dumpdata --exclude auth.permission --exclude contenttypes > db.json` 
