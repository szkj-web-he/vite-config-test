/**
 * @file
 * @date 2022-11-09
 * @author liaoli
 * @lastModify liaoli 2022-11-09
 */

import { AxiosResponse } from 'axios';
import service from './interceptor';
import * as types from '~/Store/JobStage/types';

// 获取 job stages
export const getJobStage = (params: types.getJobStageType): Promise<AxiosResponse> => {
    return service({
        url: '/job/stages',
        method: 'get',
        params,
    });
};

// 更新 job stages
export const updateJobStage = (payload: {
    job_id: string;
    talent_group_id: string;
    stages: {
        status: number;
        config: types.StageType[];
        temp_config: types.StageType[];
    };
}): Promise<AxiosResponse> => {
    return service({
        url: '/job/stages',
        method: 'put',
        data: payload,
    });
};
