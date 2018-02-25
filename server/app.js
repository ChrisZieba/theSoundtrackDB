const express = require('express');
const routes = require('./routes');

const app = express();
routes(app);

app.listen(3000, () => console.log('Example app listening on port 3000!'))