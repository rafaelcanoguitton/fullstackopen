import { newPatientEntry, Gender } from "./types";
type Fields = {
  name: unknown;
  dateOfBirth: unknown;
  ssn: unknown;
  gender: unknown;
  occupation: unknown;
};
const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};
const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};
const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};
const parseString = (string: unknown): string => {
  if (!string || !isString(string)) {
    throw new Error(string + "is not valid");
  }
  return string;
};
const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing date: " + date);
  }
  return date;
};
const parseGender = (gender: unknown): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error("Incorrect gender");
  }
  return gender;
};
const toNewPatient = ({
  name,
  dateOfBirth,
  ssn,
  gender,
  occupation,
}: Fields): newPatientEntry => {
  const newPatient: newPatientEntry = {
    name: parseString(name),
    dateOfBirth: parseDate(dateOfBirth),
    ssn: parseString(ssn),
    gender: parseGender(gender),
    occupation: parseString(occupation),
  };
  return newPatient;
};
export default toNewPatient;
