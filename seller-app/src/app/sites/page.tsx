"use client";

import React, {useState} from "react";
import { Box, Button } from "@mui/material";
import Link from "next/link";
import { HeaderProps, Table } from "../../components/moleculas";
import TableConfig from "./TableConfig.json";
import { ActionKeys } from "../../utils";
import { Edit, Delete, Preview } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import {GetSitesDocument, useDeleteSiteMutation, useGetSitesQuery} from "../../generated/graphql";
import BackButton from "../../components/atoms/BackButton";
import DeleteModal from "../../components/moleculas/modals/DeleteModal";
import { useOrganisation } from "../../providers/OrganisationProvider";

const TableActionOptions: Array<any> = [
  { icon: <Preview />, label: "View", key: ActionKeys.preview },
  { icon: <Edit />, label: "Edit", key: ActionKeys.edit },
  { icon: <Delete />, label: "Delete", key: ActionKeys.delete },
];

const ListSites = () => {
  const router = useRouter();
  const { organisationId } = useOrganisation()
  const {loading, error, data} = useGetSitesQuery({variables: {organisationId: organisationId}});
  const { Header }: { Header: Array<HeaderProps> } = TableConfig;
  const [open, setOpen] = useState<boolean>(false);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  const [deleteSite, { loading: mutLoading, error: mutErrors }] = useDeleteSiteMutation();

  const onDeleteSite = (id: string) => {
      setSelectedItemId(id);
      setOpen(true);
  }

  const handleClose = () => {
      setOpen(false);
      setSelectedItemId(null);
  };

  const onDeleteConfirm = async () => {
      if(selectedItemId) {
          await deleteSite({
              variables: {
                  input: {
                      id: selectedItemId,
                  },
              },
              refetchQueries: [
                {
                  query: GetSitesDocument,
                  variables: {},
                }
              ]
          });
          handleClose();
          router.push("/sites");
      }
  }

  return loading || mutLoading ?
    (
        <>Loading page...</>
    ):(
    <React.Fragment>
      <DeleteModal open={open} handleClose={handleClose} onDeleteConfirm={onDeleteConfirm} entity="site"/>
      <Box sx={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
        <BackButton href="/"/>
        <Button component="a" variant="contained" LinkComponent={Link} href="/sites/create">
          Create
        </Button>
      </Box>
      <Box>
        <Table
          padding="normal"
          headers={Header}
          rows={data?.sites?.nodes}
          tableActionOptions={TableActionOptions}
          onDeleteItem={id => onDeleteSite(id)}
          onPreviewItem={id => router.push(`/sites/${id}`)}
          onEditItem={id=> router.push(`/sites/edit/${id}`)}
        />
      </Box>

    </React.Fragment>
  );
};

export default ListSites;
