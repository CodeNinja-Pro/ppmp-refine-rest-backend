// import { IResourceComponentsProps } from "@refinedev/core";
// import { MuiInferencer } from "@refinedev/inferencer/mui";

// export const SupplyTypeList: React.FC<IResourceComponentsProps> = () => {
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
import DataGridComp, { createdAtColDef, idColDef, nameColDef } from "../../components/DataGridComp";

export const SupplyTypeList: React.FC<IResourceComponentsProps> = () => {
    const translate = useTranslate();
    const { dataGridProps } = useDataGrid();

    const columns = React.useMemo<GridColDef[]>(
        () => [
            // {
            //     field: "id",
            //     headerName: translate("supply-types.fields.id"),
            //     type: "number",
            //     minWidth: 50,
            // },
            idColDef(dataGridProps),
            // {
            //     field: "name",
            //     flex: 1,
            //     headerName: translate("supply-types.fields.name"),
            //     minWidth: 200,
            // },
            nameColDef(dataGridProps),
            // {
            //     field: "created_at",
            //     flex: 1,
            //     headerName: translate("supply-types.fields.created_at"),
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
            <DataGridComp {...dataGridProps} columns={columns} autoHeight />
        </List>
    );
};
