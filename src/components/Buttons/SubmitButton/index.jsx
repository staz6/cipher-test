import styled from '@emotion/styled'
import { Button } from '@mui/material'
import React from 'react'

const CustomButton = styled(Button)({
    minWidth:"200px",
    backgroundColor:"#f16d36",
    color:"#fff",
    textTransform:"inherit",
    height: "45px",
    fontSize: "1.2rem",
    padding: "10px 20px",
    marginTop:"3vh",
    "&:hover":{
    backgroundColor:"#f16d36",
        opacity:0.8
    }
})

function SubmitButton({label,...props}) {
  return (
    <CustomButton type="submit">
        {label}
    </CustomButton>
  )
}

export default SubmitButton