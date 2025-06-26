import { CustomerDetails } from "@/providers";
import DetailsSummaryContainer from "@atoms/order-summary/DetailsSummaryContainer";
import StyledDetailsText from "@atoms/order-summary/StyledDetailsText";
import { Box, Typography } from "@mui/joy";
import React from "react";

type CustomerDetailsProps = {
    customerDetails: CustomerDetails;
};

const CustomerDetailsComponent = ({customerDetails}:CustomerDetailsProps) => {

    const customerData = [
        { fieldName: "Nume", fieldValue: `${customerDetails.firstName} ${customerDetails.lastName}` },
        { fieldName: "Email", fieldValue: customerDetails?.email},
        { fieldName: "Număr de telefon", fieldValue: customerDetails?.phoneNumber},
    ];

    return (
        <DetailsSummaryContainer label={"Date despre cumpărător"}>
            {customerData.map((item) => (
                item.fieldName && item.fieldValue && (
                <StyledDetailsText
                    key={item.fieldName} 
                    fieldName={item.fieldName} 
                    fieldValue={item.fieldValue} />
                )
            ))}
        </DetailsSummaryContainer>
    );
};

export default CustomerDetailsComponent;