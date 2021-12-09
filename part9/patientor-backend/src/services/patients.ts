import patientData from "../data/patients";
import { NonSensitivePatients, Patient, newPatientEntry,newEntry,Entry } from "../types";
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
const addEntry = (id: string, entry: newEntry) => {
  const EntryToAdd:Entry = {
    id: uuidv4(),
    ...entry,
  };
  const patient = patients.find((p) => p.id === id);
  if (patient) {
    patient.entries.push(EntryToAdd);
  }
  return patient;
};
export default { getPatients, getNonSensitivePatients, addPatient, getPatient,addEntry };
