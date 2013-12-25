defaults = {}

# file settings
defaults['download_url'] = "ftp://ftp.sunet.se/pub/tv+movies/imdb/soundtracks.list.gz"
defaults['download_location'] = "/tmp/soundtracks.list.txt"

# database settings
defaults['host'] = "localhost"
defaults['dbname'] = "thesoundtrackdb"
defaults['user'] = "postgres"
defaults['password'] = ""
defaults['table_name'] = "soundtracks"

# this is the field ID of the movie title 
defaults['table_title'] = "title"
# this is the field ID that will hold the 
defaults['table_songs'] = "songs"
