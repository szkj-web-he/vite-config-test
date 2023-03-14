/**
 * @file project saga
 * @date 2021-11-04
 * @author zhoubin
 * @lastModify zhoubin 2021-11-04
 */
import { AjaxResponse } from "~/Api/login";
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import { fork, takeLatest, call, put } from "redux-saga/effects";
import * as types from "./types";
// import * as homeTypes from '../HomePage/types';
import { getProjects } from "~/Api/project";
import * as actions from "./actions";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */

/**
 * get projects
 */
function* handleGetProjects(action: types.GetProjectsSaga) {
    const { callback, ...data } = action.payload;
    const res: AjaxResponse<types.ProjectType[]> = yield call(getProjects, data);
    if (res.status !== 200) {
        return;
    }

    yield put(actions.updateProjectsAction(res.data.data));
    if (res.data.data.length > 0) {
        yield put(actions.updateProjectAction(res.data.data[0]));
    } else {
        callback && callback();
    }
}
function* watchActions() {
    yield takeLatest(types.ACTION_TYPE.GET_PROJECTS, handleGetProjects);
}

const sagas = [fork(watchActions)];
export default sagas;
