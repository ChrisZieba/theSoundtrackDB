const Router = require('express-promise-router');

const db = require('../db');

// create a new express-promise-router
// this has the same API as the normal express router except
// it allows you to use async functions as route handlers
const router = new Router();

// export our router to be mounted by the parent application
module.exports = router;



router.get('/search', async (req, res) => {
  const { q } = req.query;
  console.log(q,req.query)
  if (!q) return res.sendStatus(400);

  let result;
  try {
    result = await db.query('SELECT id, title, count FROM soundtracks WHERE title % $1 ORDER BY similarity(title, $1) DESC LIMIT $2', [q, 10]);
  } catch(e) {
    console.log(e);
  }

  if (!result) return res.sendStatus(400);

  return res.send(result.rows);
});

router.get('/popular', async (req, res) => {
  const { q } = req.query;

  let result;
  try {
    result = await db.query('SELECT id, title, count FROM soundtracks WHERE id in (59200,94152,93465,83443,56637,81571,100115,102146,105884,56966,56801,59164,68544.73055,89317,91357,94588,97027,101873,103976,105758,107235)');
  } catch(e) {
    console.log(e);
  }

  return res.send(result.rows);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  let result;
  try {
    result = await db.query('SELECT * FROM soundtracks WHERE id = $1', [id]);
  } catch(e) {
    console.log(e);
  }

  return res.send(result.rows[0]);
});