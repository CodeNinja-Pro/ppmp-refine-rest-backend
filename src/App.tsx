import { Authenticated, GitHubBanner, HttpError, MutationMode, Refine, usePermissions } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import {
  ErrorComponent,
  notificationProvider,
  RefineSnackbarProvider,
  ThemedLayoutV2,
  ThemedTitleV2,
} from "@refinedev/mui";

import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";

import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';

import routerBindings, {
  CatchAllNavigate,
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";

import { useTranslation } from "react-i18next";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
// import dataProvider from "@refinedev/simple-rest";

import axios, { AxiosRequestConfig } from "axios";

import { authProvider, getPermissions } from "./authProvider";
// import { dataProvider } from "./dataProvider";
import {dataProvider} from "./rest-data-provider";
// import {accessControlProvider} from "./accessControlProvider";


import { AppIcon } from "./components/app-icon";
import { Header } from "./components/header";
import { ColorModeContextProvider } from "./contexts/color-mode";
// import dataProvider from "./data-provider";
import {
  BlogPostCreate,
  BlogPostEdit,
  BlogPostList,
  BlogPostShow,
} from "./pages/blog-posts";
import {
  CategoryCreate,
  CategoryEdit,
  CategoryList,
  CategoryShow,
} from "./pages/categories";

import {
  UnitCreate, UnitEdit, UnitList, UnitShow
} from "./pages/units";
import {
  ProductCreate, ProductEdit, ProductList, ProductShow
} from "./pages/products";
import { RoleCreate, RoleEdit, RoleList, RoleShow } from "./pages/roles";
import { PermissionCreate, PermissionEdit, PermissionList, PermissionShow } from "./pages/permissions";
import { UserCreate, UserEdit, UserList, UserShow } from "./pages/users";


import { ForgotPassword } from "./pages/forgotPassword";
import { Login } from "./pages/login";
import { Register } from "./pages/register";
import { Button } from "@mui/material";
import { TOKEN_KEY, API_URL } from './constants';
import { AccountCircleOutlined, CategoryOutlined, LocalMallOutlined, LockOutlined, PeopleOutlineRounded, ProductionQuantityLimitsOutlined, ScaleOutlined } from "@mui/icons-material";
import React from "react";


import 'react-dual-listbox/lib/react-dual-listbox.css';




export const axiosInstance = axios.create();

axiosInstance.interceptors.request.use((request: AxiosRequestConfig) => {

  const token = localStorage.getItem(TOKEN_KEY);
  if (token) {
    if (request.headers) {
      request.headers["Authorization"] = `Bearer ${token}`;
    } else {
      request.headers = {
        Authorization: `Bearer ${token}`,
      };
    }
  }

  return request;
});

axiosInstance.interceptors.response.use(
  (response) => {
      return response;
  },
  (error) => {
      const customError: HttpError = {
        ...error,
        errors: error.response?.data?.errors,
        message: error.response?.data?.message,
        statusCode: error.response?.status,
      };
       if (error.response.status === 401) {
        authProvider(axiosInstance).logout({});
        console.log("logged out");
        window.location.href="/login";
       }

      return Promise.reject(customError);
  },
);


function App() {
  const { t, i18n } = useTranslation();
  const [mutationMode, setMutationMode] = React.useState<MutationMode>("pessimistic");
  
  // const {data: permissionsData} = usePermissions();
  // const {data: permissionsData = []} = usePermissions<Array<string>>();

  // const {data}
  // const permissionsData = ["admin"];
  

  const i18nProvider = {
    translate: (key: string, params: object) => t(key, params),
    changeLocale: (lang: string) => i18n.changeLanguage(lang),
    getLocale: () => i18n.language,
  };

  return (
    <BrowserRouter>
      {/* <GitHubBanner /> */}
      <RefineKbarProvider>
        <ColorModeContextProvider>
          <CssBaseline />
          <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
          <RefineSnackbarProvider>
            {/* <DevtoolsProvider> */}
              <Refine
                // dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
                dataProvider={dataProvider(API_URL, axiosInstance)}
                notificationProvider={notificationProvider}
                authProvider={authProvider(axiosInstance)}
                i18nProvider={i18nProvider}
                routerProvider={routerBindings}
                accessControlProvider={{
                  can: async ({ resource, action, params }) => {

                    const permissionsData = await getPermissions(axiosInstance);
                    if (permissionsData?.includes(`${resource}-${action}`)) {
                      return { can: true };
                    } else {
                      return {
                        can: true,
                        reason: "Unauthorized",
                    };
                    }
                  },
                  options: {
                      buttons: {
                          enableAccessControl: true,
                          hideIfUnauthorized: false,
                      },
                  },
              }}
                resources={[
                  // {
                  //   name: "blog_posts",
                  //   list: "/blog-posts",
                  //   create: "/blog-posts/create",
                  //   edit: "/blog-posts/edit/:id",
                  //   show: "/blog-posts/show/:id",
                  //   meta: {
                  //     canDelete: true,
                  //     // hide: true
                  //   },
                  // },
                  {
                    name: "role_permissions",
                    list: "role_permissions",
                    create: "/role_permissions/create",
                    edit: "/role_permissions/edit",
                  },
                  {
                    name: "User Management",
                    meta: {
                      icon: <ManageAccountsOutlinedIcon />
                    }
                  }
                  ,
                  {
                    name: "permissions",
                    list: "/permissions",
                    create: "/permissions/create",
                    edit: "/permissions/edit/:id",
                    show: "/permissions/show/:id",
                    meta: {
                      canDelete: true,
                      parent: "User Management",
                      icon: <LockOutlined />
                    },
                  },
                  {
                    name: "roles",
                    list: "/roles",
                    create: "/roles/create",
                    edit: "/roles/edit/:id",
                    meta: {
                      canDelete: true,
                      parent: "User Management",
                      icon: <AccountCircleOutlined />
                    },
                  },
                  {
                    name: "users",
                    list: "/users",
                    create: "/users/create",
                    edit: "/users/edit/:id",
                    show: "/users/show/:id",
                    meta: {
                      canDelete: true,
                      parent: "User Management",
                      icon: <PeopleOutlineRounded />
                    },
                  },
                  {
                    name: "categories",
                    list: "/categories",
                    create: "/categories/create",
                    edit: "/categories/edit/:id",
                    show: "/categories/show/:id",
                    meta: {
                      canDelete: true,
                      icon: <CategoryOutlined />
                    },
                  },
                  {
                    name: "units",
                    list: "/units",
                    create: "/units/create",
                    edit: "/units/edit/:id",
                    show: "/units/show/:id",
                    meta: {
                      // hide: true,
                      canDelete: true,
                      icon: <ScaleOutlined />
                    },
                  },
                  {
                    name: "products",
                    list: "/products",
                    create: "/products/create",
                    edit: "/products/edit/:id",
                    show: "/products/show/:id",
                    meta: {
                      canDelete: true,
                      icon: <LocalMallOutlined />,
                      idOnlyPass: true
                    },
                  },
                  {
                    name: "user management"
                  }
                ]}
                options={{
                  syncWithLocation: true,
                  warnWhenUnsavedChanges: false,
                  projectId: "vWDU4h-MijopK-kwqDNS",
                  disableTelemetry: true,
                  undoableTimeout: 2500,
                  mutationMode: mutationMode
                }}
              >
                <Routes>
                    {/* <Route path="/units">
                      <Route index element={<UnitList />} />
                      <Route path="create" element={<UnitCreate />} />
                      <Route path="edit/:id" element={<UnitEdit />} />
                    </Route> */}
                  <Route
                    element={
                      <Authenticated
                        key="authenticated-inner"
                        fallback={<CatchAllNavigate to="/login" />}
                      >
                        <ThemedLayoutV2
                          Header={() => <Header sticky currentMutationMode={mutationMode} onMutationChange={(mode) => setMutationMode(mode)}/>}
                          Title={({ collapsed }) => (
                            <ThemedTitleV2
                              collapsed={collapsed}
                              text="PPMP"
                              icon={<AppIcon />}
                            />
                          )}
                        >
                          <Outlet />
                        </ThemedLayoutV2>
                      </Authenticated>
                    }
                  >
                    <Route path="/permissions">
                      <Route index element={<PermissionList />} />
                      <Route path="create" element={<PermissionCreate />} />
                      <Route path="edit/:id" element={<PermissionEdit />} />
                      <Route path="show/:id" element={<PermissionShow />} />
                    </Route>
                    <Route path="/roles">
                      <Route index element={<RoleList />} />
                      <Route path="create" element={<RoleCreate />} />
                      <Route path="edit/:id" element={<RoleEdit />} />
                      <Route path="show/:id" element={<RoleShow />} />
                    </Route>
                    <Route path="/users">
                      <Route index element={<UserList />} />
                      <Route path="create" element={<UserCreate />} />
                      <Route path="edit/:id" element={<UserEdit />} />
                      <Route path="show/:id" element={<UserShow />} />
                    </Route>

                    <Route path="/units">
                      <Route index element={<UnitList />} />
                      <Route path="create" element={<UnitCreate />} />
                      <Route path="edit/:id" element={<UnitEdit />} />
                      <Route path="show/:id" element={<UnitShow />} />
                    </Route>
                    {/* <Route
                      index
                      element={<NavigateToResource resource="blog_posts" />}
                    /> */}
                    <Route path="/blog-posts">
                      <Route index element={<BlogPostList />} />
                      <Route path="create" element={<BlogPostCreate />} />
                      <Route path="edit/:id" element={<BlogPostEdit />} />
                      <Route path="show/:id" element={<BlogPostShow />} />
                    </Route>
                    <Route path="/categories">
                      <Route index element={<CategoryList />} />
                      <Route path="create" element={<CategoryCreate />} />
                      <Route path="edit/:id" element={<CategoryEdit />} />
                      <Route path="show/:id" element={<CategoryShow />} />
                    </Route>
                    <Route path="/products">
                      <Route index element={<ProductList />} />
                      <Route path="create" element={<ProductCreate />} />
                      <Route path="edit/:id" element={<ProductEdit />} />
                      <Route path="show/:id" element={<ProductShow />} />
                    </Route>
                    
                    <Route path="*" element={<ErrorComponent />} />
                  </Route>
                  <Route
                    element={
                      <Authenticated
                        key="authenticated-outer"
                        fallback={<Outlet />}
                      >
                        <NavigateToResource />
                      </Authenticated>
                    }
                  >
                    <Route path="/categories">
                      <Route index element={<CategoryList />} />
                      <Route path="create" element={<CategoryCreate />} />
                      <Route path="edit/:id" element={<CategoryEdit />} />
                      <Route path="show/:id" element={<CategoryShow />} />
                    </Route> 
                    <Route path="/units">
                      <Route index element={<UnitList />} />
                      <Route path="create" element={<UnitCreate />} />
                      <Route path="edit/:id" element={<UnitEdit />} />
                      {/* <Route path="show/:id" element={<BlogPostShow />} /> */}
                    </Route>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route
                      path="/forgot-password"
                      element={<ForgotPassword />}
                    />
                  </Route>
                </Routes>

                <RefineKbar />
                <UnsavedChangesNotifier />
                <DocumentTitleHandler />
              </Refine>
              <DevtoolsPanel />
            {/* </DevtoolsProvider> */}
          </RefineSnackbarProvider>
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
