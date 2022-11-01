import { InputAdornment } from "@mui/material";
import { styled } from "@mui/system";
import React from "react";
import { Input as sStyle } from "../style";

const Input = styled(sStyle)({
    
})

function FMUCurrencyInput({
    label,
    field,
    form: { dirty, touched, errors },
    ...props
  }) {
    const errorText = errors[field.name];
    const hasError = dirty && touched[field.name] && errorText !== undefined;
    return (
      <Input
        id={`${label}-MatxCurrencyField`}
        type="number"
        variant="outlined"
        fullWidth
        InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                %
              </InputAdornment>
            ),
          }}
        error={hasError}
        {...field}
        {...props}
      />
    );
  }

export default FMUCurrencyInput