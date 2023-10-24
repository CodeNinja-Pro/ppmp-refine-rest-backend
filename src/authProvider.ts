import { AuthBindings, useGetIdentity } from '@refinedev/core';
import axios, {AxiosInstance} from "axios";
import { ILoginForm, IUserIdentity } from "./interfaces";

import { TOKEN_KEY, AUTH_URL, USER_KEY } from "./constants";
import { UserCreate } from './pages/users/create';
import { axiosInstance as defaultAxiosInstance, axiosInstance } from './App';
import { IPermission } from './interfaces/index';

const getUser = async () => {

 
}
export const authProvider = (axiosInstance: AxiosInstance = defaultAxiosInstance): AuthBindings => ({

  login: async ( user: {email: string; password: string}) => {
    try {
      const { data } = await axiosInstance.post(`${AUTH_URL}/login`, {
        ...user,
      });

      localStorage.setItem(TOKEN_KEY, data.authorization.token);
      await getIdentity(axiosInstance);

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
  register: async (user: {email: string, password: string, name: string}) => {
    const data = await axiosInstance.post(`${AUTH_URL}/register`, {...user});
    if (data?.data?.user?.id > 0) {
      return {
        success: true,
        redirectTo: "/login"
      }
    }
    else {
      return {
        success: false,
      }
    }
  },
  logout: async (props) => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY)
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
    try {
      const permissions = await getPermissions(axiosInstance);
      return permissions;
    } catch (error) {
      console.log(error);
      return [];
    }
    // console.log("getPermissions")
    // const token = localStorage.getItem(TOKEN_KEY);
    // if (!token) {
    //   return []
    // }
    // const permissions = localStorage.getItem("permissions");
    // if (permissions) {
    //   return JSON.parse(permissions);
    // }
    // try {
    //   const res = await axiosInstance.get(AUTH_URL+"/api/abilities");
    //     const permissionsData = res?.data;
    //     localStorage.setItem("permissions", JSON.stringify(permissionsData));
    //     console.log("getPermissions: ", permissionsData);
    //     return permissionsData;
    // } catch (error) {
    //   console.log("getPermissions(error):", error);
    // }
    // return [];
    // return ["admin"]
  },
  getIdentity: async () => {
    try {
      const userIdentity = await getIdentity(axiosInstance)
      return userIdentity;
    } catch(error) {
      return null;
    }
    // const token = localStorage.getItem(TOKEN_KEY);
    
    // if (!token) {
    //   return null;
    // }
    // const user = localStorage.getItem(USER_KEY);
    // if (user){
    //   return JSON.parse(user);
    // }

    // try {
    //   debugger;
    //   const userInfo = await axiosInstance.get(`${AUTH_URL}/api/user`);
    //   if (userInfo?.data?.data) {
    //     // await authProvider(axiosInstance).logout({});
    //     localStorage.setItem(USER_KEY, JSON.stringify(userInfo.data.data));
    //     return userInfo.data.data;
    //   }
    //   // return userInfo.data.data;
    // } catch (error) {
    //   console.warn(error);
    //   return null;
    // }
  },
  onError: async (error) => {
    console.error(error);
    return { error };
  },
});


// export const getPermissions =  async (axiosInstance: AxiosInstance) => {
//   // console.log("getPermissions")
//   const token = localStorage.getItem(TOKEN_KEY);
//   if (!token) {
//     return []
//   }
//   const permissions = localStorage.getItem("permissions");
//   if (permissions) {
//     return JSON.parse(permissions);
//   }
//   try {
//     const res = await axiosInstance.get(AUTH_URL+"/api/abilities");
//       const permissionsData = res?.data;
//       localStorage.setItem("permissions", JSON.stringify(permissionsData));
//       console.log("getPermission: ", permissionsData);
//       return permissionsData;
//   } catch (error) {
//     console.log(error);
//   }
//   return [];
// };

// const login = async (email:string, password:string, axiosInstance: AxiosInstance = defaultAxiosInstance) => {
//   try {
//     const { data } = await axiosInstance.post(`${AUTH_URL}/login`, {
//       email,
//       password
//     });

//     localStorage.setItem(TOKEN_KEY, data.authorization.token);

//     return {
//       success: true,
//       redirectTo: "/",
//     };
//   } catch (error: any) {
//     return {
//       success: false,
//       error,
//     };
//   }

// }

export const getIdentity = async (axiosInstance: AxiosInstance=defaultAxiosInstance) => {
  if (!localStorage.getItem(TOKEN_KEY)){
    return null;
  }
  let userIdentity: object|null|string = localStorage.getItem(USER_KEY);
  if (userIdentity) {
    userIdentity = JSON.parse(userIdentity);
    return userIdentity;
  }
  try {
    const fetchedUser = await axiosInstance.get(`${AUTH_URL}/api/user`);
    userIdentity = fetchedUser.data.data;
    localStorage.setItem(USER_KEY, JSON.stringify(userIdentity));
    return userIdentity;
  } catch (error) {
    console.log("Error(Getting User Identty): ", error);
    return null;
  }
}

export const getPermissions = async (axiosInstance: AxiosInstance=defaultAxiosInstance) => {
  try {
    const userIdentity = await getIdentity(axiosInstance);
    let permissions:IPermission[] = [];
    if (userIdentity) {
      (userIdentity as IUserIdentity).roles.map((role) => {
        permissions.push(...role.permissions);
      })
      return permissions.map(permission => permission.name);
    }
  } catch(error) {
    return [];
  }
}