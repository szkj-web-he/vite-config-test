import { errorNotice, commonNotice, successNotice, warningNotice } from '../../Utils/notice';
/**
 * @file
 * @date 2021-11-01
 * @author zhuxiaojiao
 * @lastModify zhuxiaojiao 2021-11-01
 */
import * as types from './types';
import * as actions from './actions';
import * as homePageApis from '~/Api/homePage';
import { AxiosResponse } from 'axios';
import { RootState } from '../rootReducer';
import { AjaxResponse } from '~/Api/login';
import { call, fork, put, select, takeLatest, delay } from 'redux-saga/effects';
import { APIResponse } from '~/Api/interceptor';
import { searchProjects } from '~/Api/project';

/* <------------------------------------ **** survey distribution START **** ------------------------------------ */
function* handleGetFileNumber(action: types.GetFileNumberSaga) {
    yield put(
        actions.updateFileNumberAction({
            fileNumber: {
                isLoading: true,
            },
        }),
    );
    const res: AjaxResponse = yield call(homePageApis.getFileNumber, action.payload);
    if (!res || res.status !== 200) {
        switch (res.data.code) {
            case 400001:
            case 400002:
                errorNotice({
                    code: res.data.code,
                    opera: 'DataProcessing.GetCount',
                });
                return;
            default:
                commonNotice(res.data.code);
                return;
        }
    }

    yield put(
        actions.updateFileNumberAction({
            fileNumber: {
                isLoading: false,
                data: res.data.data as types.FileNumberType,
            },
        }),
    );
}

function* handleGetSurveyDisAllData(action: types.GetDataProcAllDataSaga) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    // const { t } = useTranslation();
    // yield put(
    //     actions.updateDataProcAllAction({
    //         isLoading: true,
    //         data: {
    //             total_item: 0,
    //             distributions: [],
    //         },
    //     }),
    // );
    const { callback, ...data } = action.payload;
    const res: APIResponse<{ total: number; data_proc: types.DataProcessingListType[] }> =
        yield call(homePageApis.getDataProcessingData, data);
    if (!res || res.status !== 200) {
        switch (res.data.code) {
            case 400001:
                errorNotice({
                    code: res.data.code,
                    opera: 'DataProcessing.GetList',
                });
                return;
            default:
                commonNotice(res.data.code);
                return;
        }
    }
    console.log('bb', res.data.data);

    yield put(
        actions.updateDataProcAllAction({
            isLoading: false,
            ...res.data.data,
        }),
    );
    callback && callback();
}

function* handleGetSurveyDisNotBoundData(action: types.GetDataProcNotBoundSaga) {
    yield put(
        actions.updateDataProcNotBoundAction({
            isLoading: true,
            total: 0,
        }),
    );
    const { callback, ...data } = action.payload;
    const res: AxiosResponse<{
        code: number;
        message: string;
        data: {
            total: number;
            distributions: Array<types.DataProcessingListType>;
        };
    }> = yield call(homePageApis.getDataProcNotBoundData, data);
    if (!res || res.status !== 200) {
        switch (res.data.code) {
            case 400200:
                errorNotice({
                    code: res.data.code,
                    opera: 'DataProcessing.GetNotBoundList',
                });
                return;
            default:
                commonNotice(res.data.code);
                return;
        }
    }

    yield put(
        actions.updateDataProcNotBoundAction({
            isLoading: false,
            ...res.data.data,
        }),
    );
    callback && callback();
}

function* handleUpdateStarred(action: types.UpdatedStarredSaga) {
    const res: AxiosResponse<{
        code: number;
        message: string;
    }> = yield call(homePageApis.updatedStarred, action.payload);
    if (!res || res.status !== 200) {
        commonNotice(res.data.code);
        return;
    }
    successNotice({
        code: res.data.code,
        opera: 'DataProcessing.UpdateStarred',
    });
    const currentOrg = yield select((state: RootState) => state.organizationState.currentOrg.id);
    const role = yield select((state: RootState) => state.userState.userRole);
    yield put(
        actions.getFileNumberSaga({
            org_id: currentOrg,
            type: role,
        }),
    );
    yield put(
        actions.updateDataProcStarred({
            data_proc_id: action.payload.data_proc_id,
            star: action.payload.star,
        }),
    );
}

function* handleUpdateKeyWords(action: types.UpdateKeyWordsSaga) {
    const { keywords, data_proc_id } = action.payload;
    const res: AxiosResponse<{
        code: number;
        message: string;
    }> = yield call(homePageApis.updateKeyWords, action.payload);
    if (!res || res.status !== 200) {
        switch (res.data.code) {
            case 400001:
                errorNotice({
                    code: 400001,
                    opera: 'DataProcessing.Keywords',
                });
                return;

            default:
                commonNotice(res.data.code);
                return;
        }
    }
    yield put(
        actions.updateDataProcKeyword({
            data_proc_id,
            keywords,
        }),
    );
}

/** get match conditions distribution list */
function* handleGetMatchList(action: types.GetMatchListSaga) {
    const { name, project_name, keyword, project_id } = action.payload;
    const org_id = yield select((state: RootState) => state.organizationState.currentOrg.id);
    const tg_id = yield select((state: RootState) => state.organizationState.currentTalentGroupId);
    const { selectedCategory } = yield select((state: RootState) => state.homePage);
    const type = yield select((state: RootState) => state.userState.userRole);
    yield delay(500);
    let nameArr: string[] = [];
    if (name) {
        const res: AjaxResponse<{
            total: number;
            data_proc: types.DataProcessingListType[];
        }> = yield call(
            homePageApis.getDataProcessingData,

            {
                talent_group_id: tg_id,
                unbound: true,
                name,
            },
        );
        if (!res || res.status !== 200) {
            switch (res.data.code) {
                case 400001:
                    errorNotice({
                        code: res.data.code,
                        opera: 'DataProcessing.GetList',
                    });
                    return;
                default:
                    commonNotice(res.data.code);
                    return;
            }
        }
        let arr = res.data.data.data_proc;
        if (selectedCategory === 'Starred') {
            arr = res.data.data.data_proc?.filter((item) => {
                return item.starred === true;
            });
        } else if (selectedCategory === 'Project-related') {
            arr = res.data.data.data_proc?.filter((item) => {
                return item.project.id === project_id;
            });
        } else if (selectedCategory === 'Not Bound') {
            arr = res.data.data.data_proc?.filter((item) => {
                return item.role.length === 0;
            });
        }
        nameArr = arr?.map((item) => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            return item.name;
        });
    } else if (project_name) {
        const res: AjaxResponse<{ id: string; name: string }[]> = yield call(searchProjects, {
            org_id,
        });
        if (!res || res.status !== 200) {
            switch (res.data.code) {
                case 400003:
                    warningNotice({
                        code: 400003,
                        opera: 'Project.GetOrgProjs',
                    });
                    return;

                default:
                    errorNotice({
                        code: res.data.code,
                        opera: 'Project.GetOrgProjs',
                    });
                    return;
            }
        }
        nameArr = res.data.data?.filter((i) => i.name.includes(project_name))?.map((i) => i.name);
    } else if (keyword) {
        const res: AjaxResponse<{
            total: number;
            data_proc: types.DataProcessingListType[];
        }> = yield call(homePageApis.getDataProcessingData, {
            talent_group_id: tg_id,
            type,
            keyword,
        });
        if (!res || res.status !== 200) {
            switch (res.data.code) {
                case 400001:
                    errorNotice({
                        code: 400001,
                        opera: 'DataProcessing.Keywords',
                    });
                    return;

                default:
                    commonNotice(res.data.code);
                    return;
            }
        }
        nameArr = res.data.data.data_proc.map(() => keyword);
    }
    yield put(
        actions.updateMatchList({
            associateList: nameArr,
        }),
    );
}
function* watchHomePage() {
    yield takeLatest(types.ACTION_TYPE.GET_FILE_NUMBER_SAGA, handleGetFileNumber);
    yield takeLatest(types.ACTION_TYPE.GET_DATA_PROCESSING_ALL_SAGA, handleGetSurveyDisAllData);
    // yield takeLatest(types.ACTION_TYPE.SEARCH_DIS_PROJECT_SAGA, handleSearchDisByProjectData);
    yield takeLatest(
        types.ACTION_TYPE.GET_DATA_PROCESSING_NOT_BOUND_SAGA,
        handleGetSurveyDisNotBoundData,
    );
    yield takeLatest(types.ACTION_TYPE.UPDATE_STARRED_SAGA, handleUpdateStarred);
    yield takeLatest(types.ACTION_TYPE.UPDATE_KEY_WORDS_SAGA, handleUpdateKeyWords);
    yield takeLatest(types.ACTION_TYPE.GET_MATCH_LIST_SAGA, handleGetMatchList);
}
/* <------------------------------------ **** survey distribution END **** ------------------------------------ */

const HomePageSagas = [fork(watchHomePage)];

export default HomePageSagas;
