// import { IResourceComponentsProps } from "@refinedev/core";
// import { MuiInferencer } from "@refinedev/inferencer/mui";

// export const SupplyTypeShow: React.FC<IResourceComponentsProps> = () => {
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
import LoadingComp from "../../components/common/LoadingComp";

export const SupplyTypeShow: React.FC<IResourceComponentsProps> = () => {
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
          {translate("supply-types.fields.id")}
        </Typography>
        <NumberField value={record?.id ?? ""} />
        <Typography variant="body1" fontWeight="bold">
          {translate("supply-types.fields.name")}
        </Typography>
        <TextField value={record?.name} />
        <Typography variant="body1" fontWeight="bold">
          {translate("supply-types.fields.created_at")}
        </Typography>
        <DateField value={record?.created_at} />
      </Stack>
    </Show>
  );
};
