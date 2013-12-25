#!/usr/bin/python

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

import psycopg2
import sys
import pprint
import re
import json
from lib import functions

# Parses the information given in the text file that was saved
# @param download_location {String} This is where we wish to save the new file downloaded from the url
# @param host {String} The host for the database
# @param dbname {String} The database name
# @param user {String} The database user
# @param password {String} This is where we wish to save the new file downloaded from the url
# @param table_name {String} This is where we wish to save the new file downloaded from the url
# @param table_title {String} This is where we wish to save the new file downloaded from the url
# @param table_songs {String} This is where we wish to save the new file downloaded from the url
def parse (download_location, host, dbname, user, password, table_name, table_title, table_songs):
	conn_string = "host='" + host + "' dbname='" + dbname + "' user='" + user + "' password='" + password + "'"
	# print the connection string we will use to connect
	print "Connecting to database\n	->%s" % (conn_string)
 
	# get a connection, if a connect cannot be made an exception will be raised here
	con = psycopg2.connect(conn_string)
 	cur = con.cursor()  
	cur.execute("DROP TABLE IF EXISTS " + table_name)
	cur.execute("CREATE TABLE " + table_name + "(id SERIAL PRIMARY KEY, " + table_title + " text NOT NULL, " + table_songs + " text, count smallint)")

	# initialize an empty array to hold the songs for a movie title
	songs = []
	movie_title = ''
	song_title = ''
	song_performed_by = ''
	song_written_by = ''
	by = ''

	with open(download_location) as infile:
		for line in infile:
			line = line.decode('latin-1').encode('utf8')

			if line[0] == '#' :
				movie_title = functions.cleanMovieTitle(line.rstrip())
			# A dash means we are at a song title
			elif line[0] == '-' :
				# every time we encounter a dash we are at a new song so push the old song onto the list
				if song_title:
					s = {
						'title': song_title,
						'performed_by': song_performed_by,
						'written_by': song_written_by,
						'by': song_by
					}
					songs.append(s)

				# now we get the current song title from the line in
				song_title = functions.getSongTitle(line.rstrip())
			elif line[0] == ' ':
				if 'Performed by' in line:
					song_performed_by = functions.stripChars(line.split("Performed by",1)[1]) 
				if 'Written by' in line:
					song_written_by = functions.stripChars(line.split("Written by",1)[1])
				if line[1] == ' ' and line[2] == 'B' and line[3] == 'y':
					song_by = functions.stripChars(line[4:])
			else :
				# if we get here we hit a new line which signals a new movie or tv show
				if song_title:
					s = {
						'title': song_title,
						'performed_by': song_performed_by,
						'written_by': song_written_by,
						'by': song_by
					}
					songs.append(s)

				print movie_title
				pprint.pprint(json.dumps(songs))

				if movie_title:
					cur.execute("INSERT INTO " + table_name + " (" + table_title + ", " + table_songs + ", count) VALUES (%s, %s, %s)", (movie_title, json.dumps(songs), len(songs)))
					con.commit()

				# reset
				songs = []
				movie_title = None
				song_title = None
				song_performed_by = None
				song_written_by = None
				song_by = None

		if con:
			# add an index on the text colum to speed up seaerch
			# cur.execute("CREATE INDEX titles_idx ON " + table_name + " USING gist (" + table_title + " gist_trgm_ops);")
			con.close()
			
if __name__ == "__main__":
	parse()