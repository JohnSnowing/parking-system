import React from "react";
import { FormGroup, Label } from "reactstrap";
import Select from "react-select";

const CustomSelect = ({
  id,
  label,
  placeholder,
  options,
  onChange,
  value,
  isMulti,
  error,
}) => {
  const defaultValue = (options, value) => {
    return options ? options.find((option) => option.value === value) : "";
  };
  return (
    <FormGroup className="pb-3">
      <Label for={id} className="pb-1 default-label">
        {label}
      </Label>
      <div style={{ borderRadius: "" }}>
        <Select
          id={id}
          placeholder={placeholder}
          components={{
            IndicatorSeparator: () => null,
          }}
          isMulti={isMulti ? true : false}
          onChange={(value) => onChange(value)}
          options={options}
          value={defaultValue(options, value)}
          isSearchable={false}
        />
      </div>

      {error && <p className="error-text">{label} is required</p>}
    </FormGroup>
  );
};

export default CustomSelect;
