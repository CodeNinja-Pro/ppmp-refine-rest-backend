import React from "react";
import { DataGrid, DataGridProps } from "@mui/x-data-grid";
import { useTranslate } from "@refinedev/core";
import { DateField } from "@refinedev/mui";
import { useTheme } from "@mui/material";
import { darken } from "@mui/material";


export default function DataGridComp(props: any) {
  const theme = useTheme();
  const  sx =  {
    border: "none",
    "& .MuiDataGrid-columnHeaders": {
        background: darken(theme.palette.background.paper, 0.05),
        borderBottom: `1px solid ${darken(
            theme.palette.background.paper,
            0.1,
        )}`,
    },
    "& .MuiDataGrid-cell": {
        borderBottom: `1px solid ${darken(
            theme.palette.background.paper,
            0.05,
        )}`,
    },
  };
  
  return (
    <DataGrid
      autoHeight
      initialState={{ pagination: { paginationModel: { pageSize: 5 }} }}
      {...props}
      sx={sx}
    />
  );
}


export const idColDef = (dataGridProps: any, headerName: string="Id") => {
  return {
    field: "id",
    headerName,
    type: "number",
    minWidth: 50,
    maxWidth: 50,
    renderCell: (params: any) => (
      <span>
        {(dataGridProps.paginationModel?.page || 0) *
          (dataGridProps.paginationModel?.pageSize || 5) +
          params.api.getSortedRowIds().indexOf(params.row.id) +
          1}
      </span>
    ),
  };
};

export const nameColDef = (dataGridProps: any, headerName: string="Name") => (
  {
      field: "name",
      headerName,
      type: "text",
      minWidth: 100,
      flex: 0.5
    }
);

export const createdAtColDef = (dataGridProps: any, headerName: string="Created At") => (
    {
        field: "created_at",
        headerName,
        minWidth: 150,
        type: "text",
        flex: 0.5,
        renderCell: ({value}: {value: any}) => (
            <DateField value={value} />
        )
    }
);

