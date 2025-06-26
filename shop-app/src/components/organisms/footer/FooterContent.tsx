import { Box, Typography, useTheme } from "@mui/joy";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const FooterContent = () => {

    const theme = useTheme();

    return (
        <Box sx={{
            width: "100vw",
            maxWidth: "lg",
        }}>
            <Box sx={{ 
                borderBottom: "1px solid",
                borderColor: "divider",
                paddingBottom: "1rem",
            }}>
                <Link href={"/cookie-policy"}>
                    Politica de utilizare a cookie-urilor
                </Link>
            </Box>
            <Box sx={{
                    paddingTop: "1rem",
                    display: "flex", 
                    justifyContent: "space-between",
                    flexDirection: "row",
                    [theme.breakpoints.down("md")]: {
                        justifyContent: "center",
                        flexDirection: "column-reverse",
                        gap: "2rem",
                    },
                    textTransform: "uppercase"
                }}>
                <Typography>
                    &#169; Ozius Solutions S.R.L. 2024. All rights reserved.
                </Typography>
            </Box>
            <Box sx={theme=>({
                display: "flex",
                flexDirection: "row",
                pt: "2rem",
                justifyContent: "flex-end",
                [theme.breakpoints.down('sm')]: {
                    justifyContent: "flex-start",
                },
            })}>
                <Box sx={theme=>({
                    display: "flex",
                    flexDirection: "row",
                    gap: "1rem",
                    [theme.breakpoints.down('sm')]: {
                        flexDirection: "column",
                        justifySelf: "flex-start"
                    },
                })}>
                    <Link href={"https://ec.europa.eu/consumers/odr/main/index.cfm?event=main.home2.show&lng=RO"}>
                        <Image src={'/images/sol.webp'} alt={"Solutionarea Online a Litigilor"} width={250} height={50}/>
                    </Link>
                    <Link href={"https://anpc.ro/ce-este-sal/"}>
                        <Image src={'/images/sal.webp'} alt={"Solutionarea Alternativa a Litigilor"} width={250} height={50}/>
                    </Link>
                </Box>
            </Box>
        </Box>
    );
};

export default FooterContent;