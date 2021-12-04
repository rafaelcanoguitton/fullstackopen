import express from "express";
const router = express.Router();
import diagnosesService from "../services/diagnoses";
import { DiagnoseEntry } from "../types";

router.get("/", (_req, res) => {
  const diagnoses: DiagnoseEntry[] = diagnosesService.getDiagnoses();
  res.json(diagnoses);
});
router.post("/", (_req, res) => {
  res.send("Adding a new diagnosis");
});
export default router;
