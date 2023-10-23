// import { IResourceComponentsProps } from "@refinedev/core";
// import { MuiCreateInferencer } from "@refinedev/inferencer/mui";

// export const ProductCreate: React.FC<IResourceComponentsProps> = () => {
//   return <MuiCreateInferencer />;
// };

import { Create, useAutocomplete } from "@refinedev/mui";
import {
  Box,
  TextField,
  Autocomplete,
  InputAdornment,
  Input,
  Select,
  MenuItem,
  SelectChangeEvent,
  createFilterOptions,
} from "@mui/material";
import { useForm } from "@refinedev/react-hook-form";
import { IResourceComponentsProps, useTranslate } from "@refinedev/core";
import { Controller } from "react-hook-form";

import React from "react";
import { IProduct } from "../../interfaces";
import { IMaskInput, IMask } from "react-imask";
import { selectedGridRowsCountSelector } from "@mui/x-data-grid";

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

const TextMaskCustom = React.forwardRef<HTMLInputElement, CustomProps>(
  function TextMaskCustom(props, ref) {
    const { onChange, ...other } = props;
    return (
      <IMaskInput
        {...other}
        lazy={false}
        mask="0000.000.+++000.0000.0000mode"
        placeholderChar="_"
        inputRef={ref}
        definitions={{
          "#": /[0-9\.]/,
          "+": /[A-Z]/,
        }}
        blocks={{
          mode: {
            mask: IMask.MaskedEnum,
            enum: ["RB", "DC", "SV", "EP", "FA"],
          },
          block1: {
            mask: "+++",
          },
        }}
        color="red"
        prepareChar={(chars, masked, flags) => chars.toLocaleUpperCase()}
        onAccept={(value: any) => {
            console.log("sdfsdf", value);
          onChange({ target: { name: props.name, value } });
        }}
      />
    );
  }
);

export const ProductCreate: React.FC<IResourceComponentsProps> = () => {
  const translate = useTranslate();
  const {
    saveButtonProps,
    refineCore: { formLoading },
    register,
    control,
    setValue,
    getValues,
    formState: { errors, dirtyFields, touchedFields },
    trigger
  } = useForm<IProduct>();

  const { autocompleteProps: unitAutocompleteProps } = useAutocomplete({
    resource: "units",
  });

  const filterOptions = createFilterOptions({
    matchFrom: "any",
    stringify: (option: any) => option.name,
  });

  // const handleChange = (event: any) => {
  //     const { value } = event.target;
  //     // Remove any non-alphanumeric characters from the input
  //     const sanitizedValue = value.replace(/[^a-zA-Z0-9]/g, '');
  //     // Format the input with dots and other fixed values
  //     const formattedValue = `${sanitizedValue.slice(0, 4)}.${sanitizedValue.slice(4, 10)}BAL${sanitizedValue.slice(10, 14)}.2021RB`;
  //     setValue("IPSAS_code", form);
  //   };
  // setValue("IPSAS_code", "sdfsdfsdf");
  const [ipsasCode, setIpsasCode] = React.useState("");
  console.log(ipsasCode);
  console.log(getValues("IPSAS_code"));
  console.log(errors);



  console.log(ipsasCode);
  console.log(errors);
  return (
    <Create isLoading={formLoading} saveButtonProps={saveButtonProps}>
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column" }}
        autoComplete="off"
      >
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
        <TextField
          {...register("IPSAS_code", {
            required: {
              value: true,
              message: "This field is required",
            },
            pattern: {
              value:
                /^[0-9]{4}\.[0-9]{3}\.[A-Z]{3}[0-9]{3}\.[0-9]{4}\.[0-9]{4}(RB|DC|SV|EP|FA)$/,
              message:
                "This filed does not match IPSAS code format. eg: 4010.000BAL001.0001.2021(RB|DC|SV|EP|FA)",
            },
          })}
          error={
            !!(errors as any)?.IPSAS_code && touchedFields.IPSAS_code
          }
          helperText={
            (errors as any)?.IPSAS_code?.message ||
            "4010.000BAL001.0001.2021(RB|DC|SV|EP|FA)"
          }
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="text"
          value={ipsasCode}
          onChange={(event) => {
            setIpsasCode(event.target.value);
            setValue("IPSAS_code", event.target.value);
            trigger("IPSAS_code");
          }}
          label={translate("products.fields.IPSAS_code")}
          name="IPSAS_code"
          placeholder="4010.000BAL001.0001.2021RB"
          InputProps={{
            inputComponent: TextMaskCustom as any,
          }}
        />
        {/* <Input
                    
                }
                <TextField
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
        {/* <TextField
                    {...register("code", {
                        required: "This field is required",
                        valueAsNumber: true,
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
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
        />
        {/* <NumberField 
                    {...register("unit_cost", {
                        required: "This field is required",
                        valueAsNumber: true,
                    })}
                    error={!!(errors as any)?.unit_cost}
                    helperText={(errors as any)?.unit_cost?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    label={translate("products.fields.unit_cost")}
                    name="unit_cost"
                /> */}
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
          maxRows={5}
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
    </Create>
  );
};
