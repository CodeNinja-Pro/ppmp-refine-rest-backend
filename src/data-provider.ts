import { CreateParams, DataProvider, HttpError } from "@refinedev/core";
// import { stringify } from "querystring";
import axios from 'axios';
const axiosInstance = axios.create();
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        const customError: HttpError = {
            ...error,
            message: error.response?.data?.message,
            statusCode: error.response?.status
        }
        return Promise.reject(customError);
    }
)

export default  (apiUrl: string): DataProvider => ({
    getList:async ({resource, pagination, sorters}) => {
        const url = `${apiUrl}${resource}`;
        const { current = 1, pageSize = 10} = pagination ?? {};
        const query: {
            _start?: number;
            _end?: number;
            _sort?: string;
            _order?: 'desc' | 'asc';
        } = {
            _start: (current - 1) * pageSize,
            _end: current * pageSize
        }

        if (sorters && sorters.length > 0) {
            query._sort = sorters[0].field;
            query._order = sorters[1].order;
        }

        const {data, headers} = await axiosInstance.get(`${url}/${JSON.stringify(query)}`);
        return {
            data,
            total: data.length
        }
    },
    create: async ({resource, variables}) => {
        const url = `${apiUrl}/${resource}`;
        const { data } = await axiosInstance.post(url, variables);
        return {
            data
        }
    },
    update:async ({resource, id, variables}) => {
        const url = `${apiUrl}/${resource}/${id}`;
        const { data } = await axiosInstance.patch(url, variables)
        return {
            data
        };
    },
    getOne:async ({resource, id}) => {
        const url = `${apiUrl}/${resource}/${id}`;
        const  { data } = await axiosInstance.get(url);
        return {
            data
        }
    },
    deleteOne:async ({resource, id, variables}) => {
        const url = `{apiUrl}/${resource}/${id}`
        const { data } = await axiosInstance.delete(url);
        return {
            data
        } 
    },
    getApiUrl: () => apiUrl
})