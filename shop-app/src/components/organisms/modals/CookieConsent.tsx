import {Typography, Alert, Button } from "@mui/joy"
import { Box } from "@mui/system"
import Link from "next/link"

type CookieConsentProps = {
  onClickAccept: () => void;
  onClickReject: () => void
}

const CookieConsent = ({onClickAccept, onClickReject}:CookieConsentProps) => {
  return(
    <Alert variant="soft" sx={{
      position: "sticky",
      bottom: 0,
      width: "100vw",
      padding: "1.5rem",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      bgcolor: "background.cookieBg",
      boxShadow: "0px -1px 10px rgba(0, 0, 0, 0.1)",
    }}>
      <Box sx={theme=>({
        maxWidth: "lg",
        display: 'flex',
        flexDirection: "row",
        [theme.breakpoints.down('sm')]: {
          flexDirection: "column",
        },
        gap: "1.5rem"
      })}>
        <Box sx={{
          display: 'flex',
          flexDirection: "column",
          justifyContent: "center"
        }}>
          <Typography level="body-md" sx={theme=>({
            overflow: "auto",
            textAlign: "justify",
            maxHeight: `calc(${theme.typography["body-md"].lineHeight}*5)`,
          })}>
            Acest website folosește cookie-uri necesare și alte tehnologii similare pentru buna lui funcționare. 
            Apăsând Acceptă, vom folosi cookie-uri și în scopuri precum afișarea de conținut personalizat.
            Apăsând Respinge, nu vom folosi cookie-uri în aceste scopuri suplimentare, doar cele necesare.
            Află in secțiunea <Link href={"/cookie-policy"} style={{color: "blue"}}>Politica de utilizare a cookie-urilor</Link> mai 
            multe despre cookie-uri, inclusiv despre posibilitatea retragerii acordului.
          </Typography>
        </Box>
        <Box sx={theme=>({
          display: "flex",
          flexDirection: "column",
          [theme.breakpoints.down('sm')]: {
            flexDirection: "row",
          },
          alignItems: "flex-end",
          gap: "0.5rem",
        })}>
          <Button onClick={onClickAccept} size="lg" sx={{
            width: "100%"
          }}>
            Acceptă
          </Button>
          <Button onClick={onClickReject} size="lg" variant="outlined" sx={{
            width: "100%"
          }}>
            Respinge
          </Button>
        </Box>
      </Box>
    </Alert>
  )
}

export default CookieConsent