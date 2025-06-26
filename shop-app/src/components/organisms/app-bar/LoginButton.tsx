import React from "react";
import { Button } from "@mui/joy";
import { signIn } from "next-auth/react";

const LoginButton = () => {

  const onClick = () => {
    signIn("azure-ad-b2c");
  };

  return (
    <Button
      variant="outlined"
      sx={theme => ({
        borderRadius: 14,
        border: 1,
        color: theme.palette.text.secondary,
      })}
      size="md"
      onClick={onClick}
    >
      Login
    </Button>
  );
};

export default LoginButton;
