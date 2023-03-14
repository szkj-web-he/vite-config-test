import { errorNotice, commonNotice, successRightNotice } from '../../Utils/notice';
/**
 * @file
 * @date 2022-06-06
 * @author zhuxiaojixo
 * @lastModify zhuxiaojixo 2022-06-06
 */
import { call, fork, put, select, takeLatest } from 'redux-saga/effects';
import { APIResponse } from '~/Api/interceptor';
import * as preparationApi from '~/Api/preparation';
import { getUrlParamsObj } from '~/DefaultData/utils';
import * as actions from './actions';
import * as types from './types';
import { RootState } from '../rootReducer';
// 获取导航信息
function* handleGetNavData(action: types.GetNavDataSaga) {
    const { callback, ...data } = action.payload;
    const res: APIResponse<types.NavDataType> = yield call(preparationApi.getNavData, data);
    if (!res || res.status !== 200) {
        commonNotice(res.data.code);
        return;
    }
    yield put(
        actions.updateNavDataAction({
            navData: res.data.data,
        }),
    );
    callback && callback();
}
// 获取表单recruitment和 attachments
function* handelGetRecruitmentAndAttach(action: types.GetRecruitmentAndAttachSaga) {
    const { callback, ...data } = action.payload;
    const res: APIResponse<{
        recruitment: string;
        attachments: types.AttachmentsType[];
    }> = yield call(preparationApi.getRecruitmentAndAttach, data);
    if (!res || res.status !== 200) {
        commonNotice(res.data.code);
        return;
    }
    yield put(actions.updateRecruitmentAndAttachAction(res.data.data));
    callback && callback();
}
// 更新 recruitment Requirement
function* handelUpdateRecruitment(action: types.UpdateRecruitmentSaga) {
    const { callback, ...data } = action.payload;
    const res: APIResponse = yield call(preparationApi.updateRecruitment, data);
    if (!res || res.status !== 200) {
        commonNotice(res.data.code);
        return;
    }
    callback && callback();
}
// 上传文件
function* handleFileUpload(action: types.UploadFileSaga) {
    const { errorCallback, ...data } = action.payload;
    const response: APIResponse = yield call(preparationApi.uploadAttachment, data);
    if (!response || response.status !== 200) {
        errorCallback && errorCallback();
        switch (response.data.code) {
            case 400001:
            case 400002:
                errorNotice({
                    code: response.data.code,
                    opera: 'Attachment.Upload',
                });
                return;

            default:
                commonNotice(response.data.code);
                return;
        }
    }

    if (response.status === 200 && response.data.code === 200001) {
        const { dataProcId } = getUrlParamsObj<{ tgId: string; dataProcId: string }>(
            location.search,
        );
        const tgId = yield select((state: RootState) => state.preparation.selectedTg);
        yield put(
            actions.getRecruitmentAndAttachSaga({
                talent_group_id: tgId,
                data_proc_id: dataProcId,
            }),
        );
        successRightNotice({
            code: 200001,
            opera: 'Attachment.PostAttachment',
        });
    }
}
// 修改文件名
function* handleUpdateFileName(action: types.UpdateFileNameSaga) {
    const response: APIResponse = yield call(preparationApi.uploadAttachmentName, action.payload);
    if (!response || response.status !== 200) {
        switch (response.data.code) {
            case 400001:
                errorNotice({
                    code: response.data.code,
                    opera: 'Attachment.Rename',
                });
                return;

            default:
                commonNotice(response.data.code);
                return;
        }
    }
    const { dataProcId } = getUrlParamsObj<{ tgId: string; dataProcId: string }>(location.search);
    const tgId = yield select((state: RootState) => state.preparation.selectedTg);
    yield put(
        actions.getRecruitmentAndAttachSaga({
            talent_group_id: tgId,
            data_proc_id: dataProcId,
        }),
    );
}
// 删除文件
function* handleDeleteFile(action: types.DeleteFileSaga) {
    const response: APIResponse = yield call(preparationApi.deleteAttachment, action.payload);
    if (!response || response.status !== 200) {
        commonNotice(response.data.code);
        return;
    }

    if (response.data.code === 200001) {
        const { dataProcId } = getUrlParamsObj<{ tgId: string; dataProcId: string }>(
            location.search,
        );
        const tgId = yield select((state: RootState) => state.preparation.selectedTg);
        yield put(
            actions.getRecruitmentAndAttachSaga({
                talent_group_id: tgId,
                data_proc_id: dataProcId,
            }),
        );
    }
}
// 下载文件
function* handleDownloadFile(action: types.DownloadFileSaga) {
    const { file_name, ...data } = action.payload;
    const res: {
        status: number;
        data: Blob | { code: number; message: string };
    } = yield call(preparationApi.downloadAttachment, data);
    if (res && res.status === 200) {
        const arr = [file_name];
        const a = document.createElement('a');
        const url = window.URL.createObjectURL(res.data as Blob);
        a.href = url;
        a.download = arr[arr.length - 1];
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove();
    } else {
        const code = (res.data as { code: number; message: string })?.code;
        switch (code) {
            case 400001:
                errorNotice({
                    code: code,
                    opera: 'Attachment.Download',
                });
                return;

            default:
                commonNotice(code);
                return;
        }
    }
}

function* watchActions() {
    yield takeLatest(types.ACTION_TYPE.GET_NAV_DATA_SAGA, handleGetNavData);
    yield takeLatest(
        types.ACTION_TYPE.GET_RECRUITMENT_AND_ATTACHMENTS_SAGA,
        handelGetRecruitmentAndAttach,
    );
    yield takeLatest(types.ACTION_TYPE.UPDATE_RECRUITMENT_SAGA, handelUpdateRecruitment);
    yield takeLatest(types.ACTION_TYPE.UPLOAD_ATTACHMENTS_SAGA, handleFileUpload);
    yield takeLatest(types.ACTION_TYPE.UPDATE_ATTACHMENTS_NAME_SAGA, handleUpdateFileName);
    yield takeLatest(types.ACTION_TYPE.DELETE_ATTACHMENT_SAGA, handleDeleteFile);
    yield takeLatest(types.ACTION_TYPE.DOWNlOAD_ATTACHMENT_SAGA, handleDownloadFile);
}
const sagas = [fork(watchActions)];
export default sagas;
