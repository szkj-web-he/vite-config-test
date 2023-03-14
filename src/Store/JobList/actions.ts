/**
 * @file
 * @date 2022-09-15
 * @author liaoli
 * @lastModify liaoli 2022-09-15
 */
import * as types from './types';
/** 获取jobList */
export const getJobListSaga = (payload: types.GetJobListType): types.JobListTypes => {
    return {
        type: types.ACTION_TYPE.GET_JOB_LIST_SAGA,
        payload,
    };
};

/** 更新jobList */
export const updateJobListAction = (payload: {
    isLoading: boolean;
    data?: types.JobListType[];
}): types.JobListTypes => {
    return {
        type: types.ACTION_TYPE.UPDATE_JOB_LIST_ACTION,
        payload,
    };
};

/** 更新job */
export const updateJobSaga = (payload: types.UpdateJobType): types.JobListTypes => {
    return {
        type: types.ACTION_TYPE.UPDATE_JOB_SAGA,
        payload,
    };
};

/** 更新jobDesc */
export const updateJobDescAction = (payload: types.UpdateJobDescType): types.JobListTypes => {
    return {
        type: types.ACTION_TYPE.UPDATE_JOB_DESC_ACTION,
        payload,
    };
};

/** 更新jobName */
export const updateJobNameAction = (payload: types.UpdateJobNameType): types.JobListTypes => {
    return {
        type: types.ACTION_TYPE.UPDATE_JOB_NAME_ACTION,
        payload,
    };
};

/** 更新job刷新时间 */
export const updateJobReTimeSaga = (payload: types.UpdateJobReTimeType): types.JobListTypes => {
    return {
        type: types.ACTION_TYPE.UPDATE_JOB_REFRESH_TIME_SAGA,
        payload,
    };
};

export const updateJobReTimeAction = (
    payload: types.UpdateStoreJobReTimeType,
): types.JobListTypes => {
    return {
        type: types.ACTION_TYPE.UPDATE_JOB_REFRESH_TIME_ACTION,
        payload,
    };
};

/** 获取已绑定的表单列表及版本 */
export const getSurveyListSaga = (payload: types.GetSurveyListType): types.JobListTypes => {
    return {
        type: types.ACTION_TYPE.GET_SURVEY_LIST_SAGA,
        payload,
    };
};

/** 更新已绑定的表单列表及版本 */
export const updateSurveyListAction = (payload: types.SurveyListType[]): types.JobListTypes => {
    return {
        type: types.ACTION_TYPE.UPDATE_SURVEY_LIST_ACTION,
        payload,
    };
};

/** 创建job */
export const createJobSaga = (payload: types.CreateJobType): types.JobListTypes => {
    return {
        type: types.ACTION_TYPE.CREATE_JOB_SAGA,
        payload,
    };
};

/** 归档job */
export const archiveJobSaga = (payload: types.ArchivedJobType): types.JobListTypes => {
    return {
        type: types.ACTION_TYPE.ARCHIVED_JOB_SAGA,
        payload,
    };
};

/** 更新已归档的job */
export const updateArchiveJobListAction = (payload: {
    isLoading: boolean;
    data?: types.JobListType[];
}): types.JobListTypes => {
    return {
        type: types.ACTION_TYPE.UPDATE_ARCHIVED_JOB_LIST_ACTION,
        payload,
    };
};

/** 恢复呗归档的job */
export const restoreArchivedJobSaga = (
    payload: types.RestoreArchivedJobType,
): types.JobListTypes => {
    return {
        type: types.ACTION_TYPE.RESTORE_ARCHIVED_JOB_SAGA,
        payload,
    };
};

/** 导出job */
export const exportJobSaga = (payload: types.ExportJobType): types.JobListTypes => {
    return {
        type: types.ACTION_TYPE.EXPORT_JOB_SAGA,
        payload,
    };
};

/** 记录当前的job */
export const updateCurrentJobAction = (payload?: types.JobListType): types.JobListTypes => {
    return {
        type: types.ACTION_TYPE.UPDATE_CURRENT_JOB_ACTION,
        payload,
    };
};

/**  获取Job的 问题 & 变量 */
export const getJobQuestionSaga = (payload: types.GetJobQuestionType): types.JobListTypes => {
    return {
        type: types.ACTION_TYPE.GET_JOB_QUESTION_SAGA,
        payload,
    };
};

/** 获取job处理数据 */
export const getJobResultSaga = (payload: types.GetJobResultType): types.JobListTypes => {
    return {
        type: types.ACTION_TYPE.GET_JOB_RESULT_SAGA,
        payload,
    };
};

/** 更新job处理的数据 */
export const updateJobResultAction = (payload: types.JobResultType[]): types.JobListTypes => {
    return {
        type: types.ACTION_TYPE.UPDATE_JOB_RESULT_ACTION,
        payload,
    };
};

/** 更新job question */
export const updateJobQuestionAction = (payload: types.JobQuestionType[]): types.JobListTypes => {
    return {
        type: types.ACTION_TYPE.UPDATE_JOB_QUESTION_ACTION,
        payload,
    };
};
