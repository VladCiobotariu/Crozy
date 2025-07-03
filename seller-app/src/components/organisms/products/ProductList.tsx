import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { Delete, Edit, MoreVert, Preview } from "../../atoms/icons";
import { ActionKeys } from "../../../utils";
import { Box, useTheme } from "@mui/system";
import { Menu } from "../../atoms";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useMediaQuery } from "@mui/material";
import ImageDisplay from "../../atoms/imageDisplay/ImageDisplay";
import { GetAllProductsDocument, Money, Role, useDeleteProductMutation } from '../../../generated/graphql';
import DeleteModal from "../../moleculas/modals/DeleteModal";
import DataGridConfig from "../../moleculas/DataGridConfig";
import { useOrganisation } from "@/providers/OrganisationProvider";

const TableActionOptions: Array<any> = [
  { icon: <Preview />, label: "View", key: ActionKeys.preview },
  { icon: <Edit />, label: "Edit", key: ActionKeys.edit },
  { icon: <Delete />, label: "Delete", key: ActionKeys.delete },
];

const TableActionOptionsNonAdmins: Array<any> = [
  { icon: <Preview />, label: "View", key: ActionKeys.preview },
];

type CategoryType = {
  id: string;
  name: string;
}

type SiteType = {
  id: string;
  name: string;
}

type ProductType = {
  categories: Array<CategoryType>;
  categoryProductsId: string[];
  description?: string | undefined | null;
  id: string;
  image?: string | undefined | null;
  name: string;
  site: SiteType;
  siteId: string;
  siteProductsId: string;
  price: Money;
  slug: string;
}

type ProductListType = {
  products: Array<ProductType> | null | undefined;
}

const ProductList = ({ products }:ProductListType) => {
  
  const router = useRouter();
  const {organisationRole} = useOrganisation();
  const [open, setOpen] = useState<boolean>(false);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);  
  const theme = useTheme();
  const flexValueForActionColumn = useMediaQuery(theme.breakpoints.down("md")) ? 0.6 : 0.4;

  const handleEditItem = (id: string) => {
    router.push(`/products/edit/${id}`);
  };

  const handlePreviewItem = (id: string) => {
    router.push(`/products/${id}`);
  }; 

  const handleDeleteItem = (id: string) => {
    setSelectedItemId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedItemId(null);
  };
  
  const [deleteProduct, { loading: mutLoading, error: mutErrors }] = useDeleteProductMutation();

  const onDeleteConfirm = async () => {
      if(selectedItemId) {
          await deleteProduct({
              variables: {
                  input: {
                      id: selectedItemId,
                  },
              },
              refetchQueries: [
                {
                  query: GetAllProductsDocument,
                  variables: {},
                }
              ]
          });
          handleClose();
          router.push("/products");
      }
  }

  const headerTitles: GridColDef[] = [
    {
      field: "name",
      headerName: "Name",
      editable: false,
      flex: 0.8,
      renderCell: (params: GridRenderCellParams) => (
        <Box sx={{ whiteSpace: "pre-wrap", padding: "1rem 0rem" }}>{params.value}</Box>
      ),
    },
    {
      field: "image",
      headerName: "Image",
      editable: false,
      flex: 0.5,
      renderCell: (params: GridRenderCellParams) => (
        <Box sx={{ padding: "1rem 0rem", cursor: "pointer", display: "flex"}}>
          <ImageDisplay src={params.value} widthHeightForImage={50} usePopover={true}/>
        </Box>
      )
    },
    {
      field: "slug",
      headerName: "Slug",
      editable: false,
      flex: 0.8,
      renderCell: (params: GridRenderCellParams) => (
        <Box sx={{ whiteSpace: "pre-wrap", padding: "1rem 0rem" }}>{params.value}</Box>
      ),
    },
    {
      field: "categoryProductsId",
      headerName: "Category",
      editable: false,
      flex: 0.7,
      renderCell: (params: GridRenderCellParams) => (
        <Box sx={{ whiteSpace: "pre-wrap" }}>
          {Array.isArray(params.value) ? params.value.join("\n") : params.value}
        </Box>
      ),
    },
    {
      field: "siteProductsId",
      headerName: "Site",
      editable: false,
      flex: 0.7,
    },
    {
      field: "description",
      headerName: "Description",
      editable: false,
      flex: 1.5,
      renderCell: (params: GridRenderCellParams) => (
        <Box sx={{ whiteSpace: "pre-wrap", padding: "1rem 0rem" }}>{params.value}</Box>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      editable: false,
      flex: flexValueForActionColumn,
      renderCell: (params: GridRenderCellParams) => (
        <Menu
          iconButton
          options={(organisationRole === Role.Admin || organisationRole === Role.Owner) ?  TableActionOptions : TableActionOptionsNonAdmins}
          onClick={itemKey => {
            switch (itemKey) {
              case ActionKeys.edit:
                return handleEditItem(params.row.id);
              case ActionKeys.preview:
                return handlePreviewItem(params.row.id);
              case ActionKeys.delete:
                return handleDeleteItem(params.row.id);
              default:
                return;
            }
          }}
        >
          <MoreVert />
        </Menu>
      ),
    },
  ];

  return (
    <>
      <DeleteModal open={open} handleClose={handleClose} onDeleteConfirm={onDeleteConfirm} entity="product"/>
      <Box sx={{marginTop: 2}}>
        <DataGridConfig
          rows={products}
          columns={headerTitles}
        />
      </Box>
    </>
  );
};

export default ProductList;


  