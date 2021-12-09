import {
  newPatientEntry,
  Gender,
  Entry,
  newEntry,
  Discharge,
  BaseEntry,
  HospitalEntry,
  OccupationalHealthCareEntry,
  HealthCheckEntry
} from "./types";
type Fields = {
  name: unknown;
  dateOfBirth: unknown;
  ssn: unknown;
  gender: unknown;
  occupation: unknown;
  entries: unknown;
};
type EntryFields = {
  description: unknown;
  date: unknown;
  specialist: unknown;
  diagnosisCodes: unknown;
  discharge?: unknown;
  employername?: unknown;
  sickLeave?: unknown;
  type: unknown;
  healthCheckRating: unknown;
};
const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};
const isStringArray = (param: unknown): param is string[] => {
  if (!Array.isArray(param)) {
    return false;
  }
  return param.every((st) => isString(st));
};
const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};
const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};
const isEntries = (param: any): param is Entry[] => {
  if (param as Entry[]) {
    return true;
  }
  return false;
};
const isNumber = (param: unknown): param is number => {
  return typeof param === "number";
}
const isBaseEntry = (param: any): param is BaseEntry => {
  if (
    !param ||
    !param.diagnosisCodes ||
    !isString(param.description) ||
    !isDate(param.date) ||
    !isString(param.specialist) ||
    !isString(param.type)
  ) {
    return false;
  }
  return true;
};
const isDischarge = (param: any): param is Discharge => {
  if (param as Discharge) {
    return true;
  }
  return false;
};
const isHospitalEntry = (entry: any): entry is HospitalEntry => {
  if (entry.type !== "Hospital" || !isDischarge(entry.discharge)) {
    return false;
  }
  return true;
};
const isHealthCheckEntry = (entry: any): entry is HealthCheckEntry => {
  if (entry.type !== "HealthCheck") {
    return false;
  }
  if (
    !entry.healthCheckRating ||
    !isNumber(entry.healthCheckRating) ||
    entry.healthCheckRating < 0 ||
    entry.healthCheckRating > 3
  ) {
    return false;
  }
  return true;
}
const isOccupationalHealthcareEntry = (
  entry: any
): entry is OccupationalHealthCareEntry => {
  if (
    entry.type !== "OccupationalHealthcare" ||
    !isString(entry.employerName)
  ) {
    return false;
  }
  if (entry.sickLeave) {
    if (
      !isDate(entry.sickLeave.startDate) ||
      !isDate(entry.sickLeave.endDate)
    ) {
      return false;
    }
  }
  return true;
};
const parseString = (string: unknown): string => {
  if (!string || !isString(string)) {
    throw new Error(string + "is not valid");
  }
  return string;
};
// const parseStringArray = (param: unknown): string[] => {
//   if (!isStringArray(param)) {
//     throw new Error(param + "is not valid");
//   }
//   return param;
// };
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
const parseEntries = (entries: unknown): Entry[] => {
  if (!entries || !isEntries(entries)) {
    throw new Error("Incorrect entry");
  }
  return entries;
};

export const toNewPatient = ({
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
export const toNewEntry = (entry: any): newEntry => {
  if (!isBaseEntry(entry)) {
    throw new Error("Incorrect entry");
  }
  if (isHospitalEntry(entry)) {
    return entry;
  } else if (isOccupationalHealthcareEntry(entry)) {
    return entry;
  } else if (isHealthCheckEntry(entry)) {
    return entry;
  } else {
    throw new Error(`Not an entry from the above types.`);
  }
};

