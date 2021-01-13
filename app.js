const express = require('express');
const app = express();
const port = 3000;

const path = require('path');
const router = express.Router();

router.get('/', function(req, res) {
  //__dirname : It will resolve to your project folder.
  res.sendFile(path.join(__dirname + '/index.html'));
});

router.get('/iframe', function(req, res) {
  res.sendFile(path.join(__dirname + '/iframe.html'));
});

//add the router
app.use('/', router);

app.listen(process.env.port || 3000, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
