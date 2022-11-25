var express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors");
//var indexRouter = require('./routes/index');
//var usersRouter = require('./routes/users');
const localUrl = "http://localhost:3000";
const serverUrl = "https://timestamp-client-app-production.up.railway.app";

var app = express();
app.use(
  cors({
    origin: localUrl
  })
)

const PORT = process.env.PORT || 3000;
//2015-12-25
const returnDate = new Date(2015, 12, 25);
const epochDate = new Date(1453708800000);

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());

app.get("/home", (req, res) => {
  var unixTime = returnDate.getTime() / 1000;
  var dateStr = returnDate;
  res.json({
    unix: unixTime,
    date: returnDate.toJSON()
  })
});

app.get("/epoch", (req, res) => {
  var unixTime = epochDate.getTime() / 1000;

  res.json({
    unix: unixTime,
    date: epochDate.toJSON()
  })
});

app.listen(PORT, () => console.log("Server is up"));

/*
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
*/

module.exports = app;
