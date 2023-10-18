import { DataProvider } from "@refinedev/core";
import { axiosInstance, generateSort, generateFilter } from "./utils";
import { AxiosInstance } from "axios";
import { stringify } from "query-string";

type MethodTypes = "get" | "delete" | "head" | "options";
type MethodTypesWithBody = "post" | "put" | "patch";

export const dataProvider = (
  apiUrl: string,
  axiosInstance: AxiosInstance
): Omit<
  Required<DataProvider>,
  "createMany" | "updateMany" | "deleteMany"
> => ({
  getList: async ({ resource, pagination, filters, sorters, meta }) => {
    const url = `${apiUrl}/${resource}`;

    const { current = 1, pageSize = 10, mode = "server" } = pagination ?? {};

    const { headers: headersFromMeta, method } = meta ?? {};
    const requestMethod = (method as MethodTypes) ?? "get";

    const queryFilters = generateFilter(filters);

    const query: {
      limit?: number;
      offset?: number;
      sort?: string;
      order?: string;
    } = {};

    if (mode === "server") {
      query.offset = (current - 1) * pageSize;
      query.limit = pageSize;
    }

    const generatedSort = generateSort(sorters);
    if (generatedSort) {
      const { _sort, _order } = generatedSort;
      query.sort = _sort.join(",");
      query.order = _order.join(",");
    }

    try {
        const {data, headers} = await axiosInstance.get(`${url}?${stringify(query)}&${stringify(queryFilters)}`, {
        headers: headersFromMeta,
        method: requestMethod
      })
      const total = +data?.meta?.total || data?.data?.length || 0;
      console.log(total);
      const records = {
        data: data.data,
        total
      }
      console.log(records);
      return records;
    } catch (error) {
      console.log(error);
      return {
        data: [],
        total: 0
      }
    }
  },

  getMany: async ({ resource, ids, meta }) => {
    const { headers, method } = meta ?? {};
    const requestMethod = (method as MethodTypes) ?? "get";

    const { data } = await axiosInstance.get(
      `${apiUrl}/${resource}?${stringify({ id: ids })}`,
      { headers }
    );

    return {
      data: data.data
    };
  },

  create: async ({ resource, variables, meta }) => {
    const url = `${apiUrl}/${resource}`;

    const { headers, method } = meta ?? {};
    const requestMethod = (method as MethodTypesWithBody) ?? "post";

    const { data } = await axiosInstance.post(url, variables, {
      headers,
    });

    return {
      data: data.data
    };
  },

  update: async ({ resource, id, variables, meta }) => {
    const url = `${apiUrl}/${resource}/${id}`;

    const { headers, method } = meta ?? {};
    const requestMethod = (method as MethodTypesWithBody) ?? "patch";

    const { data } = await axiosInstance.patch(url, variables, {
      headers,
    });

    return {
      data: data.data
    };
  },

  getOne: async ({ resource, id, meta }) => {
    const url = `${apiUrl}/${resource}/${id}`;

    const { headers, method } = meta ?? {};
    const requestMethod = (method as MethodTypes) ?? "get";
    

    const { data } = await axiosInstance.get(url, { headers });

    return {
      data: data.data
    };
  },

  deleteOne: async ({ resource, id, variables, meta }) => {
    const url = `${apiUrl}/${resource}/${id}`;

    const { headers, method } = meta ?? {};
    const requestMethod = (method as MethodTypesWithBody) ?? "delete";

    const { data } = await axiosInstance.delete(url, {
      data: variables,
      headers,
    });

    return {
      data: data.data
    };
  },

  getApiUrl: () => {
    return apiUrl;
  },

  custom: async ({
    url,
    method,
    filters,
    sorters,
    payload,
    query,
    headers,
  }) => {
    let requestUrl = `${url}?`;

    if (sorters) {
      const generatedSort = generateSort(sorters);
      if (generatedSort) {
        const { _sort, _order } = generatedSort;
        const sortQuery = {
          sort: _sort.join(","),
          order: _order.join(","),
        };
        requestUrl = `${requestUrl}&${stringify(sortQuery)}`;
      }
    }

    if (filters) {
      const filterQuery = generateFilter(filters);
      requestUrl = `${requestUrl}&${stringify(filterQuery)}`;
    }

    if (query) {
      requestUrl = `${requestUrl}&${stringify(query)}`;
    }

    let axiosResponse;
    switch (method) {
      case "put":
      case "post":
      case "patch":
        axiosResponse = await axiosInstance[method](url, payload, {
          headers,
        });
        break;
      case "delete":
        axiosResponse = await axiosInstance.delete(url, {
          data: payload,
          headers: headers,
        });
        break;
      default:
        axiosResponse = await axiosInstance.get(requestUrl, {
          headers,
        });
        break;
    }

    const { data } = axiosResponse;

    return Promise.resolve({ data });
  },
});
