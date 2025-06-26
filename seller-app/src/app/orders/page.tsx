"use client";

import { Preview } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import React from "react";
import { ActionKeys, toDisplayedPrice } from "../../utils";
import { Box } from "../../components/atoms";
import {
  GetAllOrdersPaginationDocument,
  GetAllOrdersPaginationQuery,
  PageInfo,
} from "../../generated/graphql";
import BackButton from "../../components/atoms/BackButton";
import PaginatedTable from "../../components/moleculas/PaginatedTable";
import { HeaderProps } from "../../components/moleculas";
import TableConfig from "./TableConfig.json";
import { useOrganisation } from "../../providers/OrganisationProvider";

const TableActionOptions: Array<any> = [
  { icon: <Preview />, label: "View", key: ActionKeys.preview },
];

const ListOrders = () => {
  const router = useRouter();
  const { Header }: { Header: Array<HeaderProps> } = TableConfig;
  const { organisationId } = useOrganisation()

  const handlePreviewItem = (id: string) => {
    router.push(`/orders/${id}`);
  };

  const queryVariables = {
    organisationId: organisationId
  }

  const handleGetDetailsFromQueryData = (data: GetAllOrdersPaginationQuery) => {
    const totalCount = data?.orders?.totalCount;
    const rows = data?.orders?.nodes?.map((x) => {
      return {
        ...x,
        state: x.stateDescription.orderState,
        price: toDisplayedPrice(x.totalPrice),
        customerName: x.customerDetails.fullName,
        customerEmail: x.customerDetails.email,
        customerPhone: x.customerDetails.phoneNumber,
      }
      });
    const pageInfo: PageInfo = data?.orders?.pageInfo || {} as PageInfo;
    return {totalCount, rows, pageInfo};
  }
  
  return (
    <React.Fragment>
      <Box sx={{ display: "flex", justifyContent: "flex-start", marginBottom: 5 }}>
        <BackButton href="/"/>
      </Box>
      <Box>
        {organisationId &&
          <PaginatedTable
            sortBy={"number"}
            Header={Header}
            TableActionOptions={TableActionOptions}
            onPreviewItem={handlePreviewItem}
            queryDocument={GetAllOrdersPaginationDocument}
            queryVariables={queryVariables}
            getDetailsFromQueryData={handleGetDetailsFromQueryData}
          />
        }
      </Box>
    </React.Fragment>
  );
};

export default ListOrders;
