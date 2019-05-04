'use strict';
const express = require('express');
const serverless = require('serverless-http');
const app = express();
const bodyParser = require('body-parser');

const Cors = require( 'cors' );
const Axios = require( 'axios' );

const router = express.Router();

router.get('/', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write('<h1>Hello from Express.js!</h1>');
  res.end();
});
router.get('/another', (req, res) => res.json({ route: req.originalUrl }));
router.post('/', (req, res) => res.json({ postBody: req.body }));

// For working with authorization code OAuth 2 with frontend JS
router.post( '/auth-code', ( req, res ) => {
  Axios.post( req.body.url )
    .then( response => {
      res.json( { status: response.status, ...response.data } ) 
    } )
    .catch( ( error ) => {
        if ( error.response ) {
            // The request was made and the server responded with a status code that falls out of the range of 2xx
            res.json( { 
              if: 'response', 
              status: error.response.status, 
              msg: error.message, 
              headers: error.response.headers, 
              data: error.response.data 
            } );
        } else if ( error.request ) {
            // The request was made but no response was received
            // error.request is instance of XMLHttpRequest in browser, instance of http.ClientRequest in node.js
            res.json( { if: 'request', req: error.request } );
        } else {
            // Something happened in setting up the request that triggered an Error
            res.json( { if: 'else', msg: error.message } );
        }
        console.log( error.config );
      } );
} );

const statushero_initial = ( req ) => {
  const base_api_url = 'https://service.statushero.com/api/v1/';

  const wildcard_path = req.params[ 0 ];  

  let query = '';
  if ( Object.keys( req.query ).length !== 0 ) {
    query = '?';
    Object.entries( req.query ).forEach( ( [ key, val ] ) => {
      query += `${ key }=${ val }`;
    } );
  };

  const fullUrl = `${ base_api_url }${ wildcard_path }${ query }`;

  const headers = {};
  headers[ 'X-TEAM-ID' ] = req.headers[ 'x-team-id' ];
  headers[ 'X-API-KEY' ] = req.headers[ 'x-api-key' ];
  if ( req.headers.hasOwnProperty( 'content-type' ) ) {
    headers[ 'CONTENT-TYPE' ] = req.headers[ 'content-type' ];
  }
  console.log( 'headers', headers );

  return { fullUrl, headers };
}

// Pass through for Status Hero API GET requests
router.get( '/statushero/v1/*', ( req, res ) => {
  const { fullUrl, headers } = statushero_initial( req );

  Axios.get(
    fullUrl, 
    { headers }, 
  ).then( response => {
      res.json( { status: response.status, ...response.data } ) 
    } )
    .catch( ( error ) => {
        if ( error.response ) {
            // The request was made and the server responded with a status code that falls out of the range of 2xx
            res.json( { 
              if: 'response', 
              status: error.response.status, 
              msg: error.message, 
              headers: error.response.headers, 
              data: error.response.data 
            } );
        } else if ( error.request ) {
            // The request was made but no response was received
            // error.request is instance of XMLHttpRequest in browser, instance of http.ClientRequest in node.js
            res.json( { if: 'request', req: error.request } );
        } else {
            // Something happened in setting up the request that triggered an Error
            res.json( { if: 'else', msg: error.message } );
        }
        console.log( error.config );
      } );
} );

// Pass through for Status Hero API POST requests
router.post( '/statushero/v1/*', ( req, res ) => {
  const { fullUrl, headers } = statushero_initial( req );
  
  Axios.post( 
    fullUrl, 
    req.body, 
    { headers }, 
    ).then( response => {
      res.json( { status: response.status, ...response.data } ) 
    } )
    .catch( ( error ) => {
        if ( error.response ) {
            // The request was made and the server responded with a status code that falls out of the range of 2xx
            res.json( { 
              if: 'response', 
              status: error.response.status, 
              msg: error.message, 
              headers: error.response.headers, 
              data: error.response.data 
            } );
        } else if (error.request) {
            // The request was made but no slresponse was received
            // error.request is instance of XMLHttpRequest in browser, instance of http.ClientRequest in node.js
            res.json( { if: 'request', req: error.request } );
        } else {
            // Something happened in setting up the request that triggered an Error
            res.json( { if: 'else', msg: error.message } );
        }
        console.log( error.config );
      } );
} );

app.use( Cors() );
app.use(bodyParser.json());
app.use('/.netlify/functions/server', router);  // path must route to lambda

module.exports = app;
module.exports.handler = serverless(app);
