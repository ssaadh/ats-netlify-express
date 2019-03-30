'use strict';

const app = require('./express/server');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const port = ( process.env.NODE_ENV == 'development' ) ? 8000 : 3000;

app.listen(port, () => console.log(`Local app listening on port ${ port }!`));
