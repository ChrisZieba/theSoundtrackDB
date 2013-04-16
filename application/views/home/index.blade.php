<!doctype html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<title>theSoundtrackDB | Search for and listen to music from any movie or tv show</title>
	<meta name="viewport" content="width=device-width">
 	<script type="text/javascript">var BASE = "<?php echo URL::base(); ?>";</script>

	{{ HTML::script('http://code.jquery.com/jquery-1.9.1.min.js') }}
	
	{{ HTML::script('js/base.js') }}
	{{ HTML::script('js/bxslider/jquery.bxslider.min.js') }}
	{{ HTML::script('js/search.js') }}
	{{ HTML::script('js/spin.min.js') }}

	{{ HTML::style('css/base.css') }}

</head>
<body>
	<div id="fb-root"></div>
	<script>(function(d, s, id) {
	  var js, fjs = d.getElementsByTagName(s)[0];
	  if (d.getElementById(id)) return;
	  js = d.createElement(s); js.id = id;
	  js.src = "//connect.facebook.net/en_US/all.js#xfbml=1&appId=632607110098966";
	  fjs.parentNode.insertBefore(js, fjs);
	}(document, 'script', 'facebook-jssdk'));</script>


	<div class="container">

		<div class="header">
			<div class="center">


				<!--<div class="logo"><a href=""><img src="img/logo.png" /></a></div>-->
				<form class="search-box">
					<input type="text" id="pgSearch" class="input noEnterSubmit" placeholder="search for a movie or tv show to find and listen to its soundtrack" autocomplete="off" />
					<div class="input-results"></div>
				</form>
			</div>
		</div>



		<div class="content center">

			<div id="spinner"></div>

			<div class="results">
				<!--<div class="main-actions">
					<ul>
						<li data-main-action="home" class="home">&nbsp;</li>
					</ul>
				</div>

				<div class="clear"></div>-->

				<div id="movie-data"></div>

				<div class="song-data">
					<h2 id="movie-title"></h2>

					<div class="social">
						<ul>
							<li data-main-action="home" class="home">&nbsp;</li>
							<li class="twitter">&nbsp;</li>
							<li class="facebook">&nbsp;</li>
							<li class="gmail">&nbsp;</li>
						</ul>
					</div>

					<div id="songs-list"></div>
				</div>
				
			</div>

			<div class="area-54">
				<div id="spinner"></div>


					<div id="player"></div>
					<div id="playlist"></div>

			

			</div>

			<div class="static">


				<div class="info-section">
					<h1>What is theSoundtrackDB?</h1>

					<p>SoundtrackDB is a place to find and listen to most movie and tv soundtracks. All the soundtrack listings are from <a href="">The Plain Text Data Files</a> via <a href>IMDB</a>, and the music is provided couretsy of <strong>YouTube</strong>. All images of movie posters are provided by themoviedb. Since the music is coming from YouTube not every song will be available.</p>
					

					<div class="clear"></div>


					<div class="social-set">

						<iframe src="https://platform.twitter.com/widgets/tweet_button.html?url=http%3A%2F%2Fthesoundtrackdb.com&amp;via=theSoundtrackDB&amp;text=Search%20for%20and%20listen%20to%20music%20from%20any%20movie%20or%20tv%20show!" allowtransparency="true" frameborder="0" scrolling="no" style="width:80px; height:20px;"></iframe>
						<iframe src="//www.facebook.com/plugins/like.php?href=https%3A%2F%2Fwww.facebook.com%2FTheSoundtrackDB&amp;send=false&amp;layout=button_count&amp;width=450&amp;show_faces=true&amp;font&amp;colorscheme=light&amp;action=like&amp;height=21&amp;appId=632607110098966" scrolling="no" frameborder="0" class="facebook-like-button" allowTransparency="true" style="width:80px; height:20px;"></iframe>
						<iframe src="//platform.twitter.com/widgets/follow_button.html?screen_name=theSoundtrackDB&show_count=false" allowtransparency="true" frameborder="0" scrolling="no"  style="width:200px; height:20px;"></iframe>
				
					</div>
				</div>


				<div class="clear"></div>

				<div class="newest">

					<div class="text">
						
						<h3>Newest</h3>

					</div>

					<div class="clear"></div>

					<ul class="bxslider">
						@foreach ($newest as $new_itm)
							
							<li data-movie-title="{{ $new_itm->name }}">
								<img src="{{ $new_itm->img }}" width="185" height="278" />

								<div class="info">
									<h2>{{ $new_itm->name }}</h2>
									<cite>{{ $new_itm->cite }}</cite>
								</div>
							</li>

						@endforeach	


					</ul>

					<div class="fader">&nbsp;</div>
				</div>

				<div class="clear"></div>

				<div class="popular">

					<div class="text">
						
						<h3>Popular</h3>

					</div>

					<div class="clear"></div>

					<ul class="bxslider">
						@foreach ($popular as $pop_itm)
							
							<li data-movie-title="{{ $pop_itm->name }}">
								<img src="{{ $pop_itm->img }}" width="185" height="278" />

								<div class="info">
									<h2>{{ $pop_itm->name }}</h2>
									<cite>{{ $pop_itm->cite }}</cite>
								</div>
							</li>

						@endforeach	


					</ul>

					<div class="fader">&nbsp;</div>
				</div>

				<div class="clear"></div>


				<div class="classics">

					<div class="text">
						
						<h3>Classics</h3>

					</div>

					<div class="clear"></div>

					<ul class="bxslider">
						@foreach ($classics as $classic_itm)
							
							<li data-movie-title="{{ $classic_itm->name }}">
								<img src="{{ $classic_itm->img }}" width="185" height="278" />

								<div class="info">
									<h2>{{ $classic_itm->name }}</h2>
									<cite>{{ $classic_itm->cite }}</cite>
								</div>
							</li>

						@endforeach	


					</ul>

					<div class="fader">&nbsp;</div>
				</div>

			</div>


		</div>


	</div><!--container-->


	<script>

		var player, tag, first_script_tag, spinner, width;
			
		tag = document.createElement('script');
		tag.src = "//www.youtube.com/iframe_api";
		first_script_tag = document.getElementsByTagName('script')[0];
		first_script_tag.parentNode.insertBefore(tag, first_script_tag);
		

		spinner = new Spinner({
			lines: 20, // The number of lines to draw
			length: 40, // The length of each line
			width: 19, // The line thickness
			radius: 60, // The radius of the inner circle
			corners: 1, // Corner roundness (0..1)
			rotate: 90, // The rotation offset
			color: '#000', // #rgb or #rrggbb
			speed: 1.1, // Rounds per second
			trail: 100, // Afterglow percentage
			shadow: false, // Whether to render a shadow
			hwaccel: false, // Whether to use hardware acceleration
			className: 'spinner', // The CSS class to assign to the spinner
			zIndex: 2e9, // The z-index (defaults to 2000000000)
			top: '1', // Top position relative to parent in px
			left: '1' // Left position relative to parent in px
		});

		
		function onYouTubeIframeAPIReady () {
			player = new YT.Player('player', {
				height: '279',
				width: '372',
				videoId: '',
				playerVars: { 
					'wmode': 'opaque',
					'rel': 0,
					'showinfo': 1,
					'controls': 2
				},
				events: {
					'onReady': function () {
						yplayer.init();
					},
					'onStateChange': function (event) {

						//yplayer.setPageTitle(event.data);

						if (event.data == YT.PlayerState.ENDED) {
							yplayer.stop();
						} 
					}
				}
			});
		}





	</script>

</body>
</html>
