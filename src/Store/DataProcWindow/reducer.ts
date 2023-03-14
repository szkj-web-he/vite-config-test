/**
 * @file
 * @date 2022-06-04
 * @author zhuxiaojixo
 * @lastModify zhuxiaojixo 2022-06-04
 */
import * as types from './types';
const initialState: types.DistributionWindowReducer = {
    getDistributions: [],
    orgList: [],
    talentGroupList: [],
    getDistributionRoles: [],
};
export default (
    state = initialState,
    action: types.DistributionWindowType,
): types.DistributionWindowReducer => {
    switch (action.type) {
        case types.ACTION_TYPE.UPDATE_DISTRIBUTIONS_BY_NAME_ACTION:
            return {
                ...state,
                getDistributions: action.payload.getDistributions,
            };
        case types.ACTION_TYPE.UPDATE_ORG_LIST_ACTION:
            return {
                ...state,
                orgList: action.payload,
            };
        case types.ACTION_TYPE.UPDATE_TALENT_GROUP_LIST_ACTION:
            return {
                ...state,
                talentGroupList: action.payload.talentGroupList,
            };
        case types.ACTION_TYPE.UPDATE_DISTRIBUTION_ROLE_ACTION:
            return {
                ...state,
                getDistributionRoles: action.payload.getDistributionRoles,
            };
        default:
            return state;
    }
};
