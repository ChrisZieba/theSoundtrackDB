<!DOCTYPE html>
<html lang="en" ng-app="main">
	<head>
		<meta charset="utf-8">
		<title>TheSoundtrackDB | Search for and listen to music from any movie or TV soundtrack</title>
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<meta name="description" content="Search for and listen to movie soundtracks.">
		<meta name="author" content="Chris Zieba">

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
					<h1><a href="{{ URL::base(); }}">TheSoundtrackDB</a></h1>
					<p>A place to find and listen to movie soundtracks.</p>
				</div>
				<div class="search">
					<form>
						<input type="text" class="input" ng-model="movies.current.input" ng-change="getMoviesList(movies.current.input)" placeholder="start typing to search for a movie or tv show and listen to its soundtrack" autocomplete="off" />
						<div class="results" ng-cloak ng-show="movies.show == true">
							<ul>
								<li ng-repeat="movie in movies.titles" ng-click="movies.current.input = movie.title; setRoute(movie.id);" title="{[{ movie.title }]}"><span class="movie-title">{[{ movie.title }]}</span><span class="movie-count">{[{ movie.count }]} song<span ng-show="movie.count > 1">s</span></span></li>
							</ul>
							<div class="hide" ng-click="movies.show = false">close</div>
						</div>
					</form>
				</div>
			</div>
		  </div>
		</div>

		<div ng-view class="container" ></div> <!-- /container -->
		<div yt id="YTplayer"></div>

		<!-- Le javascript
		================================================== -->
		<script src="//ajax.googleapis.com/ajax/libs/angularjs/1.0.7/angular.min.js"></script>
		<script src="{{ asset('js/echo.min.js') }}"></script>
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
				document.write("<sc"+"ript type='text/javascript' src='" + scJsHost + "statcounter.com/counter/counter_xhtml.js'></"+"script>");
				//}}>
			</script>
		@endif



	</body>
</html>
