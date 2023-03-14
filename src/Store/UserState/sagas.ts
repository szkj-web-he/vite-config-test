/**
 * @file
 * @date 2021-10-16
 * @author zhoubin
 * @lastModify zhoubin 2021-10-16
 */
// import { AjaxResponse, getOrgInfo } from '~/Api/login';
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import { call, fork, put, takeLatest } from "redux-saga/effects";
import { APIResponse } from "~/Api/interceptor";
import { getUserInfo } from "~/Api/login";
import { updateUserInfo } from "./actions";
import { getOrganizationListSaga } from "../OrganizationState/actions";
import * as types from "./types";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */

/** get userInfo */
function* handleGetUserInfo() {
    // get response
    const res: APIResponse<{ user: types.UserInfoType }> = yield call(getUserInfo);
    if (res.status === 200) {
        yield put(updateUserInfo({ userInfo: res.data.data.user }));
        yield put(getOrganizationListSaga());
    }
}

function* watchActions() {
    yield takeLatest(types.ACTION_TYPE.GET_USER_INFO, handleGetUserInfo);
}

const sagas = [fork(watchActions)];
export default sagas;
