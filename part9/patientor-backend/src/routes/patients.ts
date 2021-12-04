import express from "express";
const router = express.Router();
import patientsService from "../services/patients";
import { NonSensitivePatients } from "../types";

router.get('/',(_req, res) => {
    const patients: NonSensitivePatients[] = patientsService.getPatients();
    res.json(patients);
});
router.post('/',(_req,res) => {
    res.send('Add a patient');
});
export default router;