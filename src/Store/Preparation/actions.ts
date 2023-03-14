/**
 * @file
 * @date 2022-06-06
 * @author zhuxiaojixo
 * @lastModify zhuxiaojixo 2022-06-06
 */
import * as types from './types';

// 保存当前选择的角色
export const updateCurrentRoleAction = (payload: string): types.PreparationTypes => {
    return {
        type: types.ACTION_TYPE.UPDATE_CURRENT_ROLE_ACTION,
        payload,
    };
};
// 获取导航信息
export const getNavDataSaga = (payload: {
    talent_group_id: string;
    data_proc_id: string;
    callback?: () => void;
}): types.PreparationTypes => {
    return {
        type: types.ACTION_TYPE.GET_NAV_DATA_SAGA,
        payload,
    };
};
export const updateNavDataAction = (payload: {
    navData: types.NavDataType;
}): types.PreparationTypes => {
    return {
        type: types.ACTION_TYPE.UPDATE_NAV_DATA_ACTION,
        payload,
    };
};
// 保存当前talent group 的id
export const saveSelectedTGAction = (payload: string): types.PreparationTypes => {
    return {
        type: types.ACTION_TYPE.SAVE_SELECTED_TG_ACTION,
        payload,
    };
};
// 获取表单recruitment和 attachments
export const getRecruitmentAndAttachSaga = (payload: {
    talent_group_id: string;
    data_proc_id: string;
    callback?: () => void;
}): types.PreparationTypes => {
    return {
        type: types.ACTION_TYPE.GET_RECRUITMENT_AND_ATTACHMENTS_SAGA,
        payload,
    };
};
export const updateRecruitmentAndAttachAction = (payload: {
    recruitment: string;
    attachments: types.AttachmentsType[];
}): types.PreparationTypes => {
    return {
        type: types.ACTION_TYPE.UPDATE_RECRUITMENT_AND_ATTACHMENTS_ACTION,
        payload,
    };
};
// 更新 recruitment Requirement
export const updateRecruitmentSaga = (payload: {
    talent_group_id: string;
    data_proc_id: string;
    recruitment: string;
    callback?: () => void;
}): types.PreparationTypes => {
    return {
        type: types.ACTION_TYPE.UPDATE_RECRUITMENT_SAGA,
        payload,
    };
};
// 上传文件
export const uploadFileSaga = (payload: types.FileUploadType): types.PreparationTypes => {
    return { type: types.ACTION_TYPE.UPLOAD_ATTACHMENTS_SAGA, payload };
};
// 修改文件名
export const updateFileNameSaga = (payload: {
    talent_group_id: string;
    data_proc_id: string;
    att_id: string;
    name: string;
}): types.PreparationTypes => {
    return { type: types.ACTION_TYPE.UPDATE_ATTACHMENTS_NAME_SAGA, payload };
};
// 删除文件
export const deleteFileSaga = (payload: {
    talent_group_id: string;
    data_proc_id: string;
    att_id: string;
}): types.PreparationTypes => {
    return { type: types.ACTION_TYPE.DELETE_ATTACHMENT_SAGA, payload };
};
// 下载文件
export const downloadFileSaga = (payload: {
    talent_group_id: string;
    data_proc_id: string;
    att_id: string;
    file_name: string;
}): types.PreparationTypes => {
    return { type: types.ACTION_TYPE.DOWNlOAD_ATTACHMENT_SAGA, payload };
};
// 获得 distribution 的绑定的 survey
export const getBoundSurveySaga = (payload: {
    tg_id: string;
    distribution: string;
    filter_null?: boolean;
    owner?: boolean; // 是否只显示 distributor 的 survey
    is_group?: boolean; // 是否要将有可用 distributor 的 survey 排在前面
    filter_archived?: boolean; // 是否不统计被归档了的 distributor
    show_version?: boolean; // 是否返回表单版本号
    callback?: () => void;
}): types.PreparationTypes => {
    return {
        type: types.ACTION_TYPE.GET_BOUND_SURVEY_SAGA,
        payload,
    };
};
export const updateBoundSurveyAction = (payload: {
    getBoundSurvey: {
        isLoading: boolean;
        data: types.BoundSurveyType[];
    };
}): types.PreparationTypes => {
    return {
        type: types.ACTION_TYPE.UPDATE_BOUND_SURVEY_ACTION,
        payload,
    };
};
// 获取未绑定的survey
export const getUnboundSurveySaga = (payload: {
    tg_id: string;
    distribution: string;
    callback?: () => void;
}): types.PreparationTypes => {
    return {
        type: types.ACTION_TYPE.GET_UNBOUND_SURVEY_SAGA,
        payload,
    };
};
export const updateUnboundSurveyAction = (payload: {
    getUnboundSurvey: {
        isLoading: boolean;
        data: types.UnboundSurveyType[];
    };
}): types.PreparationTypes => {
    return {
        type: types.ACTION_TYPE.UPDATE_UNBOUND_SURVEY_ACTION,
        payload,
    };
};
// 绑定questionnaire
export const bindQuestionnaireSaga = (payload: {
    tg_id: string;
    distribution: string;
    surveys: string[];
    callback?: () => void;
}): types.PreparationTypes => {
    return {
        type: types.ACTION_TYPE.BIND_QUESTIONNAIRE_SAGA,
        payload,
    };
};
// 冻结与解冻survey
export const freezeAndUnfreezeSurvey = (payload: {
    tg_id: string;
    distribution: string;
    survey_id: string;
    freeze: boolean;
    message: string;
    callback?: () => void;
}): types.PreparationTypes => {
    return {
        type: types.ACTION_TYPE.FREEZE_AND_UNFREEZE_SURVEY_SAGA,
        payload,
    };
};

// 保存分享视角的参数
export const saveShareViewAction = (payload: {
    sign: string;
    random: string;
    view_id: string;
    role_limit: string[];
    job_id: string;
    share_org: string;
    isSameOrg: boolean;
}): types.PreparationTypes => {
    return {
        type: types.ACTION_TYPE.SAVE_SHARE_VIEW_DATA_ACTION,
        payload,
    };
};
