import React, { useEffect, useState } from "react";
import { HeaderProps, Table } from "./Table";
import { PageFilter } from "../atoms/pagination/Pagination";
import { PageInfo } from "../../generated/graphql";
import TablePaginationComponent from "../atoms/pagination/TablePaginationComponent";
import { DocumentNode } from "graphql/language";
import { useQuery } from "@apollo/client";

export type PaginatedResult = {
  totalCount?: number;
  rows?: any[];
  pageInfo: PageInfo;
};

export type PaginatedTableProps = {
  sortBy?: string;
  Header: HeaderProps[];
  TableActionOptions: Array<any>;
  onDeleteItem?: (id: string) => void;
  onEditItem?: (id: string) => void;
  onPreviewItem?: (id: string) => void;
  queryDocument: DocumentNode;
  queryVariables?: {}; 
  getDetailsFromQueryData: (data: any) => PaginatedResult;
};

const PaginatedTable = ({
  sortBy,
  Header,
  TableActionOptions,
  onDeleteItem,
  onEditItem,
  onPreviewItem,
  queryDocument,
  queryVariables,
  getDetailsFromQueryData,
}: PaginatedTableProps) => {

  const [pageFilter, setPageFilter] = useState<PageFilter>({
    pageSize: 5,
    graphQLFilter: { first: 5, ...queryVariables },
    currentPage: 0,
  });

  const { data, loading, error, fetchMore } = useQuery(queryDocument, {
    variables: { first: 5, ...queryVariables },
    notifyOnNetworkStatusChange: true,
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-first",
  });

  const { totalCount, rows, pageInfo } = getDetailsFromQueryData(data);
  
  const handlePageFilterChange = (newPageFilter: PageFilter) => {
    fetchMore({
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return { 
          ...prev, 
          ...fetchMoreResult
        };
      },
      variables: {
        ...newPageFilter.graphQLFilter
      }
    })
    setPageFilter(newPageFilter);
  };

  return (loading && !!rows) ? (
    <>Loading table...</>
  ) : (
    <React.Fragment>
      <Table
        sortBy={sortBy}
        padding="normal"
        headers={Header}
        tableActionOptions={TableActionOptions}
        rows={rows}
        onDeleteItem={id => (onDeleteItem && onDeleteItem(id))}
        onEditItem={id => (onEditItem && onEditItem(id))}
        onPreviewItem={id => (onPreviewItem && onPreviewItem(id))}
      />

      {rows && totalCount &&
        <TablePaginationComponent
          count={totalCount}
          pageInfo={pageInfo}
          pageFilter={pageFilter}
          setPageFilter={handlePageFilterChange}
          additionalVariables={queryVariables}
        />
      }
    </React.Fragment>
  );
};

export default PaginatedTable;  