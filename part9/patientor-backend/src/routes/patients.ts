import express from "express";
const router = express.Router();
import patientsService from "../services/patients";
import { NonSensitivePatients } from "../types";
import toNewPatient from "../utils";

router.get("/", (_req, res) => {
  const patients: NonSensitivePatients[] = patientsService.getPatients();
  res.json(patients);
});
router.post("/", (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    const addedPatient = patientsService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (e) {
    const error = e as Error;
    res.status(400).send(error.message);
  }
});
export default router;
