import express from "express";
const app = express();
const cors = require("cors");
import diagnosesRouter from './routes/diagnoses';
import patientsRouter from './routes/patients';
app.use(express.json());
app.use(cors());
const PORT = 3001;
app.get("/api/ping", (_req, res) => {
  console.log("someone pinged here");
  res.send("pong");
});
app.use('/api/diagnoses', diagnosesRouter);
app.use('/api/patients', patientsRouter);
app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
});
