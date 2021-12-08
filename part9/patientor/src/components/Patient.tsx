import React from "react";
import { useParams } from "react-router";
import { Icon } from "semantic-ui-react";
import { useStateValue } from "../state";
import { Diagnosis, Patient } from "../types";
import { Entry } from "../types";
import { apiBaseUrl } from "../constants";
import axios from "axios";
const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  const [ diagnoses , setDiagnoses] = React.useState<Diagnosis[]>([]);
  React.useEffect(() => {
    const fetchDiagnosis = async () => {
      try {
        const { data: diagnosis } = await axios.get<Diagnosis[]>(
          `${apiBaseUrl}/diagnosis`
        );
        setDiagnoses(diagnosis);
      } catch (e) {
        console.error(e);
      }
    };
    void fetchDiagnosis();
  }, []);
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
            <li key={code}>
              {code} {diagnoses}
            </li>
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
      {patient.entries?.map((entry, idx) => (
        <EntryDetails key={idx} entry={entry} />
      ))}
    </>
  );
};
export default PatientPage;
