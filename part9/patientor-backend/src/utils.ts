import { newPatientEntry, Gender, Entry } from "./types";
type Fields = {
  name: unknown;
  dateOfBirth: unknown;
  ssn: unknown;
  gender: unknown;
  occupation: unknown;
  entries: unknown;
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
const isEntries = (param: any):param is Entry[] =>{
  if(param as Entry[]){
    return true;
  }
  return false;
}
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
const parseEntries = (entries: unknown): Entry[] =>{
  if(!entries||!isEntries(entries)){
    throw new Error("Incorrect entry");
  }
  return entries;
}
const toNewPatient = ({
  name,
  dateOfBirth,
  ssn,
  gender,
  occupation,
  entries,
}: Fields): newPatientEntry => {
  const newPatient: newPatientEntry = {
    name: parseString(name),
    dateOfBirth: parseDate(dateOfBirth),
    ssn: parseString(ssn),
    gender: parseGender(gender),
    occupation: parseString(occupation),
    entries: parseEntries(entries),
  };
  return newPatient;
};
export default toNewPatient;
