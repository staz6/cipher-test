import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { Checkbox, FormControlLabel } from '@mui/material';
import React from 'react';

function MatxCircleCheckBox(props) {
    const {
        label, field, form,checked, ...other
    } = props;

    return (
        <FormControlLabel
            control={
                <Checkbox
                icon={<RadioButtonUncheckedIcon  />}
            checkedIcon={<CheckCircleIcon style={{color:"#f16d36"}} />}
              
                    {...field}
                    checked={checked}
                    // classes={{root: classes.root, checked: classes.checked}}
                />
            }
            label={label}
            {...other}
        />
    );
}

export default MatxCircleCheckBox