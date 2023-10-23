// import { IResourceComponentsProps } from "@refinedev/core";
// import { MuiInferencer } from "@refinedev/inferencer/mui";

// export const PurchaseCartItemList: React.FC<IResourceComponentsProps> = () => {
//     return <MuiInferencer />;
// };

import React, { Dispatch, SetStateAction } from "react";
import {
    useDataGrid,
    EditButton,
    ShowButton,
    DeleteButton,
    List,
} from "@refinedev/mui";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { IResourceComponentsProps, useShow, useTranslate } from "@refinedev/core";
import { useAutocomplete } from '@refinedev/mui';
import { useDataGridProps } from "@mui/x-data-grid/DataGrid/useDataGridProps";
import { darken, useTheme } from "@mui/material/styles";
import DataGridComp from '../../components/DataGridComp';
import { IPurchaseCartItem, IPurchaseCartItemsResourceProps } from "../../interfaces";


export const PurchaseCartItemList: React.FC<IPurchaseCartItemsResourceProps> = ({ purchaseCartItems = [], setPurchaseCartItems }) => {
    const translate = useTranslate();
    const {autocompleteProps, overtime} = useAutocomplete({resource: "products"})

    // const dataGridProps = useDataGridProps({});
  
    const columns = React.useMemo<GridColDef[]>(
        () => [
            {
                field: 'id',
                headerName: 'Id',
                type: "number",
                width: 50
            },
            {
                field: 'product',
                headerName: "Product",
                type: "text",
                minWidth: 100,
                flex: 0.8
            },
            {
                field: "desc",
                headerName: "Item Description",
                minWidth: 100,
                flex: 0.8
            },
            {
                field: "method",
                headerName: "Method",
                minWidth: 80,
                flex: 0.5
            },
            {
                field: "purchase_mode",
                headerName: "Purchase Mode",
                minWidth: 80,
                flex: 0.5
            },
            {
                field: "qty",
                headerName: "QTY",
                minWidth: 50,
                flex: 0.3
            },
            {
                field: "unit",
                headerName: "UOM",
                minWidth: 50,
                flex: 0.3
            },
            {
                field: "unit_cost",
                headerName: "Unit Cost",
                minWidth: 50,
                flex: 0.3
            },
            {
                field: "total",
                headerName: "Total Price",
                minWidth: 50,
                flex: 0.3
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
            <DataGridComp  rows={purchaseCartItems} columns={columns} autoHeight />
        </List>
    );
};
