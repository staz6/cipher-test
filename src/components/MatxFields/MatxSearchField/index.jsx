import { Search, SearchOffOutlined } from "@mui/icons-material";
import { InputAdornment } from "@mui/material";
import { styled } from "@mui/system";
import React from "react";
import { Input as sStyle } from "../../FMUFields/style";

const Input = styled(sStyle)({
    "& .MuiInputBase-root":{
      paddingLeft:"4px"
    }
})

function MatxSearchField({
    ...props
  }) {
    return (
      <Input
        id={`MatxSearchField`}
        type="text"
        variant="outlined"
        fullWidth
        InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search/>
              </InputAdornment>
            ),
          }}
        {...props}
      />
    );
  }

export default MatxSearchField