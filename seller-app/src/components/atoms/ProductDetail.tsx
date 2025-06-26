import React from "react";
import {Typography, useTheme} from "@mui/material";

type IProps = {
    label: string;
    content: string | any;
    isSmallSize: boolean;
}
const ProductDetail = ({label, content, isSmallSize} : IProps) => {

    const theme = useTheme()
    const variantForLabel = isSmallSize ? "subtitle1" : "h6";

    return (
        <Typography variant="subtitle1" sx={{ mt: theme.spacing(1) }}>
            <Typography variant={variantForLabel} component="span" sx={{fontWeight: "bold"}}>
                {label}:
            </Typography>
            <Typography>
                {content}
            </Typography>

        </Typography>
    )
}

export default ProductDetail;