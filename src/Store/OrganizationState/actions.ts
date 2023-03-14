/**
 * @file
 * @date 2021-10-16
 * @author zhoubin
 * @lastModify zhoubin 2021-10-16
 */
import * as types from "./types";

/** 获取组织列表 */
export const getOrganizationListSaga = (): types.OrganizationTypes => ({
    type: types.ACTION_TYPE.GET_ORGANIZATION_LIST_SAGA,
});
export const updateOrganizationListAction = (payload: {
    isLoading: boolean;
    data?: Array<types.OrganizationType>;
}): types.OrganizationTypes => ({
    type: types.ACTION_TYPE.UPDATE_ORGANIZATION_LIST,
    payload,
});

// 获取默认组织
export const getDefaultOrganization = (): types.GetDefaultOrganizationSagaAction => ({
    type: types.ACTION_TYPE.GET_USER_DEFAULT_ORGANIZATION,
});
export const recordDefaultOrganization = (payload: {
    organization_id: string;
}): types.OrganizationTypes => ({
    type: types.ACTION_TYPE.RECORD_DEFAULT_ORGANIZATION,
    payload,
});
// 设置默认组织
export const setDefaultOrganization = (payload: {
    organization_id: string;
}): types.OrganizationTypes => ({
    type: types.ACTION_TYPE.SET_DEFAULT_ORGANIZATION,
    payload,
});

// 保存当前组织
export const updateCurrentOrgAction = (payload: {
    currentOrg: types.OrganizationType;
}): types.OrganizationTypes => ({
    type: types.ACTION_TYPE.UPDATE_CURRENT_ORG_ACTION,
    payload,
});

/** 获取 org 下所有的 talent group */
export const getAllTalentGroupSaga = (payload: {
    organization_id: string;
    callback?: () => void;
}): types.OrganizationTypes => ({
    type: types.ACTION_TYPE.GET_ALL_TALENT_GROUP_SAGA,
    payload,
});
export const updateAllTalentGroupAction = (payload: {
    talentGroupList: types.TalentGroupType[];
}): types.OrganizationTypes => ({
    type: types.ACTION_TYPE.UPDATE_ALL_TALENT_GROUP_ACTION,
    payload,
});
// 保存当前所在的talent group
export const updateCurrentTalentGroupAction = (payload: {
    currentTalentGroupId: string;
}): types.OrganizationTypes => ({
    type: types.ACTION_TYPE.UPDATE_CURRENT_TALENT_GROUP,
    payload,
});

/** 批量获取 user 在一个 organization 下加入的所有的 talent group */
export const getTalentGroupForOrgSaga = (payload: {
    organization_id: string;
    callback?: () => void;
}): types.OrganizationTypes => ({
    type: types.ACTION_TYPE.GET_TALENT_GROUP_FOR_ORG_SAGA,
    payload,
});
export const updateTalentGroupForOrgAction = (
    payload: types.TalentGroupForOrgType[],
): types.OrganizationTypes => ({
    type: types.ACTION_TYPE.UPDATE_TALENT_GROUP_FOR_ORG_ACTION,
    payload,
});
