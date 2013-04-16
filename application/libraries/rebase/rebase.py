#!/usr/bin/python

# Rebase
# ========

# Copyright (c) 2013 Chris Zieba
# All rights reserved.

# Redistribution and use in source and binary forms, with or without
# modification, are permitted

# THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
# AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
# IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
# DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE
# FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
# DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
# SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
# CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
# OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
# OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.


from lib import functions
from lib import parse
from config import config

def main ():
	defaults = config.defaults

	# The first step is to get the file from IMDB and store it somewhere on disk
	print "(1 of 2) Downloading from " + defaults['download_url'] + " to location " + defaults['download_location'] + "..."
	functions.download(defaults['download_url'], defaults['download_location'])
	print "Download Complete."

	# The second step is to parse thedownladed inforamtion and insert it into the database
	print "(2 of 2) Inserting data file " + defaults['download_location'] + " to database " + defaults['table_name'] + "..."
	parse.parse(defaults['download_location'], defaults['host'], defaults['dbname'], defaults['user'], defaults['password'], defaults['table_name'], defaults['table_title'], defaults['table_songs'])
	print "Success!"

if __name__ == '__main__':
    main()
