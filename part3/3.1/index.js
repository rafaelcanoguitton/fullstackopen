const express = require("express");
const morgan=require("morgan");
const cors = require('cors')
morgan.token('body', function (req, res) { return JSON.stringify(req.body) });
const app = express();
let phonebook = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];
app.use(express.json(),morgan(':method :url :status :res[content-length] - :response-time ms :body'),cors());
app.get("/api/persons", (request, response) => {
  response.json(phonebook);
});
app.post("/api/persons", (request, response) => {
  const maxId = Math.floor(Math.random() * 1000000);
  const body = request.body;
  if (!body.name) {
    return response.status(400).json({ error: "name missing" });
  } else if (!body.number) {
    return response.status(400).json({ error: "number missing" });
  } else if(!!phonebook.filter((p)=>p.name===body.name).length){
      return response.status(400).json({error: "name bust be unique"});
  }
  const person = {
    name: body.name,
    number: body.number,
    id: maxId,
  };
  phonebook = phonebook.concat(person);
  response.json(person);
});
app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const person = phonebook.find((p) => p.id == id);
  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});
app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  phonebook = phonebook.filter((p) => p.id != id);
  response.status(204).end();
});
app.get("/info", (request, response) => {
  response.send(
    `<div>Phonebook has info for ${
      phonebook.length
    } people</div><br><div>${Date().toLocaleString("en-us")}</div>`
  );
});
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
