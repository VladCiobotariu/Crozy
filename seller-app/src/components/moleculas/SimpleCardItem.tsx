import { Button, Card, CardActions, CardContent, Typography } from "@mui/material";
import React from "react";

type SimpleCardItemProps = {
    maxWidth: number;
    children: React.ReactNode;
    cardActions?: boolean;
    href?: string;
    actionLabel?: string;
}

const SimpleCardItem = ({ maxWidth, cardActions=false, href, actionLabel, children}:SimpleCardItemProps) => {
    return (
        <Card variant="outlined" sx={{ maxWidth: maxWidth }}>
            <CardContent>
                {children}
            </CardContent>
            {(cardActions && href && actionLabel) && (
                <CardActions>
                    <Button href={href} size="small">{actionLabel}</Button>
                </CardActions>
            )}
        </Card>
    );
};

export default SimpleCardItem;