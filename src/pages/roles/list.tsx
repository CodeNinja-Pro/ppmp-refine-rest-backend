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
import { IResourceComponentsProps, useDelete, useTranslate } from "@refinedev/core";
import DataGridComp, { createdAtColDef, idColDef, nameColDef } from "../../components/DataGridComp";

export const RoleList: React.FC<IResourceComponentsProps> = () => {
    const translate = useTranslate();
    const { dataGridProps } = useDataGrid();

    const {mutate} = useDelete();
    


    const columns = React.useMemo<GridColDef[]>(
        () => [
            idColDef(dataGridProps as any),
            nameColDef(dataGridProps as any),
            createdAtColDef(dataGridProps as any),
            {
                field: "actions",
                headerName: translate("table.actions"),
                sortable: false,
                renderCell: function render({ row }) {
                    return (
                        <>
                            <EditButton hideText recordItemId={row.id} />
                            {/* <ShowButton hideText recordItemId={row.id} /> */}
                            <DeleteButton hideText recordItemId={row.id} onClick={() => {
                                mutate({
                                    id: row.id,
                                    resource: "roles"
                                });
                            }}/>
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
            <DataGridComp {...dataGridProps} columns={columns} />
        </List>
    );
};
