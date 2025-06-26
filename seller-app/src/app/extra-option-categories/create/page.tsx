"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Box } from "@mui/material";
import BackButton from "../../../components/atoms/BackButton";
import { AddExtraOptionCategoryInput, GetExtraOptionsCategoriesDocument, useAddExtraOptionCategoryMutation } from "@/generated/graphql";
import { CreateEditExtraOptionCategory } from "@/components/organisms/extra-options-category/CreateEditExtraOptionCategory";

const CreateExtraOptionCategory = () => {
  const router = useRouter();
  const [addExtraOptionCategory, { loading, error }] = useAddExtraOptionCategoryMutation();

  const onCreateExtraOptionCategory = async (data: AddExtraOptionCategoryInput) => {
    await addExtraOptionCategory({
      variables: { input: data },
      awaitRefetchQueries: true,
      refetchQueries: [
        {
          query: GetExtraOptionsCategoriesDocument,
        }
      ]
    });
    router.back();
  };

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "flex-start", marginBottom: 5 }}>
        <BackButton />
      </Box>
      <CreateEditExtraOptionCategory loading={loading} onFormSubmitted={onCreateExtraOptionCategory} />
    </Box>
  );
};

export default CreateExtraOptionCategory;
