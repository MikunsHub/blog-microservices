// const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");
const colors = require("colors");

//load env vars
dotenv.config({ path: "./config/config.env" });

//Route files
const events = require("./routes/events");

//creating new express application
const app = express();

//Body parser
app.use(express.json());

//solve cors issue
app.use(cors());

//Mount routers
app.use("/api/v1/events", events);

const PORT = process.env.PORT || 4000;

//server port
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