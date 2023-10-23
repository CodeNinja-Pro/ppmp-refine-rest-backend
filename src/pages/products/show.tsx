// import { IResourceComponentsProps } from "@refinedev/core";
// import { MuiShowInferencer } from "@refinedev/inferencer/mui";

// export const ProductShow: React.FC<IResourceComponentsProps> = () => {
//   return <MuiShowInferencer />;
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
import LoadingComp from "../../components/common/LoadingComp";

export const ProductShow: React.FC<IResourceComponentsProps> = () => {
  const translate = useTranslate();
  const { queryResult } = useShow();
  const { data, isLoading } = queryResult;

  const record = data?.data;

  return (
    <Show
      isLoading={isLoading}
      wrapperProps={{
        sx: {
          position: "relative",
        },
      }}
    >
      {isLoading && <LoadingComp />}

      <Stack gap={1}>
        <Typography variant="body1" fontWeight="bold">
          {translate("products.fields.id")}
        </Typography>
        <NumberField value={record?.id ?? ""} />
        <Typography variant="body1" fontWeight="bold">
          {translate("products.fields.name")}
        </Typography>
        <TextField value={record?.name} />
        {/* <Typography variant="body1" fontWeight="bold">
          {translate("products.fields.code")}
        </Typography> */}
        <NumberField value={record?.code ?? ""} />
        <Typography variant="body1" fontWeight="bold">
          {translate("products.fields.unit")}
        </Typography>
        <TextField value={record?.unit?.name} />
        <Typography variant="body1" fontWeight="bold">
          {translate("products.fields.unit_cost")}
        </Typography>
        <NumberField value={record?.unit_cost ?? ""} />
        <Typography variant="body1" fontWeight="bold">
          {translate("products.fields.description")}
        </Typography>
        <TextField value={record?.description} />
        <Typography variant="body1" fontWeight="bold">
          {translate("products.fields.IPSAS_code")}
        </Typography>
        <TextField value={record?.IPSAS_code} />
        <Typography variant="body1" fontWeight="bold">
          {translate("products.fields.general_specification")}
        </Typography>
        <TextField value={record?.general_specification} />
        <Typography variant="body1" fontWeight="bold">
          {translate("products.fields.created_at")}
        </Typography>
        <DateField value={record?.created_at} />
      </Stack>
    </Show>
  );
};
