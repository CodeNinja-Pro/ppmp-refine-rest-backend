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
    ImportButton,
    ExportButton,
} from "@refinedev/mui";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { IResourceComponentsProps, useExport, useImport, useTranslate } from "@refinedev/core";
import DataGridComp, { createdAtColDef, idColDef, nameColDef } from "../../components/DataGridComp";
import { IProduct } from "../../interfaces";

export const ProductList: React.FC<IResourceComponentsProps> = () => {
    const translate = useTranslate();
    const { triggerExport, isLoading: exportLoading } = useExport<IProduct>({
        mapData: (item) => {
            return {
                id: item.id,
                name: item.name,
                IPSAS_code: item.IPSAS_code,
                description: item.description,
                general_specification: item.general_specification,
                unit: item.unit.name,
                unit_cost: item.unit_cost,
                created_at: item.created_at
            };
        },
    });

    const importProps = useImport<IProduct>({
        mapData: (item) => {
            return {
                id: item.id,
                name: item.name,
                IPSAS_code: item.IPSAS_code,
                description: item.description,
                general_specification: item.general_specification,
                unit: item.unit.name,
                unit_cost: item.unit_cost,
                created_at: item.created_at
            };
        },
    });

    const { dataGridProps } = useDataGrid();
    // debugger;

    const columns = React.useMemo<GridColDef[]>(
        () => [
            // {
            //     field: "id",
            //     headerName: translate("products.fields.id"),
            //     type: "number",
            //     width: 20,
            // },
            idColDef(dataGridProps),
            // {
            //     field: "name",
            //     flex: 2,
            //     headerName: translate("products.fields.name"),
            //     minWidth: 100,
            // },
            nameColDef(dataGridProps),
            // {
            //     field: "code",
            //     flex: 1,
            //     headerName: translate("products.fields.code"),
            //     type: "number",
            //     minWidth: 100,
            // },
   
            {
                field: "IPSAS_code",
                flex: 1,
                headerName: translate("products.fields.IPSAS_code"),
                minWidth: 150,
            },
          {
                field: "description",
                flex: 2,
                headerName: translate("products.fields.description"),
                minWidth: 100,
            }, 
            {
                field: "general_specification",
                flex: 2,
                headerName: translate("products.fields.general_specification"),
                minWidth: 100,
            },
            {
                field: "unit",
                flex: 1,
                headerName: translate("products.fields.unit"),
                valueGetter: ({ row }) => {
                    const value = row?.unit?.name;

                    return value;
                },
                minWidth: 50,
            }, 
            {
                field: "unit_cost",
                flex: 1,
                headerName: translate("products.fields.unit_cost"),
                type: "number",
                minWidth: 50,
            },
           
         
            // {
            //     field: "created_at",
            //     flex: 1,
            //     headerName: translate("products.fields.created_at"),
            //     minWidth: 50,
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
        <List headerButtons={({defaultButtons}) => <>{defaultButtons} <ImportButton variant="contained"{...importProps} /><ExportButton variant="contained" onClick={triggerExport} loading={exportLoading} /></>}>
            <DataGridComp {...dataGridProps} columns={columns} autoHeight />
        </List>
    );
};
