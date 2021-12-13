import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";
import { HealthCheckRating, Entry } from "../types";
import { DiagnosisSelection, TextField } from "../AddPatientModal/FormField";
import { SelectField, HealthCheckOptions } from "./FormField";
import { useStateValue } from "../state";
//Union omit
type UnionOmit<T, K extends string | number | symbol> = T extends unknown
  ? Omit<T, K>
  : never;
export type EntryFormValues = UnionOmit<Entry, "id">;
//structure of a single option
interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

export const AddEntryForm = ({
  onSubmit,
  onCancel,
}: Props) => {
  const [{ diagnoses }] = useStateValue();
  return (
    <Formik
      initialValues={{
        type: "HealthCheck",
        description: "",
        date: "",
        specialist: "",
        diagnosisCodes: [],
        healthCheckRating: HealthCheckRating.Healthy,
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (values.type === "HealthCheck") {
          if (!values.healthCheckRating) {
            errors.healthCheckRating = requiredError;
          }
        }
        return errors;
      }}
    >
      {({ isValid, dirty,setFieldValue,setFieldTouched }) => {
        return (
          <Form className="form ui">
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
            <SelectField
              label="HealthCheckRating"
              name="healthCheckRating"
              options={HealthCheckOptions}
            />
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};
export default AddEntryForm;
