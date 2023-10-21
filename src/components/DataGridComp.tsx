import React from "react";
import { DataGrid, DataGridProps } from "@mui/x-data-grid";
import { useTranslate } from "@refinedev/core";
import { DateField } from "@refinedev/mui";

export default function DataGridComp(props: any) {
  return (
    <DataGrid
      autoHeight
      initialState={{ pagination: { paginationModel: { pageSize: 5 }} }}
      {...props}
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

