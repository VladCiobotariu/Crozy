import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { Controller, Resolver, useForm } from "react-hook-form";
import { Currency, useGetCreateProductDetailsQuery } from "../../../generated/graphql";
import { toUrlSlug } from "../../../utils";
import { Box, Button } from "../../atoms";
import { FormBox, UploadController } from "../../moleculas";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useOrganisation } from "../../../providers/OrganisationProvider";


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    },
  },
};

export type ProductFormInput = {
  siteId: string;
  name: string;
  price: number;
  currency: Currency;
  slug: string;
  description?: string | undefined | null;
  image?: string | undefined | null;
  imageUrl?: string | undefined | null;
  categoryIds: string[];
  extraOptionIds: string[];
};

type CreateEditProductProps = {
  onFormSubmitted(data: ProductFormInput): void;
  product?: ProductFormInput;
};

const CreateEditProductSchema = yup.object().shape({
  name: yup.string().required("This field is required"),
  slug: yup.string().required("This field is required"),
  price: yup
    .number()
    .min(0, "Price must be greater than or equal to 0")
    .required("This field is required"),
  currency: yup.mixed<Currency>()
    .oneOf(Object.values(Currency))
    .required('This field is required'),
  description: yup.string().required("This field is required"),
  categoryIds: yup
    .array()
    .of(yup.string())
    .min(1, "You must choose at least one Category")
    .required("This field is required"),
  siteId: yup.string().required("This field is required"),
  image: yup.string().optional(),
  extraOptionIds: yup.array().of(yup.string()).optional(),
});

export const CreateEditProduct = ({ onFormSubmitted, product }: CreateEditProductProps) => {
  const { organisationId } = useOrganisation();
  const { data } = useGetCreateProductDetailsQuery({
    variables: { organisationId: organisationId },
  });
  const sites = data?.sites;
  const categories = data?.categories;
  const extraOptions = data?.allExtraOptionsForCurrentOrganisation;

  const [openCategory, setOpenCategory] = useState(false);
  const [openExtraOptions, setOpenExtraOptions] = useState(false);

  const availableCurrencies = (Object.values(Currency) as Array<Currency>).filter(x=>x !== Currency.None)
  const firstCurrency = availableCurrencies.at(0)

  const defaultValues: ProductFormInput = product ?? {
    description: "",
    name: "",
    image: undefined,
    price: 0,
    currency: availableCurrencies.length === 1 && firstCurrency ? firstCurrency : Currency.None,
    siteId: "",
    slug: "",
    categoryIds: [],
    extraOptionIds: [],
  };

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<ProductFormInput>({
    defaultValues,
    resolver: yupResolver(CreateEditProductSchema) as Resolver<ProductFormInput>,
  });

  const onNameChange = (field: { value: string }) => {
    const newSlug: string = toUrlSlug(field.value);
    setValue("slug", newSlug);
  };

  const onFileChange = (image: any) => {
    setValue("image", image);
  };

  return (
    <FormBox handleSave={handleSubmit(onFormSubmitted)}>
      <Box>
        <form>
          <Controller
            name="name"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                label="Product name"
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
            name="price"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                label="Price"
                fullWidth
                InputProps={{ inputProps: { min: 0 } }}
                type="number"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                {...field}
                sx={{ my: 1, py: 1 }}
              />
            )}
          />
          <Controller
            name="currency"
            control={control}
            render={({ field: { onChange, ...otherFields } }) => (
              <FormControl fullWidth error={!!errors.currency} sx={{ my: 1, py: 1 }}>
                <InputLabel id={"currency-select-label"}>Price Currency</InputLabel>
                <Select
                  labelId="currency-select-label"
                  id="currency-select"
                  label="Price Currency"
                  inputProps={{ readOnly: availableCurrencies.length === 1 }}
                  {...otherFields}
                  {...register("currency")}
                  onChange={(event) => {
                    onChange(event.target.value as Currency);
                  }}
                >
                  {(Object.values(Currency) as Array<Currency>).filter(x=>x !== Currency.None).map((x) => (
                    <MenuItem key={x} value={x}>
                      {x}
                    </MenuItem>
                  ))}
                </Select>
                {errors.currency && (
                  <FormHelperText>{errors.currency.message}</FormHelperText>
                )}
              </FormControl>
            )}
          />
          <Controller
            name="description"
            defaultValue=""
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                label="Description"
                fullWidth
                multiline
                rows={2}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                {...field}
                sx={{ my: 1, py: 1 }}
              />
            )}
          />
          <Controller
            name="categoryIds"
            control={control}
            render={({ field: { onChange, ...otherFields } }) => (
              <FormControl fullWidth error={!!errors.categoryIds} sx={{ my: 1, py: 1 }}>
                <InputLabel id="category-select-label">Category</InputLabel>
                <Select
                  labelId="category-select-label"
                  id="category-select"
                  label="Category"
                  {...otherFields}
                  {...register("categoryIds")}
                  onChange={(event: SelectChangeEvent<string[]>, newValue) => {
                    const selectedValues = Array.isArray(event.target.value)
                      ? event.target.value
                      : [event.target.value];
                    const filteredValues = selectedValues.filter(val => val !== undefined);
                    onChange(filteredValues);
                  }}
                  multiple={true}
                  open={openCategory}
                  onClose={() => setOpenCategory(false)}
                  onOpen={() => setOpenCategory(true)}
                >
                  {categories?.nodes?.map(x => (
                    <MenuItem key={x?.id} value={x?.id}>
                      {x?.name}
                    </MenuItem>
                  ))}
                  <Button
                    onClick={() => setOpenCategory(false)}
                    title="Done"
                    size="small"
                    color="inherit"
                    sx={{ ml: "1rem" }}
                  />
                </Select>
                {errors.categoryIds && (
                  <FormHelperText>{errors.categoryIds.message}</FormHelperText>
                )}
              </FormControl>
            )}
          />
          
          <Controller
            name="extraOptionIds"
            control={control}
            render={({ field: { onChange, ...otherFields } }) => (
              <FormControl fullWidth error={!!errors.extraOptionIds} sx={{ my: 1, py: 1 }}>
                <InputLabel id="extra-option-select-label">Extra options</InputLabel>
                <Select
                  labelId="extra-option-select-label"
                  id="extra-option-select"
                  label="Extra Options"
                  {...otherFields}
                  {...register("extraOptionIds")}
                  onChange={(event: SelectChangeEvent<string[]>, newValue) => {
                    const selectedValues = Array.isArray(event.target.value)
                      ? event.target.value
                      : [event.target.value];
                    const filteredValues = selectedValues.filter(val => val !== undefined);
                    onChange(filteredValues);
                  }}
                  MenuProps={MenuProps}
                  multiple={true}
                  open={openExtraOptions}
                  onClose={() => setOpenExtraOptions(false)}
                  onOpen={() => setOpenExtraOptions(true)}
                >
                  {extraOptions?.map(x => (
                    <MenuItem key={x?.id} value={x?.id}>
                      {x?.name} ({x.category?.name})
                    </MenuItem>
                  ))}
                  <Button
                    onClick={() => setOpenExtraOptions(false)}
                    title="Done"
                    size="small"
                    color="inherit"
                    sx={{ ml: "1rem" }}
                  />
                </Select>
                {errors.extraOptionIds && (
                  <FormHelperText>{errors.extraOptionIds.message}</FormHelperText>
                )}
              </FormControl>
            )}
          />

          <Controller
            name="siteId"
            control={control}
            render={({ field: { onChange, value, ...otherFields } }) => (
              <FormControl fullWidth sx={{ my: 1, py: 1 }}>
                <InputLabel id="site-select-label">Site</InputLabel>
                <Select
                  labelId="site-select-label"
                  id="site-select"
                  label="Site"
                  {...otherFields}
                  value={[value]}
                  onChange={(event: SelectChangeEvent<string[]>, newValue) => {
                    onChange(
                      Array.isArray(event.target.value) ? event.target.value[0] : event.target.value
                    );
                  }}
                >
                  {sites?.nodes?.map(x => (
                    <MenuItem key={x?.id} value={x?.id}>
                      {x?.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          />

          <Controller
            name="image"
            control={control}
            render={() => (
              <UploadController
                setFile={onFileChange}
                imageFile={getValues("image")}
                imageUrl={product?.imageUrl}
              />
            )}
          />
        </form>
      </Box>
    </FormBox>
  );
};
