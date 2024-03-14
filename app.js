const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const session = require("express-session");
require("dotenv").config();

const indexRouter = require("./routes/index");
const passport = require("passport");
const MongoStore = require("connect-mongo");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// Import Passport config
require("./config/passport");

app.use(logger("dev"));
app.use(express.json());
app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: process.env.SECRET,
    store: MongoStore.create({ mongoUrl: process.env.DBSTRING }),
  })
);
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
