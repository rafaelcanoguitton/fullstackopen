const blogRouter = require("express").Router();
const { result } = require("lodash");
const Blog = require("../models/blog");
require("express-async-errors");
blogRouter.get("/", async (request, response) => {
  const blogs=await Blog.find({});
  response.json(blogs);
});

blogRouter.post("/", async (request, response) => {
  const blog = new Blog(request.body);
  const result = await blog.save();
  response.status(201).json(result);
});
module.exports = blogRouter;
