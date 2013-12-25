var youtube = angular.module('youtube',['ng']);

youtube.run(function () {
	var tag = document.createElement('script');
	tag.src = "//www.youtube.com/iframe_api";
	var firstScriptTag = document.getElementsByTagName('script')[0];
	firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
});


youtube.service('youtubePlayerApi', ['$window', '$rootScope', '$log', function ($window, $rootScope) {
	var service = $rootScope.$new(true);

	// Youtube callback when API is ready
	$window.onYouTubeIframeAPIReady = function () {
		service.ready = true;
		service.loadPlayer();
	};

	service.ready = false;
	service.playerId = null;
	service.player = null;
	service.videoId = '';
	service.playerHeight = '390';
	service.playerWidth = '640';
	service.playerVars = {
		'wmode': 'opaque',
		'rel': 0,
		'showinfo': 1,
		'controls': 2
	};

	// set these from the main controller
	service.events = {
		'onReady': function () {
			$rootScope.contentLoaded = true;
			$rootScope.$apply();
		},
		'onStateChange': function () {
			// some action
		}
	};

	service.bindVideoPlayer = function (elementId) {
		service.playerId = elementId;
	};

	service.createPlayer = function () {
		return new YT.Player(this.playerId, {
			height: this.playerHeight,
			width: this.playerWidth,
			videoId: this.videoId,
			playerVars: this.playerVars,
			events: this.events
		});
	};

	service.loadPlayer = function () {
		// API ready?
		if (this.ready && this.playerId) {
			if(this.player) {
				this.player.destroy();
			}
			this.player = this.createPlayer();
		}
	};

	service.play = function (id) {
		if (this.player) {
			this.player.loadVideoById(id);
		}
	};

	service.pause = function (id) {
		if (this.player) {
			this.player.pauseVideo();
		}
	};

	service.stop = function (id) {
		if (this.player) {
			this.player.stopVideo();
		}
	};

	service.resume = function (id) {
		if (this.player) {
			this.player.playVideo();
		}
	};

	service.getTotalTime = function () {
		return this.player.getDuration();
	};

	service.getCurrentTime = function () {
		return this.player.getCurrentTime();
	};

	return service;
}]);


youtube.directive('yt', ['youtubePlayerApi', function (youtubePlayerApi) {
	return {
		restrict:'A',
		link:function (scope, element) {
			youtubePlayerApi.bindVideoPlayer(element[0].id);
			youtubePlayerApi.loadPlayer();
		}
	};
}]);