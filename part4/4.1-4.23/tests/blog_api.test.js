const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blog");
const helper = require("./test_helper");
require("express-async-errors");
beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialBlogs);
}, 10000);
describe("blog api", () => {
  test("correct ammount of posts", async () => {
    const result = await api.get("/api/blogs");
    expect(result.body).toHaveLength(helper.initialBlogs.length);
  });
  test("correct id property", async () => {
    const result = await api.get("/api/blogs");
    expect(result.body[0].id).toBeDefined();
  });
  test("a new blog gets successfully created", async () => {
    const newBlog = {
      title: "Drink water",
      author: "Rafael",
      url: "some_url",
      likes: 5
    };
    const expectedReturn = {
      title: newBlog.title,
      author: newBlog.author,
    };
    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);
    const response = await api.get("/api/blogs");
    const contents = response.body.map((r) => {
      return {
        title: r.title,
        author: r.author,
      };
    });
    expect(contents).toHaveLength(helper.initialBlogs.length + 1);
    expect(contents).toContainEqual(expectedReturn);
  });
  test("if likes property missing from request, defaults to zero",async()=>{
    const newBlog = {
      title: "Drink soda",
      author: "mike",
      url: "some_url",
    };
    const response= await api.post("/api/blogs").send(newBlog);
    expect(response.body.likes).toBe(0);
  });
});
afterAll(() => {
  mongoose.connection.close();
});
