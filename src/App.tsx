import {
  Authenticated,
  GitHubBanner,
  HttpError,
  MutationMode,
  Refine,
  usePermissions,
} from "@refinedev/core";
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

import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";

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
import { dataProvider } from "./rest-data-provider";
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

import { UnitCreate, UnitEdit, UnitList, UnitShow } from "./pages/units";
import {
  ProductCreate,
  ProductEdit,
  ProductList,
  ProductShow,
} from "./pages/products";
import { RoleCreate, RoleEdit, RoleList, RoleShow } from "./pages/roles";
import {
  PermissionCreate,
  PermissionEdit,
  PermissionList,
  PermissionShow,
} from "./pages/permissions";
import { UserCreate, UserEdit, UserList, UserShow } from "./pages/users";

import { ForgotPassword } from "./pages/forgotPassword";
import { Login } from "./pages/login";
import { Register } from "./pages/register";
import { Button } from "@mui/material";
import { TOKEN_KEY, API_URL } from "./constants";
import {
  AccountCircleOutlined,
  AttachMoneyOutlined,
  BusinessCenterOutlined,
  CategoryOutlined,
  Gavel,
  GavelOutlined,
  LocalMallOutlined,
  LocalShippingOutlined,
  LockOutlined,
  PeopleOutlineRounded,
  ProductionQuantityLimitsOutlined,
  ScaleOutlined,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import React from "react";

import "react-dual-listbox/lib/react-dual-listbox.css";
import {
  PurchaseModeCreate,
  PurchaseModeEdit,
  PurchaseModeList,
  PurchaseModeShow,
} from "./pages/purchase-modes";
import {
  SupplyTypeCreate,
  SupplyTypeEdit,
  SupplyTypeList,
  SupplyTypeShow,
} from "./pages/supply-types";
import {
  BidTypeCreate,
  BidTypeEdit,
  BidTypeList,
  BidTypeShow,
} from "./pages/bid-types";
import {
  SourceOfFundingCreate,
  SourceOfFundingEdit,
  SourceOfFundingList,
  SourceOfFundingShow,
} from "./pages/source-of-fundings";
import {
  DepartmentCreate,
  DepartmentEdit,
  DepartmentList,
  DepartmentShow,
} from "./pages/departments";
import AdminDashboard from "./pages/admin-dashboard/AdminDashboard";

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
      window.location.href = "/login";
    }

    return Promise.reject(customError);
  }
);

function App() {
  const { t, i18n } = useTranslation();
  const [mutationMode, setMutationMode] =
    React.useState<MutationMode>("pessimistic");

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
                // {
                //   name: "role_permissions",
                //   list: "role_permissions",
                //   create: "/role_permissions/create",
                //   edit: "/role_permissions/edit",
                // },
                {
                  name: "User Management",
                  meta: {
                    icon: <ManageAccountsOutlinedIcon />,
                  },
                },
                {
                  name: "permissions",
                  list: "/permissions",
                  create: "/permissions/create",
                  edit: "/permissions/edit/:id",
                  show: "/permissions/show/:id",
                  meta: {
                    canDelete: true,
                    parent: "User Management",
                    icon: <LockOutlined />,
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
                    icon: <AccountCircleOutlined />,
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
                    icon: <PeopleOutlineRounded />,
                  },
                },
                {
                  name: "departments",
                  list: "/departments",
                  create: "/departments/create",
                  edit: "/departments/edit/:id",
                  show: "/departments/show/:id",
                  meta: {
                    icon: <BusinessCenterOutlined />,
                    canDelete: true
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
                    icon: <CategoryOutlined />,
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
                    icon: <ScaleOutlined />,
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
                    idOnlyPass: true,
                  },
                },
                {
                  name: "user management",
                },
                {
                  name: "purchase-modes",
                  list: "/purchase-modes",
                  create: "/purchase-modes/create",
                  edit: "/purchase-modes/edit/:id",
                  show: "/purchase-modes/show/:id",
                  meta: {
                    icon: <ShoppingCartOutlined />,
                    canDelete: true
                  },
                },
                {
                  name: "supply-types",
                  list: "/supply-types",
                  create: "/supply-types/create",
                  edit: "/supply-types/edit/:id",
                  show: "/supply-types/show/:id",
                  meta: {
                    icon: <LocalShippingOutlined />,
                    canDelete: true
                  },
                },
                {
                  name: "bid-types",
                  list: "/bid-types",
                  create: "/bid-types/create",
                  edit: "/bid-types/edit/:id",
                  show: "/bid-types/show/:id",
                  meta: {
                    icon: <GavelOutlined />,
                    canDelete: true
                  },
                },
                {
                  name: "source-of-fundings",
                  list: "/source-of-fundings",
                  create: "/source-of-fundings/create",
                  edit: "/source-of-fundings/edit/:id",
                  show: "/source-of-fundings/show/:id",
                  meta: {
                    icon: <AttachMoneyOutlined />,
                    canDelete: true
                  },
                },
              ]}
              options={{
                syncWithLocation: true,
                warnWhenUnsavedChanges: false,
                projectId: "vWDU4h-MijopK-kwqDNS",
                disableTelemetry: true,
                undoableTimeout: 2500,
                mutationMode: mutationMode,
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
                        Header={() => (
                          <Header
                            sticky
                            currentMutationMode={mutationMode}
                            onMutationChange={(mode) => setMutationMode(mode)}
                          />
                        )}
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
                  <Route path="/" element={<AdminDashboard />} />
                  <Route  path="/permissions">
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
                  <Route  path="/users">
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
                  <Route path="/products">
                    <Route index element={<ProductList />} />
                    <Route path="create" element={<ProductCreate />} />
                    <Route path="edit/:id" element={<ProductEdit />} />
                    <Route path="show/:id" element={<ProductShow />} />
                  </Route>
                  <Route path="/purchase-modes">
                    <Route index element={<PurchaseModeList />} />
                    <Route path="create" element={<PurchaseModeCreate />} />
                    <Route path="edit/:id" element={<PurchaseModeEdit />} />
                    <Route path="show/:id" element={<PurchaseModeShow />} />
                  </Route>
                  <Route path="/supply-types">
                    <Route index element={<SupplyTypeList />} />
                    <Route path="create" element={<SupplyTypeCreate />} />
                    <Route path="edit/:id" element={<SupplyTypeEdit />} />
                    <Route path="show/:id" element={<SupplyTypeShow />} />
                  </Route>
                  <Route path="/bid-types">
                    <Route index element={<BidTypeList />} />
                    <Route path="create" element={<BidTypeCreate />} />
                    <Route path="edit/:id" element={<BidTypeEdit />} />
                    <Route path="show/:id" element={<BidTypeShow />} />
                  </Route>
                  <Route path="/source-of-fundings">
                    <Route index element={<SourceOfFundingList />} />
                    <Route path="create" element={<SourceOfFundingCreate />} />
                    <Route path="edit/:id" element={<SourceOfFundingEdit />} />
                    <Route path="show/:id" element={<SourceOfFundingShow />} />
                  </Route>
                  <Route path="/departments">
                    <Route index element={<DepartmentList />} />
                    <Route path="create" element={<DepartmentCreate />} />
                    <Route path="edit/:id" element={<DepartmentEdit />} />
                    <Route path="show/:id" element={<DepartmentShow />} />
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
                  <Route path="/forgot-password" element={<ForgotPassword />} />
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
