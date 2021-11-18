import express = require("express");
import calculateBmi from "./bmiCalculator";
import calculateExercises from "./exerciseCalculator";
const app = express();
import bodyParser = require("body-parser");
app.use(bodyParser.json());
app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack");
});
app.get("/bmi", (req, res) => {
  try {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);
    if (isNaN(height) || isNaN(weight)) {
      res.status(400).send({ error: "malformatted parameters" });
    } else {
      res.json({
        weight,
        height,
        bmi: calculateBmi(height, weight),
      });
    }
  } catch (e) {
    res.status(400).send({ error: "malformatted parameters" });
  }
});
app.post("/calculate", (req, res) => {
  try {
    console.log(req.body);
    const { daily_exercises, target } = req.body;
    if (!Array.isArray(daily_exercises) || daily_exercises.length === 0|| !target) {
      res.status(400).send({ error: "parameters missing" });
    } else {
      const result = calculateExercises(daily_exercises, target);
      res.json(result);
    }
  } catch (e) {
    const error = e as Error;
    console.log(error.message);
    res.status(400).send({ error: "malformatted parameters" });
  }
});
const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
