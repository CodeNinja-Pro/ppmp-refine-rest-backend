// import { IResourceComponentsProps } from "@refinedev/core";
// import { MuiListInferencer } from "@refinedev/inferencer/mui";

// export const UserList: React.FC<IResourceComponentsProps> = () => {
//   // <Button>123123</Button>
//   return <MuiListInferencer />;
// };

import React from "react";
import {
  useDataGrid,
  EditButton,
  ShowButton,
  DeleteButton,
  List,
  EmailField,
  TagField,
  DateField,
} from "@refinedev/mui";
import { DataGrid, DataGridProps, GridColDef } from "@mui/x-data-grid";
import LoadingComp from "../../components/common/LoadingComp";
import {
  IResourceComponentsProps,
  useTranslate,
  useMany,
} from "@refinedev/core";
import DataGridComp, { createdAtColDef, idColDef, nameColDef } from "../../components/DataGridComp";

export const UserList: React.FC<IResourceComponentsProps> = () => {
  const translate = useTranslate();
  const { dataGridProps } = useDataGrid();

  const { data: departmentData, isLoading: departmentIsLoading } = useMany({
    resource: "departments",
    ids: dataGridProps?.rows?.map((item: any) => item?.department_id) ?? [],
    queryOptions: {
      enabled: !!dataGridProps?.rows,
    },
  });

  const columns = React.useMemo<GridColDef[]>(
    () => [
      // {
      //   field: "id",
      //   headerName: translate("users.fields.id"),
      //   type: "number",
      //   minWidth: 50,
      //   renderCell: (params) => (
      //     <span>
      //       {(dataGridProps.paginationModel?.page || 0) *
      //         (dataGridProps.paginationModel?.pageSize || 5) +
      //         params.api.getSortedRowIds().indexOf(params.row.id) + 1}
      //     </span>
      //   ),
      // },
      idColDef(dataGridProps as any),
      nameColDef(dataGridProps as any),
      {
        field: "email",
        flex: 1,
        headerName: translate("users.fields.email"),
        minWidth: 250,
        renderCell: function render({ value }) {
          return <EmailField value={value} />;
        },
      },
      {
        field: "roles",
        flex: 1,
        headerName: translate("users.fields.roles"),
        minWidth: 300,
        renderCell: function render({ value }) {
          return (
            <>
              {value?.map((role: any, index: number) => (
                <TagField key={index} value={role.name} />
              ))}
            </>
          );
        },
      },
      {
        field: "department_id",
        flex: 1,
        headerName: translate("users.fields.department_id"),
        minWidth: 300,
        renderCell: function render({ value }) {
          return departmentIsLoading ? (
            <>Loading...</>
          ) : (
            departmentData?.data?.find((item) => item.id === value)?.name
          );
        },
      },
      createdAtColDef(dataGridProps as any),
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
    [translate, departmentData?.data]
  );

  return (
    <List>
      <DataGridComp {...dataGridProps} columns={columns}  />
    </List>
  );
};
