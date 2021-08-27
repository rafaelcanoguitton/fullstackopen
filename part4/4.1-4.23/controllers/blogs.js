const blogRouter = require("express").Router();
const { result } = require("lodash");
const Blog = require("../models/blog");
require('express-async-errors')
blogRouter.get("/", (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs);
  });
});

blogRouter.post("/",async (request, response) => {
  const blog = new Blog(request.body);
  result= await blog.save();
  response.status(201).json(result);
});
module.exports=blogRouter;