import express = require("express");
import calculateBmi from "./bmiCalculator";
const app = express();

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
const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
