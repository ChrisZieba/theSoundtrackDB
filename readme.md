# TheSoundtrackDB

[TheSoundtrackDB](http://thesoundtrackdb.com) is a place to find and listen to most movie and tv soundtracks. All the soundtrack listings are from the [plain text data files](http://www.imdb.com/interfaces) via [IMDB](http://www.imdb.com), and the music is provided courtesy of [YouTube](http://www.youtube.com). [Laravel](http://wwwlaravel.com) is used as the server side framework and [AngularJS](http://angularjs.org/) is used as the client side framework.

Installation
------------

1. Make sure you have your postgres database initialized
2. To get the database records from IMDB you can use [Rebase](https://github.com/ChrisZieba/Rebase)
3. `git clone https://github.com/ChrisZieba/theSoundtrackDB.git`
4. Point yout webserver to `public/`

Datavase

thesoundtrackdb=> CREATE EXTENSION pg_trgm;
thesoundtrackdb=> CREATE INDEX soundtracks_title_idx ON soundtracks USING GIN(title gin_trgm_ops);

License
-------

The MIT License (MIT)

Copyright (c) 2013, Chris Zieba <zieba.chris@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
