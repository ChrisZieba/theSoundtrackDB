var fn = {
	buildPlaylist: function (res) {

		var str = [],
			songs = []; // Keep track of titles so we dont add any duplicates to the playlist
			playlist = [];


		if (!res) return; 


		// order the song titles alphabetically
		res = this.sortPlaylist(res);

		for (var i = 0; i < res.length; i+=1) {

			var id = res[i].id;

			// checks if any duplicates were added in the playlist 
			if ($.inArray(res[i].title, songs) < 0 && $.inArray(id, playlist) < 0) {

				str.push('<div class="plist-itm">');
					str.push('<div data-video-id="' + id + '" class="play"></div>');
					str.push('<div class="data">');
						str.push('<div class="title">');
							str.push('<div class="full-title">');
								str.push('<span class="song">' + res[i].title + '</span> ');
								str.push('<span class="by">by</span> ');
								str.push('<span class="artist">' + res[i].artist + '</span>');

								str.push('<div class="actions">');
									str.push('<a href="' + res[i].link + '" target="_blank" title="Watch on YouTube"><span class="open-youtube">&nbsp;</span></a>');
								str.push('</div>');
							str.push('</div>');


						str.push('</div>');

						str.push('<div class="progress"><div class="elapsed"></div></div>');
						//str.push('<span class="actions"><a href="' + res[i].link + '" target="_blank" title="Watch on YouTube"><span class="open-youtube">&nbsp;</span></a></span>');
						str.push('<div class="time"><span class="elapsed-time" class="time-lks">' + this.formatTime(res[i].duration) + '</span></div>');

					str.push('</div>');
				str.push('</div>');
				songs.push(res[i].title);
				playlist.push(id);

			}

		}
		$('#songs-list').html(str.join(''));
		spinner.stop();
		$('.results').show();


	},

	formatTime: function (seconds) {

		var total_sec = parseInt(seconds, 10);
		var minutes = parseInt( total_sec / 60 ) % 60;
		var seconds = total_sec % 60;

		var result = (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds  < 10 ? "0" + seconds : seconds);

		return result;

	},

	// sorts the titles 
	// playlist is an array of objects with title property we are sorting
	sortPlaylist: function (playlist) {

		playlist.sort(function (a, b) {
			return (a.title < b.title) ? -1 : 1;
		});

		return playlist;

	},

	seek: function (id) {

		// clear the interval for the playing song
		clearInterval($('body').data('interval_id'));


		var interval_id = setInterval(function() { 


			// check if the song is playing
			if (yplayer.isPlaying()) {

				// update the progress bar for the song
				var width = (yplayer.getCurrentTime() / yplayer.getTotalTime()) * 100;
				$("#songs-list").find(".play[data-video-id='" + id + "']").next('.data').find('.elapsed').css('width', width + '%');

				// update the time left in the song
				//$("#songs-list").find(".play[data-video-id='" + id + "']").next('.data').find('.elapsed-time').html(fn.formatTime(Math.round(yplayer.getTotalTime() - yplayer.getCurrentTime())) );
			}



		}, 1000);
		
		$('body').data('interval_id', interval_id);
	},

	// takes "Van Wilder (2003)" and gives back "Van Wilder"
	parseMovieTitle: function (query) {

		var stripped = query.replace(/\((.*?)\)/gi, "");
		return stripped;
	},

	// takes "Van Wilder (2003) (V)" and gives back "2003"
	parseMovieYear: function (query) {

		var year = '';
		var matches = query.match(/\((\d{4}.*?)\)/i);

		if (matches && matches.length > 0) {
			// strip out all non-numeric characters
			year = matches[0].replace(/[A-Za-z$-\(\)\{\}\[\]\\\/]/g, "");
		}

		console.log(year);
		return year;
	},

	getMovieData: function (title) {

		var url = "http://api.themoviedb.org/3/search/movie?api_key=bec76ba6cb9f349afe8728693f6de4ba&query=" + encodeURIComponent(this.parseMovieTitle(title)) + "&year=" + encodeURIComponent(this.parseMovieYear(title));

		$.ajax({
			url: url,
			dataType: 'jsonp',
			crossDomain: true,
			//data: params,
			success: function (search_result) {

				var output = [];

				console.log(search_result);

				// there might not be any results from the moviedb
				if (search_result.total_results !== 0) {
					output.push('<img src="http://cf2.imgobject.com/t/p/w154' + search_result.results[0].poster_path + '" />');
					output.push('<div class="">' + search_result.results[0].release_date + '</div>');
					
				} else {
					output.push('<img src="img/none.jpg" />');
					output.push('<div class="">00-00-00</div>');
				}

				$('#movie-data').html(output.join(""));

			}
		});
	},

	clear: function () {
		player.stopVideo();

		clearInterval($('body').data('interval_id'));
		$("#songs-list").find('.elapsed').css('width', '0%');
	}


};


var yplayer = (function($){

	var index = 1,
		results = 15,
		//playlist = [],
		PLAYING = false,
		current = null,
		total = 0, // how many videos are in the playlist
		BLOCKED = false,
		// the default title
		title = document.title;


	return {

		init: function () {

		},

		getPlaylist: function () {
			return playlist;
		},

		setIndex: function (ind) {
			index = ind;
		},

		isPlaying: function () {
			return PLAYING;
		},

		isBlocked: function () {
			return BLOCKED;
		},

		getTotalTime: function () {
			return player.getDuration();
		},

		getCurrentTime: function () {
			return player.getCurrentTime();
		},

		play: function (id) {
			if (player) {

				PLAYING = true;
				current = id;

				// load the video
				player.loadVideoById(id);

			}
			
		},

		pause: function (id) {
			if (player) {

				PLAYING = false;
				current = null;
			}
		},

		stop: function () {
			if (player) {

				PLAYING = false;
				current = null;

				// clear the interval for the playing song
				
				fn.clear();
			}
		}
	}

}(jQuery));


$(document).ready(function () {

	// payload are the results from the database, can be blank
	var onSelect = function (payload, title) {
		var id = $('#pgSearch').data('id');

		var results = (typeof payload !== 'undefined' && payload !== null) ? payload : $('#pgSearch').data('cache');
		var output =[];
		// holds the results for the final playlist that gets displayed
		var plst = [];
		var requests = 0;
		var total = 0;
		var target = document.getElementById('spinner');

		fn.clear();

		//fade out the main container and hide it
		$('.static').fadeOut('fast', function () {

			spinner.spin(target);


			// get the results from the moviedb
			fn.getMovieData(title);



			// loop through the results array until we hit the match
			for (var i = 0; i < results.length; i+=1) {

				// get the id from the clicked item and match it with the results cache
				if (results.length === 1 || results[i].id == id) {

					// parse the songs list (it is a JSON string)
					var songs = JSON.parse(results[i].songs);
					var ytsearch = [];

					// go through each song and build a song list
					for (var j = 0; j < songs.length; j+=1) {
						if (songs[j].performed_by && songs[j].title) {
							output.push("<div>" + songs[j].performed_by + " - " + songs[j].title + "</div>");
							ytsearch.push({
								title: songs[j].title,
								artist: songs[j].performed_by
							})
						}
						
					}

				}

			}




			total = ytsearch.length;

			// if there are no results to show, just show the 404 and return
			if (total === 0) {
				$('#songs-list').html('<p>We\'re sorry but there is no soundtrack data for this selection.</p>');
				$('#movie-title').html(title);
				spinner.stop();
				$('.results').show();

				return;
			}


			// look up the songs on youtube
			for (var k = 0; k < total; k +=1) {


				(function(song) {

					var youtube = "https://gdata.youtube.com/feeds/api/videos?";

					yq = $.param({ 
						"q": song.artist + "+" + song.title, 
						"orderby": "relevance",
						"start-index": "1",
						"max-results": "10",
						"v": "2",
						//"duration": "short",
						"category": "Music",
						"format": "5",
						"fields": "entry",
						"alt": "json-in-script",
						"key": "AI39si4GvSbD8b5YToRoi2iKe_9FpIJS-PwqSlRMTRfVMVh0FcFEP0FBRT8bNGGP8Twl3GmaESWxldETOfvf_4RQX33LgJ3sgA"
					});

					$.ajax({
						url: youtube,
						dataType: 'jsonp',
						crossDomain: true,
						data: yq,
						success: function (search_result) {

							var id, video, duration, link,
								entry = search_result.feed.entry;

							// only push the song onto the plst if youtube gave us result for it
							if (entry && entry.length > 0) {
					//console.log(entry[0]);
								id = entry[0].id["$t"];
								video = id.split(':');
								duration = entry[0]['media$group']['media$content'][0].duration || 0;
								link = entry[0].link[0].href;

								if (id && video.length > 2) {
									plst.push({
										artist: song.artist,
										title: song.title,
										duration: duration,
										link: link,
										id: video[3]
									});
								}

								
							}

						},
						complete: function () {
							requests+=1;

							// if all the requests to youtube are done we can fire the callback
							if (requests === total) {


								// if the array is empty tha no youtube videos were found
								if (plst && plst.length > 0) {

									$('#movie-title').html(title);
									fn.buildPlaylist(plst);

								} else {
									// no songs!
									$('#songs-list').html('<p>We\'re sorry but there is no soundtrack data for this selection.</p>');
									$('#movie-title').html(title);
									spinner.stop();
									$('.results').show();
								}
							}
						}
					});

				})(ytsearch[k]);
			}


			
		});
	};

	$('.bxslider').bxSlider({
		infiniteLoop: false,
		minSlides: 1,
		maxSlides: 6,
		moveSlides: 4,
		slideWidth: 185,
		slideMargin: 15,
		hideControlOnEnd: true,
		pager:false
	});

	$('#pgSearch').pgSearch({
		uri: BASE + '/search',
		results: 'input-results',
		onItemSelect: onSelect,
		cache: true
	});




	$('.bxslider li').click(function() {
		var title = $(this).data('movie-title');


		$.ajax({
			url: BASE + '/search',
			dataType: 'json',
			crossDomain: false,
			data: 'data=' + title + '&limit=1',
			success: function (payload) {
				// the server should respond with an array of items to display in the drop down
				// e.g. ['item 1', 'item2'] once parsed from JSON
				//console.log(payload)
				onSelect(payload, title);
			},
			error: function (xhr, text, error) {
				console.log(text,error);
				// Nothing to be done if a request to youtube comes back with an error
			}
		});

	});

	$('body').on('click', '.plist-itm .play', function () {
		// stop the seeker for any video if its playing

		var video_id = $(this).data('video-id');

		// clear out any played songs and prepare for a new one
		fn.clear();
		yplayer.play(video_id);

		// init the seeker
		fn.seek(video_id);
	});

	$('.social li').click(function() {
		// stop the seeker for any video if its playing

		var action = $(this).data('main-action');

		if (action === "home") {

			yplayer.stop();

			//fade out the main container and hide it
			$('.results').fadeOut('fast', function () {
				$('#songs-list').html('');
				$('#movie-title').html('');
				$('#movie-data').html('');
				$('.static').show();
			});
		}
	});

	$('body').on({
		mouseenter: function() {
			$(this).css('background-position', '-30px 0');
		},
		mouseleave: function() {
			$(this).css('background-position', '0 0');
		}
	},'.plist-itm .play');
	
	$('.noEnterSubmit').keypress(function(e){
		if ( e.which == 13 ) e.preventDefault();
	});

});








