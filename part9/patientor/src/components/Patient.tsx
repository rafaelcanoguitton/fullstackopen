import React from "react";
import { useParams } from "react-router";
import { Icon } from "semantic-ui-react";
import { useStateValue } from "../state";
import { Patient } from "../types";
import { Entry } from "../types";
const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  console.log("wadafa");
  return (
    <div>
      <div>
        <span>
          {entry.date} {entry.description}
        </span>
      </div>
      <div>
        <ul>
          {entry.diagnosisCodes?.map((code) => (
            <li key={code}>{code}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};
const PatientPage = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patients }] = useStateValue();
  const patient: Patient = patients[id];
  return (
    <>
      <h1>
        {patient.name}{" "}
        <Icon name={patient.gender == "male" ? "mars" : "venus"} />
      </h1>
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
      <h2>entries</h2>
      {patient.entries?.map((entry,idx) => (
        <EntryDetails key={idx} entry={entry} />
      ))}
    </>
  );
};
export default PatientPage;
