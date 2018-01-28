var express = require('express');
var timeout = require('connect-timeout');

const app = express();

app.use(timeout(3000));
app.use(express.static('assets'))

app.get('/', function (req, res) {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <meta name="viewport" content="width=device-width">
      <link href="/main.css" rel="stylesheet" type="text/css">
    </head>
    <body>
    <div id="main">
    </div>
    </body>
    <script src="/main.js" type="text/javascript"></script>
    </html>
    `);
});

app.get('/_status', function (req, res) {
  res.send('ok');
});

app.listen(3000, console.log(`Server started on port: 3000`));
