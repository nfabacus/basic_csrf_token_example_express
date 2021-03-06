var express = require('express');
var router = express.Router();
var { randomBytes } = require('crypto');

/* GET home page. */
router.get('/', function(req, res, next) {
  req.session.userId = '123fdsafdsa';
  req.session.csrfToken = randomBytes(100).toString('base64'); // convert random data to a string
  res.render('index', { title: 'Express', csrf_token: req.session.csrfToken });
});

router.post('/submit', function(req, res, next) {
  console.log('req.session.userId >>', req.session.userId )
  console.log('req.session.csrfToken >>', req.session.csrfToken)
  if (req.session.userId !== '123fdsafdsa') {
    return res.send(`<p style="font-size: 4rem; color: red;">
                     <strong>You are not authorised.</strong>
                     </p>`);
  }
  if (!req.body.csrfToken) {
    return res.send(`<p style="font-size: 4rem; color: red;">
                     <strong>CSRF Token not included.</strong>
                     </p>`);
  }

  if (req.body.csrfToken !== req.session.csrfToken) {
    return res.send(`<p style="font-size: 4rem; color: red;">
                     <strong>CSRF tokens do not match.</strong>
                     </p>`);
  }

  return res.send(`<p style="font-size: 4rem;">
                   <strong>Successful request!</strong>
                   </p>`);
});

router.post('/api', (req, res, next) => {
  const csrfToken = req.header('csrfToken');
  if (req.session.userId !== '123fdsafdsa') {
    return res.json({ message: 'You are not authorised.' });
  }
  if (!csrfToken) {
    return res.json({ message: 'CSRF Token not included.' });
  }

  if (csrfToken !== req.session.csrfToken) {
    return res.json({ message: 'CSRF tokens do not match.' });
  }

  console.log('req.body > ', req.body);
  res.json({ message: 'Success!' });
});


module.exports = router;
