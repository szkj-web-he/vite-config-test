/**
 * @file
 * @date 2021-10-16
 * @author zhoubin
 * @lastModify zhoubin 2021-10-16
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import * as types from "./types";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */

const initialState: types.OrganizationReducer = {
    getOrganizationRequest: {
        isLoading: false,
    },
    organizationList: [],
    defaultOrganizationId: "",
    currentOrg: {
        id: "",
        name: "",
        logo: "",
        type: "",
        members: [],
    },
    talentGroupList: [],
    currentTalentGroupId: "",
    talentGroupForOrg: [],
};

export default (
    state = initialState,
    action: types.OrganizationTypes,
): types.OrganizationReducer => {
    switch (action.type) {
        case types.ACTION_TYPE.UPDATE_ORGANIZATION_LIST:
            return {
                ...state,
                getOrganizationRequest: {
                    isLoading: action.payload.isLoading,
                    data: action.payload.data,
                },
                organizationList: action.payload.data || [],
            };
        case types.ACTION_TYPE.RECORD_DEFAULT_ORGANIZATION:
            return {
                ...state,
                defaultOrganizationId: action.payload.organization_id,
            };
        case types.ACTION_TYPE.UPDATE_CURRENT_ORG_ACTION:
            return {
                ...state,
                currentOrg: action.payload.currentOrg,
            };
        case types.ACTION_TYPE.UPDATE_ALL_TALENT_GROUP_ACTION:
            return {
                ...state,
                talentGroupList: action.payload.talentGroupList,
            };
        case types.ACTION_TYPE.UPDATE_CURRENT_TALENT_GROUP:
            return {
                ...state,
                currentTalentGroupId: action.payload.currentTalentGroupId,
            };
        case types.ACTION_TYPE.UPDATE_TALENT_GROUP_FOR_ORG_ACTION:
            return {
                ...state,
                talentGroupForOrg: action.payload,
            };

        default:
            return state;
    }
};
