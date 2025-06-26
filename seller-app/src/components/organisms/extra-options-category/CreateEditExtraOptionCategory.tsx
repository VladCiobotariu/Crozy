import React from "react";
import { FormBox } from "../../moleculas";
import { Box } from "../../atoms";
import { Controller, useForm } from "react-hook-form";
import { TextField } from "@mui/material";

export type ExtraOptionCategoryFormInput = {
  name: string;
};

type CreateEditExtraOptionCategoryProps = {
  loading?: boolean;
  onFormSubmitted(data: ExtraOptionCategoryFormInput): void;
  extraOptionCategory?: ExtraOptionCategoryFormInput;
};
export const CreateEditExtraOptionCategory = ({ onFormSubmitted, extraOptionCategory, loading = false }: CreateEditExtraOptionCategoryProps) => {
  const defaultValues: ExtraOptionCategoryFormInput = extraOptionCategory ?? {
    name: "",
  };

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ExtraOptionCategoryFormInput>({
    defaultValues,
  });

  return (
    <FormBox loading={loading} handleSave={handleSubmit(onFormSubmitted)}>
      <Box>
        <form>
          <Controller
            name="name"
            control={control}
            rules={{ required: "This field is required" }}
            render={({ field, fieldState }) => (
              <TextField
                label="Extra Option Category name"
                fullWidth
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                {...field}
                sx={{ my: 1, py: 1 }}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  field.onChange(event);
                }}
              />
            )}
          />
        </form>
      </Box>
    </FormBox>
  );
};
