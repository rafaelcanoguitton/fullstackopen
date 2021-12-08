import React from "react";
import { useParams } from "react-router";
import { Icon } from "semantic-ui-react";
import { useStateValue } from "../state";
import { Patient } from "../types";
const PatientPage = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patients },] = useStateValue();
  const patient: Patient = patients[id];
  return (
    <>
      <h1>
        {patient.name}{" "}
        <Icon name={patient.gender == "male" ? "mars" : "venus"} />
      </h1>
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
    </>
  );
};
export default PatientPage;
