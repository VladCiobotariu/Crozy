"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Box } from "@mui/material";
import BackButton from "../../../components/atoms/BackButton";
import { CreateEditExtraOption, ExtraOptionFormInput } from "@/components/organisms/extra-options/CreateEditExtraOption";
import { GetAllExtraOptionsPaginationDocument, GetCreateProductDetailsDocument, GetExtraOptionCategoryWithExtraOptionsByIdDocument, useAddExtraOptionMutation } from "@/generated/graphql";

const CreateExtraOption = ({searchParams}: {searchParams?: { categoryId: string };}) => {
  const router = useRouter();
  const [addExtraOption, { loading, error }] = useAddExtraOptionMutation();

  const onCreateExtraOption = async (data: ExtraOptionFormInput) => {
    await addExtraOption({
      variables: { input:
        {
          name: data.name,
          extraOptionCategoryId: data.extraOptionCategoryId, 
          price: {
            amount: data.priceAmount,
            currency: data.priceCurrency
          }, 
        }
      },
      awaitRefetchQueries: true,
      refetchQueries: [
        {
          query: GetAllExtraOptionsPaginationDocument,
        },
        {
          query: GetExtraOptionCategoryWithExtraOptionsByIdDocument,
          variables: {
            id: searchParams?.categoryId
          }
        },
      ]
    });
    router.back();
  };

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "flex-start", marginBottom: 5 }}>
        <BackButton/>
      </Box>
      <CreateEditExtraOption categoryId={searchParams?.categoryId} loading={loading} onFormSubmitted={onCreateExtraOption} />
    </Box>
  );
};

export default CreateExtraOption;
