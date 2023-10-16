import { AuthPage, ThemedTitleV2 } from "@refinedev/mui";
import { AppIcon } from "../../components/app-icon";



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
      type="login"
      title={<ThemedTitleV2 collapsed={false} text="PPMP" icon={<AppIcon />} />}
      wrapperProps={authWrapperProps}
      formProps={{
        defaultValues: { email: "demo@refine.dev", password: "demodemo" },
      }}
    />
  );
};
