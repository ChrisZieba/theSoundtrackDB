<!DOCTYPE html>
<html lang="en" ng-app="main">
  <head>
	<meta charset="utf-8">
	<title>theSoundtrackDB | Search for and listen to music from any movie or tv show</title>
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta name="description" content="">
	<meta name="author" content="">

	<!-- Le styles -->
	<link href="{{ asset('css/bootstrap.css') }}" rel="stylesheet">
	
	<link href="{{ asset('css/main.css') }}" rel="stylesheet">

	<!-- HTML5 shim, for IE6-8 support of HTML5 elements -->
	<!--[if lt IE 9]>
	  <script src="../assets/js/html5shiv.js"></script>
	<![endif]-->

	<!-- Fav and touch icons -->
	<link rel="apple-touch-icon-precomposed" sizes="144x144" href="../assets/ico/apple-touch-icon-144-precomposed.png">
	<link rel="apple-touch-icon-precomposed" sizes="114x114" href="../assets/ico/apple-touch-icon-114-precomposed.png">
	<link rel="apple-touch-icon-precomposed" sizes="72x72" href="../assets/ico/apple-touch-icon-72-precomposed.png">
	<link rel="apple-touch-icon-precomposed" href="../assets/ico/apple-touch-icon-57-precomposed.png">
	<link rel="shortcut icon" href="../assets/ico/favicon.png">

	<style>
		body {
			padding-top:225px;
		}
	</style>

	<link href="{{ asset('css/bootstrap-responsive.css') }}" rel="stylesheet">
	<script>var BASE = "<?php echo URL::base(); ?>";</script>
  </head>

  <body ng-controller="MainCtrl">

  	<div class="content-loader" ng-show="!$root.contentLoaded">
		<div class="main-loader">
			<img src="img/main-loader.gif" />
			<p class="loading-soundtrack">Loading ...</p>
		</div>
  	</div>

	<div class="navbar navbar-inverse navbar-fixed-top" ng-cloak ng-show="$root.contentLoaded">
	  <div class="navbar-inner">
		<div class="container">

			<div class="info">
				<h1><a href="{{ URL::base(); }}">theSoundtrackDB</a></h1>
				<p>A place to find and listen to movie and tv soundtracks via IMDB and YouTube.</p>
			</div>

			<div class="search">
				<form>
					<input type="text" class="input" ng-model="movies.current.input" ng-change="getMoviesList(movies.current.input)" placeholder="start typing to search for a movie or tv show and listen to its soundtrack" autocomplete="off" />
					<div class="results" ng-cloak ng-show="movies.show == true">
						
						<ul>
							<li ng-repeat="movie in movies.titles" ng-click="movies.current.input = movie.title; run(movie.id);" title="{[{ movie.title }]}"><span class="movie-title">{[{ movie.title }]}</span><span class="movie-count">{[{ movie.count }]} song<span ng-show="movie.count > 1">s</span></span></li>
						</ul>
						<div class="hide" ng-click="movies.show = false">close</div>
					</div>
				</form>
			</div>

		</div>
	  </div>
	</div>

	<div class="container" ng-cloak ng-show="$root.contentLoaded">

		<div class="main-loader" ng-cloak ng-show="playlist.loading == true">
			<img src="img/main-loader.gif" />
			<p class="loading-soundtrack">Loading Soundtrack ...</p>
		</div>

		<div ng-show="playlist.show == false && playlist.loading == false">
			<p>theSoundtrackDB is a place to find and listen to most movie and tv soundtracks. All the soundtrack listings are from <a href="http://www.imdb.com/interfaces">The Plain Text Data Files</a> via <a href="http://www.imdb.com/"><strong>IMDB</strong></a>, and the music is provided couretsy of <strong>YouTube</strong>. All images of movie posters are provided by <a href="http://www.themoviedb.org/"><strong>themoviedb</strong></a>. This project is for personal and non-commercial use, and was developed by Chris Zieba.</p>
			
			<div class="social">

				<iframe src="https://platform.twitter.com/widgets/tweet_button.html?url=http%3A%2F%2Fthesoundtrackdb.com&amp;via=theSoundtrackDB&amp;text=Search%20for%20and%20listen%20to%20music%20from%20any%20movie%20or%20tv%20show!" allowtransparency="true" frameborder="0" scrolling="no" style="width:90px; height:20px;"></iframe>
				<!--<iframe src="//www.facebook.com/plugins/like.php?href=https%3A%2F%2Fwww.facebook.com%2FTheSoundtrackDB&amp;send=false&amp;layout=button_count&amp;width=450&amp;show_faces=true&amp;font&amp;colorscheme=light&amp;action=like&amp;height=21&amp;appId=632607110098966" scrolling="no" frameborder="0" class="facebook-like-button" allowTransparency="true" style="width:80px; height:20px;"></iframe>-->
				<iframe src="//platform.twitter.com/widgets/follow_button.html?screen_name=theSoundtrackDB&show_count=true&show_screen_name=false" allowtransparency="true" frameborder="0" scrolling="no"  style="width: 140px; height:20px;"></iframe>

			</div>

			<br/>

			<h2 class="line">Newest</h2>

			<ul class="movies-list">
				@foreach ($newest as $new_itm)
					
					<li ng-click="run({{ $new_itm->id }})" title="{{ $new_itm->title }}">
						<img src="img/posters/{{ $new_itm->id }}.jpg" width="185" height="278" />

						<div class="movies-info">
							<h2>{{ $new_itm->title }}</h2>
							<cite>{{ $new_itm->count }} songs</cite>
						</div>
					</li>

				@endforeach	

			</ul>

			<div class="clear"></div>


			<h2 class="line">Popular</h2>

			<ul class="movies-list">
				@foreach ($popular as $pop_itm)
					
					<li ng-click="run({{ $pop_itm->id }})" title="{{ $new_itm->title }}">
						<img src="img/posters/{{ $pop_itm->id }}.jpg" width="185" height="278" />

						<div class="movies-info">
							<h2>{{ $pop_itm->title }}</h2>
							<cite>{{ $pop_itm->count }} songs</cite>
						</div>
					</li>

				@endforeach	
			</ul>
		</div>

		<div class="playlist" ng-cloak ng-show="playlist.show == true">


			<div class="movie">

				<div class="cover">
					<img src="{[{ movies.poster.url }]}" width="70" />
				</div>

				<div class="title">
					<h2>{[{ movies.current.title }]}</h2>
					<div class="release-year"><strong>Released: </strong>{[{ movies.poster.year }]}</div>
					<div class="song-count">{[{ playlist.songs.length }]} songs</div>
				</div>
			</div>

			


			<div class="songs">

				<div class="song" ng-repeat="song in playlist.songs">
					<div ng-show="song.id != null" class="play" ng-click="play($index)" ng-class="{ controlplay: song.state == 'play', controlpause: song.state == 'pause'}"></div>
					<div ng-show="song.id == null" class="nullplay"></div>
					
					<div class="data">

						<div class="title">
							<div class="description">
								<span ng-class="{ songtitle: song.id != null, nullsongtitle: song.id == null}"><strong>{[{ song.title }]}</strong></span> 
								<span ng-show="song.artist != null">
									<span ng-class="{ by: song.id != null, nullby: song.id == null}">by</span> 
									<span ng-class="{ songartist: song.id != null, nullsongartist: song.id == null}"><strong>{[{ song.artist }]}</strong></span>
								</span>

								<div ng-show="song.id != null" class="actions">
									<a href="{[{ song.link }]}" target="_blank" title="Watch on YouTube"><span class="open-youtube">&nbsp;</span></a>
								</div>
							</div>

						</div>

						<div ng-show="song.progress != null" class="progress">
							<div ng-show="(song.state == 'play' || song.state == 'pause') && song.progress != 0" class="elapsed" ng-style="{ 'width': song.progress + '%', 'width': '-moz-calc(' + song.progress + '% - 2px)', 'width': '-webkit-calc(' + song.progress + '% - 2px)', 'width': 'calc(' + song.progress + '% - 2px)' }"></div>
							<div ng-show="song.state == 'play' && song.progress == 0" class="loading-bar"><span></span></div>
						</div>

						<div ng-show="song.progress == null" class="nullprogress">
							<span>YouTube did not return any results for this query</span>
						</div>

						<div ng-show="song.duration != null" class="time">{[{ formatTime(song.duration) }]}</div>
						

					</div>

					<div class="clear"></div>

				</div>
				<div ng-show="playlist.songs.length == 0">Sorry, but YouTube did not produce any results for this soundtrack!</div>

			</div>
		</div>

		

	</div> <!-- /container -->

	<div yt id="YTplayer"></div>

	<!-- Le javascript
	================================================== -->
	<script src="//ajax.googleapis.com/ajax/libs/angularjs/1.0.7/angular.min.js"></script>
	<script src="{{ asset('js/youtube.js') }}"></script>
	<script src="{{ asset('js/main.js') }}"></script>

	@if ( Request::env() != 'local')
		<script type="text/javascript">
			//<![CDATA[
			var sc_project=8856672; 
			var sc_invisible=1; 
			var sc_security="c132d7c9"; 
			var scJsHost = (("https:" == document.location.protocol) ?
			"https://secure." : "http://www.");
			document.write("<sc"+"ript type='text/javascript' src='" +
			scJsHost+
			"statcounter.com/counter/counter_xhtml.js'></"+"script>");
			//}}>
		</script>
	@endif



  </body>
</html>
