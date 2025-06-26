import theme from "@/utils/theme";
import { Typography } from "@mui/joy";
import React from "react";


type StyledDetailsTextProps = {
    fieldName: string;
    fieldValue: string;
};
  
const StyledDetailsText = ({fieldName, fieldValue}: StyledDetailsTextProps) => {
  
    return (
      <Typography 
        sx={{ 
          fontWeight: "300", 
          [theme.breakpoints.down('md')]: {
            fontSize: "14px"
          }, 
        }}>
        <Typography 
          component="span" 
          sx={{ 
            fontWeight: "500", 
            [theme.breakpoints.down('md')]: {
              fontSize: "14px"
            },
          }}>
          {fieldName}:{" "}
        </Typography>
        {fieldValue}
      </Typography>
    );
};

export default StyledDetailsText;