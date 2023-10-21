// import { IResourceComponentsProps } from "@refinedev/core";
// import { MuiListInferencer } from "@refinedev/inferencer/mui";

// export const UnitList: React.FC<IResourceComponentsProps> = () => {
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
import { DataGrid, GridColDef, GridRenderCellParams, GridSortApi } from "@mui/x-data-grid";
import { IResourceComponentsProps, useTranslate } from "@refinedev/core";
import { createdAtColDef, idColDef, nameColDef } from "../../components/DataGridComp";

export const UnitList: React.FC<IResourceComponentsProps> = () => {
    const translate = useTranslate();
    const { dataGridProps } = useDataGrid();

    const columns = React.useMemo<GridColDef[]>(
        () => [
            // {
            //     field: "id",
            //     headerName: translate("units.fields.id"),
            //     type: "number",
            //     width: 20,
            //     renderCell: function render(params: GridRenderCellParams) {
            //       return <span>{((dataGridProps.paginationModel?.page || 0) * (dataGridProps.paginationModel?.pageSize || 5)) +  params.api.getSortedRowIds().indexOf(params.row.id) +  1}</span>
            //     }
            // },
            idColDef(dataGridProps),
            // {
            //     field: "name",
            //     flex: 1,
            //     headerName: translate("units.fields.name"),
            //     minWidth: 100,
            // },
            nameColDef(dataGridProps),
            // {
            //     field: "created_at",
            //     flex: 1,
            //     headerName: translate("units.fields.created_at"),
            //     minWidth: 100,
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
        [translate, dataGridProps],
    );

    return (
        <List 
        >
            <DataGrid {...dataGridProps} initialState={{
                pagination: {paginationModel: {pageSize: 5}},
            }} autoHeight columns={columns}  pageSizeOptions={[5, 10, 25, 50, 100]}/>
        </List>
    );
};
