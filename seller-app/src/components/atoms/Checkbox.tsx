import React from "react";
import { Checkbox as MUICheckbox, FormControlLabel } from "@mui/material";

type IProps = {
  disabled?: boolean;
  label?: string;
  checked?: boolean;
  indeterminate?: boolean;
  onChange?: (_: boolean, __?: any) => void;
  size?: number;
  icon?: JSX.Element;
  labelPlacement?: "start" | "end";
  onClick?: any;
  sx?: any;
};

export const Checkbox = ({
  disabled,
  checked,
  indeterminate,
  onChange,
  label,
  size = 24,
  icon,
  labelPlacement = "end",
  onClick,
  sx,
}: IProps) => {
  return (
    <FormControlLabel
      labelPlacement={labelPlacement}
      control={
        <MUICheckbox
          indeterminate={indeterminate}
          disabled={disabled}
          checked={checked}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            if (onChange) {
              onChange(event.target.checked, event);
            }
          }}
          icon={icon}
          checkedIcon={icon}
          sx={[{ "& .MuiSvgIcon-root": { fontSize: size } }, sx]}
          onClick={onClick}
        />
      }
      label={label}
    />
  );
};
