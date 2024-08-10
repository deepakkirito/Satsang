import { useMemo } from "react";

//MRT Imports
import {
  MaterialReactTable,
  useMaterialReactTable,
  MRT_GlobalFilterTextField,
  MRT_ToggleFiltersButton,
} from "material-react-table";

//Material UI Imports
import {
  Box,
  Button,
  ListItemIcon,
  MenuItem,
  Typography,
  lighten,
} from "@mui/material";

//Icons Imports
import { AccountCircle, Delete, Edit, Send } from "@mui/icons-material";
import {
  activeColor,
  foregroundColor,
  textColor,
} from "@/component/assets/css";

const CustomTable = ({ columns, data, tableOptions }) => {
  const table = useMaterialReactTable({
    columns,
    data,
    enableRowActions: true,
    enableRowSelection: true,
    initialState: {
      showGlobalFilter: true,
      columnPinning: {
        left: ["mrt-row-select"],
        right: ["mrt-row-actions"],
      },
    },
    muiTableBodyRowProps: ({ row }) => ({
      //add onClick to row to select upon clicking anywhere in the row
      onClick: row.getToggleSelectedHandler(),
      sx: { cursor: 'pointer' },
    }),
    getRowId: (row) => row._id,
    paginationDisplayMode: "pages",
    positionToolbarAlertBanner: "bottom",
    muiSearchTextFieldProps: {
      size: "small",
      variant: "outlined",
    },
    muiPaginationProps: {
      color: "secondary",
      rowsPerPageOptions: [10, 20, 50, 100, 500],
      shape: "rounded",
      variant: "outlined",
    },
    renderTopToolbar: ({ table }) => {
      return (
        <Box
          sx={(theme) => ({
            backgroundColor: "#c5e2ff",
            display: "flex",
            gap: "0.5rem",
            p: "8px",
            justifyContent: "space-between",
          })}
        >
          <Box sx={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
            <MRT_GlobalFilterTextField table={table} />
            <MRT_ToggleFiltersButton table={table} />
          </Box>
        </Box>
      );
    },
    muiTableHeadCellProps: {
      sx: {
        border: `1px solid ${foregroundColor}`,
        fontStyle: "italic",
        fontWeight: "normal",
        backgroundColor: "#c5e2ff",
        color: textColor,
      },
    },
    muiTableBodyCellProps: {
      sx: {
        border: `1px solid ${foregroundColor}`,
        backgroundColor: "#f8fbff",
        color: textColor,
      },
    },
    muiSearchTextFieldProps: {
      sx: {
        backgroundColor: "#f8fbff",
      },
    },
    ...tableOptions
  });

  return <MaterialReactTable table={table} />;
};

export default CustomTable;
