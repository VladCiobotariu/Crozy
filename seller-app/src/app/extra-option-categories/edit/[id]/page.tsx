"use client"

import { useRouter } from "next/navigation";
import React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useRouteId } from "@/hooks";
import {
  useGetExtraOptionCategoryByIdQuery,
  useUpdateExtraOptionCategoryMutation,
} from "@/generated/graphql";
import {
  CreateEditExtraOptionCategory,
  ExtraOptionCategoryFormInput,
} from "@/components/organisms/extra-options-category/CreateEditExtraOptionCategory";
import BackButton from "@atoms/BackButton";

type EditExtraOptionCategoryProps = {
  id: string;
};

const EditExtraOptionCategory = ({ id }: EditExtraOptionCategoryProps) => {
  const router = useRouter();

  const { loading, error, data } = useGetExtraOptionCategoryByIdQuery({ variables: { id } });
  const extraOptionCategory: ExtraOptionCategoryFormInput | null =
    data?.extraOptionCategoryById.extraOptionCategory ?? null;

  const [updateCategory, { loading: mutLoading, error: mutErrors }] =
    useUpdateExtraOptionCategoryMutation();

  const onUpdateCategory = async (data: ExtraOptionCategoryFormInput) => {
    await updateCategory({
      variables: {
        input: {
          id: id,
          name: data.name,
        },
      },
    });
    router.back();
  };

  return loading || mutLoading ? (
    <Typography>Loading...</Typography>
  ) : extraOptionCategory ? (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "flex-start", marginBottom: 5 }}>
        <BackButton />
      </Box>
      <CreateEditExtraOptionCategory
        onFormSubmitted={onUpdateCategory}
        extraOptionCategory={extraOptionCategory}
      />
    </Box>
  ) : (
    <Typography>Sorry, extra option category was not found</Typography>
  );
};

const EditExtraOptionCategoryPage = () => {
  const id = useRouteId();
  return <>{id ? <EditExtraOptionCategory id={id} /> : <CircularProgress />}</>;
};

export default EditExtraOptionCategoryPage;
