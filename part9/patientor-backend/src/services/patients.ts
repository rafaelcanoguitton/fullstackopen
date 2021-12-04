import patientData from "../data/patients.json";
import { NonSensitivePatients, PatientEntry } from "../types";
const patients: PatientEntry[] = patientData as Array<PatientEntry>;

const getPatients = (): PatientEntry[] => {
  return patients;
};
const getNonSensitivePatients = (): NonSensitivePatients[] => {
  return patients;
};
const addEntry = () => {
  return null;
};
export default { getPatients, getNonSensitivePatients, addEntry };
