Rebase
======

Rebase is a quick way to download and extract data from text files, and import them into your own database. The formats used in the text files are not standard delimited, and thus are parsed first according to configurartion settings, and imported into your databse table.

Packages Needed
---------------

- psycopg2 (As of right now only Postgres is supported)


Usage
-----
Set your local configuration variables in config.py and then run

	$ python rebase.py