// import { IResourceComponentsProps } from "@refinedev/core";
// import { MuiInferencer } from "@refinedev/inferencer/mui";

// export const PurchaseShow: React.FC<IResourceComponentsProps> = () => {
//     return <MuiInferencer />;
// };

import {
    useShow,
    IResourceComponentsProps,
    useTranslate,
} from "@refinedev/core";
import {
    Show,
    NumberField,
    TextFieldComponent as TextField,
    DateField,
} from "@refinedev/mui";
import { Typography, Stack } from "@mui/material";

export const PurchaseShow: React.FC<IResourceComponentsProps> = () => {
    const translate = useTranslate();
    const { queryResult } = useShow();
    const { data, isLoading } = queryResult;

    const record = data?.data;

    return (
        <Show isLoading={isLoading}>
            <Stack gap={1}>
                <Typography variant="body1" fontWeight="bold">
                    {translate("purchases.fields.id")}
                </Typography>
                <NumberField value={record?.id ?? ""} />
                <Typography variant="body1" fontWeight="bold">
                    {translate("purchases.fields.product")}
                </Typography>
                <TextField value={record?.product?.name} />
                <Typography variant="body1" fontWeight="bold">
                    {translate("purchases.fields.department")}
                </Typography>
                <TextField value={record?.department?.name} />
                <Typography variant="body1" fontWeight="bold">
                    {translate("purchases.fields.supply_type")}
                </Typography>
                <TextField value={record?.supply_type?.name} />
                <Typography variant="body1" fontWeight="bold">
                    {translate("purchases.fields.purchase_mode")}
                </Typography>
                <TextField value={record?.purchase_mode?.name} />
                <Typography variant="body1" fontWeight="bold">
                    {translate("purchases.fields.qty")}
                </Typography>
                <NumberField value={record?.qty ?? ""} />
                <Typography variant="body1" fontWeight="bold">
                    {translate("purchases.fields.item_description")}
                </Typography>
                <TextField value={record?.item_description} />
                <Typography variant="body1" fontWeight="bold">
                    {translate("purchases.fields.created_at")}
                </Typography>
                <DateField value={record?.created_at} />
                <Typography variant="body1" fontWeight="bold">
                    {translate("purchases.fields.method")}
                </Typography>
                <TextField value={record?.method} />
                <Typography variant="body1" fontWeight="bold">
                    {translate("purchases.fields.created_by")}
                </Typography>
                <TextField value={record?.created_by?.name} />
                <Typography variant="body1" fontWeight="bold">
                    {translate("purchases.fields.source_of_funding")}
                </Typography>
                <TextField value={record?.source_of_funding?.name} />
                <Typography variant="body1" fontWeight="bold">
                    {translate("purchases.fields.status")}
                </Typography>
                <NumberField value={record?.status ?? ""} />
            </Stack>
        </Show>
    );
};
