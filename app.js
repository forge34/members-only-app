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
const { runDB } = require("./config/database");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());

// Database run
runDB(process.env.DBSTRING);

// Sessions setup
app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: process.env.SECRET,
    store: MongoStore.create({ mongoUrl: process.env.DBSTRING }),
  })
);

// Import Passport config
require("./config/passport");
app.use(passport.session());
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

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
