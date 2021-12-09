export interface DiagnoseEntry {
  code: string;
  name: string;
  latin?: string;
}
export enum Gender {
  Male = "male",
  Female = "female",
}
export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3,
}
export interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<DiagnoseEntry["code"]>;
}
export interface OccupationalHealthCareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: {
    startDate: string;
    endDate: string;
  };
}
export type Discharge = {
  date: string;
  criteria: string;
};
export interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge: Discharge;
}
export interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}
export type Entry =
  | HospitalEntry
  | OccupationalHealthCareEntry
  | HealthCheckEntry;

export interface Patient {
  id: string;
  name: string;
  ssn: string;
  occupation: string;
  gender: Gender;
  dateOfBirth: string;
  entries: Entry[];
}
export type newHealthCheckEntry = Omit<HealthCheckEntry, "id">;
export type newHospitalCheckEntry = Omit<HospitalEntry, "id">;
export type newOccupationalCheckEntry = Omit<OccupationalHealthCareEntry, "id">;
export type newEntry =
  | newHospitalCheckEntry
  | newHealthCheckEntry
  | newOccupationalCheckEntry;
export type PublicPatient = Omit<Patient, "ssn" | "entries">;
export type newPatientEntry = Omit<Patient, "id">;
export type NonSensitivePatients = Omit<Patient, "ssn">;
