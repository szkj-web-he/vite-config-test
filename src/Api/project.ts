import { AxiosResponse } from "axios";
import axios from "./interceptor";
import { projectServiceUrl } from "./mainDomain";

/**
 * get project folder count
 */
export const getProjectFolderCount = (params: { org_id: string }): Promise<AxiosResponse> => {
    return axios.request({
        method: "get",
        url: `${projectServiceUrl}/user_project/folder/count`,
        params,
    });
};

/**
 * get project list
 */
export const getProjects = (params: {
    tg_id: string;
    type: number;
    scope?: string;
}): Promise<AxiosResponse> => {
    return axios.request({
        method: "get",
        url: `${projectServiceUrl}/user_project/tg/list/`,
        params,
    });
};

/** 搜索project */
export const searchProjects = (params: { org_id: string }): Promise<AxiosResponse> => {
    return axios.request({
        method: "get",
        url: `${projectServiceUrl}/project/org_projs`,
        params,
    });
};
