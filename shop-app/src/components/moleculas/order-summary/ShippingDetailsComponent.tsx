import { Address } from "@/providers";
import DetailsSummaryContainer from "@atoms/order-summary/DetailsSummaryContainer";
import StyledDetailsText from "@atoms/order-summary/StyledDetailsText";
import React from "react";

type ShippingDetailsComponentProps = {
    shippingDetails: Address;
};

const ShippingDetailsComponent = ({shippingDetails}:ShippingDetailsComponentProps) => {

    const deliveryAddressData = [
        { fieldName: "Locul livrării", fieldValue: shippingDetails?.displayName},
        { fieldName: "Județ", fieldValue: shippingDetails?.region},
        { fieldName: "Oraș", fieldValue: shippingDetails?.city},
        { fieldName: "Adresă",
          fieldValue: shippingDetails?.line2
            ? `${shippingDetails?.line1}, ${shippingDetails?.line2}`
            : shippingDetails?.line1,
        },
      ];

    return (
        <DetailsSummaryContainer label={"Modalitate de livrare"}>
            {deliveryAddressData.map((item) => (
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

export default ShippingDetailsComponent;