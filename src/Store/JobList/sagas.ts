/**
 * @file
 * @date 2022-09-15
 * @author liaoli
 * @lastModify liaoli 2022-09-15
 */
import { fork, call, put, takeLatest, takeEvery, select } from 'redux-saga/effects';
import { APIResponse } from '~/Api/interceptor';
import {
    commonNotice,
    errorNotice,
    infoNotice,
    successNotice,
    warningNotice,
} from '~/Utils/notice';
import * as jobListApi from '~/Api/jobList';
import * as actions from './actions';
import * as types from './types';
import { Questionnaire } from '@possie-engine/dr_front_surveyconfig';
import { QList } from '~/Utils/loopNodeUtils';
import { QExport } from '~/Utils/loopNodeUtils/export';
import { RootState } from '../rootReducer';
import { StageType } from '../JobStage/types';

/** 获取全部的job */
function* handleGetJobList(action: types.GetJobListSaga) {
    const { callback, ...data } = action.payload;
    const res: APIResponse<types.JobListType[]> = yield call(jobListApi.getJobList, data);

    if (!res || res.status !== 200) {
        switch (res.data.code) {
            case 400230:
                errorNotice({
                    code: res.data.code,
                    opera: 'JobList.GetJobs',
                });
                return;
            case 403230:
                infoNotice({
                    code: res.data.code,
                    opera: 'JobList.GetJobs',
                });
                return;
            default:
                commonNotice(res.data.code);
                return;
        }
    }

    callback && callback(res.data.data);
    if (data.fetch_archived) {
        yield put(
            actions.updateArchiveJobListAction({
                isLoading: false,
                data: res.data.data,
            }),
        );
    } else {
        yield put(
            actions.updateJobListAction({
                isLoading: false,
                data: res.data.data,
            }),
        );
    }
}

/** 修改job的名字或描述 */
function* handleUpdateJob(action: types.UpdateJobSaga) {
    const { callback, ...data } = action.payload;
    const res: APIResponse = yield call(jobListApi.updateJob, data);

    if (!res || res.status !== 200) {
        switch (res.data.code) {
            case 400001:
                warningNotice({
                    code: res.data.code,
                    opera: 'JobList.UpdateJob',
                });
                return;
            default:
                commonNotice(res.data.code);
                return;
        }
    }

    callback && callback(res.data);
    if (data.job_new_data.name) {
        yield put(
            actions.updateJobNameAction({
                job_id: data.job_id,
                name: data.job_new_data.name,
            }),
        );
    } else {
        yield put(
            actions.updateJobDescAction({
                job_id: data.job_id,
                description:
                    data.job_new_data.description || JSON.stringify([{ children: [{ text: '' }] }]),
            }),
        );
    }
}

/** 修改job刷新时间 */
function* handleUpdateJobReTime(action: types.UpdateJobReTimeSaga) {
    const { callback, ...data } = action.payload;
    const res: APIResponse = yield call(jobListApi.updateJobReTime, data);
    if (!res || res.status !== 200) {
        switch (res.data.code) {
            case 400001:
                warningNotice({
                    code: res.data.code,
                    opera: 'JobList.RefreshJob',
                });
                return;
            default:
                commonNotice(res.data.code);
                return;
        }
    }

    yield put(
        actions.updateJobReTimeAction({
            job_id: data.job_id,
            refresh_interval: data.interval,
        }),
    );

    callback && callback();
}

/** 获取绑定的表单及版本 */
function* handleGetSurveyList(action: types.GetSurveyListSaga) {
    const { callback, ...data } = action.payload;
    const res: APIResponse<{ questionnaire_list: types.SurveyListType[] }> = yield call(
        jobListApi.getSurveyList,
        data,
    );
    if (!res || res.status !== 200) {
        switch (res.data.code) {
            case 400001:
            case 400200:
                errorNotice({
                    code: res.data.code,
                    opera: 'JobList.SurveyList',
                });
                return;
            default:
                commonNotice(res.data.code);
                return;
        }
    }

    yield put(actions.updateSurveyListAction(res.data.data.questionnaire_list));
    callback && callback();
}

/** 创建job */
function* handleCreateJob(action: types.CreateJobSaga) {
    const { callback, ...data } = action.payload;
    const res: APIResponse<{ new_job_id: string }> = yield call(jobListApi.createJob, data);

    if (!res || res.status !== 200) {
        switch (res.data.code) {
            case 400001:
                errorNotice({
                    code: res.data.code,
                    opera: 'JobList.CreateJob',
                });
                return;
            case 400002:
                warningNotice({
                    code: res.data.code,
                    opera: 'JobList.CreateJob',
                });
                return;
            case 400003:
                infoNotice({
                    code: res.data.code,
                    opera: 'JobList.CreateJob',
                });
                return;
            default:
                commonNotice(res.data.code);
                return;
        }
    }

    successNotice({
        code: 200001,
        opera: 'JobList.CreateJob',
    });

    callback && callback();
}

/** 归档job */
function* handleArchivedJob(action: types.ArchivedJobSaga) {
    const { callback, ...data } = action.payload;
    const res: APIResponse = yield call(jobListApi.archiveJob, data);
    if (!res || res.status !== 200) {
        switch (res.data.code) {
            case 400001:
                warningNotice({
                    code: res.data.code,
                    opera: 'JobList.ArchiveJob',
                });
                return;
            default:
                commonNotice(res.data.code);
                return;
        }
    }

    callback && callback();
}

/** 恢复归档job */
function* handleRestoreArchivedJob(action: types.RestoreArchivedJobSaga) {
    const { callback, ...data } = action.payload;
    const res: APIResponse = yield call(jobListApi.restoreArchivedJob, data);
    if (!res || res.status !== 200) {
        switch (res.data.code) {
            case 400001:
                warningNotice({
                    code: res.data.code,
                    opera: 'JobList.ArchiveJob',
                });
                return;
            default:
                commonNotice(res.data.code);
                return;
        }
    }
    callback && callback();
}

/** 导出job */
function* handleExportJob(action: types.ExportJobTypeSaga) {
    const { callback, ...data } = action.payload;
    const res: { status: number; data: string | { code: number; message: string } } = yield call(
        jobListApi.exportJob,
        data,
    );

    const code = (res.data as { code: number; message: string })?.code;

    if ((!res || res.status !== 200) && code) {
        switch (code) {
            case 404001:
                infoNotice({
                    code: code,
                    opera: 'JobList.ExportJob',
                });
                return;
            default:
                commonNotice(code);
                return;
        }
    }
    callback && callback(res.data as string);
}

/** 获取job问题&变量 */
function* handleGetJobQuestion(action: types.GetJobQuestionSaga) {
    const { callback, isExport, ...data } = action.payload;
    // const res: APIResponse<types.JobQuestionType[]> = yield call(jobListApi.getJobQuestion, data);
    const res: APIResponse<Questionnaire> = yield call(jobListApi.getSurveyConf, data);
    const publishStage: StageType[] = yield select(
        (state: RootState) => state.jobStage.getPublishStage,
    );
    if (!res || res.status !== 200) {
        switch (res.data.code) {
            case 400001:
                warningNotice({
                    code: res.data.code,
                    opera: 'JobList.QuestionAndVal',
                });
                return;
            default:
                commonNotice(res.data.code);
                return;
        }
    }
    let list: (types.JobQuestionExportType | types.JobQuestionType)[] = [];

    if (isExport) {
        list = new QExport(res.data.data).nodes as unknown as types.JobQuestionExportType[];
    } else {
        list = new QList(res.data.data).nodes as unknown as types.JobQuestionType[];
    }
    // 被访者变量
    const rVar: types.JobQuestionType[] = [];

    if (publishStage[0] && publishStage[0].r_vars) {
        publishStage[0].r_vars.forEach((item) => {
            rVar.push({ ...item, q_text: [item.q_text], is_extra: true, is_loop: false });
        });
    }
    list.push(...rVar);

    callback && callback(list as types.JobQuestionType[]);
}

/** 获取job result */
function* handleGetJobResult(action: types.GetJobResultSaga) {
    const { callback, ...data } = action.payload;
    const res: APIResponse<types.JobResultType[]> = yield call(jobListApi.getJobResult, data);
    if (!res || res.status !== 200) {
        switch (res.data.code) {
            case 404001:
                console.log('无表单数据');
                return;
            default:
                commonNotice(res.data.code);
                return;
        }
    }
    callback && callback();

    yield put(actions.updateJobResultAction(res.data.data));
}

function* watchActions() {
    yield takeEvery(types.ACTION_TYPE.GET_JOB_LIST_SAGA, handleGetJobList);
    yield takeLatest(types.ACTION_TYPE.UPDATE_JOB_SAGA, handleUpdateJob);
    yield takeLatest(types.ACTION_TYPE.UPDATE_JOB_REFRESH_TIME_SAGA, handleUpdateJobReTime);
    yield takeLatest(types.ACTION_TYPE.GET_SURVEY_LIST_SAGA, handleGetSurveyList);
    yield takeLatest(types.ACTION_TYPE.CREATE_JOB_SAGA, handleCreateJob);
    yield takeLatest(types.ACTION_TYPE.ARCHIVED_JOB_SAGA, handleArchivedJob);
    yield takeLatest(types.ACTION_TYPE.RESTORE_ARCHIVED_JOB_SAGA, handleRestoreArchivedJob);
    yield takeLatest(types.ACTION_TYPE.EXPORT_JOB_SAGA, handleExportJob);
    yield takeLatest(types.ACTION_TYPE.GET_JOB_QUESTION_SAGA, handleGetJobQuestion);
    yield takeLatest(types.ACTION_TYPE.GET_JOB_RESULT_SAGA, handleGetJobResult);
}

const sagas = [fork(watchActions)];
export default sagas;
