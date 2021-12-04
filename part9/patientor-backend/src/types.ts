export interface DiagnoseEntry {
  code: string;
  name: string;
  latin?: string;
}
export interface PatientEntry {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
}
export type NonSensitivePatients = Omit<PatientEntry,'ssn'>;