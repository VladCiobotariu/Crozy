import React from "react";
import { FormBox } from "../../moleculas";
import { Box } from "../../atoms";
import { Controller, useForm } from "react-hook-form";
import { TextField } from "@mui/material";
import { toUrlSlug } from "../../../utils";

export type CategoryFormInput = {
  name: string;
  slug: string;
  description?: string | undefined | null;
  displayNumber: number;
};

type CreateEditCategoryProps = {
  onFormSubmitted(data: CategoryFormInput): void;
  category?: CategoryFormInput;
};
export const CreateEditCategory = ({ onFormSubmitted, category }: CreateEditCategoryProps) => {
  const defaultValues: CategoryFormInput = category ?? {
    name: "",
    slug: "",
    description: "",
    displayNumber: 0,
  };

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CategoryFormInput>({
    defaultValues,
  });

  const onNameChange = (field: { value: string }) => {
    const newSlug: string = toUrlSlug(field.value);
    setValue("slug", newSlug);
  };

  return (
    <FormBox handleSave={handleSubmit(onFormSubmitted)}>
      <Box>
        <Controller
          name="name"
          control={control}
          rules={{ required: "This field is required" }}
          render={({ field, fieldState }) => (
            <TextField
              label="Category name"
              fullWidth
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
              {...field}
              sx={{ my: 1, py: 1 }}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                field.onChange(event);
                onNameChange({ value: event.target.value });
              }}
            />
          )}
        />

        <Controller
          name="slug"
          control={control}
          rules={{ required: "This field is required" }}
          render={({ field, fieldState }) => (
            <TextField
              label="Slug"
              fullWidth
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
              {...field}
              sx={{ my: 1, py: 1 }}
            />
          )}
        />

        <Controller
          name="description"
          control={control}
          rules={{ required: false }}
          render={({ field, fieldState }) => (
            <TextField
              label="Description"
              fullWidth
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
              sx={{ my: 1, py: 1 }}
              value={field.value ?? ""}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                field.onChange(event);
                setValue("description", event.target.value);
              }}
            />
          )}
        />

        <Controller
          name="displayNumber"
          control={control}
          rules={{ required: false }}
          render={({ field, fieldState }) => (
            <TextField
              label="Display number"
              fullWidth
              type="number"
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
              sx={{ my: 1, py: 1 }}
              {...field}
            />
          )}
        />
      </Box>
    </FormBox>
  );
};
