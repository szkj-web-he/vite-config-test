/**
 * @file
 * @date 2022-09-15
 * @author liaoli
 * @lastModify liaoli 2022-09-15
 */
import * as types from './types';

const initialState: types.JobListReducer = {
    getJobList: {
        isLoading: true,
        data: [],
    },
    getSurveyList: {
        questionnaireList: [],
    },
    getArchiveJobList: {
        isLoading: true,
        data: [],
    },
    getCurrentJob: undefined,
    getJobResult: undefined,
    getJobQuestion: [],
};

export default (state = initialState, action: types.JobListTypes): types.JobListReducer => {
    switch (action.type) {
        case types.ACTION_TYPE.UPDATE_JOB_LIST_ACTION:
            return {
                ...state,
                getJobList: action.payload,
            };
        case types.ACTION_TYPE.UPDATE_JOB_DESC_ACTION:
            return {
                ...state,
                getJobList: {
                    isLoading: false,
                    data: state.getJobList.data?.map((v) => ({
                        ...v,
                        description:
                            v.id === action.payload.job_id
                                ? action.payload.description
                                : v.description,
                    })),
                },
            };
        case types.ACTION_TYPE.UPDATE_JOB_NAME_ACTION:
            return {
                ...state,
                getJobList: {
                    isLoading: false,
                    data: state.getJobList.data?.map((v) => ({
                        ...v,
                        name: v.id === action.payload.job_id ? action.payload.name : v.name,
                    })),
                },
            };
        case types.ACTION_TYPE.UPDATE_JOB_REFRESH_TIME_ACTION:
            return {
                ...state,
                getJobList: {
                    isLoading: false,
                    data: state.getJobList.data?.map((v) => ({
                        ...v,
                        refresh_interval:
                            v.id === action.payload.job_id
                                ? action.payload.refresh_interval
                                : v.refresh_interval,
                    })),
                },
            };
        case types.ACTION_TYPE.UPDATE_SURVEY_LIST_ACTION:
            return {
                ...state,
                getSurveyList: {
                    questionnaireList: action.payload,
                },
            };
        case types.ACTION_TYPE.UPDATE_ARCHIVED_JOB_LIST_ACTION:
            return {
                ...state,
                getArchiveJobList: {
                    isLoading: action.payload.isLoading,
                    data: action.payload.data,
                },
            };
        case types.ACTION_TYPE.UPDATE_CURRENT_JOB_ACTION:
            return {
                ...state,
                getCurrentJob: action.payload,
            };
        case types.ACTION_TYPE.UPDATE_JOB_RESULT_ACTION:
            return {
                ...state,
                getJobResult: action.payload,
            };
        case types.ACTION_TYPE.UPDATE_JOB_QUESTION_ACTION:
            return {
                ...state,
                getJobQuestion: action.payload,
            };
        default:
            return state;
    }
};
