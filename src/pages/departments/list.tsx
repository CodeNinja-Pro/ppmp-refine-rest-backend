// import { IResourceComponentsProps } from "@refinedev/core";
// import { MuiInferencer } from "@refinedev/inferencer/mui";

// export const DepartmentList: React.FC<IResourceComponentsProps> = () => {
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
import { createdAtColDef, idColDef, nameColDef } from "../../components/DataGridComp";

export const DepartmentList: React.FC<IResourceComponentsProps> = () => {
    const translate = useTranslate();
    const { dataGridProps } = useDataGrid();
    console.log(dataGridProps);

    const columns = React.useMemo<GridColDef[]>(
        () => [
            // {
            //     field: "id",
            //     headerName: translate("departments.fields.id"),
            //     type: "number",
            //     minWidth: 50,
            // },
            // {
            //     field: "name",
            //     flex: 1,
            //     headerName: translate("departments.fields.name"),
            //     minWidth: 200,
            // },
            // {
            //     field: "created_at",
            //     flex: 1,
            //     headerName: translate("departments.fields.created_at"),
            //     minWidth: 250,
            //     renderCell: function render({ value }) {
            //         return <DateField value={value} />;
            //     },
            // },
            idColDef(dataGridProps),
            nameColDef(dataGridProps),
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
            <DataGrid {...dataGridProps} columns={columns} autoHeight />
        </List>
    );
};
