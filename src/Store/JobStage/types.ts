/**
 * @file
 * @date 2022-11-09
 * @author liaoli
 * @lastModify liaoli 2022-11-09
 */

export interface StageType {
    id: string;
    name: string;
    steps: {
        in_stream: {
            id: string;
            name: string;
            script: {
                type: string;
                name: string;
                args: string[];
                description: string;
            };
        }[];
        after_stream: {
            id: string;
            name: string;
            script: {
                type: string;
                name: string;
                args: string[];
            };
        }[];
    };
    g_vars: {
        id: string;
        name: string;
        type: string;
        description: string;
    }[];
    r_vars: {
        id: string;
        qid: string;
        q_text: string;
        q_type: string;
        q_dimension: {
            option_code: string;
            option_text: string;
        }[][];
        q_label_name: string;
        q_description: string;
    }[];
}
export interface JobStageType {
    status: number;
    config: StageType[];
}

export interface CurrentStepType {
    stageId: string;
    stepId: string;
    type: string;
}

export interface JobStageReducer {
    getJobStage: JobStageType;
    currentStep: CurrentStepType;
    getPublishStage: StageType[];
    jobHandleMethod: 'default' | 'custom';
}

export enum ACTION_TYPE {
    // 获取 job stage
    GET_JOB_STAGE_SAGA = 'GET_JOB_STAGE_SAGA',
    // 更新 job stage
    UPDATE_JOB_STAGE_SAGA = 'UPDATE_JOB_STAGE_SAGA',
    UPDATE_JOB_STAGE_ACTION = 'UPDATE_JOB_STAGE_ACTION',
    // 更新当前的 current step
    UPDATE_CURRENT_STEP_ACTION = 'UPDATE_CURRENT_STEP_ACTION',
    // 更新处理方式
    UPDATE_JOB_HANDLE_METHOD = 'UPDATE_JOB_HANDLE_METHOD',
    // 更新已发布的stage config
    UPDATE_PUBLISH_STAGE_ACTION = 'UPDATE_PUBLISH_STAGE_ACTION',
}

/** 获取 job stage 参数 */
export interface getJobStageType {
    callback?: (res) => void;
    talent_group_id: string;
    job_id: string;
}

/** 更新 job stage 参数 */
export interface updateJobStageType {
    callback?: () => void;
    stages: JobStageType;
    talent_group_id: string;
    job_id: string;
}

/** 获取 job stage */
export interface getJobStageSaga {
    type: ACTION_TYPE.GET_JOB_STAGE_SAGA;
    payload: getJobStageType;
}

/** 更新 job stage */
export interface updateJobStageSage {
    type: ACTION_TYPE.UPDATE_JOB_STAGE_SAGA;
    payload: updateJobStageType;
}

export interface updateJobStageAction {
    type: ACTION_TYPE.UPDATE_JOB_STAGE_ACTION;
    payload: JobStageType;
}

/** 更新 current step */
export interface updateCurrentStepAction {
    type: ACTION_TYPE.UPDATE_CURRENT_STEP_ACTION;
    payload: CurrentStepType;
}

/** 更新处理方式 */
export interface updateJobHandleMethodAction {
    type: ACTION_TYPE.UPDATE_JOB_HANDLE_METHOD;
    payload: 'default' | 'custom';
}

/** 更新已发布的stage */
export interface updatePublishStageAction {
    type: ACTION_TYPE.UPDATE_PUBLISH_STAGE_ACTION;
    payload: StageType[];
}

export type JobListTypes =
    | getJobStageSaga
    | updateJobStageSage
    | updateJobStageAction
    | updateCurrentStepAction
    | updateJobHandleMethodAction
    | updatePublishStageAction;
