import { useForm } from "@refinedev/react-hook-form";
import * as React from "react";
import {
  RegisterFormTypes,
  RegisterPageProps,
  useActiveAuthProvider,
  BaseRecord,
  HttpError,
  useTranslate,
  useRouterContext,
  useRouterType,
  useLink,
  useRegister,
} from "@refinedev/core";
import { FormPropsType } from "../index";
import { layoutStyles, titleStyles } from "./styles";
import { ThemedTitleV2 as ThemedTitle, useAutocomplete } from "@refinedev/mui";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import MuiLink from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import type { BoxProps } from "@mui/material/Box";
import type { CardContentProps } from "@mui/material/CardContent";
import { authWrapperProps } from "../authProps";
import { Autocomplete } from "@mui/material";
import { filterOptions } from "../../../../utils/filterOptions";
import { Controller } from "react-hook-form";

type RegisterProps = RegisterPageProps<
  BoxProps,
  CardContentProps,
  FormPropsType
>;

/**
 * The register page will be used to register new users. You can use the following props for the <AuthPage> component when the type is "register".
 * @see {@link https://refine.dev/docs/api-reference/mui/components/mui-auth-page/#register} for more details.
 */
export const RegisterPage: React.FC<RegisterProps> = ({
  loginLink,
  wrapperProps = authWrapperProps,
  contentProps,
  renderContent,
  providers,
  formProps,
  title,
}) => {
  const { onSubmit, ...useFormProps } = formProps || {};
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<BaseRecord, HttpError, RegisterFormTypes>({
    ...useFormProps,
  });
  const { autocompleteProps: departmentAutoCompleteProps } = useAutocomplete({
    resource: "departments",
  });

  const authProvider = useActiveAuthProvider();
  const { mutate: registerMutate, isLoading } = useRegister<RegisterFormTypes>({
    v3LegacyAuthProviderCompatible: Boolean(authProvider?.isLegacy),
  });
  const translate = useTranslate();
  const routerType = useRouterType();
  const Link = useLink();
  const { Link: LegacyLink } = useRouterContext();

  const ActiveLink = routerType === "legacy" ? LegacyLink : Link;

  const PageTitle =
    title === false ? null : (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "32px",
          fontSize: "20px",
        }}
      >
        {title ?? (
          <ThemedTitle
          text={"PPMP"}
            collapsed={false}
            wrapperStyles={{
              gap: "8px",
            }}
          />
        )}
      </div>
    );

  const renderProviders = () => {
    if (providers && providers.length > 0) {
      return (
        <>
          <Stack spacing={1}>
            {providers.map((provider: any) => {
              return (
                <Button
                  key={provider.name}
                  color="secondary"
                  fullWidth
                  variant="outlined"
                  sx={{
                    color: "primary.light",
                    borderColor: "primary.light",
                    textTransform: "none",
                  }}
                  onClick={() =>
                    registerMutate({
                      providerName: provider.name,
                    })
                  }
                  startIcon={provider.icon}
                >
                  {provider.label}
                </Button>
              );
            })}
          </Stack>
          <Divider sx={{ fontSize: 12, marginY: "16px" }}>
            {translate("pages.login.divider", "or")}
          </Divider>
        </>
      );
    }
    return null;
  };

  const Content = (
    <Card {...(contentProps ?? {})}>
      <CardContent sx={{ p: "32px", "&:last-child": { pb: "32px" } }}>
        <Typography
          component="h1"
          variant="h5"
          align="center"
          style={titleStyles}
          color="primary"
          fontWeight={700}
        >
          {translate("pages.register.title", "Sign up for your account")}
        </Typography>
        {renderProviders()}
        <Box
          component="form"
          onSubmit={handleSubmit((data) => {
            if (onSubmit) {
              return onSubmit(data);
            }

            return registerMutate(data);
          })}
        >
          <TextField
            {...register("name", {
              required: true,
              pattern: {
                value:
                  /^(?=.{5,20}$)(?![_.])(?!.*[_.]{2})[\sa-zA-Z0-9._]+(?<![_.])$/i,
                message: translate(
                  "pages.register.errors.validName",
                  "Invalid Name"
                ),
              },
            })}
            id="name"
            margin="normal"
            fullWidth
            label={translate("pages.register.name", "Full Name")}
            error={!!errors.name}
            helperText={errors["name"] ? errors["name"].message : ""}
            name="name"
            autoComplete="name"
            sx={{
              mt: 1,
            }}
          />
          <TextField
            {...register("email", {
              required: true,
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: translate(
                  "pages.register.errors.validEmail",
                  "Invalid email address"
                ),
              },
            })}
            id="email"
            margin="normal"
            fullWidth
            label={translate("pages.register.email", "Email")}
            error={!!errors.email}
            helperText={errors["email"] ? errors["email"].message : ""}
            name="email"
            autoComplete="email"
            sx={{
              mt: 2,
            }}
          />
          <TextField
            {...register("password", {
              required: true,
            })}
            id="password"
            margin="normal"
            fullWidth
            name="password"
            label={translate("pages.register.fields.password", "Password")}
            helperText={errors["password"] ? errors["password"].message : ""}
            error={!!errors.password}
            type="password"
            placeholder="●●●●●●●●"
            autoComplete="current-password"
            sx={{
              mb: 1,
            }}
          />
          <Controller
            control={control}
            name="department_id"

            rules={{ required: "This field is required" }}
            // eslint-disable-next-line
            defaultValue={null as any}
            render={({ field }) => (
              <Autocomplete
                {...departmentAutoCompleteProps}
                {...field}
                filterOptions={filterOptions}
                onChange={(_, value) => {
                  field.onChange(value?.id ?? value);
                }}
                getOptionLabel={(item) => {
                  return (
                    departmentAutoCompleteProps?.options?.find(
                      (p) =>
                        p?.id?.toString() === (item?.id ?? item)?.toString()
                    )?.name ?? ""
                  );
                }}
                isOptionEqualToValue={(option, value) =>
                  value === undefined ||
                  option?.id?.toString() === (value?.id ?? value)?.toString()
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={translate("users.fields.department_id")}
                    margin="normal"
                    variant="outlined"
                    error={!!(errors as any)?.department_id}
                    helperText={(errors as any)?.department_id?.message}
                    required
                    
                  />
                )}
              />
            )}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={isLoading}
            sx={{
              mt: "24px",
            }}
          >
            {translate("pages.register.signup", "Sign up")}
          </Button>
          {loginLink ?? (
            <Box
              display="flex"
              justifyContent="flex-end"
              alignItems="center"
              sx={{
                mt: "24px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography variant="body2" component="span" fontSize="12px">
                {translate(
                  "pages.login.buttons.haveAccount",
                  "Have an account?"
                )}
              </Typography>
              <MuiLink
                ml="4px"
                variant="body2"
                color="primary"
                component={ActiveLink}
                underline="none"
                to="/login"
                fontSize="12px"
                fontWeight="bold"
              >
                {translate("pages.login.signin", "Sign in")}
              </MuiLink>
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <Box component="div" style={layoutStyles} {...(wrapperProps ?? {})}>
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        {renderContent ? (
          renderContent(Content, PageTitle)
        ) : (
          <>
            {PageTitle}
            {Content}
          </>
        )}
      </Container>
    </Box>
  );
};
