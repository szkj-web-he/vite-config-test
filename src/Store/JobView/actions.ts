/**
 * @file
 * @date 2022-09-23
 * @author liaoli
 * @lastModify liaoli 2022-09-23
 */

import * as types from './types';

/** 获取viewList */
export const getViewListSaga = (payload: types.GetViewListType): types.GetViewListSaga => {
    return {
        type: types.ACTION_TYPE.GET_VIEW_LIST_SAGA,
        payload,
    };
};

/** 更新viewList */
export const updateViewListAction = (payload: {
    isLoading: boolean;
    data: types.ViewListType[];
}): types.UpdateViewListAction => {
    return {
        type: types.ACTION_TYPE.UPDATE_VIEW_LIST_ACTION,
        payload,
    };
};

/** 更新默认view */
export const updateDefaultViewAction = (
    payload: types.ViewType[],
): types.UpdateDefaultViewAction => {
    return {
        type: types.ACTION_TYPE.UPDATE_DEFAULT_VIEW_ACTION,
        payload,
    };
};

/** 创建视角 */
export const createViewSaga = (payload: types.CreateViewType): types.CreateViewSaga => {
    return {
        type: types.ACTION_TYPE.CREATE_VIEW_SAGA,
        payload,
    };
};

/** 获取view info */
export const getViewInfoSaga = (payload: types.GetViewInfoType): types.GetViewInfoSage => {
    return {
        type: types.ACTION_TYPE.GET_VIEW_INFO_SAGA,
        payload,
    };
};

/** 更新view info */
export const updateViewInfoAction = (payload: {
    id: string;
    question?: types.ViewType[];
    global?: boolean;
    marks?: boolean;
}): types.UpdateViewInfoAction => {
    return {
        type: types.ACTION_TYPE.UPDATE_VIEW_INFO_ACTION,
        payload,
    };
};

/** 删除视角 */
export const deleteViewSaga = (payload: types.DeleteViewType): types.DeleteViewSaga => {
    return {
        type: types.ACTION_TYPE.DELETE_VIEW_SAGA,
        payload,
    };
};

/** 视角重命名 */
export const viewRenameSaga = (payload: types.ViewRenameType): types.ViewRenameSaga => {
    return {
        type: types.ACTION_TYPE.VIEW_RENAME_SAGA,
        payload,
    };
};

/** 修改视角 */
export const updateViewSaga = (payload: types.UpdateViewType): types.UpdateViewSaga => {
    return {
        type: types.ACTION_TYPE.UPDATE_VIEW_SAGA,
        payload,
    };
};

/** 分享视角 */
export const shareViewSaga = (payload: types.ShareViewType): types.ShareViewSaga => {
    return {
        type: types.ACTION_TYPE.SHARE_VIEW_SAGA,
        payload,
    };
};

/** 获取分享view */
export const getShareViewSaga = (payload: types.GetShareViewType): types.GetShareViewSaga => {
    return {
        type: types.ACTION_TYPE.GET_SHARE_VIEW_SAGA,
        payload,
    };
};

/** 更新分享到的数据 */
export const updateShareDataAction = (
    payload: types.ShareDataType,
): types.UpdateShareDataAction => {
    return {
        type: types.ACTION_TYPE.UPDATE_SHARE_DATA_ACTION,
        payload,
    };
};
