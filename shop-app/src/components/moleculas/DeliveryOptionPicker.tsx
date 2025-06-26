import Radio from "@mui/joy/Radio";
import RadioGroup from "@mui/joy/RadioGroup";
import Sheet from "@mui/joy/Sheet";
import React, { useEffect, useState } from "react";
import { Noop } from "react-hook-form";
import { Address, useBasket } from "../../providers";

type DeliveryOption = {
  id: string;
  name: string;
  address: Address;
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  children?: React.ReactNode;
  // ... your custom props here
}

interface IProps {
  onChange: (...event: any[]) => void | undefined;
  name: string;
  value: Address | undefined;
  onBlur: Noop;
  addresses: Address[] | undefined;
}

const DeliveryOptionPicker = ({ addresses, onChange, value, ...rest }: IProps) => {
  const getId = (address: Address) => `${address.displayName}-${address.line1}`;

  const { setDeliveryAddress } = useBasket();

  const options: DeliveryOption[] = addresses
    ? addresses.map(x => ({
        id: getId(x),
        name: x.displayName ? x.displayName : `${x.line1}, ${x.city}, ${x.region}, ${x.country}`,
        address: x,
      }))
    : [];

  const [selectedValue, setSelectedValue] = useState<string>("-");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange && event.target.value) {
      const option = options.find(x => x.id === event.target.value);
      if (option) {
        setDeliveryAddress(option.address);
        onChange(option.address);
      } else {
        throw Error(`Not able to find option with value ${event.target.value}`);
      }
    }
  };

  useEffect(() => {
    if (value) {
      const id = getId(value);
      setSelectedValue(id);
    } else {
      setSelectedValue("-");
    }
  }, [value]);

  return (
    <RadioGroup
      aria-labelledby="Delivery-options-label"
      size="lg"
      sx={{ gap: 1.5, display: "flex", flexDirection: "row" }}
      {...rest}
      defaultValue="-"
      value={selectedValue ?? "-"}
      onChange={handleChange}
    >
      {options.map(option => (
        <Sheet key={option.id} sx={{ p: 2, borderRadius: "md" }}>
          <Radio
            label={`${option.name}`}
            value={option.id}
            overlay
            disableIcon
            slotProps={{
              label: ({ checked }) => ({
                sx: {
                  fontWeight: "lg",
                  fontSize: "md",
                  color: checked ? "text.primary" : "text.secondary",
                },
              }),
              action: ({ checked }) => ({
                sx: theme => ({
                  ...(checked && {
                    "--variant-borderWidth": "2px",
                    "&&": {
                      // && to increase the specificity to win the base :hover styles
                      borderColor: theme.vars.palette.primary[500],
                    },
                  }),
                }),
              }),
            }}
          />
        </Sheet>
      ))}
    </RadioGroup>
  );
};

export default DeliveryOptionPicker;
