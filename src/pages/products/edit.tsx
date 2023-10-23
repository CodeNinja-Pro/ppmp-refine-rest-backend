// import { IResourceComponentsProps } from "@refinedev/core";
// import { MuiEditInferencer } from "@refinedev/inferencer/mui";

// export const ProductEdit: React.FC<IResourceComponentsProps> = () => {
//   return <MuiEditInferencer />;
// };

import { Edit, useAutocomplete } from "@refinedev/mui";
import {
  Box,
  TextField,
  Autocomplete,
  createFilterOptions,
} from "@mui/material";
import { useForm } from "@refinedev/react-hook-form";
import {
  HttpError,
  IResourceComponentsProps,
  useTranslate,
} from "@refinedev/core";
import { Controller } from "react-hook-form";
import { BaseSyntheticEvent } from "react";
import { IProduct } from "../../interfaces";
import { LoadingButton } from "@mui/lab";
import LoadingComp from "../../components/common/LoadingComp";
import IPSASCodeInput from "../../components/IPSASCodeInput";

export const ProductEdit: React.FC<IResourceComponentsProps> = () => {
  const translate = useTranslate();
  const {
    saveButtonProps,
    refineCore: { queryResult, onFinish, formLoading },
    register,
    control,
    formState: { errors, isLoading },
    handleSubmit,
    getValues,
  } = useForm<IProduct>({});

  const productsData = queryResult?.data?.data;

  const { autocompleteProps: unitAutocompleteProps } = useAutocomplete({
    resource: "units",
    defaultValue: productsData?.unit?.id,
  });
  const filterOptions = createFilterOptions({
    matchFrom: "any",
    stringify: (option: any) => option.name,
  });
  const ipsasCode = queryResult?.data?.data.IPSAS_code;
  console.log("isLoading: ", formLoading);


  return (
    <Edit saveButtonProps={saveButtonProps} isLoading={formLoading}>
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column", position: "relative" }}
        autoComplete="off"
      >
        {formLoading && <LoadingComp />}

        <TextField
          {...register("id", {
            required: "This field is required",
            valueAsNumber: true,
          })}
          error={!!(errors as any)?.id}
          helperText={(errors as any)?.id?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="number"
          label={translate("products.fields.id")}
          name="id"
          disabled
        />
        <TextField
          {...register("name", {
            required: "This field is required",
          })}
          error={!!(errors as any)?.name}
          helperText={(errors as any)?.name?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="text"
          label={translate("products.fields.name")}
          name="name"
        />
        {/* <TextField
          {...register("IPSAS_code", {
            required: "This field is required",
          })}
          error={!!(errors as any)?.IPSAS_code}
          helperText={(errors as any)?.IPSAS_code?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="text"
          label={translate("products.fields.IPSAS_code")}
          name="IPSAS_code"
        /> */}
        <IPSASCodeInput
          {...register("IPSAS_code", {
            required: "This field is required",
          })}
          error={!!(errors as any)?.IPSAS_code}
          helperText={(errors as any)?.IPSAS_code?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="text"
          label={translate("products.fields.IPSAS_code")}
          name="IPSAS_code"
          value={ipsasCode || ""}
        />

        {/* <TextField
                    {...register("code", {
                        required: "This field is required",
                    })}
                    error={!!(errors as any)?.code}
                    helperText={(errors as any)?.code?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    type="text"
                    label={translate("products.fields.code")}
                    name="code"
                /> */}
        <Controller
          control={control}
          name="unit"
          rules={{ required: "This field is required" }}
          // eslint-disable-next-line
          defaultValue={null as any}
          render={({ field }) => (
            <Autocomplete
              {...unitAutocompleteProps}
              {...field}
              filterOptions={filterOptions}
              onChange={(_, value) => {
                field.onChange(value);
              }}
              getOptionLabel={(item) => {
                return (
                  unitAutocompleteProps?.options?.find(
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
                  name="unit_id"
                  label={translate("products.fields.unit")}
                  margin="normal"
                  variant="outlined"
                  error={!!(errors as any)?.unit?.id}
                  helperText={(errors as any)?.unit?.id?.message}
                  required
                />
              )}
            />
          )}
        />
        <TextField
          {...register("unit_cost", {
            required: "This field is required",
            valueAsNumber: true,
          })}
          error={!!(errors as any)?.unit_cost}
          helperText={(errors as any)?.unit_cost?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="number"
          label={translate("products.fields.unit_cost")}
          name="unit_cost"
        />
        <TextField
          {...register("description", {
            required: "This field is required",
          })}
          error={!!(errors as any)?.description}
          helperText={(errors as any)?.description?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="text"
          label={translate("products.fields.description")}
          name="description"
          multiline
          minRows={5}
        />

        <TextField
          {...register("general_specification", {
            required: "This field is required",
          })}
          error={!!(errors as any)?.general_specification}
          helperText={(errors as any)?.general_specification?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="text"
          label={translate("products.fields.general_specification")}
          name="general_specification"
        />
        {/*
                    DatePicker component is not included in "@refinedev/mui" package.
                    To use a <DatePicker> component, you can follow the official documentation for Material UI.

                    Docs: https://mui.com/x/react-date-pickers/date-picker/#basic-usage
                */}
      </Box>
    </Edit>
  );
};
