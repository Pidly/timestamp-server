var express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors");

let mongoose = require('mongoose');

let shortUrlScheme = new mongoose.Schema({
  index: Number,
  url: String
});

let ShortUrl = mongoose.model('ShortUrl', shortUrlScheme);
var mongoUri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/";

mongoose.connect(mongoUri, {useNewUrlParser: true, useUnifiedTopology: true});

const CORS_URL = process.env.CORS_URL || "http://localhost:3000";

var app = express();
app.use(
  cors({
    origin: CORS_URL
  })
)

const PORT = process.env.PORT || 3000;

function isInt(value) {
  return !isNaN(value) && 
         parseInt(Number(value)) == value && 
         !isNaN(parseInt(value, 10));
}

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get("/api/whoami/", (req, res) => {
  var json = req.headers;
  var ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  console.log(ip);
  res.json(json);
});

app.post("/api/shorturl", (req, res) => {
  var body = JSON.parse(req.body.body);
  console.log(body);
  console.log(body.url);
  console.log(body.index);

  const removeExistingIndex = () => {
    ShortUrl.remove({index: body.index}, (err, data) => {
      if (err) {
        return console.log(err);
      }
    })
  };

  const createAndSaveUrl = () => {
    let shortUrl = new ShortUrl({
      index: body.index,
      url: body.url
    });

    shortUrl.save((err, data) => {
      if (err) {
        return console.error(err);
      }
      console.log("Logging data");
      console.log(data);
    })
  };
  removeExistingIndex();

  createAndSaveUrl();

  console.log("create and save");
  res.json({
    response: "ok"
  })
})

app.get("/api/shorturl/:index?", (req, res) => {
  var index = parseInt(req.params.index);
  console.log(index);

  const findUrlByIndex = (index, done) => {
    ShortUrl.find({index: index}, (err, shortUrl) => {
      if (err) {
        return console.error(err);
      }
      if (!shortUrl[0]) {
        console.log("Catch error?");
        done(shortUrl[0]);
      } else {        
        done(shortUrl[0].url);
      }
    })
  }
  if (index == 0) {
    res.redirect('http://www.google.com')
  } else {
    
    findUrlByIndex(index, (shortUrl) => {
      if (!shortUrl) {
        res.json({
          error: "Error retrieving item"
        })
      } else {
        res.redirect(shortUrl);
      }
    })
  }
});

app.get("/api/:date?", (req, res) => {
  var date = req.params.date;

  if (isInt(date)) {
    var dateStr = new Date(parseInt(date));
    var unixTime = parseInt(date);
  } else {
    var unixTime = Date.parse(req.params.date);
    var dateStr = new Date(unixTime);  
  }

  if (!isNaN(dateStr.getTime())) {
    res.json({
      unix: unixTime,
      date: dateStr
    })
  } else {
    res.json({
      error: "Error parsing date."
    })
  }
});


app.listen(PORT, () => console.log("Server is up"));

module.exports = app;
