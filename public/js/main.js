var main = angular.module('main',['youtube']);

main.run(function ($rootScope) {
	$rootScope.contentLoaded = false;
});

main.config(function($interpolateProvider) {
  $interpolateProvider.startSymbol('{[{');
  $interpolateProvider.endSymbol('}]}');
});

main.config(['$routeProvider', function($routeProvider) {
	$routeProvider.
		when('/soundtracks/:sid', { templateUrl: 'js/partials/playlist.html', controller: 'MainCtrl' }).
		otherwise({ templateUrl: 'js/partials/main.html', controller: 'MainCtrl' });
}]);

main.factory('playlist', function ($http, $q) {
	var promises = [];

	return {
		get: function(songs) {
			var promises = [];

			// go through every song that is part of the soundtrack (these are returned first from the server) and 
			// hit youtube for the video id. Each result is pushed onto the promise array which is returned to the controller.
			for (var i = 0; i < songs.length; i++) {
				// the default query is just the title of the song
				var q = songs[i].title;

				if (songs[i].performed_by != null) {
					q = songs[i].performed_by + '+' + songs[i].title;
				} else if (songs[i].written_by != null) {
					q = songs[i].written_by + '+' + songs[i].title;
				} else if (songs[i].by != null) {
					q = songs[i].by + '+' + songs[i].title;
				}

				promises.push($http({
					method: 'JSONP', 
					url: "https://www.googleapis.com/youtube/v3/search?", 
					params:{
						"q": q,
						"type": "video",
						"order": "relevance",
						"videoCategoryId": "10",
						"alt": "json",
						"part": "id, snippet",
						"key": "AIzaSyCoTxAhFhmOhnRnXEtN5H4FQcbrzHNZyAg",
						"callback": "JSON_CALLBACK"
					} 
				}));
			}

			return $q.all(promises)
		},

		// return an array of the playlist songs,  given an array of responses
		format: function (response) {
			var playlist = [];

			for (var i = 0; i < response.length; i+=1) {
				var items = response[i].data.items;
				var q = response[i].config.params.q;
				var artist, title;

				if (items.length > 0) {
					var id = items[0].id["videoId"];
					var parts = q.split('+', 2);
					// if youtube didn't find a result this will be false

					if (parts.length > 1) {
						title = parts[1];
						artist = parts[0];
					} else {
						title = items[0].snippet.title;
						artist = null;
					}

					// TODO
					var duration = null;
					var link = null;

					playlist.push({
						title: title,
						artist: artist,
						duration: duration,
						progress: 0,
						link: link,
						id: id,
						state: null
					});
				}
			}

			// we want to show the songs that have youtube videos at the top of the array
			playlist.sort(function (a, b) {
				return (a.id === null) ? 1 : -1;
			});

			return playlist;
		}
	};
});

main.controller('MainCtrl', function(playlist, $scope, $rootScope, $http, $location, $routeParams, youtubePlayerApi) {
	$scope.playlist = {
		count: 0,
		show: false,
		loading: false,
		songs: [],
		current: {
			index: null,
			interval: null
		}
	};
	$scope.movies = {
		popular: [],
		count: 0,
		current: {
			title: null,
			input: null
		},
		show: false,
		titles: [],
		poster: {
			url: 'img/none.jpg',
			year: 'N/A'
		}
	};

	$scope.$on("$routeChangeSuccess", function ($currentRoute, $previousRoute ) {
		// stops a song if it is playing
		resetSong();

		if ($routeParams.sid) {
			$scope.run($routeParams.sid);
		}
	});


	var parseMovieTitle = function (query) {
		var stripped = query.replace(/\((.*?)\)/gi, "");
		return stripped;
	};

	var parseMovieYear = function (query) {
		var year = '';
		var matches = query.match(/\((\d{4}.*?)\)/i);

		if (matches && matches.length > 0) {
			// strip out all non-numeric characters
			year = matches[0].replace(/[A-Za-z$-\(\)\{\}\[\]\\\/]/g, "");
		}
		return year;
	};

	var resetSong = function () {
		// stop the player
		youtubePlayerApi.stop();

		// we need to make sure any song playing is reset
		if ($scope.playlist.current.index !== null && typeof $scope.playlist.current.index !== 'undefined') {
			youtubePlayerApi.stop();
			
			if ($scope.playlist.songs[$scope.playlist.current.index]) {
				$scope.playlist.songs[$scope.playlist.current.index].state = null;
				$scope.playlist.songs[$scope.playlist.current.index].progress = 0;
				// this will stop the progress bar on the last playing song
				clearInterval($scope.playlist.current.interval);
			}
		}
	}

	$scope.getPopular = function () {
		$http.get(BASE + '/popular').success(function (data) {
			$scope.movies.popular = data;
		});
	};

	$scope.formatTime = function (seconds) {
		var total_sec = parseInt(seconds, 10);
		var minutes = parseInt( total_sec / 60 ) % 60;
		var seconds = total_sec % 60;
		var result = (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds  < 10 ? "0" + seconds : seconds);

		return result;
	};

	$scope.getMoviesList = function (val) {
		$http.get(BASE + '/titles?q=' + val + '&limit=10').success(function (data) {
			// now we have all our movies and can add them
			$scope.movies.titles = data;

			// if there any movies we can show the list
			if ($scope.movies.titles.length > 0) {
				$scope.movies.show = true;
			} else {
				$scope.movies.show = false;
			}
		});
	};

	$scope.setRoute = function (id) {
		$location.path('/soundtracks/' + id);
	};

	$scope.resetSong = function (id) {
		resetSong();
	};

	$scope.run = function (id) {
		// hide the movies list and the playlist
		$scope.movies.show = false;
		$scope.playlist.show = false;
		$scope.movies.poster = {};

		// this will activate the loader
		$scope.playlist.loading = true;

		$http.get(BASE + '/songs?id=' + id).success(function (data) {
			// now we have all our movies and can add them
			$scope.movies.current.title = data[0].title;

			playlist.get(JSON.parse(data[0].songs)).then(function(response) {
				$scope.playlist.show = true;
				$scope.playlist.songs = playlist.format(response);
				$scope.playlist.loading = false;
			});

			$http({
				method: 'JSONP', 
				url: "http://api.themoviedb.org/3/search/movie", 
				params:{
					"api_key": "bec76ba6cb9f349afe8728693f6de4ba",
					"query": parseMovieTitle(data[0].title),
					"year": parseMovieYear(data[0].title),
					"callback": "JSON_CALLBACK"
				}
			}).success(function (response) {
				// now we have all our movies and can add them
				if (response.results && response.results.length > 0) {
					$scope.movies.poster.url = (response.results[0].poster_path) ? 'http://cf2.imgobject.com/t/p/w185' + response.results[0].poster_path : 'img/none.jpg';
					$scope.movies.poster.year = (response.results[0].release_date) ? response.results[0].release_date : 'N/A';	
				} else {
					$scope.movies.poster.url = 'img/none.jpg';
					$scope.movies.poster.year = 'N/A';	
				}
			});
		});
	};

	// pass the array index of the song
	$scope.play = function (index) {
		var song = $scope.playlist.songs[index];

		// if the current song is already playing, then a click will pause the video
		switch (song.state) {
			case 'play':
				// pause the video
				$scope.playlist.songs[index].state = 'pause';
				youtubePlayerApi.pause();
			break;
			case 'pause':
				// if the current song is paused, then resume it
				$scope.playlist.songs[index].state = 'play';
				youtubePlayerApi.resume();
			break;
			default:
				resetSong();
				// start the youtube video
				youtubePlayerApi.play(song.id);
				// set the current song to playing
				$scope.playlist.songs[index].state = 'play';
				// set the current song in the playlist
				$scope.playlist.current.index = index;
				// start the progress bar, and reload it every second
				$scope.playlist.current.interval = setInterval(function() { 
					$scope.playlist.songs[index].progress = (youtubePlayerApi.getCurrentTime() / youtubePlayerApi.getTotalTime()) * 100;
					$scope.$apply();
				}, 1000);

				$scope.$watch('playlist.songs', function () {}, true);
			break;
		}
	}
});