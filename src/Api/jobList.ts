/**
 * @file jobList
 * @date 2022-09-15
 * @author liaoli
 * @lastModify liaoli 2022-09-15
 */

import { AxiosResponse } from 'axios';
import service from './interceptor';
import * as types from '~/Store/JobList/types';

// 获取jobList
export const getJobList = (params: types.GetJobListType): Promise<AxiosResponse> => {
    return service({
        url: '/job',
        method: 'get',
        params,
    });
};

// 更新job
export const updateJob = (payload: types.UpdateJobType): Promise<AxiosResponse> => {
    return service({
        url: '/job',
        method: 'put',
        data: payload,
    });
};

// 设置job刷新时间
export const updateJobReTime = (payload: types.UpdateJobReTimeType): Promise<AxiosResponse> => {
    return service({
        url: '/job/refresh',
        method: 'put',
        data: payload,
    });
};

// 获取绑定的表单及版本
export const getSurveyList = (params: types.GetSurveyListType): Promise<AxiosResponse> => {
    return service({
        url: '/data_proc/list/survey',
        method: 'get',
        params,
    });
};

// 创建job
export const createJob = (payload: types.CreateJobType): Promise<AxiosResponse> => {
    return service({
        url: '/job',
        method: 'post',
        data: payload,
    });
};

// 归档jib
export const archiveJob = (payload): Promise<AxiosResponse> => {
    return service({
        url: '/job/archive',
        method: 'post',
        data: payload,
    });
};

// 恢复归档job
export const restoreArchivedJob = (payload): Promise<AxiosResponse> => {
    return service({
        url: '/job/re_archive',
        method: 'post',
        data: payload,
    });
};

// 导出job
export const exportJob = (params): Promise<AxiosResponse> => {
    return service({
        url: '/job/export',
        method: 'get',
        params,
    });
};

// 获取job所有的问题 & 变量
export const getJobQuestion = (params): Promise<AxiosResponse> => {
    return service({
        url: '/job/q_and_val',
        method: 'get',
        params,
    });
};

// 获取job result
export const getJobResult = (params): Promise<AxiosResponse> => {
    return service({
        url: '/job/result',
        method: 'get',
        params,
    });
};
// 获取job_id对应的configuration
export const getSurveyConf = (params: {
    job_id: string;
    talent_group_id: string;
}): Promise<AxiosResponse> => {
    return service({
        url: '/job/surv_conf',
        method: 'get',
        params,
    });
};
