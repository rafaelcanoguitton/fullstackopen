import React from "react";
import { useParams } from "react-router";
import { Card, Icon } from "semantic-ui-react";
import { useStateValue } from "../state";
import { Diagnosis, Patient } from "../types";
import { Entry } from "../types";
import { apiBaseUrl } from "../constants";
import axios from "axios";
const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  const [diagnoses, setDiagnoses] = React.useState<Diagnosis[]>([]);
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
  switch (entry.type) {
    case "Hospital":
      return (
        <Card>
          <Card.Content>
            <Card.Header>
              {entry.date}
              <Icon name={"user md"} />{" "}
            </Card.Header>
            <Card.Meta>{entry.description}</Card.Meta>
            <Card.Description>{entry.specialist}</Card.Description>
            <ul>
              {entry.diagnosisCodes?.map((code) => (
                <li key={code}>
                  {code} {diagnoses}
                </li>
              ))}
            </ul>
          </Card.Content>
        </Card>
      );
    case "HealthCheck":
      return (
        <Card>
          <Card.Content>
            <Card.Header>
              {entry.date}
              <Icon name={"medkit"} />{" "}
            </Card.Header>
            <Card.Meta>{entry.description}</Card.Meta>
            <Card.Description>{entry.specialist}</Card.Description>
            <ul>
              {entry.diagnosisCodes?.map((code) => (
                <li key={code}>
                  {code} {diagnoses}
                </li>
              ))}
            </ul>
            <Icon
              name={"heart"}
              color={entry.healthCheckRating > 1 ? "black" : "red"}
            />
          </Card.Content>
        </Card>
      );
    case "OccupationalHealthcare":
      return (
        <Card>
          <Card.Content>
            <Card.Header>
              {entry.date}
              <Icon name={"user md"} />{" "}
            </Card.Header>
            <Card.Meta>{entry.description}</Card.Meta>
            <Card.Description>{entry.specialist}</Card.Description>
            <ul>
              {entry.diagnosisCodes?.map((code) => (
                <li key={code}>
                  {code} {diagnoses}
                </li>
              ))}
            </ul>
          </Card.Content>
        </Card>
      );
  }
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
      <Card.Group>
        {patient.entries?.map((entry, idx) => (
          <EntryDetails key={idx} entry={entry} />
        ))}
      </Card.Group>
    </>
  );
};
export default PatientPage;
