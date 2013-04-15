<?php

class Home_Controller extends Base_Controller {

	/*
	|--------------------------------------------------------------------------
	| The Default Controller
	|--------------------------------------------------------------------------
	|
	| Instead of using RESTful routes and anonymous functions, you might wish
	| to use controllers to organize your application API. You'll love them.
	|
	| This controller responds to URIs beginning with "home", and it also
	| serves as the default controller for the application, meaning it
	| handles requests to the root of the application.
	|
	| You can respond to GET requests to "/home/profile" like so:
	|
	|		public function action_profile()
	|		{
	|			return "This is your profile!";
	|		}
	|
	| Any extra segments are passed to the method as parameters:
	|
	|		public function action_profile($id)
	|		{
	|			return "This is the profile for user {$id}.";
	|		}
	|
	*/

	public function action_index()
	{

		//$soundtracks = Soundtrack::find(1000);

		//$users = DB::query("select * from ( SELECT soundtracks.id, ts_rank_cd(to_tsvector('english', soundtracks.title), to_tsquery('django')) AS score FROM soundtracks) s WHERE score > 0 ORDER BY score DESC");
		//$users = DB::query("SELECT * FROM soundtracks WHERE title @@ to_tsquery('2007')");

		
		$popular = Popular::order_by('name', 'asc')->take(25)->get();
		$classics = Classics::order_by('name', 'asc')->take(25)->get();
		$newest = Newest::order_by('name', 'asc')->take(25)->get();

		return View::make('home.index', array('popular' => $popular, 'classics' => $classics, 'newest' => $newest));
	}

	public function action_search()
	{
		if (Request::ajax()) {
		    // our data array, soon to be JSON


		    $data = Input::get('data');
		    $limit = Input::get('limit');

		    //$query = "SELECT title, songs, similarity(title, " + $query + ") AS similarity FROM soundtracks WHERE title % '" + $query + "' ORDER BY similarity DESC";

		    //$soundtracks = DB::query($query);

			//$query = DB::query("SELECT id, title, songs FROM soundtracks WHERE title % ? ORDER BY similarity(title, ?) DESC LIMIT 10",  array($data, $data));


			$query = DB::query("SELECT id, title, songs FROM soundtracks WHERE title % ? ORDER BY similarity(title, ?) DESC LIMIT ?",  array($data, $data, $limit));


		    return Response::json($query);
		}
	}


}