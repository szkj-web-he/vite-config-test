/**
 * @file
 * @date 2022-09-23
 * @author liaoli
 * @lastModify liaoli 2022-09-23
 */
import * as types from './types';

const initialState: types.JobViewReducer = {
    getViewList: {
        isLoading: true,
        data: {
            views: [],
        },
    },
    getDefaultView: undefined,
    getViewInfo: {},
    getShareData: {
        view: {
            id: '',
            name: '',
            job: {
                id: '',
                name: '',
                data_proc: {
                    id: '',
                    name: '',
                },
                stages: {
                    status: -1,
                    config: [],
                    temp_config: [],
                },
            },
            config: {
                global: false,
                marks: false,
                questions: [],
            },
        },
        data: [],
        jobResult: [],
    },
};

export default (state = initialState, action: types.JobViewTypes): types.JobViewReducer => {
    switch (action.type) {
        case types.ACTION_TYPE.UPDATE_VIEW_LIST_ACTION:
            return {
                ...state,
                getViewList: {
                    isLoading: action.payload.isLoading,
                    data: {
                        views: action.payload.data,
                    },
                },
            };
        case types.ACTION_TYPE.UPDATE_DEFAULT_VIEW_ACTION:
            return {
                ...state,
                getDefaultView: action.payload,
            };
        case types.ACTION_TYPE.UPDATE_VIEW_INFO_ACTION: {
            const { id, question, global, marks } = action.payload;
            return {
                ...state,
                getViewInfo: {
                    ...state.getViewInfo,
                    [id]: {
                        question: question ? question : state.getViewInfo[id]?.question || [],
                        global:
                            global !== undefined ? global : state.getViewInfo[id]?.global || false,
                        marks: marks !== undefined ? marks : state.getViewInfo[id]?.marks || false,
                    },
                },
            };
        }
        case types.ACTION_TYPE.UPDATE_SHARE_DATA_ACTION:
            return {
                ...state,
                getShareData: action.payload,
            };
        default:
            return state;
    }
};
