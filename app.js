var express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors");
//var indexRouter = require('./routes/index');
//var usersRouter = require('./routes/users');

var app = express();
app.use(
  cors({
    origin: "https://timestamp-client-app-production.up.railway.app"
  })
)

const PORT = process.env.PORT || 3000;

const returnDate = new Date(1995, 11, 17);

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());

app.get("/home", (req, res) => {
  var unixTime = returnDate.getTime() / 1000;
  var dateStr = returnDate
  res.json({
    unix: unixTime,
    date: returnDate.toJSON()
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
