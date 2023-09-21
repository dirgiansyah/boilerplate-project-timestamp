// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

function containsOnlyNumbers(str) {
  return /^\d+$/.test(str);
}


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api", function (req, res) {
  let unixDate = 0;
  let utcDate = "";
  const timeInMillisecond = new Date().getTime();
  unixDate = timeInMillisecond
  utcDate = new Date().toUTCString()
  res.json({unix: unixDate, utc: utcDate})
})

app.get("/api/:date", function (req, res) {
  let inputan = req.params.date;
  let unixDate = 0;
  let utcDate = "";
  if (inputan) {
    if (containsOnlyNumbers(inputan)) {
      inputan = Number(inputan)
    }
    const timeInMillisecond = new Date(inputan).getTime();
    unixDate = timeInMillisecond
    utcDate = new Date(inputan).toUTCString()
    if (utcDate === "Invalid Date") {
      res.json({error: "Invalid Date"})
    }
  } else {
    utcDate = new Date().toUTCString()
  }
  res.json({unix: unixDate, utc: utcDate})
})


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
