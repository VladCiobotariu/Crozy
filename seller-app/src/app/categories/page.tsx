"use client";

import React, {useState} from "react";
import { Box, Button, Typography } from "@mui/material";
import Link from "next/link";
import { HeaderProps, Table } from "../../components/moleculas";
import TableConfig from "./TableConfig.json";
import { ActionKeys } from "../../utils";
import { Edit, Delete, Preview } from "@mui/icons-material";
import {GetCategoriesDocument, useDeleteCategoryMutation, useGetCategoriesQuery} from "../../generated/graphql";
import BackButton from "../../components/atoms/BackButton";
import {useRouter} from "next/navigation";
import DeleteModal from "../../components/moleculas/modals/DeleteModal";
import { useOrganisation } from "../../providers/OrganisationProvider";

const TableActionOptions: Array<any> = [
  { icon: <Preview />, label: "View", key: ActionKeys.preview},
  { icon: <Edit />, label: "Edit", key: ActionKeys.edit },
  { icon: <Delete />, label: "Delete", key: ActionKeys.delete },
];

const ListCategories = () => {
  const router = useRouter();
  const {organisationId} = useOrganisation()
  const { loading, error, data } = useGetCategoriesQuery({variables: {organisationId: organisationId}});
  const { Header }: { Header: Array<HeaderProps> } = TableConfig;
  const [open, setOpen] = useState<boolean>(false);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  const [deleteCategory, { loading: mutLoading, error: mutErrors }] = useDeleteCategoryMutation();

  const onDeleteCategory = (id: string) => {
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
              refetchQueries: [
                {
                  query: GetCategoriesDocument,
                  variables: {},
                }
              ]
          },
         );
          handleClose(); 
      }
  };

  return loading || mutLoading ?
    (
        <Typography>Loading page...</Typography>
    ):(
    <React.Fragment>
      <DeleteModal open={open} handleClose={handleClose} onDeleteConfirm={onDeleteConfirm} entity="category"/>
      <Box sx={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
        <BackButton href="/"/>
        <Button component="a" variant="contained" LinkComponent={Link} href="/categories/create">
          Create
        </Button>
      </Box>
      <Box>
        <Table
          padding="normal"
          headers={Header}
          rows={data?.categories?.nodes}
          tableActionOptions={TableActionOptions}
          onPreviewItem={id => router.push(`/categories/${id}`)}
          onEditItem={id=> router.push(`/categories/edit/${id}`)}
          onDeleteItem={id => onDeleteCategory(id)}
        />
      </Box>
    </React.Fragment>
  );
};

export default ListCategories;
