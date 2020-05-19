# DataExpert
Data Analytics E-Learning Website.

To run locally, make sure you have:
* A local postgres database set up with the database name = dataexpert.

To load data from a JSON file, db.json, into the database tables: 
* `python3 manage.py loaddata db.json`

To export the data from the db a JSON file, db.json:
* `python3 manage.py migrate` then 
* `python3 manage.py dumpdata --exclude auth.permission --exclude contenttypes > db.json` 
