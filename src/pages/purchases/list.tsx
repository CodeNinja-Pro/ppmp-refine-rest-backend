// import { IResourceComponentsProps } from "@refinedev/core";
// import { MuiInferencer } from "@refinedev/inferencer/mui";

// export const PurchasesList: React.FC<IResourceComponentsProps> = () => {
//     return <MuiInferencer />;
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
import DataGridComp, { createdAtColDef, idColDef } from "../../components/DataGridComp";
import { PurchaseRequestStatus } from "../../components/PurchaseRequestStatusComp";

export const PurchaseList: React.FC<IResourceComponentsProps> = () => {
    const translate = useTranslate();
    const { dataGridProps } = useDataGrid();

    const columns = React.useMemo<GridColDef[]>(
        () => [
            // 
            idColDef(dataGridProps),
            {
                field: "product",
                headerName: translate("purchases.fields.product"),
                valueGetter: ({ row }) => {
                    const value = row?.product?.name;

                    return value;
                },
                minWidth: 150,
                flex: 0.5
            },
            {
                field: "department",
                flex: 0.5,
                headerName: translate("purchases.fields.department"),
                valueGetter: ({ row }) => {
                    const value = row?.department?.name;

                    return value;
                },
                minWidth: 150,
            },
            {
                field: "supply_type",
                flex: 0.5,
                headerName: translate("purchases.fields.supply_type"),
                valueGetter: ({ row }) => {
                    const value = row?.supply_type?.name;

                    return value;
                },
                minWidth: 150,
            },
            {
                field: "purchase_mode",
                flex: 0.5,
                headerName: translate("purchases.fields.purchase_mode"),
                valueGetter: ({ row }) => {
                    const value = row?.purchase_mode?.name;

                    return value;
                },
                minWidth: 150,
            },
            {
                field: "qty",
                flex: 0.1,
                headerName: translate("purchases.fields.qty"),
                type: "number",
                minWidth: 50,
            },
            {
                field: "item_description",
                flex: 0.5,
                headerName: translate("purchases.fields.item_description"),
                minWidth: 100,
            },
            // {
            //     field: "created_at",
            //     flex: 1,
            //     headerName: translate("purchases.fields.created_at"),
            //     minWidth: 250,
            //     renderCell: function render({ value }) {
            //         return <DateField value={value} />;
            //     },
            // },
            createdAtColDef(dataGridProps, "Created At", {minWidth: 200}),
            {
                field: "method",
                flex: 0.5,
                headerName: translate("purchases.fields.method"),
                type: "number",
                minWidth: 100,
            },
            {
                field: "created_by",
                flex: 0.5,
                headerName: translate("purchases.fields.created_by"),
                valueGetter: ({ row }) => {
                    const value = row?.created_by?.name;

                    return value;
                },
                minWidth: 100,
            },
            {
                field: "source_of_funding",
                flex: 0.5,
                headerName: translate("purchases.fields.source_of_funding"),
                valueGetter: ({ row }) => {
                    const value = row?.source_of_funding?.name;

                    return value;
                },
                minWidth: 150,
            },
            {
                field: "status",
                flex: 0.5,
                headerName: translate("purchases.fields.status"),
                minWidth: 100,
                renderCell: ({row}) => (<PurchaseRequestStatus status={row.status}/>)
            },
            {
                field: "actions",
                headerName: translate("table.actions"),
                sortable: false,
                renderCell: function render({ row }) {
                    return (
                        <>
                            <ShowButton hideText recordItemId={row.id} />
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
        <List canCreate={false} >
            <DataGridComp {...dataGridProps} columns={columns} autoHeight />
        </List>
    );
};
