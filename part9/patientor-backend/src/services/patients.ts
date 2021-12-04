import patientData from "../data/patients.json";
import { NonSensitivePatients, PatientEntry, newPatientEntry } from "../types";
import { v4 as uuidv4 } from "uuid";
const patients: PatientEntry[] = patientData as Array<PatientEntry>;

const getPatients = (): PatientEntry[] => {
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
export default { getPatients, getNonSensitivePatients, addPatient };
