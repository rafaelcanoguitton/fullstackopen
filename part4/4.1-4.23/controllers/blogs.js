const blogRouter = require("express").Router();
const Blog = require("../models/blog");
require("express-async-errors");
blogRouter.get("/", async (request, response) => {
  const blogs=await Blog.find({});
  response.json(blogs);
});

blogRouter.post("/", async (request, response) => {
  if(!request.body.title||!request.body.url){
    return response.status(400).end();
  }
  const blog = new Blog(request.body);
  const result = await blog.save();
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
