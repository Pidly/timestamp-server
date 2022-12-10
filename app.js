var express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors");

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
