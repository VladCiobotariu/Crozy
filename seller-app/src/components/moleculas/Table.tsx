import React from "react";
import {
  TableHead,
  TableRow as MUITableRow,
  TableBody,
  TableCell as MUITableCell,
  Table as MUITable,
  TableSortLabel,
  Box,
  Toolbar,
  Typography,
  IconButton,
  Tooltip,
  styled,
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import { Delete, MoreVert } from "../atoms/icons";
import { Checkbox, EmptyState, Menu } from "../atoms";
import { FilePresent } from "@mui/icons-material";
import { ActionKeys, getObjectValue } from "../../utils";

export type HeaderProps = {
  id: string;
  numeric: boolean;
  disablePadding?: boolean;
  label: string;
  sortable?: boolean;
};

export type Row = { id: string | number } & any;

type Order = "asc" | "desc";

type TableProps = {
  width?: "full" | "fit-content";
  size?: "medium" | "small";
  stickyHeader?: boolean;
  padding?: "checkbox" | "none" | "normal";
  withCheckbox?: boolean;
  headers: Array<HeaderProps>;
  rows: any;
  selectedItems?: Array<NonNullable<string | number>>;
  selectAll?: () => void;
  setSelectedItems?: (_: any) => void;
  order?: Order;
  sortBy?: string;
  setOrder?: (_: Order) => void;
  setSortBy?: (_: string | number | symbol) => void;
  clickRow?: (id: string) => void;
  onEditItem?: (id: string) => void;
  onDeleteItem?: (id: string) => void;
  onPreviewItem?: (id: string) => void;
  tableActionOptions?: Array<TableActionType>;
};

type HeaderCellProps = {
  header: HeaderProps;
  order?: Order;
  sortBy?: string;
  onRequestSort?: (event: React.MouseEvent<unknown>, property: keyof Row) => void;
};

export type TableActionType = {
  icon: React.ReactElement;
  label: string;
  key: number | string;
};

const TableContainer = styled(Box)(({ theme }) => ({
  border: `1px solid ${theme.palette.colors.borders.R200}`,
  borderRadius: 5,
  position: "relative",
  backgroundColor: theme.palette.colors.N100,
}));

const TableToolbar = styled(Toolbar)(({ theme }) => ({
  position: "absolute",
  left: 0,
  right: 0,
  zIndex: 3,
  color: theme.palette.colors.N100,
  "WebkitBoxPack": "justify",
  justifyContent: "space-between",
  backgroundColor: theme.palette.colors.PRIMARY,
  minHeight: "48px!important",
  height: "48px!important",
  transform: "translateY(-48px)",
  transition: `height 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, min-height 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, transform 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms`,
  borderRadius: "10px 10px 0 0",
}));

const SortableHeader = ({ header, sortBy, order, onRequestSort }: HeaderCellProps) => {
  const createSortHandler = (property: keyof Row) => (event: React.MouseEvent<unknown>) => {
    if (onRequestSort) {
      onRequestSort(event, property);
    }
  };
  return (
    <MUITableCell
      key={header.id}
      align={header.numeric ? "right" : "left"}
      padding={header.disablePadding ? "none" : "normal"}
      sortDirection={sortBy === header.id ? order : false}
    >
      <TableSortLabel
        active={sortBy === header.id}
        direction={sortBy === header.id ? order : "asc"}
        onClick={createSortHandler(header.id)}
      >
        {header.label}
        {sortBy === header.id ? (
          <Box component="span" sx={visuallyHidden}>
            {order === "desc" ? "sorted descending" : "sorted ascending"}
          </Box>
        ) : null}
      </TableSortLabel>
    </MUITableCell>
  );
};

const SimpleHeader = ({ header }: HeaderCellProps) => {
  return (
    <MUITableCell
      key={header.id}
      align={header.numeric ? "right" : "left"}
      padding={header.disablePadding ? "none" : "normal"}
    >
      {header.label}
    </MUITableCell>
  );
};

const EnhancedTableToolbar = (props: any) => {
  const { numSelected } = props;

  return (
    <TableToolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(!numSelected && {
          minHeight: "0!important",
          height: "0!important",
          transform: "translateY(0px)",
          overflow: "hidden",
        }),
      }}
    >
      <Typography sx={{ flex: "1 1 100%" }} color="inherit" variant="subtitle1" component="div">
        {numSelected} selected
      </Typography>
      <Tooltip title="Delete">
        <IconButton>
          <Delete color="error" />
        </IconButton>
      </Tooltip>
    </TableToolbar>
  );
};

export const Table = ({
  width = "full",
  size,
  stickyHeader,
  padding,
  withCheckbox,
  headers,
  sortBy,
  order,
  rows = [],
  selectedItems,
  setSelectedItems,
  setOrder,
  setSortBy,
  clickRow,
  onPreviewItem,
  onEditItem,
  onDeleteItem,
  tableActionOptions,
}: TableProps) => {
  const isChecked = (id: string | number): boolean | undefined => selectedItems?.indexOf(id) !== -1;

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const newSelected = rows.map((n: Row) => n.id);
      if (setSelectedItems) {
        setSelectedItems(newSelected);
      }
      return;
    }
    if (setSelectedItems) {
      setSelectedItems([]);
    }
  };

  const handleSelectItem = (item: string | number) => {
    if (selectedItems && setSelectedItems) {
      let newSelected = [...selectedItems];
      const index = newSelected.indexOf(item);

      if (index !== -1) {
        newSelected.splice(index, 1);
        setSelectedItems([...newSelected]);
      } else {
        setSelectedItems([...selectedItems, item]);
      }
    }
  };

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Row) => {
    const isAsc = sortBy === property && order === "asc";
    if (setOrder && setSortBy) {
      setOrder(isAsc ? "desc" : "asc");
      setSortBy(property);
    }
  };

  const ActionCell = (id: string) => (
    <MUITableCell align="right" key={`actions-cell-unique-key`}>
      <Menu
        iconButton
        options={tableActionOptions}
        onClick={itemKey => {
          switch (itemKey) {
            case ActionKeys.edit:
              return onEditItem ? onEditItem(id) : null;
            case ActionKeys.preview:
              return onPreviewItem ? onPreviewItem(id) : null;
            case ActionKeys.delete:
              return onDeleteItem ? onDeleteItem(id) : null;
            default:
              return;
          }
        }}
      >
        <MoreVert />
      </Menu>
    </MUITableCell>
  );

  return (
    <React.Fragment>
      <TableContainer className="TableContainer" sx={{width: width === "fit-content" ? "fit-content" : "inherit"}}>
        <EnhancedTableToolbar numSelected={selectedItems?.length} />
        <Box sx={{ overflowX: "auto" }}>
          <MUITable size={size} stickyHeader={stickyHeader} padding={padding}>
            <TableHead>
              <MUITableRow>
                {withCheckbox && (
                  <MUITableCell padding="checkbox">
                    <Checkbox
                      indeterminate={
                        // @ts-ignore
                        selectedItems?.length > 0 && selectedItems?.length < rows.length
                      }
                      checked={rows.length > 0 && selectedItems?.length === rows.length}
                      onChange={handleSelectAll}
                    />
                  </MUITableCell>
                )}
                {headers.map((header: HeaderProps) =>
                  header.sortable ? (
                    <SortableHeader
                      order={order}
                      sortBy={sortBy}
                      onRequestSort={handleRequestSort}
                      key={header.id}
                      header={header}
                    />
                  ) : (
                    <SimpleHeader key={header.id} header={header} />
                  )
                )}
                {tableActionOptions && (
                  <MUITableCell align="right" key={"actionTableKey111"}>
                    Actions
                  </MUITableCell>
                )}
              </MUITableRow>
            </TableHead>
            <TableBody>
              {rows.map((item: any, index: number) => {
                const itemSelected = isChecked(item.id);
                return (
                  <MUITableRow
                    onClick={() => (clickRow ? clickRow(item.id) : null)}
                    hover
                    key={item.id}
                  >
                    {withCheckbox && (
                      <MUITableCell padding="checkbox">
                        <Checkbox
                          onClick={(e: any) => e.stopPropagation()}
                          onChange={_ => handleSelectItem(rows[index].id)}
                          checked={itemSelected}
                        />
                      </MUITableCell>
                    )}
                    {headers.map((key: HeaderProps) => (
                      <MUITableCell
                        key={`${item.id}-${key.id}`}
                        align={key.numeric ? "right" : "left"}>
                        {getObjectValue(rows[index], key.id)}
                      </MUITableCell>
                    ))}
                    {tableActionOptions && ActionCell(rows[index].id)}
                  </MUITableRow>
                );
              })}
            </TableBody>
          </MUITable>
        </Box>
      </TableContainer>


      {rows.length === 0 && (
        <EmptyState>
          <FilePresent sx={{ fontSize: "4rem" }} />
          <Box><i>No data available</i></Box>
        </EmptyState>
      )}
    </React.Fragment>
  );
};
