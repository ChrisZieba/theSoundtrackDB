<?php

class Home_Controller extends Base_Controller {

	public function action_index() {
		
		return View::make('home.index');
	}

	public function action_popular() {


		$popular = DB::query("SELECT id, title,count FROM soundtracks WHERE id in (52638,61707,63540,66080,83796,86927,99193,96052,89300,97777,81813,96132,96685,50373,94439,85413,92248,94004,50528,82344)");

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