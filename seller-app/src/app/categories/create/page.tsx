"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Box } from "@mui/material";
import { AddCategoryInput, useAddCategoryMutation } from "../../../generated/graphql";
import BackButton from "../../../components/atoms/BackButton";
import { CreateEditCategory } from "../../../components/organisms";

const CreateCategory = () => {
  const router = useRouter();
  const [addCategory, { loading, error }] = useAddCategoryMutation();

  const onCreateCategory = async (data: AddCategoryInput) => {
    await addCategory({
      variables: { input: { ...data, displayNumber: Number(data.displayNumber) } },
    });
    router.push("/categories");
  };

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "flex-start", marginBottom: 5 }}>
        <BackButton/>
      </Box>
      <CreateEditCategory onFormSubmitted={onCreateCategory} />
    </Box>
  );
};

export default CreateCategory;
