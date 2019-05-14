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
      // res.headers( { ...response.headers } );
      res.json( { status: response.status, ...response.data } ) 
    } )
    .catch( ( error ) => {
        if ( error.response ) {
            // The request was made and the server responded with a status code that falls out of the range of 2xx
            res.sendStatus( error.response.status );
            res.headers( { ...error.response.headers } );
            res.json( { 
              if: 'response', 
              msg: error.message, 
              ...error.response.data
            } );
        } else if ( error.request ) {
            // The request was made but no response was received
            // error.request is instance of XMLHttpRequest in browser, instance of http.ClientRequest in node.js
            res.json( { if: 'request', req: error.request } );
        } else {
            // Something happened in setting up the request that triggered an Error
            res.json( { if: 'else', msg: error.message, message: error.message } );
        }
        console.log( error.config );
      } );
} );

// Helper
const assembleUrl = ( baseUrl, wildcardPath, queries ) => {
  // Don't need to include anything like ? if there's no query
  let query = '';
  if ( Object.keys( queries ).length !== 0 ) {
    query = '?';
    Object.entries( queries ).forEach( ( [ key, val ] ) => {
      query += `${ key }=${ val }&`;
    } );
  };
  // Slice off & if it's the last character
  const fullQuery = query.charAt( query.length - 1 ) == '&' ? query.slice( 0, -1 ) : query;
  
  return `${ baseUrl }${ wildcardPath }${ fullQuery }`;
}

// Status Hero helper
const statusheroInitial = ( req ) => {
  const baseApiUrl = 'https://service.statushero.com/api/v1/';
  const fullUrl = assembleUrl( baseApiUrl, req.params[ 0 ], req.query );

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
  const { fullUrl, headers } = statusheroInitial( req );

  Axios.get(
    fullUrl, 
    { headers }, 
  ).then( response => {
      // res.headers( { ...response.headers } );
      res.json( { status: response.status, ...response.data } ) 
    } )
    .catch( ( error ) => {
        if ( error.response ) {
            // The request was made and the server responded with a status code that falls out of the range of 2xx
            res.sendStatus( error.response.status );
            res.headers( { ...error.response.headers } );
            res.json( { 
              if: 'response', 
              msg: error.message, 
              ...error.response.data
            } );
        } else if ( error.request ) {
            // The request was made but no response was received
            // error.request is instance of XMLHttpRequest in browser, instance of http.ClientRequest in node.js
            res.json( { if: 'request', req: error.request } );
        } else {
            // Something happened in setting up the request that triggered an Error
            res.json( { if: 'else', msg: error.message, message: error.message } );
        }
        console.log( error.config );
      } );
} );

// Pass through for Status Hero API POST requests
router.post( '/statushero/v1/*', ( req, res ) => {
  const { fullUrl, headers } = statusheroInitial( req );
  
  Axios.post( 
    fullUrl, 
    req.body, 
    { headers }, 
    ).then( response => {
      // res.headers( { ...response.headers } );
      res.json( { status: response.status, ...response.data } ) 
    } )
    .catch( ( error ) => {
        if ( error.response ) {
            // The request was made and the server responded with a status code that falls out of the range of 2xx
            res.sendStatus( error.response.status );
            res.headers( { ...error.response.headers } );
            res.json( { 
              if: 'response', 
              msg: error.message, 
              ...error.response.data
            } );
        } else if (error.request) {
            // The request was made but no slresponse was received
            // error.request is instance of XMLHttpRequest in browser, instance of http.ClientRequest in node.js
            res.json( { if: 'request', req: error.request } );
        } else {
            // Something happened in setting up the request that triggered an Error
            res.json( { if: 'else', msg: error.message, message: error.message } );
        }
        console.log( error.config );
      } );
} );

// Complice helper
const compliceInitial = ( req ) => {
  const baseApiUrl = 'https://complice.co/api/v0/u/me/';
  const fullUrl = assembleUrl( baseApiUrl, req.params[ 0 ], req.query );

  const headers = { 'Authorization': req.headers[ 'authorization' ] };

  return { fullUrl, headers };
}

// Pass through for Complice API GET requests
router.get( '/complice/v0/*', ( req, res ) => {
  const { fullUrl, headers } = compliceInitial( req );

  Axios.get(
    fullUrl, 
    { headers }, 
  ).then( response => {
      // res.headers( { ...response.headers } );
      res.json( { status: response.status, ...response.data } ) 
    } )
    .catch( ( error ) => {
        if ( error.response ) {
            // The request was made and the server responded with a status code that falls out of the range of 2xx
            res.sendStatus( error.response.status );
            res.headers( { ...error.response.headers } );
            res.json( { 
              if: 'response', 
              msg: error.message, 
              ...error.response.data
            } );
        } else if ( error.request ) {
            // The request was made but no response was received
            // error.request is instance of XMLHttpRequest in browser, instance of http.ClientRequest in node.js
            res.json( { if: 'request', req: error.request } );
        } else {
            // Something happened in setting up the request that triggered an Error
            res.json( { if: 'else', msg: error.message, message: error.message } );
        }
        console.log( error.config );
      } );
} );

// Pass through for Complice API POST requests
router.post( '/complice/v0/*', ( req, res ) => {
  const { fullUrl, headers } = compliceInitial( req );
  
  Axios.post( 
    fullUrl, 
    req.body, 
    { headers }, 
    ).then( response => {
      // res.headers( { ...response.headers } );
      res.json( { status: response.status, ...response.data } ) 
    } )
    .catch( ( error ) => {
        if ( error.response ) {
            // The request was made and the server responded with a status code that falls out of the range of 2xx
            res.sendStatus( error.response.status );
            res.headers( { ...error.response.headers } );
            res.json( { 
              if: 'response', 
              msg: error.message, 
              ...error.response.data
            } );
        } else if ( error.request ) {
            // The request was made but no slresponse was received
            // error.request is instance of XMLHttpRequest in browser, instance of http.ClientRequest in node.js
            res.json( { if: 'request', req: error.request } );
        } else {
            // Something happened in setting up the request that triggered an Error
            res.json( { if: 'else', msg: error.message, message: error.message } );
        }
        console.log( error.config );
      } );
} );

// RescueTime helper
const rescuetimeInitial = ( req ) => {
  const baseApiUrl = 'https://www.rescuetime.com/anapi/';
  return assembleUrl( baseApiUrl, req.params[ 0 ], req.query );
}

// Pass through for ResuceTime API GET requests
router.get( '/rescuetime/*', ( req, res ) => {
  const fullUrl = rescuetimeInitial( req );

  Axios.get(
    fullUrl 
  ).then( response => {
      // res.headers( { ...response.headers } );
      res.json( { status: response.status, ...response.data } ) 
    } )
    .catch( ( error ) => {
        if ( error.response ) {
            // The request was made and the server responded with a status code that falls out of the range of 2xx
            res.sendStatus( error.response.status );
            res.headers( { ...error.response.headers } );
            res.json( { 
              if: 'response', 
              msg: error.message, 
              ...error.response.data 
            } );
        } else if ( error.request ) {
            // The request was made but no response was received
            // error.request is instance of XMLHttpRequest in browser, instance of http.ClientRequest in node.js
            res.json( { if: 'request', req: error.request } );
        } else {
            // Something happened in setting up the request that triggered an Error
            res.json( { if: 'else', msg: error.message, message: error.message } );
        }
        console.log( error.config );
      } );
} );

app.use( Cors() );
app.use(bodyParser.json());
app.use('/.netlify/functions/server', router);  // path must route to lambda

module.exports = app;
module.exports.handler = serverless(app);
