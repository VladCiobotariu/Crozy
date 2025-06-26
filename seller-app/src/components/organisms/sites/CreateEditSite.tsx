import React from "react";
import {Controller, useForm} from "react-hook-form";
import {Box} from "../../atoms";
import {TextField} from "@mui/material";
import {FormBox} from "../../moleculas";
import {toUrlSlug} from "../../../utils";

export type SiteFormInput = {
    name: string;
    slug: string;
}

type CreateEditSiteProps = {
    onFormSubmitted(data: SiteFormInput): void;
    site?: SiteFormInput;
}

export const CreateEditSite = ({ onFormSubmitted, site }: CreateEditSiteProps) => {

    const defaultValues: SiteFormInput = site ?? {
        name: "",
        slug: "",
    };

    const {
        register,
        handleSubmit,
        control,
        watch,
        setValue,
        formState: { errors },
    } = useForm<SiteFormInput>({
        defaultValues,
    });

    const onNameChange = (field: { value: string }) => {
        const newSlug: string = toUrlSlug(field.value);
        setValue("slug", newSlug);
    };

    return (
        <FormBox
            handleSave={handleSubmit(onFormSubmitted)}
        >
            <Box>
                <Controller
                    name="name"
                    control={control}
                    rules={{ required: "This field is required" }}
                    render={({ field, fieldState }) => (
                        <TextField
                            label="Site name"
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
            </Box>
        </FormBox>
    )
}