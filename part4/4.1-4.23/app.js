const http = require("http");
const express = require("express");
const app = express();
const cors = require("cors");
const config = require("./utils/config");
const mongoose = require("mongoose");
const mongoUrl = config.MONGODB_URI;
const blogRouter = require("./controllers/blogs");
const userRouter=require("./controllers/users");
mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

app.use(cors());
app.use(express.json());
app.use("/api/blogs", blogRouter);
app.use("/api/users",userRouter);
module.exports = app;
