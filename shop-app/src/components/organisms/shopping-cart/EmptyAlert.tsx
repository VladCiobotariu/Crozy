"use client";
import Alert from "@mui/joy/Alert";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import InfoIcon from "@mui/icons-material/Info";
import Link from "next/link";
import { useState } from "react";

type EmptyShoppingCartProps = {
  link: string
  highlightedText: string
  text: string
}

const EmptyShoppingCart = ({link, highlightedText, text}:EmptyShoppingCartProps) => {
  const [show, setShow] = useState<boolean>(true);
  return (
    <>
      {show && (
        <Alert
          sx={theme => ({
            alignItems: "center",
            marginY: theme.spacing(4),
          })}
          startDecorator={<InfoIcon />}
          variant="soft"
          color="neutral"
          endDecorator={
            <IconButton variant="soft" color="neutral" onClick={() => setShow(false)}>
              <CloseRoundedIcon />
            </IconButton>
          }
        >
          <div>
            <Typography level="body-md">
              {text}{" "}
              <Link href={link} style={{
                color: "rgb(138, 130, 253)"
              }}>
                <span>{highlightedText}</span>
              </Link>
            </Typography>
          </div>
        </Alert>
      )}
    </>
  );
};

export default EmptyShoppingCart;
