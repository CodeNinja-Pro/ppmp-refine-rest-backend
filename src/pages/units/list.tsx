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
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { IResourceComponentsProps, useTranslate } from "@refinedev/core";

// const listWrapperProps = {
//   style: {
//       background:
//           "radial-gradient(100% 80% at 50% 50%,rgba(255, 255, 255, 0) 0%,rgba(0, 0, 0, 0.5) 100%),url('images/bg.jpg')",
//       backgroundSize: "cover",
//       backgroundRepeat: "no-repeat",
//       width: "100%"
//   },
// };

export const UnitList: React.FC<IResourceComponentsProps> = () => {
    const translate = useTranslate();
    const { dataGridProps } = useDataGrid();

    const columns = React.useMemo<GridColDef[]>(
        () => [
            {
                field: "id",
                headerName: translate("units.fields.id"),
                type: "number",
                width: 20,
                renderCell: function render(params: GridRenderCellParams) {
                  return <span>{params.api.getRowIndexRelativeToVisibleRows(params.row.id) + 1}</span>
                }
            },
            {
                field: "name",
                flex: 1,
                headerName: translate("units.fields.name"),
                minWidth: 100,
            },
            {
                field: "created_at",
                flex: 1,
                headerName: translate("units.fields.created_at"),
                minWidth: 100,
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
        <List 
        // wrapperProps={listWrapperProps}
        >
            <DataGrid {...dataGridProps} columns={columns} autoHeight pageSizeOptions={[5, 10, 25, 50, 100]}/>
        </List>
    );
};
