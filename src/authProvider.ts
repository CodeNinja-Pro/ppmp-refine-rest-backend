import { AuthBindings } from "@refinedev/core";
import axios from "axios";
import { ILoginForm } from "./interfaces";

export const TOKEN_KEY = "refine-auth";
const authURL = "http://127.0.0.1:8000";

const getUser = async () => {
//   return {
//     success: true,
//     redirectTo: "/",
// };
  try {
    console.log(123123);
    const result = await axios.get("http://127.0.0.1:8000/api/user");
    console.log(result);
      let store = {
        auth: {
          isAuthenticated: false,
          user: {}
        }
      }
      const item = localStorage.getItem(TOKEN_KEY);
      if (item) {
        store = JSON.parse(item);
      }
      localStorage.setItem(TOKEN_KEY, JSON.stringify(store));
      // const authProvider = new 
      if (authProvider && authProvider.getPermissions) {
        await authProvider.getPermissions();
      }
      return JSON.stringify(item);
  } catch (error: any) {
    debugger;
    console.error("getIdentify:", error);
    // localStorage.removeItem(TOKEN_KEY);
    throw new Error(error);
  }
}
export const authProvider: AuthBindings = {
  login: async ({ username, email, password }) => {


    const loginForm: ILoginForm = { email, password, remember: false };
    if ((username || email) && password) {
      await axios.post(authURL+"/login", loginForm).then(async response => {
        debugger;
        let store = {
          auth: {
            isAuthenticated: false,
            user: {}
          }
        }
        store.auth = response.data;
        store.auth.isAuthenticated = true;
        localStorage.setItem(TOKEN_KEY, JSON.stringify(store));
        const user = await getUser();
        return {
          success: true,
          redirectTo: "/",
        };
      }).catch(error => {
        if (error.response?.data) {
          console.error("login: ", error.response.data);
        }
      });
    }

    return {
      success: false,
      error: {
        name: "LoginError",
        message: "Invalid username or password",
      },
    };
  },
  logout: async () => {
    await axios.post(authURL + "/logout");
    localStorage.removeItem(TOKEN_KEY);
    return {
      success: true,
      redirectTo: "/login",
    };
  },
  check: async () => {
    const token = JSON.parse(localStorage.getItem(TOKEN_KEY) as string);

    if (token && token?.auth?.isAuthenticated) {
      return {
        authenticated: true,
      };
    }

    return {
      authenticated: false,
      redirectTo: "/login",
    };
    return {
      authenticated: true
    }
  },
  getPermissions: async () => {
    console.log("getPermissions")
    await axios.get(authURL+"api/abilities").then(res => {
      const permissions = res?.data;
      console.log("getPermission: ", permissions);
    });
    return null;
  },
  getIdentity: async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      return {
        id: 1,
        name: "John Doe",
        avatar: "https://i.pravatar.cc/300",
      };
    }
    return null;
  },
  onError: async (error) => {
    console.error(error);
    return { error };
  },
};
