// import { IResourceComponentsProps } from "@refinedev/core";
// import { MuiInferencer } from "@refinedev/inferencer/mui";

// export const PurchaseModeEdit: React.FC<IResourceComponentsProps> = () => {
//     return <MuiInferencer />;
// };

import { Edit } from "@refinedev/mui";
import { Box, TextField } from "@mui/material";
import { useForm } from "@refinedev/react-hook-form";
import { IResourceComponentsProps, useTranslate } from "@refinedev/core";
import LoadingComp from "../../components/common/LoadingComp";

export const PurchaseModeEdit: React.FC<IResourceComponentsProps> = () => {
    const translate = useTranslate();
    const {
        saveButtonProps,
        refineCore: { queryResult, formLoading },
        register,
        control,
        formState: { errors },
    } = useForm();

    const purchaseModesData = queryResult?.data?.data;

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
                    label={translate("purchase-modes.fields.id")}
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
                    label={translate("purchase-modes.fields.name")}
                    name="name"
                />
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
                    label={translate("purchase-modes.fields.created_at")}
                    name="created_at"
                    disabled
                />
            </Box>
        </Edit>
    );
};
