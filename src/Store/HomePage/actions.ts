/**
 * @file
 * @date 2021-11-01
 * @author zhuxiaojiao
 * @lastModify zhuxiaojiao 2021-11-01
 */
import * as types from './types';

/* <------------------------------------ **** selected category START **** ------------------------------------ */
export const updateSelectedCategoryAction = (payload: { name: string }): types.ActionsType => ({
    type: types.ACTION_TYPE.UPDATE_SELECTED_CATEGORY,
    payload,
});
/* <------------------------------------ **** selected category END **** ------------------------------------ */

/* <------------------------------------ **** survey distribution START **** ------------------------------------ */
/**
 * get file number
 */
export const getFileNumberSaga = (payload: {
    org_id?: string;
    type: 'client' | 'supplier';
    talent_group_id?: string;
}): types.ActionsType => ({
    type: types.ACTION_TYPE.GET_FILE_NUMBER_SAGA,
    payload,
});
export const updateFileNumberAction = (payload: {
    fileNumber: {
        isLoading: boolean;
        data?: types.FileNumberType;
    };
}): types.ActionsType => ({
    type: types.ACTION_TYPE.UPDATE_FILE_NUMBER_ACTION,
    payload,
});

export const getDataProcAllDataSaga = (
    payload: types.GetDataProcessingSagaType,
): types.ActionsType => ({
    type: types.ACTION_TYPE.GET_DATA_PROCESSING_ALL_SAGA,
    payload,
});
export const updateDataProcAllAction = (payload: {
    isLoading: boolean;
    total: number;
    data_proc?: types.DataProcessingListType[];
}): types.ActionsType => ({
    type: types.ACTION_TYPE.UPDATE_DATA_PROCESSING_ALL,
    payload,
});
export const getDataProcNotBoundDataSaga = (payload: {
    org_id: string;
    name?: string;
    start?: string;
    end?: string;
    offset?: number;
    limit?: number;
    sort_updated?: types.sortType;
    sort_created?: types.sortType;
    sort_name?: types.sortType;
    callback?: () => void;
}): types.ActionsType => ({
    type: types.ACTION_TYPE.GET_DATA_PROCESSING_NOT_BOUND_SAGA,
    payload,
});
export const updateDataProcNotBoundAction = (payload: {
    isLoading: boolean;
    total: number;
    data_proc?: types.DataProcessingListType[];
}): types.ActionsType => ({
    type: types.ACTION_TYPE.UPDATE_DATA_PROCESSING_NOT_BOUND,
    payload,
});

/**
 * get survey version list
 */
/**
 * get distribution version action
 */
export const getDistributionVersion = (payload: {
    tg_id: string;
    distribution: string;
}): types.ActionsType => {
    return {
        type: types.ACTION_TYPE.GET_DISTRIBUTION_VERSION_SAGA,
        payload,
    };
};
export const updateDistributionVersion = (payload: {
    isLoading: boolean;
    distribution: string;
    survey_versions: types.SurveyVersionType[];
}): types.ActionsType => {
    return {
        type: types.ACTION_TYPE.UPDATE_DISTRIBUTION_VERSION,
        payload,
    };
};

export const updateStarredSaga = (payload: {
    talent_group_id: string;
    data_proc_id: string;
    star: boolean;
}): types.ActionsType => ({
    type: types.ACTION_TYPE.UPDATE_STARRED_SAGA,
    payload,
});
export const updateDataProcStarred = (payload: {
    data_proc_id: string;
    star: boolean;
}): types.ActionsType => ({
    type: types.ACTION_TYPE.UPDATE_DISTRIBUTION_STARRED,
    payload,
});

/** add keyword */
export const updateKeyWordsSaga = (payload: {
    talent_group_id: string;
    data_proc_id: string;
    keywords: string[];
    // callback?: () => void;
}): types.ActionsType => {
    return {
        type: types.ACTION_TYPE.UPDATE_KEY_WORDS_SAGA,
        payload,
    };
};
export const updateDataProcKeyword = (payload: {
    data_proc_id: string;
    keywords: Array<string>;
}): types.ActionsType => {
    return {
        type: types.ACTION_TYPE.UPDATE_DISTRIBUTION_KEYWORDS,
        payload,
    };
};

/** get match conditions distribution list */
export const getMatchList = (payload: {
    project_name?: string;
    keyword?: string;
    name?: string;
    project_id?: string;
}): types.ActionsType => ({
    type: types.ACTION_TYPE.GET_MATCH_LIST_SAGA,
    payload,
});
export const updateMatchList = (payload: { associateList: string[] }): types.ActionsType => ({
    type: types.ACTION_TYPE.UPDATE_MATCH_LIST_ACTION,
    payload,
});

export const updateCurrDataProc = (payload: {
    getOpenedDataProcessing: {
        isLoading: boolean;
        currDataProcessing?: types.DataProcessingListType;
    };
}): types.ActionsType => ({
    type: types.ACTION_TYPE.UPDATE_OPENED_DISTRIBUTION,
    payload,
});

/** 保存当前语言 */
export const updateLanguageAction = (payload: { language: string }): types.ActionsType => ({
    type: types.ACTION_TYPE.UPDATE_LANGUAGE_ACTION,
    payload,
});
/* <------------------------------------ **** survey distribution END **** ------------------------------------ */
