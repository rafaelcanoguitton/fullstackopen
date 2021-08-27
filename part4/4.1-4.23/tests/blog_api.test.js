const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blog");
const helper = require("./test_helper");
beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialBlogs);
}, 10000);
describe("blog api", () => {
  test("correct ammount of posts", async () => {
    const result = await api.get("/api/blogs");
    expect(result.body).toHaveLength(helper.initialBlogs.length);
  });
  test("correct id property",async()=>{
    const result= await api.get("/api/blogs");
    expect(result.body[0].id).toBeDefined();
  });
});
afterAll(() => {
  mongoose.connection.close();
});