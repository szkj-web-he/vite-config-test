/**
 * @file
 * @date 2022-09-15
 * @author liaoli
 * @lastModify liaoli 2022-09-15
 */

import { LoopNodeType } from '~/Utils/loopNodeUtils/util/type';

export interface JobListReducer {
    getJobList: {
        isLoading: boolean;
        data?: JobListType[];
    };
    getSurveyList: {
        questionnaireList: SurveyListType[];
    };
    getArchiveJobList: {
        isLoading: boolean;
        data?: JobListType[];
    };
    getCurrentJob?: JobListType;
    getJobResult?: JobResultType[];
    getJobQuestion?: JobQuestionType[];
}

export interface JobListType {
    id: string;
    name: string;
    description: string;
    source_type: 0 | 1;
    // refresh: boolean;
    refresh_interval: number;
    created_at: string;
    creator_org: {
        id: string;
        name: string;
        logo: string;
    };
    creator_user: {
        id: string;
        name: string;
        avatar: string;
    };
    survey_version: {
        number: number;
        survey: {
            id: string;
            name: string;
        };
    };
    source_job: {
        id: string;
        name: string;
        description: string;
    };
}

export interface SurveyListType {
    id: string;
    name: string;
    versions: {
        id: string;
        tag: number;
    }[];
}

export interface JobQuestionType {
    qid: string;
    q_text: Array<string | LoopNodeType>;
    q_type: string;
    q_dimension: {
        option_code: string;
        option_text: string;
    }[][];
    q_label_name: string;
    is_extra: boolean;
    is_loop: boolean;
}

export interface JobQuestionExportType {
    qid: string;
    q_text: string;
    q_type: string;
    q_dimension: {
        option_code: string;
        option_text: string;
    }[][];
    q_label_name: string;
    is_extra: boolean;
    is_loop: boolean;
}

export interface JobResultType {
    stage: string;
    data: {
        global_vars: object;
        marks_count: object;
        options_count: object;
    };
    g_vars: { description: string; name: string }[];
    v_vars: JobQuestionType[];
}

export enum ACTION_TYPE {
    // 获取jobList
    GET_JOB_LIST_SAGA = 'GET_JOB_LIST_SAGA',
    // 更新jobList
    UPDATE_JOB_LIST_ACTION = 'UPDATE_JOB_LIST_ACTION',
    // 更新job
    UPDATE_JOB_SAGA = 'UPDATE_JOB_SAGA',
    // 更新jobDesc
    UPDATE_JOB_DESC_ACTION = 'UPDATE_JOB_DESC_ACTION',
    // 更新jobName
    UPDATE_JOB_NAME_ACTION = 'UPDATE_JOB_NAME_ACTION',
    // 更新jobReTime
    UPDATE_JOB_REFRESH_TIME_SAGA = 'UPDATE_JOB_REFRESH_TIME_SAGA',
    UPDATE_JOB_REFRESH_TIME_ACTION = 'UPDATE_JOB_REFRESH_TIME_ACTION',
    // 获取绑定的表单
    GET_SURVEY_LIST_SAGA = 'GET_SURVEY_LIST_SAGA',
    // 更新表单列表
    UPDATE_SURVEY_LIST_ACTION = 'UPDATE_SURVEY_LIST_ACTION',
    // 创建job
    CREATE_JOB_SAGA = 'CREATE_JOB_SAGA',
    // 归档job
    ARCHIVED_JOB_SAGA = 'ARCHIVED_JOB_SAGA',
    // 更新已归档的job
    UPDATE_ARCHIVED_JOB_LIST_ACTION = 'UPDATE_ARCHIVED_JOB_LIST_ACTION',
    // 恢复已归档的job
    RESTORE_ARCHIVED_JOB_SAGA = 'RESTORE_ARCHIVED_JOB_SAGA',
    // 导出job
    EXPORT_JOB_SAGA = 'EXPORT_JOB_SAGA',
    // 更新当前选中job
    UPDATE_CURRENT_JOB_ACTION = 'UPDATE_CURRENT_JOB_ACTION',
    // 获取job问题&变量
    GET_JOB_QUESTION_SAGA = 'GET_JOB_QUESTION_SAGA',
    // 获取job result
    GET_JOB_RESULT_SAGA = 'GET_JOB_RESULT_SAGA',
    // 更新job result
    UPDATE_JOB_RESULT_ACTION = 'UPDATE_JOB_RESULT_ACTION',
    // 更新job question
    UPDATE_JOB_QUESTION_ACTION = 'UPDATE_JOB_QUESTION_ACTION',
}

/** 获取jobList参数 */
export interface GetJobListType {
    callback?: (res: JobListType[]) => void;
    data_proc_id: string;
    talent_group_id: string;
    deliv_role: string;
    fetch_archived?: boolean;
}
/** 更新job参数 */
export interface UpdateJobType {
    callback?: (res: { code: number; message: string }) => void;
    talent_group_id: string;
    job_id: string;
    job_new_data: {
        name?: string;
        description?: string;
    };
}

/** 更新jobDesc参数 */
export interface UpdateJobDescType {
    job_id: string;
    description: string;
}

/** 更新jobName参数 */
export interface UpdateJobNameType {
    job_id: string;
    name: string;
}

/** 更新job刷新时间参数 */
export interface UpdateJobReTimeType {
    callback?: () => void;
    talent_group_id: string;
    job_id: string;
    interval: number;
}

/** 更新store job刷新时间参数 */
export interface UpdateStoreJobReTimeType {
    job_id: string;
    refresh_interval: number;
}

/** 获取绑定列表参数 */
export interface GetSurveyListType {
    callback?: () => void;
    org_id: string;
    data_proc_id: string;
}

/** 创建job参数 */
export interface CreateJobType {
    callback?: () => void;
    data_proc_id: string;
    talent_group_id: string;
    new_job_data: {
        name: string;
        description: string;
        job_id?: string;
        questionnaire?: {
            id: string;
            version: number;
        };
    };
}

/** 获取job问题&变量 */
export interface GetJobQuestionType {
    callback?: (res: JobQuestionType[]) => void;
    talent_group_id: string;
    job_id: string;
    isExport: boolean;
}

/** 归档job参数 */
export interface ArchivedJobType {
    callback?: () => void;
    talent_group_id: string;
    job_id: string;
    archive_info: string;
}

/** 恢复归档job参数 */
export interface RestoreArchivedJobType {
    callback?: () => void;
    talent_group_id: string;
    job_id: string;
}

/** 导出job参数 */
export interface ExportJobType {
    callback?: (res: string) => void;
    talent_group_id: string;
    job_id: string;
}

/** 获取job result参数 */
export interface GetJobResultType {
    callback?: () => void;
    talent_group_id: string;
    job_id: string;
}

/** 更新jobList */
export interface UpdateJobListAction {
    type: ACTION_TYPE.UPDATE_JOB_LIST_ACTION;
    payload: {
        isLoading: boolean;
        data?: JobListType[];
    };
}

/** 获取jobList */
export interface GetJobListSaga {
    type: ACTION_TYPE.GET_JOB_LIST_SAGA;
    payload: GetJobListType;
}

/** 更新job */
export interface UpdateJobSaga {
    type: ACTION_TYPE.UPDATE_JOB_SAGA;
    payload: UpdateJobType;
}

/** 更新jobDesc */
export interface UpdateJobDescAction {
    type: ACTION_TYPE.UPDATE_JOB_DESC_ACTION;
    payload: UpdateJobDescType;
}

/** 更新jobName */
export interface UpdateJobNameAction {
    type: ACTION_TYPE.UPDATE_JOB_NAME_ACTION;
    payload: UpdateJobNameType;
}

/** 更新job刷新时间 */
export interface UpdateJobReTimeSaga {
    type: ACTION_TYPE.UPDATE_JOB_REFRESH_TIME_SAGA;
    payload: UpdateJobReTimeType;
}

export interface UpdateJobReTimeAction {
    type: ACTION_TYPE.UPDATE_JOB_REFRESH_TIME_ACTION;
    payload: UpdateStoreJobReTimeType;
}

/** 获取绑定的表单及版本 */
export interface GetSurveyListSaga {
    type: ACTION_TYPE.GET_SURVEY_LIST_SAGA;
    payload: GetSurveyListType;
}

/** 更新绑定表单 */
export interface UpdateSurveyListAction {
    type: ACTION_TYPE.UPDATE_SURVEY_LIST_ACTION;
    payload: SurveyListType[];
}

/** 创建job */
export interface CreateJobSaga {
    type: ACTION_TYPE.CREATE_JOB_SAGA;
    payload: CreateJobType;
}

/** 归档job */
export interface ArchivedJobSaga {
    type: ACTION_TYPE.ARCHIVED_JOB_SAGA;
    payload: ArchivedJobType;
}

/** 更新归档job */
export interface UpdateArchivedJobListAction {
    type: ACTION_TYPE.UPDATE_ARCHIVED_JOB_LIST_ACTION;
    payload: {
        isLoading: boolean;
        data?: JobListType[];
    };
}

/** 恢复归档job */
export interface RestoreArchivedJobSaga {
    type: ACTION_TYPE.RESTORE_ARCHIVED_JOB_SAGA;
    payload: RestoreArchivedJobType;
}

/** 导出job */
export interface ExportJobTypeSaga {
    type: ACTION_TYPE.EXPORT_JOB_SAGA;
    payload: ExportJobType;
}

/** 更新选中的job */
export interface UpdateCurrentJobAction {
    type: ACTION_TYPE.UPDATE_CURRENT_JOB_ACTION;
    payload?: JobListType;
}

/** 获取job问题&变量 */
export interface GetJobQuestionSaga {
    type: ACTION_TYPE.GET_JOB_QUESTION_SAGA;
    payload: GetJobQuestionType;
}

/** 获取job result参数 */
export interface GetJobResultSaga {
    type: ACTION_TYPE.GET_JOB_RESULT_SAGA;
    payload: GetJobResultType;
}

/** 更新job result */
export interface UpdateJobResultAction {
    type: ACTION_TYPE.UPDATE_JOB_RESULT_ACTION;
    payload: JobResultType[];
}

/** 更新 job question */
export interface UpdateJobQuestionAction {
    type: ACTION_TYPE.UPDATE_JOB_QUESTION_ACTION;
    payload: JobQuestionType[];
}

export type JobListTypes =
    | GetJobListSaga
    | UpdateJobListAction
    | UpdateJobSaga
    | UpdateJobDescAction
    | UpdateJobNameAction
    | UpdateJobReTimeSaga
    | UpdateJobReTimeAction
    | GetSurveyListSaga
    | UpdateSurveyListAction
    | CreateJobSaga
    | ArchivedJobSaga
    | UpdateArchivedJobListAction
    | RestoreArchivedJobSaga
    | ExportJobTypeSaga
    | UpdateCurrentJobAction
    | GetJobQuestionSaga
    | GetJobResultSaga
    | UpdateJobResultAction
    | UpdateJobQuestionAction;
