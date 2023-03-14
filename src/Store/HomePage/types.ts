/**
 * @file
 * @date 2021-11-01
 * @author zhuxiaojiao
 * @lastModify zhuxiaojiao 2021-11-01
 */
export type FileNumberType = {
    all: number;
    project_related: number;
    starred: number;
    unbound: number;
};
export type SearchDistributionByNameType = {
    dri: string;
    name: string;
    organization_dri: string;
    organization_name: string;
    project_dri: string;
    project_name: string;
};
export type DataProcessingListType = {
    id: string;
    name: string;
    creator: {
        id: string;
        name: string;
    };
    starred: boolean;
    org: {
        id: string;
        name: string;
    };
    keywords: string[];
    project: {
        id: string;
        name: string;
    };
    updated_at: string;
    created_at: string;
    role: string[];
    getVersion: {
        isLoading: boolean;
        surveyVersion_list: Array<SurveyVersionType>;
    };
};
// export type SurveyDistributionType = {
//     total_item: number;
//     distributions: Array<SurveyDisListType>;
// };
export type CurrentSurveyDisType = {
    surveyDisList: Array<DataProcessingListType>;
    total: number;
    isLoading: boolean;
    distributionDetail_show?: boolean;
};
export interface SurveyVersionType {
    id: string;
    name: string;
    versions: {
        id: string;
        tag: number;
    }[];
}
export type ProjectListType = {
    id: string;
    name: string;
    keywords: string[];
    status: number;
    is_archived: boolean;
    is_starred: boolean;
    creator: {
        id: string;
        name: string;
    };
    created_at: string;
    is_admin: boolean;
    is_published: boolean;
};

export interface InitialStateType {
    selectedCategory: string;
    fileNumber: {
        isLoading: boolean;
        data?: FileNumberType;
    };
    getDataProcAllDataRequest: {
        isLoading: boolean;
        total: number;
        data_proc?: DataProcessingListType[];
    };
    getCurrentDataProcData: {
        isLoading: boolean;
        total: number;
        dataProcessing?: DataProcessingListType[];
    };
    getDataProcNotBoundDataRequest: {
        isLoading: boolean;
        total: number;
        data_processing?: DataProcessingListType[];
    };
    talentGroupForOpenWindow: Array<{
        talent_group_name: string;
        talent_group_dri: string;
    }>;
    associateList: string[];

    getOpenedDataProcessing: {
        isLoading: boolean;
        currDataProcessing?: DataProcessingListType;
    };
    language: string;
}

export enum ACTION_TYPE {
    // 更新 selectedCategory
    UPDATE_SELECTED_CATEGORY = 'UPDATE_SELECTED_CATEGORY',
    // 获取文件夹的数量
    GET_FILE_NUMBER_SAGA = 'GET_FILE_NUMBER_SAGA',
    UPDATE_FILE_NUMBER_ACTION = 'UPDATE_FILE_NUMBER_ACTION',
    // 获取 survey distribution 列表
    GET_DATA_PROCESSING_ALL_SAGA = 'GET_DATA_PROCESSING_ALL_SAGA',
    UPDATE_DATA_PROCESSING_ALL = 'UPDATE_DATA_PROCESSING_ALL',
    UPDATE_DATA_PROCESSING_PROJECT = 'UPDATE_DATA_PROCESSING_PROJECT',
    GET_DATA_PROCESSING_NOT_BOUND_SAGA = 'GET_DATA_PROCESSING_NOT_BOUND_SAGA',
    UPDATE_DATA_PROCESSING_NOT_BOUND = 'UPDATE_DATA_PROCESSING_NOT_BOUND',
    // SEARCH_DIS_PROJECT_SAGA = 'SEARCH_DIS_PROJECT_SAGA',
    // 获取 survey version list
    GET_DISTRIBUTION_VERSION_SAGA = 'GET_DISTRIBUTION_VERSION_SAGA',
    UPDATE_DISTRIBUTION_VERSION = 'UPDATE_DISTRIBUTION_VERSION',
    // 标星 与 取消标星
    UPDATE_STARRED_SAGA = 'UPDATE_STARRED_SAGA',
    // 修改 distribution starred
    UPDATE_DISTRIBUTION_STARRED = 'UPDATE_DISTRIBUTION_STARRED',
    // 添加 keywords
    UPDATE_KEY_WORDS_SAGA = 'UPDATE_KEY_WORDS_SAGA',
    // 修改 distribution keyword
    UPDATE_DISTRIBUTION_KEYWORDS = 'UPDATE_DISTRIBUTION_KEYWORDS',
    // 根据 keyword 获取 keywords list
    GET_KEYWORD_LIST_SAGA = 'GET_KEYWORD_LIST_SAGA',
    UPDATE_KEYWORD_LIST_ACTION = 'UPDATE_KEYWORD_LIST_ACTION',
    // 获取 project list
    GET_PROJECT_LIST_SAGA = 'GET_PROJECT_LIST_SAGA',
    UPDATE_PROJECT_LIST_ACTION = 'UPDATE_PROJECT_LIST_ACTION',
    /** 根据条件搜索 distribution */
    GET_MATCH_LIST_SAGA = 'GET_MATCH_LIST_SAGA',
    UPDATE_MATCH_LIST_ACTION = 'UPDATE_MATCH_LIST_ACTION',
    /** 当前打开的distribution详情 */
    UPDATE_OPENED_DISTRIBUTION = 'UPDATE_OPENED_DISTRIBUTION',
    /** 保存当前语言 */
    UPDATE_LANGUAGE_ACTION = 'UPDATE_LANGUAGE_ACTION',
}
export interface UpdateSelectedCategory {
    type: typeof ACTION_TYPE.UPDATE_SELECTED_CATEGORY;
    payload: {
        name: string;
    };
}
/* <------------------------------------ **** survey distribution START **** ------------------------------------ */
/**
 * get file number
 */
export interface GetFileNumberSaga {
    type: typeof ACTION_TYPE.GET_FILE_NUMBER_SAGA;
    payload: {
        org_id?: string;
        type: 'client' | 'supplier';
        talent_group_id?: string;
    };
}
export interface UpdateFileNumberAction {
    type: typeof ACTION_TYPE.UPDATE_FILE_NUMBER_ACTION;
    payload: {
        fileNumber: {
            isLoading: boolean;
            data?: FileNumberType;
        };
    };
}
// 获取distribution列表
export type sortType = 'ASC' | 'DESC';
export interface GetDataProcessingSagaType {
    talent_group_id?: string;
    org_id?: string;
    type?: string;
    offset?: number;
    limit?: number;
    project_name?: string;
    project_id?: string;
    starred?: boolean;
    name?: string;
    start?: string;
    end?: string;
    unbound?: boolean;
    keyword?: string;
    sort_updated?: sortType;
    sort_created?: sortType;
    sort_name?: sortType;
    callback?: () => void;
}

export interface GetDataProcAllDataSaga {
    type: typeof ACTION_TYPE.GET_DATA_PROCESSING_ALL_SAGA;
    payload: GetDataProcessingSagaType;
}
export interface UpdateDataProcALLAction {
    type: typeof ACTION_TYPE.UPDATE_DATA_PROCESSING_ALL;
    payload: {
        isLoading: boolean;
        total: number;
        data_proc?: DataProcessingListType[];
    };
}

export interface GetDataProcNotBoundSaga {
    type: typeof ACTION_TYPE.GET_DATA_PROCESSING_NOT_BOUND_SAGA;
    payload: {
        org_id: string;
        name?: string;
        start?: string;
        end?: string;
        offset?: number;
        limit?: number;
        sort_updated?: sortType;
        sort_created?: sortType;
        sort_name?: sortType;
        callback?: () => void;
    };
}
export interface UpdateDataProcNotBoundAction {
    type: typeof ACTION_TYPE.UPDATE_DATA_PROCESSING_NOT_BOUND;
    payload: {
        isLoading: boolean;
        total: number;
        data_proc?: DataProcessingListType[];
    };
}

/**
 * get survey version list
 */
export interface GetDistributionVersionAction {
    type: ACTION_TYPE.GET_DISTRIBUTION_VERSION_SAGA;
    payload: {
        tg_id: string;
        distribution: string;
    };
}
export interface UpdateDistributionVersionAction {
    type: ACTION_TYPE.UPDATE_DISTRIBUTION_VERSION;
    payload: {
        isLoading: boolean;
        distribution: string;
        survey_versions: SurveyVersionType[];
    };
}

export interface UpdatedStarredSaga {
    type: typeof ACTION_TYPE.UPDATE_STARRED_SAGA;
    payload: {
        talent_group_id: string;
        data_proc_id: string;
        star: boolean;
    };
}
export interface UpdateDataProcessingStarred {
    type: typeof ACTION_TYPE.UPDATE_DISTRIBUTION_STARRED;
    payload: {
        data_proc_id: string;
        star: boolean;
    };
}

/** add keyword */
export interface UpdateKeyWordsSaga {
    type: typeof ACTION_TYPE.UPDATE_KEY_WORDS_SAGA;
    payload: {
        talent_group_id: string;
        data_proc_id: string;
        keywords: string[];
        // callback?: () => void;
    };
}
export interface UpdateDataProcessingKeyword {
    type: typeof ACTION_TYPE.UPDATE_DISTRIBUTION_KEYWORDS;
    payload: {
        data_proc_id: string;
        keywords: Array<string>;
    };
}

/** get match conditions distribution list */
export interface GetMatchListSaga {
    type: typeof ACTION_TYPE.GET_MATCH_LIST_SAGA;
    payload: {
        project_name?: string;
        keyword?: string;
        name?: string;
        project_id?: string;
    };
}
export interface UpdateMatchListAction {
    type: typeof ACTION_TYPE.UPDATE_MATCH_LIST_ACTION;
    payload: {
        associateList: string[];
    };
}

export interface UpdateCurrDataProcessing {
    type: typeof ACTION_TYPE.UPDATE_OPENED_DISTRIBUTION;
    payload: {
        getOpenedDataProcessing: {
            isLoading: boolean;
            currDistribution?: DataProcessingListType;
        };
    };
}

/** 保存当前语言 */
export interface UpdateLanguageAction {
    type: typeof ACTION_TYPE.UPDATE_LANGUAGE_ACTION;
    payload: {
        language: string;
    };
}
/* <------------------------------------ **** survey distribution END **** ------------------------------------ */

export type ActionsType =
    | UpdateSelectedCategory
    | GetFileNumberSaga
    | UpdateFileNumberAction
    // | SearchDisByProjectCategory
    | GetDataProcAllDataSaga
    | UpdateDataProcALLAction
    | GetDataProcNotBoundSaga
    | UpdateDataProcNotBoundAction
    | GetDistributionVersionAction
    | UpdateDistributionVersionAction
    | UpdatedStarredSaga
    | UpdateDataProcessingStarred
    | UpdateKeyWordsSaga
    | UpdateDataProcessingKeyword
    | GetMatchListSaga
    | UpdateMatchListAction
    | UpdateCurrDataProcessing
    | UpdateLanguageAction;
