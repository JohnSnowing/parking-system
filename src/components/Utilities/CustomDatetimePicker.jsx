import React from "react";
import DateTimePicker from "react-datetime-picker";
import { FormGroup, Label } from "reactstrap";

const CustomDatetimePicker = ({
  id,
  label,
  name,
  placeholder,
  onChange,
  value,
  required,
  error,
}) => {
  return (
    <FormGroup className="pb-3">
      <Label for={id} className="pb-1 default-label">
        {label}
      </Label>
      <DateTimePicker
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        required={required}
      />
      {error && <p className="error-text">{label} is required</p>}
    </FormGroup>
  );
};

export default CustomDatetimePicker;
