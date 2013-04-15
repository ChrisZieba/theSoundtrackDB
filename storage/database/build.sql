\c laravel

DROP TABLE IF EXISTS popular;

CREATE TABLE popular
(
    id SERIAL PRIMARY KEY,
    name varchar(55) NOT NULL,
    cite varchar(55),
    description varchar(55),
    img varchar(55),
    songs text
);


INSERT INTO popular (name, cite,description,img, songs) VALUES ('Django Unchained (2012)', '13 songs', 'sdf', 'img/popular/django.jpg', '[{artist: "sdf", title: "whoa", id: "543543"}]');
INSERT INTO popular (name, cite,description,img) VALUES ('Argo (2012)', '12 songs', 'sdf', 'img/popular/argo.jpg');
INSERT INTO popular (name, cite,description,img) VALUES ('Skyfall (2012)', '6 songs', 'sdf', 'img/popular/skyfall.jpg');
INSERT INTO popular (name, cite,description,img) VALUES ('The Hunger Games (2012)', '10 songs', 'sdf', 'img/popular/hunger.jpg');
INSERT INTO popular (name, cite,description,img) VALUES ('The Perks of Being a Wallflower (2012)', '38 songs', 'sdf', 'img/popular/perks.jpg');
INSERT INTO popular (name, cite,description,img) VALUES ('Rock of Ages (2012)', '20 songs', 'sdf', 'img/popular/rock.jpg');
INSERT INTO popular (name, cite,description,img) VALUES ('Moonrise Kingdom (2012)', '12 songs', 'sdf', 'img/popular/moonrise_kingdom.jpg');
INSERT INTO popular (name, cite,description,img) VALUES ('Pitch Perfect (2012)', '38 songs', 'sdf', 'img/popular/pitch_perfect.jpg');
INSERT INTO popular (name, cite,description,img) VALUES ('Project X (2012)', '7 songs', 'sdf', 'img/popular/project_x.jpg');
INSERT INTO popular (name, cite,description,img) VALUES ('The Lord of the Rings: The Two Towers (2002)', '4 songs', 'sdf', 'img/popular/lord.jpg');
INSERT INTO popular (name, cite,description,img) VALUES ('Seeking a Friend for the End of the World (2012)', '18 songs', 'sdf', 'img/popular/seeking_a_friend.jpg');
INSERT INTO popular (name, cite,description,img) VALUES ('The Curious Case of Benjamin Button (2008)', '32 songs', 'sdf', 'img/popular/benjamin.jpg');
INSERT INTO popular (name, cite,description,img) VALUES ('Silver Linings Playbook (2012)', '16 songs', 'sdf', 'img/popular/silver_lining_playbook.jpg');
INSERT INTO popular (name, cite,description,img) VALUES ('Seven Psychopaths (2012)', '9 songs', 'sdf', 'img/popular/seven_p.jpg');




DROP TABLE IF EXISTS classics;

CREATE TABLE classics
(
    id SERIAL PRIMARY KEY,
    name varchar(55) NOT NULL,
    cite varchar(55),
    description varchar(55),
    img varchar(55),
    songs text
);


INSERT INTO classics (name, cite,description,img, songs) VALUES ('Trainspotting (1996)', '18 songs', 'sdf', 'img/classics/trainspotting.jpg', '[{artist: "sdf", title: "whoa", id: "543543"}]');
INSERT INTO classics (name, cite,description,img) VALUES ('American Beauty (1999)', '14 songs', 'sdf', 'img/classics/american.jpg');
INSERT INTO classics (name, cite,description,img) VALUES ('Reservoir Dogs (1992)', '9 songs', 'sdf', 'img/classics/reservoir.jpg');
INSERT INTO classics (name, cite,description,img) VALUES ('Pulp Fiction (1994)', '19 songs', 'sdf', 'img/classics/pulp.jpg');
INSERT INTO classics (name, cite,description,img) VALUES ('Can''t Hardly Wait (1998)', '43 songs', 'sdf', 'img/classics/hardly.jpg');
INSERT INTO classics (name, cite,description,img) VALUES ('Grosse Pointe Blank (1997)', '30 songs', 'sdf', 'img/classics/grosse.jpg');
INSERT INTO classics (name, cite,description,img) VALUES ('The Crow (1994)', '11 songs', 'sdf', 'img/classics/crow.jpg');
INSERT INTO classics (name, cite,description,img) VALUES ('Garden State (2004)', '16 songs', 'sdf', 'img/classics/garden.jpg');
INSERT INTO classics (name, cite,description,img) VALUES ('Cruel Intentions (1999)', '19 songs', 'sdf', 'img/classics/cruel.jpg');
INSERT INTO classics (name, cite,description,img) VALUES ('Empire Records (1995)', '43 songs', 'sdf', 'img/classics/empire.jpg');
INSERT INTO classics (name, cite,description,img) VALUES ('Forrest Gump (1994)', '49 songs', 'sdf', 'img/classics/forest.jpg');
INSERT INTO classics (name, cite,description,img) VALUES ('Hackers (1995)', '17 songs', 'sdf', 'img/classics/hackers.jpg');
INSERT INTO classics (name, cite,description,img) VALUES ('Pump Up the Volume (1990)', '16 songs', 'sdf', 'img/classics/volume.jpg');
INSERT INTO classics (name, cite,description,img) VALUES ('Saturday Night Fever (1977)', '13 songs', 'sdf', 'img/classics/fever.jpg');


DROP TABLE IF EXISTS newest;

CREATE TABLE newest
(
    id SERIAL PRIMARY KEY,
    name varchar(55) NOT NULL,
    cite varchar(55),
    description varchar(55),
    img varchar(55),
    songs text
);


INSERT INTO newest (name, cite,description,img, songs) VALUES ('Gangster Squad (2013)', '8 songs', 'sdf', 'img/new/gangster.jpg', '[{artist: "sdf", title: "whoa", id: "543543"}]');
INSERT INTO newest (name, cite,description,img) VALUES ('The Lion King (1994)', '6 songs', 'sdf', 'img/new/lion.jpg');
INSERT INTO newest (name, cite,description,img) VALUES ('Epic (2013)', '6 songs', 'sdf', 'img/new/epic.jpg');
INSERT INTO newest (name, cite,description,img) VALUES ('Spring Breakers (2012)', '5 songs', 'sdf', 'img/new/spring.jpg');
INSERT INTO newest (name, cite,description,img) VALUES ('G.I. Joe: Retaliation (2013)', '6 songs', 'sdf', 'img/new/joe.jpg');
INSERT INTO newest (name, cite,description,img) VALUES ('A Late Quartet (2012)', '7 songs', 'sdf', 'img/new/quartet.jpg');


-- \c laravel

-- (ENV)zieba:~/Projects/python/util$ psql -U postgres -f /srv/www/laravel/storage/database/build.sql

-- DROP database laravel;

-- CREATE database laravel;


-- CREATE INDEX titles_idx ON soundtracks USING gist (title gist_trgm_ops);