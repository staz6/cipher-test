import { styled } from "@mui/system";
import React from "react";
import { Input as sStyle } from "../style";

const Input = styled(sStyle)({
    
})

function FMUInput({
  label,
  field,
  form: { dirty, touched, errors },
  ...props
}) {
  const errorText = errors[field.name];
  const hasError = dirty && touched[field.name] && errorText !== undefined;
  return (
    <Input
      id={`${label}-MatxInput`}
      variant="outlined"
      fullWidth
      error={hasError}
      {...field}
      {...props}
    />
  );
}

export default FMUInput;
