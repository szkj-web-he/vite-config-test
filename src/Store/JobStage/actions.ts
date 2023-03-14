/**
 * @file
 * @date 2022-11-09
 * @author liaoli
 * @lastModify liaoli 2022-11-09
 */

import * as types from './types';

/** 获取 job stage */
export const getJobStageSage = (payload: types.getJobStageType): types.getJobStageSaga => {
    return {
        type: types.ACTION_TYPE.GET_JOB_STAGE_SAGA,
        payload,
    };
};

/** 更新 job stage */
export const updateJobStageSaga = (payload: types.updateJobStageType): types.updateJobStageSage => {
    return {
        type: types.ACTION_TYPE.UPDATE_JOB_STAGE_SAGA,
        payload,
    };
};

export const updateJobStageAction = (payload: types.JobStageType): types.updateJobStageAction => {
    return {
        type: types.ACTION_TYPE.UPDATE_JOB_STAGE_ACTION,
        payload,
    };
};

/** 更新 current step */
export const updateCurrentStepAction = (
    payload: types.CurrentStepType,
): types.updateCurrentStepAction => {
    return {
        type: types.ACTION_TYPE.UPDATE_CURRENT_STEP_ACTION,
        payload,
    };
};

/** 更新处理方式 */
export const updateJobHandleMethodAction = (
    payload: 'default' | 'custom',
): types.updateJobHandleMethodAction => {
    return {
        type: types.ACTION_TYPE.UPDATE_JOB_HANDLE_METHOD,
        payload,
    };
};

/** 更新已发布stage */
export const updatePublishStageAction = (
    payload: types.StageType[],
): types.updatePublishStageAction => {
    return {
        type: types.ACTION_TYPE.UPDATE_PUBLISH_STAGE_ACTION,
        payload,
    };
};
