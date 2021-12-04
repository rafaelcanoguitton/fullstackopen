export interface DiagnoseEntry {
  code: string;
  name: string;
  latin?: string;
}
export enum Gender {
  Male = "male",
  Female = "female",
}
export interface PatientEntry {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
}
export type newPatientEntry = Omit<PatientEntry, "id">;
export type NonSensitivePatients = Omit<PatientEntry, "ssn">;
