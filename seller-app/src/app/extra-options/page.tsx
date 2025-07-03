"use client"

import React, { useState } from "react";
import { Box, Button, CircularProgress, Typography, useMediaQuery, useTheme } from "@mui/material";
import { HeaderProps, Table } from "../../components/moleculas";
import TableConfig from "./TableConfig.json";
import { ActionKeys, toDisplayedPrice } from "../../utils";
import { Edit, Delete, Preview } from "@mui/icons-material";
import { GetAllExtraOptionsPaginationDocument, GetAllExtraOptionsPaginationQuery, GetCreateProductDetailsDocument, PageInfo, Role, useDeleteExtraOptionMutation, useGetAllExtraOptionsPaginationQuery, useGetExtraOptionsQuery} from "../../generated/graphql";
import BackButton from "../../components/atoms/BackButton";
import {useRouter} from "next/navigation";
import DeleteModal from "@moleculas/modals/DeleteModal";
import PaginatedTable from "@moleculas/PaginatedTable";
import { useOrganisation } from "@/providers/OrganisationProvider";

const TableActionOptions: Array<any> = [
  { icon: <Edit />, label: "Edit", key: ActionKeys.edit },
  { icon: <Delete />, label: "Delete", key: ActionKeys.delete },
];

const ExtraOptions = () => {
  const router = useRouter();
  const theme = useTheme();
  const { Header }: { Header: Array<HeaderProps> } = TableConfig;

  const isSmallSize = useMediaQuery(theme.breakpoints.down("md"));

  const {organisationRole} = useOrganisation()

  const [open, setOpen] = useState<boolean>(false);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  const [deleteExtraOption, { loading: mutLoading, error: mutErrors }] = useDeleteExtraOptionMutation();

  const onDeleteExtraOption = (id: string) => {
      setSelectedItemId(id);
      setOpen(true);
  }

  const handleClose = () => {
      setOpen(false);
      setSelectedItemId(null);
  }

  const onDeleteConfirm = async () => {
      if(selectedItemId) {
          await deleteExtraOption({
              variables: {
                  input: {
                      id: selectedItemId,
                  },
              },
              awaitRefetchQueries: true,
              refetchQueries: [
                {
                  query: GetAllExtraOptionsPaginationDocument,
                },
              ]
          },
         );
          handleClose(); 
      }
  };

  const handleGetDetailsFromQueryData = (data: GetAllExtraOptionsPaginationQuery | undefined) => {
    const totalCount = data?.extraOptionsForCurrentOrganisation?.totalCount;
    const rows = data?.extraOptionsForCurrentOrganisation?.nodes?.map((x) => {
      return {
        ...x,
        categoryName: x.category?.name,
        price: toDisplayedPrice(x.price),
      }
      });
    const pageInfo: PageInfo = data?.extraOptionsForCurrentOrganisation?.pageInfo || {} as PageInfo;
    return {totalCount, rows, pageInfo};
  }

  return (
    <React.Fragment>
      <DeleteModal open={open} handleClose={handleClose} onDeleteConfirm={onDeleteConfirm} entity="category"/>
      <Box sx={{
        width: isSmallSize ? "fit-content" : "inherit"
      }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
          <BackButton href="/"/>
          {(organisationRole === Role.Admin || organisationRole === Role.Owner) &&
            <Button variant="contained" onClick={()=>router.push("/extra-options/create")}>
              Create
            </Button>
          }
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
              TableActionOptions={(organisationRole === Role.Admin || organisationRole === Role.Owner) ?  TableActionOptions : undefined}
              onPreviewItem={id => router.push(`/extra-options/${id}`)}
              onEditItem={id=> router.push(`/extra-options/edit/${id}`)}
              onDeleteItem={id => onDeleteExtraOption(id)}
              queryDocument={GetAllExtraOptionsPaginationDocument}
              getDetailsFromQueryData={handleGetDetailsFromQueryData}
            />
          }
        </Box>
      </Box>
    </React.Fragment>
  );
}

export default ExtraOptions