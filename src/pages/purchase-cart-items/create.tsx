// import { IResourceComponentsProps } from "@refinedev/core";
// import { MuiInferencer } from "@refinedev/inferencer/mui";

// export const PurchaseCartItemCreate: React.FC<IResourceComponentsProps> = () => {
//     return <MuiInferencer />;
// };

import { Create, useDataGrid, useAutocomplete } from '@refinedev/mui';
import { Autocomplete, Box, Grid, TextField, useFormControl } from "@mui/material";
import { useForm } from "@refinedev/react-hook-form";
import {
  IResourceComponentsProps,
  useShow,
  useTranslate,
} from "@refinedev/core";
import React from "react";
import axios from "axios";
import { IProduct, IPurchaseCartItemsResourceProps } from "../../interfaces";

export const PurchaseCartItemCreate: React.FC<
  IPurchaseCartItemsResourceProps
> = ({ purchaseCartItems = [], setPurchaseCartItems }) => {
  const translate = useTranslate();
  const {
    saveButtonProps,
    control,
    handleSubmit,
    refineCore: { formLoading },
    formState: { isLoading, errors },
    register,
  } = useForm();

  const {autocompleteProps, queryResult: {data: productList}} = useAutocomplete<IProduct>({resource: "products"});
  // const {
  //   queryResult: { data: product },
  //   setShowId,
  // } = useShow({ resource: "products" });


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
        <Autocomplete
            {...autocompleteProps}
            getOptionLabel={(item) => item.name}
            isOptionEqualToValue={(option, value) =>
                value === undefined || option?.id?.toString() === (value?.id ?? value)?.toString()
            }
            placeholder="Select a category"
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Category"
                    margin="normal"
                    variant="outlined"
                    required
                />
            )}
        />
      </Box>
    </Create>
  );
};
