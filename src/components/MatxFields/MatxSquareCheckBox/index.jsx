import { Square } from '@mui/icons-material';
import { Checkbox, FormControlLabel } from '@mui/material';
import React from 'react'

function MatxSquareCheckBox(props) {
    const {
        label, field, form,checked, ...other
    } = props;

    return (
        <FormControlLabel
            control={
                <Checkbox
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

export default MatxSquareCheckBox