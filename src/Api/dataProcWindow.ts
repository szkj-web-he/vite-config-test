/**
 * @file edit distribution
 * @date 2021-11-01
 * @author Chaman
 * @lastModify  2021-11-01
 */
import { AxiosResponse } from 'axios';
import axios from './interceptor';
/**
 * search distribution list by distribution name
 */
export const searchDistributionListByName = (params: { name: string }): Promise<AxiosResponse> => {
    return axios.request({
        url: '/data_proc/search/name',
        method: 'get',
        params,
    });
};

// 获取distribution的权限
export const getDistributionRole = (params: {
    talent_group_id: string;
    data_proc_id: string;
}): Promise<AxiosResponse> => {
    return axios.request({
        url: '/data_proc/list/role',
        method: 'get',
        params,
    });
};
