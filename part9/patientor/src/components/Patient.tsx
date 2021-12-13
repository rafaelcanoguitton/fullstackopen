import React from "react";
import { useParams } from "react-router";
import { Card, Icon, Button, Container } from "semantic-ui-react";
import { useStateValue } from "../state";
import { Diagnosis, Patient } from "../types";
import { EntryNoId } from "../types";
import { apiBaseUrl } from "../constants";
import AddEntryModal from "../AddEntryModal";
import { addEntry } from "../state";
import axios from "axios";
const EntryDetails: React.FC<{ entry: EntryNoId }> = ({ entry }) => {
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
        <div>
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
        </div>
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
  const [{ patients },dispatch] = useStateValue();
  const [patient, setPatient] = React.useState<Patient>(patients[id]);
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();
  const openModal = (): void => setModalOpen(true);
  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };
  
  const submitNewEntry = async (values: EntryNoId) => {
    try {
      if (values.type === "HealthCheck") {
        //I literally only do this because the types
        // are correct, everything is correct but for some
        // reason when using the option element in the form
        // the value parses as string, it's some html thing
        // so I have to manually reparse the value an Number
        // oh god this is so dumb
        values.healthCheckRating = typeof values.healthCheckRating==="string"?parseInt(values.healthCheckRating):values.healthCheckRating;
      }
      console.log(values);
      const { data: newEntry } = await axios.post<Patient>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      console.log(newEntry);
      console.log(patients);
      setPatient(newEntry);
      dispatch(addEntry(newEntry));
    } catch (e: any) {
      console.error(e.response?.data || "Unknown error");
      setError(e.response?.data || "Unknown error");
    }
  };
  return (
    <>
      <h1>
        {patient.name}{" "}
        <Icon name={patient.gender == "male" ? "mars" : "venus"} />
      </h1>
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
      <h2>entries</h2>
      <Container>
        <Card.Group>
          {patient.entries?.map((entry, idx) => (
            <EntryDetails key={idx} entry={entry} />
          ))}
        </Card.Group>
        <AddEntryModal
          modalOpen={modalOpen}
          onSubmit={submitNewEntry}
          error={error}
          onClose={closeModal}
        />
        <Button primary onClick={openModal}>
          {" "}
          Add a new entry{" "}
        </Button>
      </Container>
    </>
  );
};
export default PatientPage;
