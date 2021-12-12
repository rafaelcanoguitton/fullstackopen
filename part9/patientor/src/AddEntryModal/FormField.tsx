import React from "react";
import { Form } from "semantic-ui-react";
import { HealthCheckRating } from "../types";
import { Field } from "formik";
export type HealthOption = {
  value: HealthCheckRating;
  label: string;
};
export const HealthCheckOptions: HealthOption[] = [
  { value: HealthCheckRating.Healthy, label: "Healthy" },
  { value: HealthCheckRating.LowRisk, label: "Low Risk" },
  { value: HealthCheckRating.HighRisk, label: "High Risk" },
  { value: HealthCheckRating.CriticalRisk, label: "Critical Risk" },
];
export type SelectFieldProps = {
  name: string;
  label: string;
  options: HealthOption[];
};
export const SelectField = ({ label, name, options }: SelectFieldProps) => (
  <Form.Field>
    <label>{label}</label>
    <Field as="select" name={name} className="ui dropdown">
      {options.map((option) => {
        
        return (
          <option key={option.value} value={option.value}>
            {option.label || option.value}
          </option>
        );
      })}
    </Field>
  </Form.Field>
);
