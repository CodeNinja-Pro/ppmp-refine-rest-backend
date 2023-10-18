import { AuthBindings, useGetIdentity } from '@refinedev/core';
import axios, {AxiosInstance} from "axios";
import { ILoginForm } from "./interfaces";

import { TOKEN_KEY, AUTH_URL, USER_KEY } from "./constants";
import { UserCreate } from './pages/users/create';

const getUser = async () => {

 
}
export const authProvider = (axiosInstance: AxiosInstance): AuthBindings => ({

  login: async ( user: {email: string; password: string}) => {
    try {
      const { data } = await axiosInstance.post(`${AUTH_URL}/login`, {
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
    localStorage.removeItem("permissions");
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
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) {
      return []
    }
    const permissions = localStorage.getItem("permissions");
    if (permissions) {
      return JSON.parse(permissions);
    }
    try {
      const res = await axiosInstance.get(AUTH_URL+"/api/abilities");
        const permissionsData = res?.data;
        localStorage.setItem("permissions", JSON.stringify(permissionsData));
        console.log("getPermission: ", permissionsData);
        return permissionsData;
    } catch (error) {
      console.log(error);
    }
    return [];
    // return ["admin"]
  },
  getIdentity: async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) {
      return null;
    }
    const user = localStorage.getItem(USER_KEY);
    if (user){
      return JSON.parse(user);
    }

    try {
      debugger;
      const userInfo = await axiosInstance.get(`${AUTH_URL}/api/user`);
      if (userInfo?.data?.data) {
        // await authProvider(axiosInstance).logout({});
        localStorage.setItem(USER_KEY, JSON.stringify(userInfo.data.data));
        return userInfo.data.data;
      }
      // return userInfo.data.data;
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


export const getPermissions =  async (axiosInstance: AxiosInstance) => {
  console.log("getPermissions")
  const token = localStorage.getItem(TOKEN_KEY);
  if (!token) {
    return []
  }
  const permissions = localStorage.getItem("permissions");
  if (permissions) {
    return JSON.parse(permissions);
  }
  try {
    const res = await axiosInstance.get(AUTH_URL+"/api/abilities");
      const permissionsData = res?.data;
      localStorage.setItem("permissions", JSON.stringify(permissionsData));
      console.log("getPermission: ", permissionsData);
      return permissionsData;
  } catch (error) {
    console.log(error);
  }
  return [];
};