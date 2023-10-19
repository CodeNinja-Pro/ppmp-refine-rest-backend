// import { IResourceComponentsProps } from "@refinedev/core";
// import { MuiShowInferencer } from "@refinedev/inferencer/mui";

// export const CategoryShow: React.FC<IResourceComponentsProps> = () => {
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

export const CategoryShow: React.FC<IResourceComponentsProps> = () => {
  const translate = useTranslate();
  const { queryResult } = useShow();
  const { data, isLoading } = queryResult;

  const record = data?.data;

  return (
      <Show isLoading={isLoading}>
          <Stack gap={1}>
              <Typography variant="body1" fontWeight="bold">
                  {translate("categories.fields.id")}
              </Typography>
              <NumberField value={record?.id ?? ""} />
              <Typography variant="body1" fontWeight="bold">
                  {translate("categories.fields.name")}
              </Typography>
              <TextField value={record?.name} />
              <Typography variant="body1" fontWeight="bold">
                  {translate("categories.fields.created_at")}
              </Typography>
              <DateField value={record?.created_at} />
          </Stack>
      </Show>
  );
};

