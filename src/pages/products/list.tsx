// import { IResourceComponentsProps } from "@refinedev/core";
// import { MuiListInferencer } from "@refinedev/inferencer/mui";
// export const ProductList: React.FC<IResourceComponentsProps> = () => {
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

export const ProductList: React.FC<IResourceComponentsProps> = () => {
    const translate = useTranslate();
    const { dataGridProps } = useDataGrid();

    const columns = React.useMemo<GridColDef[]>(
        () => [
            {
                field: "id",
                headerName: translate("products.fields.id"),
                type: "number",
                minWidth: 50,
            },
            {
                field: "name",
                flex: 1,
                headerName: translate("products.fields.name"),
                minWidth: 200,
            },
            {
                field: "code",
                flex: 1,
                headerName: translate("products.fields.code"),
                type: "number",
                minWidth: 200,
            },
            {
                field: "unit",
                flex: 1,
                headerName: translate("products.fields.unit"),
                valueGetter: ({ row }) => {
                    const value = row?.unit?.name;

                    return value;
                },
                minWidth: 300,
            },
            {
                field: "unit_cost",
                flex: 1,
                headerName: translate("products.fields.unit_cost"),
                type: "number",
                minWidth: 200,
            },
            {
                field: "description",
                flex: 1,
                headerName: translate("products.fields.description"),
                minWidth: 200,
            },
            {
                field: "IPSAS_code",
                flex: 1,
                headerName: translate("products.fields.IPSAS_code"),
                minWidth: 200,
            },
            {
                field: "general_specification",
                flex: 1,
                headerName: translate("products.fields.general_specification"),
                minWidth: 200,
            },
            {
                field: "created_at",
                flex: 1,
                headerName: translate("products.fields.created_at"),
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
