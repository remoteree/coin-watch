const winston = require("winston"); //Helps with logging errors using Transport
require("winston-mongodb");
require("express-async-errors"); //Helps wrap routes to async error handling middleware

module.exports = function () {
  winston.handleExceptions(
    new winston.transports.Console({ colorize: true, prettyPrint: true }), //Deals with handling exceptions and rejections
    new winston.transports.File({ filename: "uncaughtExceptions.log" }) //Deals with handling exceptions and rejections
  );

  process.on("unhandledRejection", (ex) => {
    throw ex;
  });

  winston.add(winston.transports.File, { filename: "logfile.log" }); //Adds error logs to this logfile
  winston.add(winston.transports.MongoDB, {
    db: process.env.MONGODB_URI,
    level: "info",
  }); //Adds error logs to mongoDB, normally we don't store this in database
};
