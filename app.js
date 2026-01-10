const express = require("express");
const path = require("path");
const dotenv = require("dotenv").config();

// importing middlewares
const cors = require("cors");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const errorHandler = require("./middleware/error.middleware");
const notFound = require("./middleware/notFound.middleware");

//importing Routes
const indexRouter = require("./controllers/index");
const usersRouter = require("./controllers/users.controller");
const authRouter = require("./controllers/auth.controller");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

// Mounting middlewares
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/auth/login", authRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(notFound);

// error handler
app.use(errorHandler);

module.exports = app;
