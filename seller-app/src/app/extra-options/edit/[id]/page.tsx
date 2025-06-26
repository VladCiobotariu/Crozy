"use client"

import { useRouter } from "next/navigation";
import React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useRouteId } from "@/hooks";
import BackButton from "@atoms/BackButton";
import { useGetExtraOptionByIdQuery, useUpdateExtraOptionMutation } from "@/generated/graphql";
import { CreateEditExtraOption, ExtraOptionFormInput } from "@/components/organisms/extra-options/CreateEditExtraOption";

type EditExtraOptionProps = {
  id: string;
};

const EditExtraOption = ({ id }: EditExtraOptionProps) => {
  const router = useRouter();

  const { loading, error, data } = useGetExtraOptionByIdQuery({ variables: { id } });
  const extraOption: ExtraOptionFormInput | null = data?.extraOptionById.extraOption
    ? {
        ...data.extraOptionById.extraOption,
        priceAmount: data.extraOptionById.extraOption.price.amount,
        priceCurrency: data.extraOptionById.extraOption.price.currency,
      }
    : null;

  const [updateExtraOption, { loading: mutLoading, error: mutErrors }] =
    useUpdateExtraOptionMutation();

  const onUpdateExtraOption = async (data: ExtraOptionFormInput) => {
    await updateExtraOption({
      variables: {
        input: {
          id: id,
          name: data.name,
          extraOptionCategoryId: data.extraOptionCategoryId,
          price: {
            amount: data.priceAmount,
            currency: data.priceCurrency
          }
        },
      },
    });
    router.back();
  };

  return loading || mutLoading ? (
    <Typography>Loading...</Typography>
  ) : extraOption ? (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "flex-start", marginBottom: 5 }}>
        <BackButton />
      </Box>
      <CreateEditExtraOption
        onFormSubmitted={onUpdateExtraOption}
        extraOption={extraOption}
      />
    </Box>
  ) : (
    <Typography>Sorry, extra option was not found</Typography>
  );
};

const EditExtraOptionPage = () => {
  const id = useRouteId();
  return <>{id ? <EditExtraOption id={id} /> : <CircularProgress />}</>;
};

export default EditExtraOptionPage;
