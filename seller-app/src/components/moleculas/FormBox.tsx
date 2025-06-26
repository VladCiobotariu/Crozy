import React, { Fragment } from "react";
import { Button, Box } from "../atoms";
import { Save, Delete } from "../atoms/icons";
import { styled } from "@mui/material";

type IProps = {
  children: React.ReactElement | React.ReactElement[];
  loading?: boolean;
  handleSave?: () => void;
  handleDelete?: () => void;
  className?: string;
};

const FormBoxContainer = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.colors.N100,
  color: theme.palette.colors.N900,
  transition: `box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms`,
  borderRadius: 10,
  border: `1px solid ${theme.palette.colors.borders.R200}`,
  backgroundClip: "padding-box",
  boxShadow: "none",
  overflow: "hidden",
}));

const FormButtonContainer = styled("div")(({ theme }) => ({
  minHeight: 64,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  backgroundColor: theme.palette.colors.R200,
  padding: "0 16px",
}));

const FormButton = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

export const FormBox = ({ children, loading, handleSave, handleDelete }: IProps) => {
  const SaveAction = (
    <FormButton>
      <Save fontSize="small" sx={{ paddingRight: 1 }} /> Save
    </FormButton>
  );

  const DeleteAction = (
    <FormButton>
      <Delete fontSize="small" sx={{ paddingRight: 1 }} /> Delete
    </FormButton>
  );

  return (
    <Fragment>
      <FormBoxContainer>
        <Box component="div" sx={{ padding: 2, maxWidth: "75vw" }}>
          {children}
        </Box>

        {handleSave ? (
          <FormButtonContainer>
            <Button loading={loading} onClick={handleSave} title={SaveAction} />
            {handleDelete ? (
              <Button color="error" onClick={handleSave} title={DeleteAction} />
            ) : null}
          </FormButtonContainer>
        ) : null}
      </FormBoxContainer>
    </Fragment>
  );
};
