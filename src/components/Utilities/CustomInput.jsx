import React from "react";
import { FormGroup, Input, Label } from "reactstrap";

const CustomInput = ({
  id,
  label,
  type,
  name,
  placeholder,
  onChange,
  value,
  maxLength,
  className,
  disable,
  required,
  error,
}) => {
  return (
    <FormGroup className="pb-3">
      <Label for={id} className="pb-1 default-label">
        {label}
      </Label>
      <Input
        id={id}
        disabled={disable}
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        maxLength={maxLength}
        required={required}
      />
      {error && <p className="error-text">{label} is required</p>}
    </FormGroup>
  );
};

export default CustomInput;
