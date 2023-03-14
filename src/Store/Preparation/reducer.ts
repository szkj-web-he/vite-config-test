/**
 * @file
 * @date 2022-06-06
 * @author zhuxiaojixo
 * @lastModify zhuxiaojixo 2022-06-06
 */
import * as types from './types';
const initialState: types.PreparationReducer = {
    currentRole: '',
    navData: {
        deliverable_id: '',
        organization: {
            id: '',
            name: '',
        },
        talent_group: {
            id: '',
            name: '',
        },
        data_proc: {
            id: '',
            name: '',
        },
        role: [],
    },
    selectedTg: '',
    recruitment: '',
    attachments: [],
    getBoundSurvey: { isLoading: true, data: [] },
    getUnboundSurvey: {
        isLoading: true,
        data: [],
    },
    shareView: {
        sign: '',
        random: '',
        view_id: '',
        role_limit: [],
        job_id: '',
        share_org: '',
        isSameOrg: false,
    },
};
export default (state = initialState, action: types.PreparationTypes): types.PreparationReducer => {
    switch (action.type) {
        case types.ACTION_TYPE.UPDATE_CURRENT_ROLE_ACTION:
            return {
                ...state,
                currentRole: action.payload,
            };
        case types.ACTION_TYPE.UPDATE_NAV_DATA_ACTION:
            return {
                ...state,
                navData: action.payload.navData,
            };
        case types.ACTION_TYPE.SAVE_SELECTED_TG_ACTION:
            return {
                ...state,
                selectedTg: action.payload,
            };
        case types.ACTION_TYPE.UPDATE_RECRUITMENT_AND_ATTACHMENTS_ACTION:
            return {
                ...state,
                recruitment: action.payload.recruitment,
                attachments: action.payload.attachments,
            };
        case types.ACTION_TYPE.UPDATE_BOUND_SURVEY_ACTION:
            return {
                ...state,
                getBoundSurvey: action.payload.getBoundSurvey,
            };
        case types.ACTION_TYPE.UPDATE_UNBOUND_SURVEY_ACTION:
            return {
                ...state,
                getUnboundSurvey: action.payload.getUnboundSurvey,
            };
        case types.ACTION_TYPE.SAVE_SHARE_VIEW_DATA_ACTION:
            return {
                ...state,
                shareView: action.payload,
            };
        default:
            return state;
    }
};
