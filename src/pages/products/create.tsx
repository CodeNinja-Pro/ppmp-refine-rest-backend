// import { IResourceComponentsProps } from "@refinedev/core";
// import { MuiCreateInferencer } from "@refinedev/inferencer/mui";

// export const ProductCreate: React.FC<IResourceComponentsProps> = () => {
//   return <MuiCreateInferencer />;
// };

import { Create, useAutocomplete } from "@refinedev/mui";
import { Box, TextField, Autocomplete, InputAdornment, Input, Select, MenuItem, SelectChangeEvent } from "@mui/material";
import { useForm } from "@refinedev/react-hook-form";
import { IResourceComponentsProps, useTranslate } from "@refinedev/core";
import { Controller } from "react-hook-form";

import React from "react";
import { IProduct } from "../../interfaces";

export const ProductCreate: React.FC<IResourceComponentsProps> = () => {
    const translate = useTranslate();
    const {
        saveButtonProps,
        refineCore: { formLoading },
        register,
        control,
        formState: { errors },
    } = useForm<IProduct>();

    const { autocompleteProps: unitAutocompleteProps } = useAutocomplete({
        resource: "units",
    });
    const [unitId, setUnitId] = React.useState<number>(0);



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
                />
                <Controller
                    control={control}
                    name="unit"
                    rules={{ required: "This field is required" }}
                    // eslint-disable-next-line
                    defaultValue={null as any}
                    render={({ field }) => (
                        // <Select
                        // {...field}
                        // onChange={(event: SelectChangeEvent) => {setUnitId(+event.target.value || 0)}}
                        // value={unitId as unknown as string || ""}>
                        //     {unitAutocompleteProps.options.map((item, index) => (
                        //         <MenuItem key={index} value={item.id}>{item.name}</MenuItem>
                        //     ))}
                        // </Select>
                        <Autocomplete
                            {...unitAutocompleteProps}
                            {...field}
                            onChange={(_, value) => {
                                field.onChange(value);
                            }}
                            getOptionLabel={(item) => {
                                return (
                                    unitAutocompleteProps?.options?.find(
                                        (p) =>
                                            p?.id?.toString() ===
                                            item?.id?.toString(),
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
                                    label={translate("products.fields.unit")}
                                    margin="normal"
                                    variant="outlined"
                                    error={!!(errors as any)?.unit?.id}
                                    helperText={
                                        (errors as any)?.unit?.id?.message
                                    }
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
                    InputProps={{startAdornment: <InputAdornment position="start">$</InputAdornment>}}
                    
                    
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
                />
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
