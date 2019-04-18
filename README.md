## ReadMe

[![Deploy to
Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/noicouldalwaysturn2u/netlify-express)

This fork from https://github.com/neverendingqs/netlify-express includes a few additional endpoints.

One is for working with an OAuth 2 Redux auth implementation focused for the front-end with implicit granting. It also allows for authorization code granting which means a backend endpoint is needed for POSTING with the temporary code recieved to get the access token. That endpoint is: `/auth-code`.

@TODO
Example url:
```sh
POST https://atsexpress.atextbooksituation.com/.netlify/functions/server/auth-code
```

Two other endpoints are for working with Status Hero's API. The endpoints are GET and POST to `/statushero/v1`.

@TODO
Example urls:

```sh
GET https://atsexpress.atextbooksituation.com/.netlify/functions/server/statushero/v1/
POST https://atsexpress.atextbooksituation.com/.netlify/functions/server/statushero/v1/
```

The default url examples:

```sh
curl https://atsexpress.atextbooksituation.com/.netlify/functions/server
curl https://atsexpress.atextbooksituation.com/.netlify/functions/server/another
curl --header "Content-Type: application/json" --request POST --data '{"json":"POST"}' https://atsexpress.atextbooksituation.com/.netlify/functions/server
```

The library/npm package this was made for is:
https://github.com/noicouldalwaysturn2u/oauth2-redux-implicit-authcode


## Previous ReadMe:

_From https://github.com/neverendingqs/netlify-express_

### Express.js on Netlify Example

An example of how to host an Express.js app on Netlify using
[serverless-http](https://github.com/dougmoscrop/serverless-http). See
[express/server.js](express/server.js) for details, or check it out at
https://netlify-express.netlify.com/!

[index.html](index.html) simply loads html from the Express.js app using `<object>`, and the
app is hosted at `/.netlify/functions/server`. Examples of how to access the
Express.js endpoints:

```sh
curl https://netlify-express.netlify.com/.netlify/functions/server
curl https://netlify-express.netlify.com/.netlify/functions/server/another
curl --header "Content-Type: application/json" --request POST --data '{"json":"POST"}' https://netlify-express.netlify.com/.netlify/functions/server
```
