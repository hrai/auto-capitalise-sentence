const express = require('express');
const app = express();
const port = 3000;

const path = require('path');
const router = express.Router();

// set up rate limiter: maximum of five requests per minute
var RateLimit = require('express-rate-limit');
var limiter = new RateLimit({
  windowMs: 1*60*1000, // 1 minute
  max: 50
});

// apply rate limiter to all requests
app.use(limiter);

//add the router
app.use('/', router);
app.use('/distribution', express.static(__dirname+'/distribution'));

router.get('/', function(req, res) {
  //__dirname : It will resolve to your project folder.
  res.sendFile(path.join(__dirname + '/index.html'));
});

router.get('/iframe', function(req, res) {
  res.sendFile(path.join(__dirname + '/iframe.html'));
});

app.listen(process.env.port || 3000, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
