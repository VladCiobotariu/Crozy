import React from "react";
import { FormBox } from "../../moleculas";
import { Box } from "../../atoms";
import { Controller, Resolver, useForm } from "react-hook-form";
import { FormControl, FormHelperText, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import { Currency, Money, useGetExtraOptionsCategoriesNameQuery, useGetExtraOptionsCategoriesQuery } from "@/generated/graphql";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const CreateEditExtraOptionSchema = yup.object().shape({
  name: yup.string().required("This field is required"),
  priceAmount: yup
    .number()
    .min(0, "Price must be greater than or equal to 0")
    .required("This field is required"),
  priceCurrency: yup.mixed<Currency>()
    .oneOf(Object.values(Currency))
    .required('This field is required'),
  extraOptionCategoryId: yup.string().required("This field is required"),
});

export type ExtraOptionFormInput = {
  name: string;
  priceAmount: number;
  priceCurrency: Currency
  extraOptionCategoryId: string;
};

type CreateEditExtraOptionProps = {
  categoryId?: string;
  loading?: boolean;
  onFormSubmitted(data: ExtraOptionFormInput): void;
  extraOption?: ExtraOptionFormInput;
};

export const CreateEditExtraOption = ({ onFormSubmitted, categoryId, extraOption, loading = false }: CreateEditExtraOptionProps) => {

  const availableCurrencies = (Object.values(Currency) as Array<Currency>).filter(x=>x !== Currency.None)
  const firstCurrency = availableCurrencies.at(0)

  const defaultValues: ExtraOptionFormInput = extraOption ?? {
    name: "",
    priceAmount: 0,
    priceCurrency: availableCurrencies.length === 1 && firstCurrency ? firstCurrency : Currency.None,
    extraOptionCategoryId: categoryId ?? ""
  };

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ExtraOptionFormInput>({
    defaultValues,
    resolver: yupResolver(CreateEditExtraOptionSchema) as Resolver<ExtraOptionFormInput>,
  });

  const { data, loading: categoriesLoading } = useGetExtraOptionsCategoriesNameQuery();
  const extraOptionCategories = data?.allExtraOptionsCategoriesForCurrentOrganisation;

  return (
    <>
      {categoriesLoading ? <>Loading...</> : 
        <FormBox loading={loading} handleSave={handleSubmit(onFormSubmitted)}>
          <Box>
            <form>
              <Controller
                name="name"
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    label="Name"
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
              <Controller
                name="priceAmount"
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
                name="priceCurrency"
                control={control}
                render={({ field: { onChange, ...otherFields } }) => (
                  <FormControl fullWidth error={!!errors.priceCurrency} sx={{ my: 1, py: 1 }}>
                    <InputLabel id={"price-currency-select-label"}>Price Currency</InputLabel>
                    <Select
                      labelId="price-currency-select-label"
                      id="price-currency-select"
                      label="Price Currency"
                      inputProps={{ readOnly: availableCurrencies.length === 1 }}
                      {...otherFields}
                      {...register("priceCurrency")}
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
                    {errors.priceCurrency && (
                      <FormHelperText>{errors.priceCurrency.message}</FormHelperText>
                    )}
                  </FormControl>
                )}
              />
              <Controller
                name="extraOptionCategoryId"
                control={control}
                render={({ field: { onChange, value, ...otherFields } }) => (
                  <FormControl fullWidth sx={{ my: 1, py: 1 }}>
                    <InputLabel id="extra-option-category-select-label">Extra Option Category</InputLabel>
                    <Select
                      labelId="extra-option-category-select-label"
                      id="extra-option-category-select"
                      label="Extra Option Category"
                      {...otherFields}
                      value={[value]}
                      onChange={(event: SelectChangeEvent<string[]>, newValue) => {
                        onChange(
                          Array.isArray(event.target.value) ? event.target.value[0] : event.target.value
                        );
                      }}
                    >
                      {extraOptionCategories?.nodes?.map(x => (
                        <MenuItem key={x?.id} value={x?.id}>
                          {x?.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              />
            </form>
          </Box>
        </FormBox>
      }
    </>
  );
};
