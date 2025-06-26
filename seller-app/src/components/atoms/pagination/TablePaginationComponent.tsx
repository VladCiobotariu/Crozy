import React from "react";
import { TablePagination } from "@mui/material";
import { Box } from "../Box";
import { PageInfo } from "../../../generated/graphql";
import { PageFilter } from "./Pagination";

type TablePaginationComponentProps = {
  count: number;
  pageInfo: PageInfo;
  pageFilter: PageFilter;
  setPageFilter: (newPageFilter: PageFilter) => void;
  additionalVariables?: {};
};

const TablePaginationComponent = ({
  count,
  pageInfo,
  pageFilter,
  setPageFilter,
  additionalVariables,
}: TablePaginationComponentProps) => {

  const onMoveNextClick = (newPage: number) => {
    if (pageInfo.endCursor) {
      setPageFilter({
        pageSize: pageFilter.pageSize,
        graphQLFilter: { first: pageFilter.pageSize, last: undefined, after: pageInfo.endCursor, before: undefined, ...additionalVariables },
        currentPage: newPage
      });
    }
  };

  const onMovePreviousClick = (newPage: number) => {
    if (pageInfo.startCursor) {
      setPageFilter({
        pageSize: pageFilter.pageSize,
        graphQLFilter: { first: undefined, last: pageFilter.pageSize, after: undefined, before: pageInfo.startCursor, ...additionalVariables },
        currentPage: newPage
      });
    }
  };

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    if (newPage < pageFilter.currentPage) {
      onMovePreviousClick(newPage);
    } else {
      onMoveNextClick(newPage);
    }
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPageFilter({
      pageSize: parseInt(event.target.value, 10),
      graphQLFilter: { first: parseInt(event.target.value, 10), ...additionalVariables },
      currentPage: 0
    });
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "flex-end", width: "100%" }}>
      {!!count &&
        <TablePagination
          component="div"
          count={count}
          page={pageFilter.currentPage}
          rowsPerPageOptions={[5, 10, 25, 50]}
          rowsPerPage={pageFilter.pageSize}
          onRowsPerPageChange={handleChangeRowsPerPage}
          onPageChange={handleChangePage}
        />
      }
    </Box>
  );
};

export default TablePaginationComponent;
