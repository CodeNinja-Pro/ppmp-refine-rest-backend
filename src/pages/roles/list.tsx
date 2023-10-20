// import { IResourceComponentsProps } from "@refinedev/core";
// import { MuiListInferencer } from "@refinedev/inferencer/mui";

// export const RoleList: React.FC<IResourceComponentsProps> = () => {
//   return <MuiListInferencer />;
// };


import React from "react";
import {
    useDataGrid,
    EditButton,
    ShowButton,
    DeleteButton,
    List,
    DateField,
} from "@refinedev/mui";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { IResourceComponentsProps, useTranslate } from "@refinedev/core";

export const RoleList: React.FC<IResourceComponentsProps> = () => {
    const translate = useTranslate();
    const { dataGridProps } = useDataGrid();

    const columns = React.useMemo<GridColDef[]>(
        () => [
            {
                field: "id",
                headerName: translate("roles.fields.id"),
                renderCell: function render(params: GridRenderCellParams) {
                    return <span>{((dataGridProps.paginationModel?.page || 0) * (dataGridProps.paginationModel?.pageSize || 5)) +  params.api.getSortedRowIds().indexOf(params.row.id) +  1}</span>
                },
                type: "number",
                minWidth: 50,
            },
            {
                field: "name",
                flex: 1,
                headerName: translate("roles.fields.name"),
                minWidth: 200,
            },
            // {
            //     field: "guard_name",
            //     flex: 1,
            //     headerName: translate("roles.fields.guard_name"),
            //     minWidth: 200,
            // },
            {
                field: "created_at",
                flex: 1,
                headerName: translate("roles.fields.created_at"),
                minWidth: 250,
                renderCell: function render({ value }) {
                    return <DateField value={value} />;
                },
            },
            {
                field: "actions",
                headerName: translate("table.actions"),
                sortable: false,
                renderCell: function render({ row }) {
                    return (
                        <>
                            <EditButton hideText recordItemId={row.id} />
                            <ShowButton hideText recordItemId={row.id} />
                            <DeleteButton hideText recordItemId={row.id} />
                        </>
                    );
                },
                align: "center",
                headerAlign: "center",
                minWidth: 80,
            },
        ],
        [translate],
    );

    return (
        <List>
            <DataGrid {...dataGridProps} columns={columns} autoHeight />
        </List>
    );
};
