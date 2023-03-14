/**
 * @file
 * @date 2022-11-09
 * @author liaoli
 * @lastModify liaoli 2022-11-09
 */

import { fork, call, put, takeLatest, debounce } from 'redux-saga/effects';
import { APIResponse } from '~/Api/interceptor';
import * as jobListApi from '~/Api/jobStage';
import * as actions from './actions';
import * as types from './types';
import store from '~/Store/rootStore';
import { commonNotice, errorNotice } from '~/Utils/notice';

/** 获取job stage */
function* handleGetJobStage(action: types.getJobStageSaga) {
    const { callback, ...data } = action.payload;
    const res: APIResponse<{
        status: number;
        config: types.StageType[];
        temp_config: types.StageType[];
    } | null> = yield call(jobListApi.getJobStage, data);

    if (!res || res.status !== 200) {
        switch (res.data.code) {
            case 400001:
                errorNotice({
                    code: res.data.code,
                    opera: 'Stage.StageConfig',
                });
                return;
            default:
                commonNotice(res.data.code);
                return;
        }
    }

    if (res.data.data === null) {
        yield put(actions.updatePublishStageAction([]));
        yield put(
            actions.updateJobStageAction({
                status: -1,
                config: [],
            }),
        );
    }

    if (res.data.data) {
        yield put(actions.updatePublishStageAction(res.data.data.config || []));
        yield put(
            actions.updateJobStageAction({
                status: res.data.data.status,
                config: res.data.data.temp_config || [],
            }),
        );
    }
    callback && callback(res);
}

/** 更新job stage */
function* handleUpdateJobStage(action: types.updateJobStageSage) {
    const { callback, ...data } = action.payload;

    yield put(actions.updateJobStageAction(data.stages));

    // yield useSelector((state:RootState)=>state.jobStage.getPublishStage)
    const state = store.getState();
    const publishStage = state.jobStage.getPublishStage;

    const res: APIResponse = yield call(jobListApi.updateJobStage, {
        job_id: data.job_id,
        talent_group_id: data.talent_group_id,
        stages: {
            status: data.stages.status,
            temp_config: data.stages.config,
            config: data.stages.status === 2 ? data.stages.config : publishStage,
        },
    });
    if (!res || res.status !== 200) {
        switch (res.data.code) {
            case 400001:
                errorNotice({
                    code: res.data.code,
                    opera: 'Stage.StageConfig',
                });
                return;
            default:
                commonNotice(res.data.code);
                return;
        }
    }
    yield put(
        actions.getJobStageSage({ job_id: data.job_id, talent_group_id: data.talent_group_id }),
    );
    callback && callback();
}

function* watchActions() {
    yield takeLatest(types.ACTION_TYPE.GET_JOB_STAGE_SAGA, handleGetJobStage);
    yield debounce(500, types.ACTION_TYPE.UPDATE_JOB_STAGE_SAGA, handleUpdateJobStage);
}

const sagas = [fork(watchActions)];
export default sagas;
