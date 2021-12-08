import patientData from "../data/patients";
import { NonSensitivePatients, Patient, newPatientEntry } from "../types";
import { v4 as uuidv4 } from "uuid";
const patients: Patient[] = patientData as Array<Patient>;

const getPatients = (): Patient[] => {
  return patients;
};
const getNonSensitivePatients = (): NonSensitivePatients[] => {
  return patients;
};
const addPatient = (entry: newPatientEntry) => {
  const newPatient = {
    id: uuidv4(),
    ...entry,
  };
  patients.push(newPatient);
  return newPatient;
};
const getPatient = (id: string): Patient | undefined => {
  const patient = patients.find((p) => p.id === id);
  return patient;
};
export default { getPatients, getNonSensitivePatients, addPatient, getPatient };
