<?php

class Home_Controller extends Base_Controller {

	public function action_index() {
		
		$popular = DB::query("SELECT id, title,count FROM soundtracks WHERE id in (92832,60754,96703,82696,91086,51750,62577,65100,94873,84294,97984,85802)");
		$newest = DB::query("SELECT id, title,count FROM soundtracks WHERE id in (92832,60754,96703,82696,91086,51750,62577,65100,94873,84294,97984,85802)");

		return View::make('home.index', array('popular' => $popular,  'newest' => $newest));
	}

	public function action_titles() {

	    $data = Input::get('q');
	    $limit = Input::get('limit');
		$query = DB::query("SELECT id, title, count FROM soundtracks WHERE title % ? ORDER BY similarity(title, ?) DESC LIMIT ?",  array($data, $data, $limit));

	    return Response::json($query);

	}

	public function action_songs () {

	    $id = Input::get('id');
		$songs = DB::query("SELECT * FROM soundtracks WHERE id = ?",  array($id));

	    return Response::json($songs);

	}
	


}