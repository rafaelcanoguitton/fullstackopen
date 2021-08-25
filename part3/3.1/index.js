const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const Person = require("./mongo");
morgan.token("body", function (req, res) {
  return JSON.stringify(req.body);
});
const app = express();
const errorHandler = (error, request, response, next) => {
  console.error(error.message);
  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }
  next(error);
};
app.use(
  express.json(),
  morgan(":method :url :status :res[content-length] - :response-time ms :body"),
  cors(),
  express.static("build"),
  errorHandler
);
app.get("/api/persons", (request, response) => {
  Person.find({}).then((people) => response.json(people));
});
app.post("/api/persons", (request, response) => {
  const body = request.body;
  if (!body.name) {
    return response.status(400).json({ error: "name missing" });
  } else if (!body.number) {
    return response.status(400).json({ error: "number missing" });
  }
  const person = new Person({
    name: body.name,
    number: body.number,
  });
  person.save().then((result) => {
    console.log(result);
    response.json(result);
  });
});
app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  Person.findById(id)
    .then((p) => response.json(p))
    .catch((error) => {
      next(error);
    });
});
app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  Person.findByIdAndRemove(id)
    .then((res) => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});
app.get("/info", (request, response) => {
  response.send(
    `<div>Phonebook has info for ${
      phonebook.length
    } people</div><br><div>${Date().toLocaleString("en-us")}</div>`
  );
});
app.put("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const body = request.body;
  const upPerson = {
    name: body.name,
    number: body.number,
  };
  Person.findByIdAndUpdate(id, upPerson, { new: true })
    .then((upP) => {
      response.json(upP);
    })
    .catch((error) => next(error));
});
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
