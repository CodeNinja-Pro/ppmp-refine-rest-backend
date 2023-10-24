// import { IResourceComponentsProps } from "@refinedev/core";
// import { MuiInferencer } from "@refinedev/inferencer/mui";

// export const PurchaseCartItemCreate: React.FC<IResourceComponentsProps> = () => {
//     return <MuiInferencer />;
// };

import { Create, useDataGrid, useAutocomplete } from "@refinedev/mui";
import {
  Autocomplete,
  Box,
  Grid,
  TextField,
  useFormControl,
} from "@mui/material";
import { useForm } from "@refinedev/react-hook-form";
import {
  IResourceComponentsProps,
  useShow,
  useTranslate,
} from "@refinedev/core";
import React from "react";
import axios from "axios";
import { IProduct, IPurchaseCartItemsResourceProps } from "../../interfaces";
import { Controller } from "react-hook-form";
import { filterOptions } from "../../utils/filterOptions";
import { Register } from "../register/index";
import IPSASCodeInput from "../../components/IPSASCodeInput";

export const PurchaseCartItemCreate: React.FC<
  IPurchaseCartItemsResourceProps
> = ({ purchaseCartItems = [], setPurchaseCartItems }) => {
  const translate = useTranslate();
  const {
    saveButtonProps,
    control,
    handleSubmit,
    refineCore: { formLoading, onFinish, redirect },
    formState: { isLoading, errors, dirtyFields },
    register,
    setValue,
    getValues,
    watch,
  } = useForm();

  // const {autocompleteProps, queryResult: {data: productList}} = useAutocomplete<IProduct>({resource: "products"});
  const { autocompleteProps: productAutocompleteProps } = useAutocomplete({
    resource: "products",
  });
  const { autocompleteProps: supplyTypeAutocompleteProps } = useAutocomplete({
    resource: "supply-types",
  });
  const { autocompleteProps: fundingSrcAutocompleteProps } = useAutocomplete({
    resource: "source-of-fundings",
  });
  const { autocompleteProps: purchaseModeAutocompleteProps } = useAutocomplete({
    resource: "purchase-modes",
  });

  // const {
  //   queryResult: { data: product },
  //   setShowId,
  // } = useShow({ resource: "products" });

  saveButtonProps.onClick = (e) => {
    e.preventDefault();
  };


  const [cartItem, setCartItem] = React.useState({});
  // const {
  //     saveButtonProps,
  //     refineCore: { formLoading },
  //     register,
  //     control,
  //     formState: { errors },
  // } = useForm();

  // const watchProduct:IProduct = watch("product");
  // watch((value, {name, type}) => {
  //   console.log(value, name, type);
  // });

  const watchQty = watch("qty", 1);
  const watchUnit = watch("unit", 0);
  const watchProduct = watch("product", {});


  React.useEffect(() => {
    setValue("unit", watchProduct?.unit?.name, { shouldValidate: true});
    setValue("description", watchProduct?.description, {shouldValidate: true});
    setValue("IPSAS_code", watchProduct?.IPSAS_code, {shouldValidate: true});
    setValue("general_specification", watchProduct?.general_specification, {shouldValidate: true});
    setValue("description", watchProduct?.description, {shouldValidate: true});
    setValue("unit_cost", watchProduct?.unit_cost, {shouldValidate: true});

  }, [watchProduct])
  React.useEffect(() => {

    setValue("total_amount", watchQty * watchProduct?.unit_cost, {shouldValidate: true})
  }, [watchQty, watchProduct])





  // console.log("errors: ", errors);
  // console.log("sdfsdfsdf", getValues())
  // setValue("total_amount", watchQty * watchUnit || 0);
  // setValue("description", watchProduct.description);
  // setValue("IPSAS_code", watchProduct.IPSAS_code);
  saveButtonProps.onClick = (event) => {
    // debugger;
    event.preventDefault();
    handleSubmit(async (data) => {
      data.id=purchaseCartItems.length+1;
      setPurchaseCartItems([...purchaseCartItems, data])
      redirect("purchase-cart-items");
      // await onFinish(data);
    })()
  }

// console.log(errors);
  return (
    <Create isLoading={formLoading} saveButtonProps={saveButtonProps}>
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column" }}
        autoComplete="off"
      >
        <Grid container columnSpacing={5}>
          <Grid item xs={12}>
            <Controller
              control={control}
              name="product"
              rules={{ required: "This field is required" }}
              // eslint-disable-next-line
              defaultValue={null as any}
              render={({ field }) => (
                <Autocomplete
                  {...productAutocompleteProps}
                  {...field}
                  filterOptions={filterOptions}
                  onChange={(_, value) => {
                    field.onChange(value);
                  }}
                  getOptionLabel={(item) => {
                    return (
                      productAutocompleteProps?.options?.find(
                        (p) => p?.id?.toString() === item?.id?.toString()
                      )?.name ?? ""
                    );
                  }}
                  isOptionEqualToValue={(option, value) =>
                    value === undefined ||
                    option?.id?.toString() === value?.id?.toString()
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      name="product"
                      label={translate("products.fields.name")}
                      margin="normal"
                      variant="outlined"
                      error={!!(errors as any)?.product}
                      helperText={(errors as any)?.product?.message}
                      required
                    />
                  )}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Controller
              control={control}
              name="supply_type"
              rules={{ required: "This field is required" }}
              // eslint-disable-next-line
              defaultValue={null as any}
              render={({ field }) => (
                <Autocomplete
                  {...supplyTypeAutocompleteProps}
                  {...field}
                  filterOptions={filterOptions}
                  onChange={(_, value) => {
                    field.onChange(value);
                  }}
                  getOptionLabel={(item) => {
                    return (
                      supplyTypeAutocompleteProps?.options?.find(
                        (p) => p?.id?.toString() === item?.id?.toString()
                      )?.name ?? ""
                    );
                  }}
                  isOptionEqualToValue={(option, value) =>
                    value === undefined ||
                    option?.id?.toString() === value?.id?.toString()
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      name="supply_type"
                      label={translate("products.fields.supply_type")}
                      margin="normal"
                      variant="outlined"
                      error={!!(errors as any)?.supply_type}
                      helperText={(errors as any)?.supply_type?.message}
                      required
                    />
                  )}
                />
              )}
            />
          </Grid>
          {/* source of funding */}
          <Grid item xs={12} md={4}>
            <Controller
              control={control}
              name="source_of_funding"
              rules={{ required: "This field is required" }}
              // eslint-disable-next-line
              defaultValue={null as any}
              render={({ field }) => (
                <Autocomplete
                  {...fundingSrcAutocompleteProps}
                  {...field}
                  filterOptions={filterOptions}
                  onChange={(_, value) => {
                    field.onChange(value);
                  }}
                  getOptionLabel={(item) => {
                    return (
                      fundingSrcAutocompleteProps?.options?.find(
                        (p) => p?.id?.toString() === item?.id?.toString()
                      )?.name ?? ""
                    );
                  }}
                  isOptionEqualToValue={(option, value) =>
                    value === undefined ||
                    option?.id?.toString() === value?.id?.toString()
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label={translate("products.fields.source_of_funding")}
                      margin="normal"
                      variant="outlined"
                      error={!!(errors as any)?.source_of_funding}
                      helperText={
                        (errors as any)?.source_of_funding?.message
                      }
                      required
                    />
                  )}
                />
              )}
            />
          </Grid>
          {/* Method */}
          <Grid item xs={12} md={4}>
            <TextField
              {...register("method", {
                required: "This field is required.",
              })}
              error={!!(errors as any)?.method}
              helperText={(errors as any)?.method?.message}
              margin="normal"
              fullWidth
              InputLabelProps={{ shrink: true }}
              type="text"
              label={translate("products.fields.method")}
            />
          </Grid>
          {/* description */}
          <Grid item xs={12} md={6}>
            <TextField
              {...register("description", {
                required: "This field is required.",
              })}
              error={!!(errors as any)?.description}
              helperText={(errors as any)?.description?.message}
              margin="normal"
              fullWidth
              InputLabelProps={{ shrink: true }}
              type="text"
              label={translate("products.fields.description")}
            />
          </Grid>
          {/* IPSAS code */}
          <Grid item xs={12} md={3}>
            <TextField
              {...register("IPSAS_code", {
                required: "This field is required.",
              })}
              error={!!(errors as any)?.IPSAS_code}
              helperText={(errors as any)?.IPSAS_code?.message}
              margin="normal"
              fullWidth
              InputLabelProps={{ shrink: true }}
              type="text"
              disabled
              label={translate("products.fields.IPSAS_code")}
            />
          </Grid>
          {/* Purchase mode */}
          <Grid item xs={12} md={3}>
            <Controller
              control={control}
              name="purchase_mode"
              rules={{ required: "This field is required" }}
              // eslint-disable-next-line
              defaultValue={null as any}
              render={({ field }) => (
                <Autocomplete
                  {...purchaseModeAutocompleteProps}
                  {...field}
                  filterOptions={filterOptions}
                  onChange={(_, value) => {
                    field.onChange(value);
                  }}
                  getOptionLabel={(item) => {
                    return (
                      purchaseModeAutocompleteProps?.options?.find(
                        (p) => p?.id?.toString() === item?.id?.toString()
                      )?.name ?? ""
                    );
                  }}
                  isOptionEqualToValue={(option, value) =>
                    value === undefined ||
                    option?.id?.toString() === value?.id?.toString()
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label={translate("products.fields.purchase_mode")}
                      margin="normal"
                      variant="outlined"
                      error={!!(errors as any)?.purchase_mode}
                      helperText={
                        (errors as any)?.purchase_mode?.message
                      }
                      required
                    />
                  )}
                />
              )}
            />
          </Grid>
          <Grid xs={12} item>
            <TextField
              {...register("general_specification", {
                required: "This field is required.",
              })}
              error={!!(errors as any)?.general_specification}
              helperText={(errors as any)?.general_specification?.message}
              margin="normal"
              fullWidth
              InputLabelProps={{ shrink: true }}
              type="text"
              minRows={5}
              disabled
              label={translate("products.fields.general_specification")}
            />
          </Grid>
          <Grid xs={6} md={3} item>
            <TextField
              {...register("qty", {
                required: "This field is required.",
              })}
              error={!!(errors as any)?.qty}
              helperText={(errors as any)?.qty?.message}
              margin="normal"
              fullWidth
              InputLabelProps={{ shrink: true }}
              type="text"
              rows={10}
              minRows={10}
              label={translate("products.fields.qty")}
            />
          </Grid>
          <Grid xs={6} md={3} item>
            <TextField
              {...register("unit", {
                required: "This field is required.",
              })}
              error={!!(errors as any)?.unit}
              helperText={(errors as any)?.unit?.message}
              margin="normal"
              fullWidth
              InputLabelProps={{ shrink: true }}
              type="text"
              rows={10}
              minRows={10}
              disabled
              label={translate("products.fields.unit")}
            />
          </Grid>
          <Grid xs={6} md={3} item>
            <TextField
              {...register("unit_cost", {
                required: "This field is required.",
              })}
              error={!!(errors as any)?.unit_cost}
              helperText={(errors as any)?.unit_cost?.message}
              margin="normal"
              fullWidth
              InputLabelProps={{ shrink: true }}
              type="text"
              rows={10}
              minRows={10}
              disabled
              label={translate("products.fields.unit_cost")}
            />
          </Grid>
          <Grid xs={6} md={3} item>
            <TextField
              {...register("total_amount", {
                required: "This field is required.",
              })}
              error={!!(errors as any)?.total_amount}
              helperText={(errors as any)?.total_amount?.message}
              margin="normal"
              fullWidth
              InputLabelProps={{ shrink: true }}
              type="number"
              rows={10}
              minRows={10}
              disabled
              label={translate("products.fields.totalAmount")}
            />
          </Grid>
        </Grid>
      </Box>
    </Create>
  );
};
