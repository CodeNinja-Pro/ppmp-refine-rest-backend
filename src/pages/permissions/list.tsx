// import { IResourceComponentsProps } from "@refinedev/core";
// import { MuiListInferencer } from "@refinedev/inferencer/mui";

// export const PermissionList: React.FC<IResourceComponentsProps> = () => {
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
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { IResourceComponentsProps, useTranslate } from "@refinedev/core";
import { pageSizeOptions } from "../../constants";
import { createdAtColDef, idColDef, nameColDef } from "../../components/DataGridComp";

export const PermissionList: React.FC<IResourceComponentsProps> = () => {
    const translate = useTranslate();
    const { dataGridProps } = useDataGrid();

    const columns = React.useMemo<GridColDef[]>(
        () => [
            // {
            //     field: "id",
            //     headerName: translate("permissions.fields.id"),
            //     type: "number",
            //     minWidth: 50,
            //     renderCell: (params) => (
            //       <span>{((dataGridProps.paginationModel?.page || 0) * (dataGridProps.paginationModel?.pageSize || 0)) + params.api.getSortedRowIds().indexOf(params.row.id) + 1}</span>
            //     )
            // },
            idColDef(dataGridProps),
            // {
            //     field: "name",
            //     flex: 1,
            //     headerName: translate("permissions.fields.name"),
            //     minWidth: 200,
            // },
            nameColDef(dataGridProps),
            // {
            //     field: "guard_name",
            //     flex: 1,
            //     headerName: translate("permissions.fields.guard_name"),
            //     minWidth: 200,
            // },
            // {
            //     field: "created_at",
            //     flex: 1,
            //     headerName: translate("permissions.fields.created_at"),
            //     minWidth: 250,
            //     renderCell: function render({ value }) {
            //         return <DateField value={value} />;
            //     },
            // },
            createdAtColDef(dataGridProps),
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
            <DataGrid {...dataGridProps} columns={columns} autoHeight initialState={{pagination: {paginationModel: {pageSize: 5}}}} pageSizeOptions={pageSizeOptions}/>
        </List>
    );
};
