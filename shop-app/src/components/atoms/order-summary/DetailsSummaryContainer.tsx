import { Box, Typography, useTheme } from "@mui/joy";
import { useMediaQuery } from "@mui/system";
import React, { ReactNode } from "react";

type DetailsSummaryContainerProps = {
    label: string;
    children: ReactNode;
};

const DetailsSummaryContainer = ({label, children}:DetailsSummaryContainerProps) => {

    const theme = useTheme();
    const isMediumSize = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <Box sx={theme => ({
            width: "100%", 
            borderRadius: "10px",
            border: 1,
            borderColor: theme.vars.palette.divider,
            display: "flex",
            flexDirection: "column",
            gap: theme.spacing(2),
            padding: {
                xs: theme.spacing(1),
                md: theme.spacing(2),
            },
            [theme.breakpoints.down('md')]: {
                gap: theme.spacing(0.5),
            },
            })}>
            <Typography level={isMediumSize ? "title-sm" : "title-md"}>{label}</Typography>
            <Box sx={{
                display: "flex", 
                flexDirection: "column",
                [theme.breakpoints.up('md')]: {
                    gap: 0.5,
                },
            }}>
                {children}
            </Box>
        </Box>
    );
};

export default DetailsSummaryContainer;