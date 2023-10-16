import { AuthBindings } from "@refinedev/core";
import axios from "axios";
import { ILoginForm } from "./interfaces";

export const TOKEN_KEY = "refine-auth";


export const authProvider: AuthBindings = {
  login: async ({ username, email, password }) => {


    const loginForm: ILoginForm = { username, email, password, remember: false };
    if ((username || email) && password) {
      await axios.post('/login', loginForm).then(response => {
        // authProvider.getIdentity();
        localStorage.setItem(TOKEN_KEY, username);
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
    localStorage.removeItem(TOKEN_KEY);
    return {
      success: true,
      redirectTo: "/login",
    };
  },
  check: async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      return {
        authenticated: true,
      };
    }

    return {
      authenticated: false,
      redirectTo: "/login",
    };
  },
  getPermissions: async () => {
    await axios.get("/api/abilities").then(res => {
      const permissions = res?.data;
      console.log("getPermission: ", permissions);
    });
  },
  getIdentity: async () => {
    try {
      await axios.get("auth/user").then((res) => {
        localStorage.setItem("user", res.data);
        localStorage.setItem("isAuthenticated", JSON.stringify(true));
        return res.data;
      });
    } catch (error) {
      console.error("getIdentify:", error);
      localStorage.removeItem("user");
      localStorage.removeItem("isAuthenticated");
      return null;
    }
    // const token = localStorage.getItem(TOKEN_KEY);
    // if (token) {
    //   return {
    //     id: 1,
    //     name: "John Doe",
    //     avatar: "https://i.pravatar.cc/300",
    //   };
    // }
    // return null;
  },
  onError: async (error) => {
    console.error(error);
    return { error };
  },
};
