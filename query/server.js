const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");
const colors = require("colors");
const axios = require('axios');
const posts = require('./controllers/query');
const handleEvents = require("./utils/handleEvents");

console.log(posts)


//load env vars
dotenv.config({ path: "./config/config.env" });

//Route files
const query = require("./routes/query");

const app = express();

//Body parser
app.use(express.json());

//solve cors issue
app.use(cors());

//Mount routers
app.use("/api/v1/query", query);

//Dev logging middleware
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
  }


const PORT = process.env.PORT || 4002;

const server = app.listen(
PORT,
console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
    ),
async () => {
  const res = await axios.get("http://event-bus-srv:4005/api/v1/events");

  // console.log("res_data ===>> ",res.data.data)
  try{
    for (item of res.data.data) {
      console.log('Processing event:', item.type)
      handleEvents(item.type,item.data,posts);
      
    }
  } catch(err){
    console.log(err);
  }

}
);


//Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
    console.log(`Error: ${err.message}`.red);
    // Close server & exit process
    server.close(() => process.exit(1));
  });