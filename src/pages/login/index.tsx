import { AuthPage, ThemedTitleV2 } from "@refinedev/mui";
import { AppIcon } from "../../components/app-icon";
import { GitHub, Google, PlusOneOutlined } from "@mui/icons-material";
import { LoadingButton } from '@mui/lab';



const authWrapperProps = {
  style: {
      background:
          "radial-gradient(100% 80% at 50% 50%,rgba(255, 255, 255, 0) 0%,rgba(0, 0, 0, 0.5) 100%),url('images/bg.jpg')",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat"
  },
};

export const Login = () => {
  return (
    <AuthPage
    providers={[
      {
          name: "google",
          icon: <Google />,
          label: "Sign in with Google",
      },
      {
          name: "github",
          icon: <GitHub />,
          label: "Sign in with GitHub",
      },
  ]}
      type="login"
      title={<ThemedTitleV2 collapsed={false} text="PPMP" icon={<AppIcon />} />}
      wrapperProps={authWrapperProps}
      formProps={{
        defaultValues: { email: "admin@demo.com", password: "12345678" },
      }}

      
    />
  );
};
