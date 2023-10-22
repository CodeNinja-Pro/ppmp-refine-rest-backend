// import { IResourceComponentsProps } from "@refinedev/core";
// import { MuiInferencer } from "@refinedev/inferencer/mui";

// export const PurchaseCartItemsCreate: React.FC<IResourceComponentsProps> = () => {
//     return <MuiInferencer />;
// };

import { Create, useDataGrid } from "@refinedev/mui";
import { Box, TextField, useFormControl } from "@mui/material";
import { useForm } from "@refinedev/react-hook-form";
import {
  IResourceComponentsProps,
  useShow,
  useTranslate,
} from "@refinedev/core";
import React from "react";
import axios from "axios";

export const PurchaseCartItemsCreate: React.FC<
  IResourceComponentsProps
> = () => {
  const translate = useTranslate();
  const {
    saveButtonProps,
    control,
    handleSubmit,
    refineCore: { formLoading },
    formState: { isLoading, errors },
    register,
  } = useForm();

  const {
    queryResult: { data: product },
    setShowId,
  } = useShow({ resource: "products" });

  const [cartItem, setCartItem] = React.useState({});
  // const {
  //     saveButtonProps,
  //     refineCore: { formLoading },
  //     register,
  //     control,
  //     formState: { errors },
  // } = useForm();

  return (
    <Create isLoading={formLoading} saveButtonProps={saveButtonProps}>
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column" }}
        autoComplete="off"
      >
        {/* <TextField
        {...register('product', {})} */}
      </Box>
    </Create>
  );
};
