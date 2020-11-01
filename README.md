## Implementation Example of CSRF Token with Express

Creating CSRF token:
#### When:
Create it onn every page refresh or at least every session creation

### Where:
1. Attach it to session in express/node server, so the server can identify the token for a specific user.
2. Expose it to the front end view - e.g. in this example jade template.
3. For every request with session based auth, send the CSRF token along with the other data (and session token automatically attached to the requests) to the server.

### Reference:
https://levelup.gitconnected.com/how-to-implement-csrf-tokens-in-express-f867c9e95af0

csurf library for express
https://expressjs.com/en/resources/middleware/csurf.html