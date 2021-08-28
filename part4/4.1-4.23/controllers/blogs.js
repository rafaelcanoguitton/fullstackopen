const blogRouter = require("express").Router();
const Blog = require("../models/blog");
const User= require("../models/user");
require("express-async-errors");
blogRouter.get("/", async (request, response) => {
  const blogs=await Blog.find({}).populate('user');
  response.json(blogs);
});

blogRouter.post("/", async (request, response) => {
  if(!request.body.title||!request.body.url){
    return response.status(400).end();
  }
  const blogToSave=request.body;
  const fromUser=await User.findOne({});
  blogToSave.user=fromUser._id;
  const blog = new Blog(blogToSave);
  const result = await blog.save();
  fromUser.blogs=fromUser.blogs.concat(blog._id);
  fromUser.save();
  response.status(201).json(result);
});
blogRouter.delete("/:id",async(request,response)=>{
  const id = request.params.id;
  await Blog.findByIdAndRemove(id);
  response.status(204).end();
});
blogRouter.put("/:id",async(request,response)=>{
  const id=request.params.id;
  const result=await Blog.findByIdAndUpdate(id,request.body,{new: true});
  response.json(result);
});
module.exports = blogRouter;
