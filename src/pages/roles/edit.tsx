// import { IResourceComponentsProps } from "@refinedev/core";
// import { MuiEditInferencer } from "@refinedev/inferencer/mui";

// export const RoleEdit: React.FC<IResourceComponentsProps> = () => {
//   return <MuiEditInferencer />;
// };

import { Edit } from "@refinedev/mui";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useForm } from "@refinedev/react-hook-form";
import {
  IResourceComponentsProps,
  useList,
  useOne,
  useTranslate,
  useUpdate,
} from "@refinedev/core";
import DualListBox from "react-dual-listbox";
import React from "react";
import { IPermission, IRole } from "../../interfaces";
import {
  ArrowBackOutlined,
  ArrowForward,
  FirstPageOutlined,
  LastPage,
  MoveDown,
  MoveUpOutlined,
} from "@mui/icons-material";
import { text } from "stream/consumers";

import LoadingComp from "../../components/common/LoadingComp";

export const RoleEdit: React.FC<IResourceComponentsProps> = () => {
  const translate = useTranslate();
  const {
    saveButtonProps,
    refineCore: { queryResult, onFinish, formLoading },
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IRole>();

  const allPermissions = useList<IPermission>({
    resource: "permissions",
    pagination: {
      mode: "off"
    }
  });
  const rolesData = queryResult?.data?.data;

  const {data: currentPermissions, isLoading, isError} = useOne<Array<IPermission>>({
    resource: "role-permissions",
    id: rolesData?.id,
  });



  // const [selected, setSelected] = React.useState(rolePermissions);
  // const [selectedPermissions, setSelectedPermissions] = React.useState(rolePermissions);
  const options2 =
    allPermissions.data?.data.map((permission) => ({
      label: permission.name,
      value: permission.id,
    })) || [];
    console.log(currentPermissions?.data);

  const [selectedPermissions, setSelectedPermissions] = React.useState<
    Array<number> | undefined
  >(currentPermissions?.data.map((permission) => permission.id));
  console.log("selected Permissions: ", selectedPermissions);

  React.useEffect(() => {
    setSelectedPermissions((currentPermissions?.data.map((permission) => permission.id)))
    console.log("use Effect: ", (currentPermissions?.data.map((permission) => permission.id)))
  }, [currentPermissions?.data])

  const { mutate } = useUpdate();

  // handleSubmit(async (values) => {
  //   console.log(123);
  // })
  saveButtonProps.onClick = (e) => {
    console.log(123);
    mutate({
      resource: "role-permissions",
      id: rolesData?.id || -1000,
      values: {selectedPermissions},

    })
  }


  return (
  <Edit saveButtonProps={saveButtonProps} >
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column" }}
        autoComplete="off"
      >
        {
          formLoading ? <LoadingComp /> : 
          <><TextField
              {...register("name", {
                required: "This field is required",
              })}
              error={!!(errors as any)?.name}
              helperText={(errors as any)?.name?.message}
              margin="normal"
              fullWidth
              InputLabelProps={{ shrink: true }}
              type="text"
              label={translate("units.fields.name")}
              name="name" /><DualListBox
                disabled={saveButtonProps.disabled}
                canFilter
                filterCallback={(option, filterInput) => {
                  if (filterInput === "") {
                    return true;
                  }
                  return new RegExp(filterInput, "i").test(option.label);
                } }
                showHeaderLabels
                options={options2}
                lang={{ availableHeader: "Available Permissions", selectedHeader: "Current Permissions", moveLeft: "<-", moveRight: "->", moveAllLeft: "<=", moveAllRight: "=>" }}
                icons={{
                  moveLeft: <ArrowBackOutlined />,
                  moveAllLeft: <FirstPageOutlined />,
                  moveRight: <ArrowForward />,
                  moveAllRight: <LastPage />,
                }}
                selected={selectedPermissions}
                onChange={(selectedItems) => setSelectedPermissions(selectedItems)} /></>
        }
      </Box>
    </Edit>
  );
};
