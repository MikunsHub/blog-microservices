const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");

//load env vars
dotenv.config({ path: "./config/config.env" });

//Route files
const moderation = require("./routes/moderation");

const app = express();

//Body parser
app.use(express.json());


//Mount routers
app.use("/api/v1/moderation", moderation);

//Dev logging middleware
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
  }


const PORT = process.env.PORT || 4003;

const server = app.listen(
PORT,
console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
)
);


//Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
    console.log(`Error: ${err.message}`.red);
    // Close server & exit process
    server.close(() => process.exit(1));
  });