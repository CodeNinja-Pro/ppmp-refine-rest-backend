// import { IResourceComponentsProps } from "@refinedev/core";
// import { MuiInferencer } from "@refinedev/inferencer/mui";

// export const PurchaseCartItemsList: React.FC<IResourceComponentsProps> = () => {
//     return <MuiInferencer />;
// };

import React from "react";
import {
    useDataGrid,
    EditButton,
    ShowButton,
    DeleteButton,
    List,
} from "@refinedev/mui";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { IResourceComponentsProps, useShow, useTranslate } from "@refinedev/core";

export const PurchaseCartItemsList: React.FC<IResourceComponentsProps> = () => {
    const translate = useTranslate();


    const columns = React.useMemo<GridColDef[]>(
        () => [
            {
                field: "actions",
                headerName: translate("table.actions"),
                sortable: false,
                renderCell: function render({ row }) {
                    return (
                        <>
                            <EditButton hideText recordItemId={row.id} />
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
        <List>
            {/* <DataGrid {...dataGridProps} columns={columns} autoHeight /> */}
        </List>
    );
};
