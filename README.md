# DataExpert
Data Analytics E-Learning Website.

To run locally, make sure you have a local postgres database set up with the database name = dataexpert.

To load the data from db.json into this database, run: `python3 manage.py loaddata db.json`

To export the data from the db to the db.json file (which overwrites it):
First, run `python3 manage.py migrate`, then `python3 manage.py dumpdata --exclude auth.permission --exclude contenttypes > db.json` 