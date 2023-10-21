// import { IResourceComponentsProps, useList } from '@refinedev/core';
// import { MuiCreateInferencer } from "@refinedev/inferencer/mui";

// export const RoleCreate: React.FC<IResourceComponentsProps> = () => {
//   return <MuiCreateInferencer />;
// };

import { Create, useAutocomplete } from '@refinedev/mui';
import { Box, TextField } from "@mui/material";
import { useForm } from "@refinedev/react-hook-form";
import { HttpError, IResourceComponentsProps, useList, useTranslate } from "@refinedev/core";
import DualListBox from "react-dual-listbox";
import { IPermission } from '../../interfaces';
import React from 'react';

export const RoleCreate: React.FC<IResourceComponentsProps> = () => {
    const translate = useTranslate();

    const {
        saveButtonProps,
        refineCore: { formLoading, onFinish, redirect },
        register,
        control,
        formState: { errors },
        handleSubmit
    } = useForm({
    });

    return (
        <Create isLoading={formLoading} saveButtonProps={saveButtonProps}>
            <Box
                component="form"
                sx={{ display: "flex", flexDirection: "column" }}
                autoComplete="off"
                onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
                    event.preventDefault();
                    handleSubmit(async (data) => {
                        try {
                            const index = await onFinish(data);
                        } catch (error){
                            console.log(error);
                        }
                    })
                }}
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
                    label={translate("roles.fields.name")}
                    name="name"
                />
                {/* <TextField
                    {...register("guard_name", {
                        required: "This field is required",
                    })}
                    error={!!(errors as any)?.guard_name}
                    helperText={(errors as any)?.guard_name?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    type="text"
                    label={translate("roles.fields.guard_name")}
                    name="guard_name"
                /> */}

                {/*
                    DatePicker component is not included in "@refinedev/mui" package.
                    To use a <DatePicker> component, you can follow the official documentation for Material UI.

                    Docs: https://mui.com/x/react-date-pickers/date-picker/#basic-usage
                */}
            </Box>
        </Create>
    );
};
