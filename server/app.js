const express = require('express');
const routes = require('./routes');

const app = express();
routes(app);

// if (process.env.NODE_ENV !== 'production') {
//   require('dotenv').load();
// }



app.listen(3000, () => console.log('Example app listening on port 3000!'))