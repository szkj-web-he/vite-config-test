/**
 * @file
 * @date 2021-11-01
 * @author zhuxiaojiao
 * @lastModify zhuxiaojiao 2021-11-01
 */

import * as types from './types';

const InitialState: types.InitialStateType = {
    selectedCategory: 'All',
    fileNumber: {
        isLoading: true,
    },
    getDataProcAllDataRequest: {
        isLoading: true,
        total: 0,
    },
    getCurrentDataProcData: {
        isLoading: true,
        total: 0,
        // distributionDetail_show: false,
    },
    getDataProcNotBoundDataRequest: {
        isLoading: true,
        total: 0,
    },

    talentGroupForOpenWindow: [],

    associateList: [],
    getOpenedDataProcessing: {
        isLoading: true,
    },
    language: 'CN',
};

export default (state = InitialState, action: types.ActionsType): types.InitialStateType => {
    switch (action.type) {
        case types.ACTION_TYPE.UPDATE_SELECTED_CATEGORY:
            return {
                ...state,
                selectedCategory: action.payload.name,
            };
        case types.ACTION_TYPE.UPDATE_FILE_NUMBER_ACTION:
            return {
                ...state,
                fileNumber: action.payload.fileNumber,
            };
        case types.ACTION_TYPE.UPDATE_DATA_PROCESSING_ALL:
            return {
                ...state,
                getDataProcAllDataRequest: action.payload,
                // surveyDisAllData: action.payload,
            };
        case types.ACTION_TYPE.UPDATE_DATA_PROCESSING_NOT_BOUND:
            return {
                ...state,
                getDataProcNotBoundDataRequest: action.payload,
                // surveyDisNotBoundData: action.payload.surveyDisNotBoundData,
            };
        case types.ACTION_TYPE.UPDATE_DISTRIBUTION_VERSION:
            return {
                ...state,
                getDataProcAllDataRequest: {
                    isLoading: false,
                    total: state.getDataProcAllDataRequest.total,
                    data_proc: state.getDataProcAllDataRequest.data_proc?.map((i) => ({
                        ...i,
                        getVersion:
                            i.id === action.payload.distribution
                                ? {
                                      isLoading: action.payload.isLoading,
                                      surveyVersion_list: action.payload.survey_versions,
                                  }
                                : i.getVersion,
                    })),
                },
                getOpenedDataProcessing: {
                    isLoading: false,
                    currDataProcessing: state.getOpenedDataProcessing.currDataProcessing && {
                        ...state.getOpenedDataProcessing.currDataProcessing,
                        getVersion: {
                            isLoading: action.payload.isLoading,
                            surveyVersion_list: action.payload.survey_versions,
                        },
                    },
                },
            };
        case types.ACTION_TYPE.UPDATE_MATCH_LIST_ACTION:
            return {
                ...state,
                associateList: action.payload.associateList,
            };
        case types.ACTION_TYPE.UPDATE_DISTRIBUTION_KEYWORDS:
            return {
                ...state,
                getDataProcAllDataRequest: {
                    isLoading: false,
                    total: state.getDataProcAllDataRequest.total,
                    data_proc: state.getDataProcAllDataRequest.data_proc?.map((i) => ({
                        ...i,
                        keywords:
                            i.id === action.payload.data_proc_id
                                ? action.payload.keywords
                                : i.keywords,
                    })),
                },
            };
        case types.ACTION_TYPE.UPDATE_DISTRIBUTION_STARRED:
            return {
                ...state,
                getDataProcAllDataRequest: {
                    isLoading: false,
                    total: state.getDataProcAllDataRequest.total,
                    data_proc: state.getDataProcAllDataRequest.data_proc?.map((item) => ({
                        ...item,
                        starred:
                            item.id === action.payload.data_proc_id
                                ? action.payload.star
                                : item.starred,
                    })),
                },
            };
        case types.ACTION_TYPE.UPDATE_OPENED_DISTRIBUTION:
            return {
                ...state,
                getOpenedDataProcessing: action.payload.getOpenedDataProcessing,
            };
        case types.ACTION_TYPE.UPDATE_LANGUAGE_ACTION:
            return {
                ...state,
                language: action.payload.language,
            };
        default:
            return state;
    }
};
