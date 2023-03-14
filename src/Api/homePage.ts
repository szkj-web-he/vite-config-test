import { AxiosResponse } from 'axios';
import axios from './interceptor';
import * as types from '~/Store/HomePage/types';
import { userManagementServiceUrl } from './mainDomain';

// get 请求：获得 dataProcessing 文件夹数量
export const getFileNumber = (params: {
    org_id?: string;
    type: 'client' | 'supplier';
    talent_group_id?: string;
}): Promise<AxiosResponse> => {
    return axios.request({
        method: 'get',
        url: '/data_proc/list/count',
        params,
    });
};

// get 请求：获取dataProcessing all 列表
export const getDataProcessingData = (params: {
    talent_group_id?: string;
    type?: string;
    offset?: number;
    limit?: number;
    project_name?: string;
    project_id?: string;
    starred?: boolean;
    name?: string;
    start?: string;
    end?: string;
    unbound?: boolean;
    keyword?: string;
    sort_updated?: types.sortType;
    sort_created?: types.sortType;
    sort_name?: types.sortType;
}): Promise<AxiosResponse> => {
    return axios.request({
        method: 'get',
        url: '/data_proc/list',
        params,
    });
};

// get 请求：根据当前所选条件,即:client和talent_group, 来获取对应的survey distribution NOT BOUND列表
export const getDataProcNotBoundData = (params: {
    org_id: string;
    name?: string;
    start?: string;
    end?: string;
    offset?: number;
    limit?: number;
    sort_updated?: types.sortType;
    sort_created?: types.sortType;
    sort_name?: types.sortType;
}): Promise<AxiosResponse> => {
    return axios.request({
        method: 'get',
        url: '/data_proc/list/not_bound',
        params,
    });
};

// 星标 与 取消星标
export const updatedStarred = (data: {
    talent_group_id: string;
    data_proc_id: string;
    star: boolean;
}): Promise<AxiosResponse> => {
    return axios.request({
        method: 'put',
        url: '/data_proc/starred',
        data,
    });
};

// 更新 keywords
export const updateKeyWords = (data: {
    talent_group_id: string;
    data_proc_id: string;
    keywords: string[];
}): Promise<AxiosResponse> => {
    return axios.request({
        method: 'put',
        url: '/data_proc/keywords',
        data,
    });
};

// get 请求：根据 keyword 获取 distribution list
// export const getKeywordList = (params: {
//     talent_group_id: string;
//     type: 'client' | 'supplier';
//     keyword: string;
// }): Promise<AxiosResponse> => {
//     return axios.request({
//         method: 'get',
//         url: '/distribution/keyword',
//         params,
//     });
// };

// get default organization
export const getDefaultOrganization = (): Promise<AxiosResponse> => {
    return axios.request({
        method: 'get',
        url: `${userManagementServiceUrl}/default_organization/get`,
    });
};

//set user default organization
export const setDefaultOrganization = (data: {
    organization_dri: string;
}): Promise<AxiosResponse> => {
    return axios.request({
        url: `${userManagementServiceUrl}/default_organization/set`,
        method: 'post',
        data,
    });
};
