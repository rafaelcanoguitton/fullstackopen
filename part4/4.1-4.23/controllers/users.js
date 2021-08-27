const userRouter = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
require("express-async-errors");
userRouter.get("/", async (request, response) => {
  const users = await User.find({});
  response.json(users);
});
userRouter.post("/", async (request, response) => {
    const body=request.body;
  if (!(body.username && body.password)) {
    return response.status(400).end();
  }
  const hashedPswd = await bcrypt.hash(body.password, 10);
  const user = new User({
    username: request.body.username,
    passwordHash: hashedPswd,
  });
  const result= await user.save();
  response.json(result);
});
userRouter.get("/",async(request,response)=>{
    const users=await User.find({});
    response.json(users);
})
module.exports=userRouter;