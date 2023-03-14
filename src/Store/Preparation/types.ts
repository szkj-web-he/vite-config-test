/**
 * @file
 * @date 2022-06-06
 * @author zhuxiaojixo
 * @lastModify zhuxiaojixo 2022-06-06
 */

import { CancelToken } from 'axios';

/* <------------------------------------ **** 数据类型 START **** ------------------------------------ */
export interface NavDataType {
    deliverable_id: string;
    data_proc: {
        id: string;
        name: string;
    };
    organization: {
        id: string;
        name: string;
    };
    talent_group: {
        id: string;
        name: string;
    };
    role: string[];
}
export interface AttachmentsType {
    id: string;
    type: string;
    name: string;
    size: string;
    created_at: string;
    updated_at: string;
}
export interface BoundSurveyType {
    id: string;
    name: string;
    freeze: boolean;
    project: {
        id: string;
        name: string;
    };
    org: {
        id: string;
        name: string;
    };
    distributor_count: number;
    versions: number[];
    // distributorList: DistributorType[];
    getDistributorList: {
        isLoading: boolean;
        data?: any[];
    };
}

export interface UploadedFileType {
    id: string;
    name: string;
}
export interface FileUploadType {
    formData: FormData;
    onUploadProgress: (progressEvent: ProgressEvent<XMLHttpRequestUpload>) => void;
    cancelToken: CancelToken;
    errorCallback?: () => void;
    // successCallback?: (urls: UploadedFileType[]) => void;
}
/* <------------------------------------ **** 数据类型 END **** ------------------------------------ */
/* <------------------------------------ **** action types START **** ------------------------------------ */
export enum ACTION_TYPE {
    // 保存当前选择的角色
    UPDATE_CURRENT_ROLE_ACTION = 'UPDATE_CURRENT_ROLE_ACTION',
    // 获取导航信息
    GET_NAV_DATA_SAGA = 'GET_NAV_DATA_SAGA',
    UPDATE_NAV_DATA_ACTION = 'UPDATE_NAV_DATA_ACTION',
    // 保存当前talent group 的id
    SAVE_SELECTED_TG_ACTION = 'SAVE_SELECTED_TG_ACTION',
    // 获取表单recruitment和 attachments
    GET_RECRUITMENT_AND_ATTACHMENTS_SAGA = 'GET_RECRUITMENT_AND_ATTACHMENTS_SAGA',
    UPDATE_RECRUITMENT_AND_ATTACHMENTS_ACTION = 'UPDATE_RECRUITMENT_AND_ATTACHMENTS_ACTION',
    // 更新 recruitment Requirement
    UPDATE_RECRUITMENT_SAGA = 'UPDATE_RECRUITMENT_SAGA',
    // 上传文件
    UPLOAD_ATTACHMENTS_SAGA = 'UPLOAD_ATTACHMENTS_SAGA',
    // 修改文件名
    UPDATE_ATTACHMENTS_NAME_SAGA = 'UPDATE_ATTACHMENTS_NAME_SAGA',
    // 删除文件
    DELETE_ATTACHMENT_SAGA = 'DELETE_ATTACHMENT_SAGA',
    // 下载文件
    DOWNlOAD_ATTACHMENT_SAGA = 'DOWNlOAD_ATTACHMENT_SAGA',
    // 获得 distribution 的绑定的 survey
    GET_BOUND_SURVEY_SAGA = 'GET_BOUND_SURVEY_SAGA',
    UPDATE_BOUND_SURVEY_ACTION = 'UPDATE_BOUND_SURVEY_ACTION',
    // 获取未绑定的survey
    GET_UNBOUND_SURVEY_SAGA = 'GET_UNBOUND_SURVEY_SAGA',
    UPDATE_UNBOUND_SURVEY_ACTION = 'UPDATE_UNBOUND_SURVEY_ACTION',
    // 绑定questionnaire
    BIND_QUESTIONNAIRE_SAGA = 'BIND_QUESTIONNAIRE_SAGA',
    // 冻结与解冻survey
    FREEZE_AND_UNFREEZE_SURVEY_SAGA = 'FREEZE_AND_UNFREEZE_SURVEY_SAGA',
    // 保存分享视角的参数
    SAVE_SHARE_VIEW_DATA_ACTION = 'SAVE_SHARE_VIEW_DATA_ACTION',
}

// 保存当前选择的角色
export interface UpdateCurrentRoleAction {
    type: ACTION_TYPE.UPDATE_CURRENT_ROLE_ACTION;
    payload: string;
}
// 获取导航信息
export interface GetNavDataSaga {
    type: ACTION_TYPE.GET_NAV_DATA_SAGA;
    payload: {
        talent_group_id: string;
        data_proc_id: string;
        callback?: () => void;
    };
}
export interface UpdateNavDataAction {
    type: ACTION_TYPE.UPDATE_NAV_DATA_ACTION;
    payload: {
        navData: NavDataType;
    };
}
// 保存当前talent group 的id
export interface SaveSelectedTGAction {
    type: ACTION_TYPE.SAVE_SELECTED_TG_ACTION;
    payload: string;
}
// 获取表单recruitment和 attachments
export interface GetRecruitmentAndAttachSaga {
    type: ACTION_TYPE.GET_RECRUITMENT_AND_ATTACHMENTS_SAGA;
    payload: {
        talent_group_id: string;
        data_proc_id: string;
        callback?: () => void;
    };
}
export interface UpdateRecruitmentAndAttachAction {
    type: ACTION_TYPE.UPDATE_RECRUITMENT_AND_ATTACHMENTS_ACTION;
    payload: {
        recruitment: string;
        attachments: AttachmentsType[];
    };
}

// 更新 recruitment Requirement
export interface UpdateRecruitmentSaga {
    type: ACTION_TYPE.UPDATE_RECRUITMENT_SAGA;
    payload: {
        talent_group_id: string;
        data_proc_id: string;
        recruitment: string;
        callback?: () => void;
    };
}
// 上传文件

export interface UploadFileSaga {
    type: ACTION_TYPE.UPLOAD_ATTACHMENTS_SAGA;
    payload: FileUploadType;
}
// 修改文件名
export interface UpdateFileNameSaga {
    type: ACTION_TYPE.UPDATE_ATTACHMENTS_NAME_SAGA;
    payload: {
        talent_group_id: string;
        data_proc_id: string;
        att_id: string;
        name: string;
    };
}
// 删除文件
export interface DeleteFileSaga {
    type: ACTION_TYPE.DELETE_ATTACHMENT_SAGA;
    payload: {
        talent_group_id: string;
        data_proc_id: string;
        att_id: string;
    };
}
// 下载文件
export interface DownloadFileSaga {
    type: ACTION_TYPE.DOWNlOAD_ATTACHMENT_SAGA;
    payload: {
        talent_group_id: string;
        data_proc_id: string;
        att_id: string;
        file_name: string;
    };
}
// 获得 distribution 的绑定的 survey
export interface GetBoundSurveySaga {
    type: ACTION_TYPE.GET_BOUND_SURVEY_SAGA;
    payload: {
        tg_id: string;
        distribution: string;
        filter_null?: boolean;
        owner?: boolean; // 是否只显示 distributor 的 survey
        is_group?: boolean; // 是否要将有可用 distributor 的 survey 排在前面
        filter_archived?: boolean; // 是否不统计被归档了的 distributor
        show_version?: boolean;
        callback?: () => void;
    };
}
export interface UpdateBoundSurveyAction {
    type: ACTION_TYPE.UPDATE_BOUND_SURVEY_ACTION;
    payload: {
        getBoundSurvey: {
            isLoading: boolean;
            data: BoundSurveyType[];
        };
    };
}
// 获取未绑定的survey
export interface UnboundSurveyType {
    id: string;
    name: string;
    updated_at: string;
    versions: number[];
}
export interface GetUnboundSurveySaga {
    type: ACTION_TYPE.GET_UNBOUND_SURVEY_SAGA;
    payload: {
        tg_id: string;
        distribution: string;
        callback?: () => void;
    };
}
export interface UpdateUnboundSurveyAction {
    type: ACTION_TYPE.UPDATE_UNBOUND_SURVEY_ACTION;
    payload: {
        getUnboundSurvey: {
            isLoading: boolean;
            data: UnboundSurveyType[];
        };
    };
}
// 绑定questionnaire
export interface BindQuestionnaireSaga {
    type: ACTION_TYPE.BIND_QUESTIONNAIRE_SAGA;
    payload: {
        tg_id: string;
        distribution: string;
        surveys: string[];
        callback?: () => void;
    };
}
// 冻结与解冻survey
export interface FreezeAndUnfreezeSurveySaga {
    type: ACTION_TYPE.FREEZE_AND_UNFREEZE_SURVEY_SAGA;
    payload: {
        tg_id: string;
        distribution: string;
        survey_id: string;
        freeze: boolean;
        message: string;
        callback?: () => void;
    };
}

// 保存分享视角的参数
export interface SaveShareViewAction {
    type: ACTION_TYPE.SAVE_SHARE_VIEW_DATA_ACTION;
    payload: {
        sign: string;
        random: string;
        view_id: string;
        role_limit: string[];
        job_id: string;
        share_org: string;
        isSameOrg: boolean;
    };
}

/* <------------------------------------ **** action types END **** ------------------------------------ */
/* <------------------------------------ **** 接口类型 START **** ------------------------------------ */
export type PreparationTypes =
    | UpdateCurrentRoleAction
    | GetNavDataSaga
    | UpdateNavDataAction
    | SaveSelectedTGAction
    | GetRecruitmentAndAttachSaga
    | UpdateRecruitmentAndAttachAction
    | UpdateRecruitmentSaga
    | UploadFileSaga
    | UpdateFileNameSaga
    | DeleteFileSaga
    | DownloadFileSaga
    | GetBoundSurveySaga
    | UpdateBoundSurveyAction
    | GetUnboundSurveySaga
    | UpdateUnboundSurveyAction
    | BindQuestionnaireSaga
    | FreezeAndUnfreezeSurveySaga
    | SaveShareViewAction;
/* <------------------------------------ **** 接口类型 END **** ------------------------------------ */
/* <------------------------------------ **** reducer数据类型 START **** ------------------------------------ */
export interface PreparationReducer {
    currentRole: string;
    navData: NavDataType;
    selectedTg: string;
    recruitment: string;
    attachments: AttachmentsType[];
    getBoundSurvey: {
        isLoading: boolean;
        data: BoundSurveyType[];
    };
    getUnboundSurvey: {
        isLoading: boolean;
        data: UnboundSurveyType[];
    };
    shareView: {
        sign: string;
        random: string;
        view_id: string;
        role_limit: string[];
        job_id: string;
        share_org: string;
        isSameOrg: boolean;
    };
}
/* <------------------------------------ **** reducer数据类型 END **** ------------------------------------ */
