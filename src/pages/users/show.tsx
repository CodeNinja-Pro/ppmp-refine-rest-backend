// import { IResourceComponentsProps } from "@refinedev/core";
// import { MuiShowInferencer } from "@refinedev/inferencer/mui";

// export const UserShow: React.FC<IResourceComponentsProps> = () => {
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
  EmailField,
  TagField,
  DateField,
} from "@refinedev/mui";
import { Typography, Stack } from "@mui/material";

export const UserShow: React.FC<IResourceComponentsProps> = () => {
  const translate = useTranslate();
  const { queryResult } = useShow();
  const { data, isLoading } = queryResult;

  const record = data?.data;

  return (
      <Show isLoading={isLoading}>
          <Stack gap={1}>
              <Typography variant="body1" fontWeight="bold">
                  {translate("users.fields.id")}
              </Typography>
              <NumberField value={record?.id ?? ""} />
              <Typography variant="body1" fontWeight="bold">
                  {translate("users.fields.name")}
              </Typography>
              <TextField value={record?.name} />
              <Typography variant="body1" fontWeight="bold">
                  {translate("users.fields.email")}
              </Typography>
              <EmailField value={record?.email} />
              <Typography variant="body1" fontWeight="bold">
                  {translate("users.fields.role_id")}
              </Typography>
                  <Stack direction="row" spacing={1}>
                      {record?.roles.map((role: any) => (
                          <TagField
                              key={role?.name}
                              value={role?.name}
                          />
                      ))}
                  </Stack>
              <Typography variant="body1" fontWeight="bold">
                  {translate("users.fields.created_at")}
              </Typography>
              <DateField value={record?.created_at} />
          </Stack>
      </Show>
  );
};
