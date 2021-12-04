import diagnoseData from "../data/diagnoses.json";
import { DiagnoseEntry } from "../types";
const diagnoses: Array<DiagnoseEntry> = diagnoseData as Array<DiagnoseEntry>;
const getDiagnoses = (): Array<DiagnoseEntry> => {
  return diagnoses;
};
const addEntry = () => {
  return null;
};

export default {
  getDiagnoses,
  addEntry,
};