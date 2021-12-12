import express from "express";
const router = express.Router();
import patientsService from "../services/patients";
import { NonSensitivePatients } from "../types";
import { toNewPatient, toNewEntry } from "../utils";

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
router.get("/:id", (req, res) => {
  const patient = patientsService.getPatient(req.params.id);
  if (patient) {
    res.json(patient);
  } else {
    res.sendStatus(404);
  }
});
router.post("/:id/entries", (req, res) => {
  try {
    const newEntry = toNewEntry(req.body);
    const addedEntry = patientsService.addEntry(req.params.id, newEntry);
    res.json(addedEntry);
  } catch (e) {
    
    const error = e as Error;
    res.status(400).send(error.message);
  }
});
export default router;
