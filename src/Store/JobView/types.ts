/**
 * @file
 * @date 2022-09-23
 * @author liaoli
 * @lastModify liaoli 2022-09-23
 */

import { LoopNodeType } from '~/Utils/loopNodeUtils/util/type';
import { JobQuestionType, JobResultType } from '../JobList/types';
import { StageType } from '../JobStage/types';

export interface JobViewReducer {
    getViewList: {
        isLoading: boolean;
        data: {
            views: ViewListType[];
        };
    };
    getDefaultView?: ViewType[];
    getViewInfo: {
        [view_id: string]: {
            question: ViewType[];
            marks: boolean;
            global: boolean;
        };
    };
    getShareData: ShareDataType;
}
export interface ViewListType {
    id: string;
    name: string;
}
export interface ViewType {
    is_extra: boolean;
    id: string;
    type: string;
    text: Array<string | LoopNodeType>;
    titleText?: string;
    label: string;
    isTwoDimensional: boolean;
    is_loop: boolean;
    labelData: {
        id: string;
        value: string;
    }[];
    dataSets: {
        backgroundColor: Array<{ id: string; value: string }> | string;
        data: (number | undefined)[];
        label: string;
        id: string;
    }[];
    chartsType: number[];
    specificValue: boolean;
    max: number;
    min: number;
    yType: number;
    yGuides: number;
}

export interface ShareDataType {
    view: {
        id: string;
        name: string;
        job: {
            id: string;
            name: string;
            data_proc: {
                id: string;
                name: string;
            };
            stages?: {
                status: number;
                config: StageType[];
                temp_config: StageType[];
            };
        };
        config: {
            questions: ViewType[];
            marks: boolean;
            global: boolean;
        };
    };
    data: ViewType[];
    jobResult: JobResultType[];
}

export enum ACTION_TYPE {
    // 获取viewList
    GET_VIEW_LIST_SAGA = 'GET_VIEW_LIST_SAGA',
    // 更新viewList
    UPDATE_VIEW_LIST_ACTION = 'UPDATE_VIEW_LIST_ACTION',
    // 更新defaultView
    UPDATE_DEFAULT_VIEW_ACTION = 'UPDATE_DEFAULT_VIEW_ACTION',
    // 创建view
    CREATE_VIEW_SAGA = 'CREATE_VIEW_SAGA',
    // 获取view info
    GET_VIEW_INFO_SAGA = 'GET_VIEW_INFO_SAGA',
    // 更新view info
    UPDATE_VIEW_INFO_ACTION = 'UPDATE_VIEW_INFO_ACTION',
    // 删除视角
    DELETE_VIEW_SAGA = 'DELETE_VIEW_SAGA',
    // 视角重命名
    VIEW_RENAME_SAGA = 'VIEW_RENAME_SAGA',
    // 修改视角
    UPDATE_VIEW_SAGA = 'UPDATE_VIEW_SAGA',
    // 分享视角
    SHARE_VIEW_SAGA = 'SHARE_VIEW_SAGA',
    // 获取分享view
    GET_SHARE_VIEW_SAGA = 'GET_SHARE_VIEW_SAGA',
    // 更新通过分享获得的数据
    UPDATE_SHARE_DATA_ACTION = 'UPDATE_SHARE_DATA_ACTION',
}

/** 获取分享得到的数据参数 */
export interface GetShareDataType {
    view: {
        id: string;
        name: string;
        job: {
            id: string;
            name: string;
            data_proc: {
                id: string;
                name: string;
            };
            stages: {
                status: number;
                config: StageType[];
                temp_config: StageType[];
            };
        };
        config: {
            questions: ViewType[];
            marks: boolean;
            global: boolean;
        };
    };
    job_result: {
        stage: string;
        data: {
            global_vars: object;
            marks_count: object;
            options_count: {
                [key: string]: {
                    [key: string]: number;
                };
            };
        };
        g_vars: { description: string; name: string }[];
        v_vars: JobQuestionType[];
    }[];
}

/** 获取viewList参数 */
export interface GetViewListType {
    talent_group_id: string;
    job_id: string;
    callBack?: () => void;
}

/** 创建view参数 */
export interface CreateViewType {
    talent_group_id: string;
    job_id: string;
    name: string;
    questions: object;
    callBack?: () => void;
}

/** 获取view info参数 */
export interface GetViewInfoType {
    talent_group_id: string;
    view_id: string;
    callBack?: () => void;
}

/** 删除视角参数 */
export interface DeleteViewType {
    talent_group_id: string;
    view_id: string;
    callBack?: () => void;
}

/** 视角重命名参数 */
export interface ViewRenameType {
    talent_group_id: string;
    job_id: string;
    view_id: string;
    name: string;
    callBack?: () => void;
}

/** 修改视角参数 */
export interface UpdateViewType {
    talent_group_id: string;
    view_id: string;
    questions: object;
    callBack?: () => void;
}

/** 分享视角参数 */
export interface ShareViewType {
    talent_group_id: string;
    view_id: string;
    role_limit?: string[];
    callBack?: (res: { sign: string; random: string }) => void;
}

/** 获取分享view */
export interface GetShareViewType {
    talent_group_id?: string;
    view_id: string;
    sign: string;
    random: string;
    role_limit?: string[];
    callBack?: (res: GetShareDataType) => void;
}

/** 获取viewList */
export interface GetViewListSaga {
    type: ACTION_TYPE.GET_VIEW_LIST_SAGA;
    payload: GetViewListType;
}

/** 更新ViewList */
export interface UpdateViewListAction {
    type: ACTION_TYPE.UPDATE_VIEW_LIST_ACTION;
    payload: {
        isLoading: boolean;
        data: ViewListType[];
    };
}

/** 更新defaultView */
export interface UpdateDefaultViewAction {
    type: ACTION_TYPE.UPDATE_DEFAULT_VIEW_ACTION;
    payload: ViewType[];
}

/** 创建视角 */
export interface CreateViewSaga {
    type: ACTION_TYPE.CREATE_VIEW_SAGA;
    payload: CreateViewType;
}

/** 获取view info */
export interface GetViewInfoSage {
    type: ACTION_TYPE.GET_VIEW_INFO_SAGA;
    payload: GetViewInfoType;
}

/** 更新view info */
export interface UpdateViewInfoAction {
    type: ACTION_TYPE.UPDATE_VIEW_INFO_ACTION;
    payload: {
        id: string;
        question?: ViewType[];
        global?: boolean;
        marks?: boolean;
    };
}

/** 删除视角 */
export interface DeleteViewSaga {
    type: ACTION_TYPE.DELETE_VIEW_SAGA;
    payload: DeleteViewType;
}

/** 视角重命名 */
export interface ViewRenameSaga {
    type: ACTION_TYPE.VIEW_RENAME_SAGA;
    payload: ViewRenameType;
}

/** 修改视角 */
export interface UpdateViewSaga {
    type: ACTION_TYPE.UPDATE_VIEW_SAGA;
    payload: UpdateViewType;
}

/** 分享视角 */
export interface ShareViewSaga {
    type: ACTION_TYPE.SHARE_VIEW_SAGA;
    payload: ShareViewType;
}

/** 获取分享视角 */
export interface GetShareViewSaga {
    type: ACTION_TYPE.GET_SHARE_VIEW_SAGA;
    payload: GetShareViewType;
}

/** 更新分享到的数据 */
export interface UpdateShareDataAction {
    type: ACTION_TYPE.UPDATE_SHARE_DATA_ACTION;
    payload: ShareDataType;
}

export type JobViewTypes =
    | GetViewListSaga
    | UpdateViewListAction
    | UpdateDefaultViewAction
    | CreateViewSaga
    | GetViewInfoSage
    | UpdateViewInfoAction
    | DeleteViewSaga
    | ViewRenameSaga
    | UpdateViewSaga
    | ShareViewSaga
    | GetShareViewSaga
    | UpdateShareDataAction;
