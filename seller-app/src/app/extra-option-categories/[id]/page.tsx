"use client";

import React, { useState } from "react";
import { GetAllExtraOptionsPaginationDocument, GetCreateProductDetailsDocument, GetExtraOptionCategoryByIdDocument, GetExtraOptionCategoryWithExtraOptionsByIdDocument, useDeleteExtraOptionMutation, useGetExtraOptionCategoryWithExtraOptionsByIdQuery, useUpdateExtraOptionCategoryMutation } from "../../../generated/graphql";
import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import BackButton from "../../../components/atoms/BackButton";
import { useRouteId } from "../../../hooks";
import CircularProgress from "@mui/material/CircularProgress";
import ExtraOptions from "@/components/organisms/extra-options/ExtraOptions";
import Link from "next/link";
import EditIcon from "@mui/icons-material/Edit";
import { useRouter } from "next/navigation";
import { FormBox } from "@moleculas/FormBox";
import { Controller, useForm } from "react-hook-form";
import { ExtraOptionCategoryFormInput } from "@/components/organisms/extra-options-category/CreateEditExtraOptionCategory";

type ViewExtraOptionCategoryQuery = {
  id: string;
};

const ViewExtraOptionCategoryContent = ({ id }: ViewExtraOptionCategoryQuery) => {

  const router = useRouter()

  const { data, loading, error } = useGetExtraOptionCategoryWithExtraOptionsByIdQuery({ variables: { id } });

  const [name, setName] = useState<string>(data?.extraOptionCategoryById.extraOptionCategory?.name ?? "")
  const extraOptions = data?.extraOptionCategoryById.extraOptionCategory?.extraOptions?.nodes

  const [deleteExtraOption, { loading: deleteLoading, error: deleteErrors }] = useDeleteExtraOptionMutation();

  const handleOnDeleteExtraOption = async (extraOptionId: string) => {
    await deleteExtraOption({
      variables: {
        input: {
          id: extraOptionId,
        },
      },
      awaitRefetchQueries: true,
      refetchQueries: [
        {
          query: GetAllExtraOptionsPaginationDocument,
        },
        {
          query: GetExtraOptionCategoryWithExtraOptionsByIdDocument,
          variables: {
            id: id
          }
        }
      ]
    })
  }

  const handleOnUpdateExtraOption = async (id: string) => {
    router.push(`/extra-options/edit/${id}`)
  }

  const [updateCategory, { loading: updateLoading, error: updateErrors }] =
    useUpdateExtraOptionCategoryMutation();

  const onUpdateCategory = async (data: ExtraOptionCategoryFormInput) => {
    await updateCategory({
      variables: {
        input: {
          id: id,
          name: data.name,
        },
      },
      refetchQueries: [
        {
          query: GetExtraOptionCategoryByIdDocument,
          variables: {
            id: id
          }
        }
      ]
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case "Enter":
        onUpdateCategory({name: name});
        break;
      default:
    }
  };

  return loading ? (
    <Typography>Loading page...</Typography>
  ) : (
    <Box sx={theme=>({
      display: "flex",
      flexDirection: "column",
      gap: theme.spacing(2),
    })}>
      <Box sx={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
        <BackButton />
      </Box>
      <Box sx={theme=>({
        display: "flex",
        alignItems: "center",
        gap: theme.spacing(2),
      })}>
        <Box sx={theme=>({
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: theme.spacing(2)
        })}>
          <Typography sx={{
            fontSize: 20,
            wordWrap: "unset"
          }}>
            Name:
          </Typography>
          <TextField
            onKeyDown={handleKeyPress}
            required
            variant="standard"  
            sx={{width: "fit-content"}}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setName(event.target.value);
            }}
            onBlur={(event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>) => {
              if(event.target.value !== data?.extraOptionCategoryById.extraOptionCategory?.name)
                onUpdateCategory({name: event.target.value})
            }}
            defaultValue={data?.extraOptionCategoryById.extraOptionCategory?.name}
          />
        </Box>
      </Box>
      <Button variant="outlined" sx={{width: "fit-content"}} onClick={()=>router.push(`/extra-options/create?categoryId=${id}`)}>
        Add Extra Option
      </Button>
      {extraOptions && extraOptions.length !== 0 ?
        <Box sx={theme=>({
          display: "flex",
          flexDirection: "column",
          gap: theme.spacing(2),
          mt: theme.spacing(2)
        })}>
          <Typography sx={{ fontSize: 20, display: "inline", fontWeight: 800 }}>Extra Options:</Typography>
          <ExtraOptions 
            rowGap={1.5} 
            displayItemsOnColumn={true} 
            onDeleteExtraOption={handleOnDeleteExtraOption} 
            onUpdateExtraOption={handleOnUpdateExtraOption}
            extraOptions={extraOptions}
          />
          <Typography sx={theme=>({
            mt: theme.spacing(2)
          })}>
            Total Count (extra options): {extraOptions.length}
          </Typography>
        </Box> :
        <Typography>No extra options on given category</Typography>
      }
    </Box>
  );
};

const ViewExtraOptionCategoryPage = () => {
  const id = useRouteId();
  return <>{id ? <ViewExtraOptionCategoryContent id={id} /> : <CircularProgress />}</>;
};

export default ViewExtraOptionCategoryPage;
