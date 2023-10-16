import { AuthBindings } from "@refinedev/core";
import axios, {AxiosInstance} from "axios";
import { ILoginForm } from "./interfaces";

import { TOKEN_KEY, AUTH_URL } from "./constants";

const getUser = async () => {

 
}
export const authProvider = (axiosInstance: AxiosInstance): AuthBindings => ({

  login: async ( user: {email: string; password: string}) => {
    try {
      const { data } = await axios.post(`${AUTH_URL}/login`, {
        ...user,
      });

      localStorage.setItem(TOKEN_KEY, data.authorization.token);

      return {
        success: true,
        redirectTo: "/",
      };
    } catch (error: any) {
      return {
        success: false,
        error,
      };
    }
  },
  logout: async (props) => {
    localStorage.removeItem(TOKEN_KEY);
    return {
      success: true,
      redirectTo: props?.redirectPath || "/login",
    };
  },
  check: async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) {
      return {
        authenticated: false,
        error: new Error("No token found"),
        redirectTo: "/login",
      };
    }
    return {
      authenticated: true,
    };
  },
  getPermissions: async () => {
    console.log("getPermissions")
    await axios.get(AUTH_URL+"api/abilities").then(res => {
      const permissions = res?.data;
      console.log("getPermission: ", permissions);
    });
    return null;
  },
  getIdentity: async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) {
      return null;
    }

    try {
      const userInfo = await axiosInstance.get(`${AUTH_URL}/api/user`);
      return userInfo.data.user;
    } catch (error) {
      console.warn(error);
      return null;
    }
  },
  onError: async (error) => {
    console.error(error);
    return { error };
  },
});
