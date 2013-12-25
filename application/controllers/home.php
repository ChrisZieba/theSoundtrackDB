<?php

class Home_Controller extends Base_Controller {

	public function action_index() {
		return View::make('home.index');
	}

	public function action_popular() {
		$popular = DB::query("SELECT id, title,count FROM soundtracks WHERE id in (59200,94152,93465,83443,56637,81571,100115,102146,105884,56966,56801,59164,68544.73055,89317,91357,94588,97027,101873,103976,105758,107235)");
	    return Response::json($popular);

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