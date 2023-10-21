// import { IResourceComponentsProps } from "@refinedev/core";
// import { MuiEditInferencer } from "@refinedev/inferencer/mui";

// export const PermissionEdit: React.FC<IResourceComponentsProps> = () => {
//   return <MuiEditInferencer />;
// };

import { Edit } from "@refinedev/mui";
import { Box, TextField } from "@mui/material";
import { useForm } from "@refinedev/react-hook-form";
import { IResourceComponentsProps, useMutationMode, useTranslate } from "@refinedev/core";
import LoadingComp from "../../components/common/LoadingComp";

export const PermissionEdit: React.FC<IResourceComponentsProps> = () => {
    const translate = useTranslate();
    const {
        saveButtonProps,
        refineCore: { queryResult, formLoading },
        register,
        control,
        formState: { errors },
    } = useForm();

    const permissionsData = queryResult?.data?.data;

    return (
        <Edit saveButtonProps={saveButtonProps}>
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
                    label={translate("permissions.fields.id")}
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
                    label={translate("permissions.fields.name")}
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
                    label={translate("permissions.fields.guard_name")}
                    name="guard_name"
                /> */}
                {/*
                    DatePicker component is not included in "@refinedev/mui" package.
                    To use a <DatePicker> component, you can follow the official documentation for Material UI.

                    Docs: https://mui.com/x/react-date-pickers/date-picker/#basic-usage
                */}
                <TextField
                    {...register("created_at", {
                        required: "This field is required",
                    })}
                    error={!!(errors as any)?.created_at}
                    helperText={(errors as any)?.created_at?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    label={translate("permissions.fields.created_at")}
                    name="created_at"
                    disabled
                />
            </Box>
        </Edit>
    );
};
