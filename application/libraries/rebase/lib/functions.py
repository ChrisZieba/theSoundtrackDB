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

import sys
import pprint
import re
import json
import urllib2
import gzip
from StringIO import StringIO

# Download the file from the server
# @param download_url {String} The http address where the file loves
# @param download_location {String} This is where we wish to save the new file downloaded from the url
def download (download_url, download_location):
	# read in the download_url's contents
	u = urllib2.urlopen(download_url)
	buf = StringIO(u.read())

	# Read in a gzipped file
	f = gzip.GzipFile(fileobj=buf)
	data = f.read()

	# write the data to disk and close the stream
	w = open(download_location, 'wb')
	w.write(data)
	w.close()

# Remove the hash from the begining of a string
def cleanMovieTitle (text):
	return text.split("#",1)[1].strip()

# Will extract the movie or tv title from a string
def getSongTitle (text):      
	pattern = r'\"(.+?)\"'
	match = re.search(pattern, text)

	if match:
		return match.group().strip('"')
	else:
		return ''

# Removes brackets and other unwanted characters from the title
def stripChars (text):
	pattern = r'\(.+?\)'
	match = re.sub(pattern, '', text)

	return match.strip().replace("'", "")