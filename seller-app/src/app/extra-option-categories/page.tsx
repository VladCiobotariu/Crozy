"use client"

import React, { useState } from "react";
import { Box, Button, CircularProgress, Typography, useMediaQuery, useTheme } from "@mui/material";
import { HeaderProps, Table } from "../../components/moleculas";
import TableConfig from "./TableConfig.json";
import { ActionKeys } from "../../utils";
import { Edit, Delete, Preview } from "@mui/icons-material";
import { GetAllExtraOptionCategoriesPaginationDocument, GetAllExtraOptionCategoriesPaginationQuery, GetExtraOptionsCategoriesDocument, PageInfo, useDeleteExtraOptionCategoryMutation, useGetExtraOptionsCategoriesQuery} from "../../generated/graphql";
import BackButton from "../../components/atoms/BackButton";
import {useRouter} from "next/navigation";
import DeleteModal from "@moleculas/modals/DeleteModal";
import PaginatedTable from "@moleculas/PaginatedTable";

const TableActionOptions: Array<any> = [
  { icon: <Preview />, label: "View", key: ActionKeys.preview},
  { icon: <Edit />, label: "Edit", key: ActionKeys.edit },
  { icon: <Delete />, label: "Delete", key: ActionKeys.delete },
];

const ExtraOptionCategories = () => {
  const router = useRouter();
  const theme = useTheme();
  const { loading, error, data } = useGetExtraOptionsCategoriesQuery();
  const { Header }: { Header: Array<HeaderProps> } = TableConfig;

  const isSmallSize = useMediaQuery(theme.breakpoints.down("md"));

  const [open, setOpen] = useState<boolean>(false);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  const [deleteCategory, { loading: mutLoading, error: mutErrors }] = useDeleteExtraOptionCategoryMutation();

  const onDeleteExtraOptionCategory = (id: string) => {
      setSelectedItemId(id);
      setOpen(true);
  }

  const handleClose = () => {
      setOpen(false);
      setSelectedItemId(null);
  }

  const onDeleteConfirm = async () => {
      if(selectedItemId) {
          await deleteCategory({
              variables: {
                  input: {
                      id: selectedItemId,
                  },
              },
              awaitRefetchQueries: true,
              refetchQueries: [
                {
                  query: GetExtraOptionsCategoriesDocument,
                  variables: {},
                }
              ]
          },
         );
          handleClose(); 
      }
  };

  const handleGetDetailsFromQueryData = (data: GetAllExtraOptionCategoriesPaginationQuery | undefined) => {
    const totalCount = data?.allExtraOptionsCategoriesForCurrentOrganisation?.totalCount;
    const rows = data?.allExtraOptionsCategoriesForCurrentOrganisation?.nodes?.map(x=>x)
    const pageInfo: PageInfo = data?.allExtraOptionsCategoriesForCurrentOrganisation?.pageInfo || {} as PageInfo;
    return {totalCount, rows, pageInfo};
  }

  return loading ?
    (
      <Typography>Loading page...</Typography>
    ):(
    <React.Fragment>
      <DeleteModal open={open} handleClose={handleClose} onDeleteConfirm={onDeleteConfirm} entity="category"/>
      <Box sx={{
        width: isSmallSize ? "fit-content" : "inherit"
      }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
          <BackButton href="/"/>
          <Button variant="contained" onClick={()=>router.push("/extra-option-categories/create")}>
            Create
          </Button>
        </Box>
        <Box sx={{
          width: isSmallSize ? "fit-content" : "inherit"
        }}>
          {mutLoading ?
            <Box sx={{
              display: "flex",
              justifyContent: "center",
            }}>
              <CircularProgress/>
            </Box> :
            <PaginatedTable
              Header={Header}
              TableActionOptions={TableActionOptions}
              onPreviewItem={id => router.push(`/extra-option-categories/${id}`)}
              onEditItem={id=> router.push(`/extra-option-categories/edit/${id}`)}
              onDeleteItem={id => onDeleteExtraOptionCategory(id)}
              queryDocument={GetAllExtraOptionCategoriesPaginationDocument}
              getDetailsFromQueryData={handleGetDetailsFromQueryData}
            />
          }
        </Box>
      </Box>
    </React.Fragment>
  );
}

export default ExtraOptionCategories