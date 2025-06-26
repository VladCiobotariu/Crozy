import React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box } from "@mui/system";
import { FilePresent } from "@mui/icons-material";
import { EmptyStateContent } from "../atoms/emptyState/EmptyState";

type DataGridConfigProps = {
  rows: Array<any> | null | undefined;
  columns: GridColDef[];
};

const EmptyDisplay = () => {
  return (
    <EmptyStateContent sx={{fontSize: 20, mt: 2}}>
        <FilePresent sx={{ fontSize: "4rem" }} /> 
        <Box><i>No data available</i></Box> 
    </EmptyStateContent>
  )

}
const DataGridConfig = ({ rows, columns }: DataGridConfigProps) => {
  
  return (
    <div style={{ width: "100%" }}>
      <DataGrid
        columns={columns}
        rows={rows ?? []}
        autoHeight={true}
        disableRowSelectionOnClick={true}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        density={"comfortable"}
        getRowHeight={() => "auto"}
        pageSizeOptions={[5, 10, 25, 50]}
        slots={{
          noRowsOverlay: EmptyDisplay,
        }}
      />
    </div>
  );
};

export default DataGridConfig;
