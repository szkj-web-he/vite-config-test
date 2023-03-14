/**
 * @file
 * @date 2022-09-23
 * @author liaoli
 * @lastModify liaoli 2022-09-23
 */
import { fork, call, put, takeLatest } from 'redux-saga/effects';
import { APIResponse } from '~/Api/interceptor';
import { commonNotice, errorNotice } from '~/Utils/notice';
import * as jobView from '~/Api/jobView';
import * as actions from './actions';
import * as types from './types';

/** 获取viewList */
function* handleGetViewList(action: types.GetViewListSaga) {
    const { callBack, ...data } = action.payload;
    const res: APIResponse<{ views: types.ViewListType[] }> = yield call(jobView.getViewList, data);
    if (res.status !== 200) {
        switch (res.data.code) {
            default:
                commonNotice(res.data.code);
                return;
        }
    }
    callBack && callBack();

    yield put(
        actions.updateViewListAction({
            isLoading: false,
            data: res.data.data.views,
        }),
    );
}

/** 创建view */
function* handleCreateView(action: types.CreateViewSaga) {
    const { callBack, ...data } = action.payload;
    const res: APIResponse<{ view_id: string }> = yield call(jobView.createView, data);
    if (!res || res.status !== 200) {
        switch (res.data.code) {
            case 400001:
                errorNotice({
                    code: res.data.code,
                    opera: 'View.CreateView',
                });
                return;
            default:
                commonNotice(res.data.code);
                return;
        }
    }
    callBack && callBack();
}

/** 获取view info */
function* handleGetViewInfo(action: types.GetViewInfoSage) {
    const { callBack, ...data } = action.payload;
    const res: APIResponse<{
        view_id: string;
        name: string;
        config: { questions: types.ViewType[]; global: boolean; marks: boolean };
    }> = yield call(jobView.getViewInfo, data);
    if (!res || res.status !== 200) {
        switch (res.data.code) {
            case 400001:
                errorNotice({
                    code: res.data.code,
                    opera: 'View.ViewInfo',
                });
                return;
            default:
                commonNotice(res.data.code);
                return;
        }
    }
    callBack && callBack();

    const { questions, marks, global } = res.data.data.config;

    yield put(
        actions.updateViewInfoAction({
            id: res.data.data.view_id,
            question: questions,
            global,
            marks,
        }),
    );
}

/** 删除视角 */
function* handleDeleteView(action: types.DeleteViewSaga) {
    const { callBack, ...data } = action.payload;
    const res: APIResponse = yield call(jobView.deleteView, data);
    if (!res || res.status !== 200) {
        commonNotice(res.data.code);
        return;
    }
    callBack && callBack();
}

/** 视角重命名 */
function* handleViewRename(action: types.ViewRenameSaga) {
    const { callBack, ...data } = action.payload;
    const res: APIResponse = yield call(jobView.viewRename, data);
    if (!res || res.status !== 200) {
        switch (res.data.code) {
            case 400001:
                errorNotice({
                    code: res.data.code,
                    opera: 'View.ViewReName',
                });
                return;
            default:
                commonNotice(res.data.code);
                return;
        }
    }
    callBack && callBack();
}

/** 修改视角 */
function* handleUpdateView(action: types.UpdateViewSaga) {
    const { callBack, ...data } = action.payload;
    const res: APIResponse = yield call(jobView.updateView, data);

    if (!res || res.status !== 200) {
        commonNotice(res.data.code);
        return;
    }
    callBack && callBack();
}

/** 分享视角 */
function* handleShareView(action: types.ShareViewSaga) {
    const { callBack, ...data } = action.payload;
    const res: APIResponse<{ sign: string; random: string }> = yield call(jobView.shareView, data);

    if (!res || res.status !== 200) {
        commonNotice(res.data.code);
        return;
    }
    callBack && callBack(res.data.data);
}

/** 获取分享view */
function* handleGetShareView(action: types.GetShareViewSaga) {
    const { callBack, ...data } = action.payload;
    const res: APIResponse<types.GetShareDataType> = yield call(jobView.getShareView, data);

    if (!res || res.status !== 200) {
        switch (res.data.code) {
            case 400001:
            case 400002:
            case 401001:
            case 403001:
                errorNotice({
                    code: res.data.code,
                    opera: 'View.ShareView',
                });
                return;
            default:
                commonNotice(res.data.code);
                return;
        }
    }
    callBack && callBack(res.data.data);
}

function* watchActions() {
    yield takeLatest(types.ACTION_TYPE.GET_VIEW_LIST_SAGA, handleGetViewList);
    yield takeLatest(types.ACTION_TYPE.CREATE_VIEW_SAGA, handleCreateView);
    yield takeLatest(types.ACTION_TYPE.GET_VIEW_INFO_SAGA, handleGetViewInfo);
    yield takeLatest(types.ACTION_TYPE.DELETE_VIEW_SAGA, handleDeleteView);
    yield takeLatest(types.ACTION_TYPE.VIEW_RENAME_SAGA, handleViewRename);
    yield takeLatest(types.ACTION_TYPE.UPDATE_VIEW_SAGA, handleUpdateView);
    yield takeLatest(types.ACTION_TYPE.SHARE_VIEW_SAGA, handleShareView);
    yield takeLatest(types.ACTION_TYPE.GET_SHARE_VIEW_SAGA, handleGetShareView);
}

const sagas = [fork(watchActions)];
export default sagas;
