/**
 * @file
 * @date 2022-06-04
 * @author zhuxiaojixo
 * @lastModify zhuxiaojixo 2022-06-04
 */
/* <------------------------------------ **** 数据类型 START **** ------------------------------------ */
/* <------------------------------------ **** 数据类型 END **** ------------------------------------ */

import { OrganizationType, TalentGroupType } from '../OrganizationState/types';

export interface SearchDistributionType {
    id: string;
    name: string;
    owner_org: {
        id: string;
        name: string;
    };
}
/* <------------------------------------ **** action types START **** ------------------------------------ */
export enum ACTION_TYPE {
    // 根据 name 搜索distribution
    SEARCH_DIStRIBUTIONS_BY_NAME_SAGA = 'SEARCH_DIStRIBUTIONS_BY_NAME_SAGA',
    UPDATE_DISTRIBUTIONS_BY_NAME_ACTION = 'UPDATE_DISTRIBUTIONS_BY_NAME_ACTION',
    // 获取 organization list
    GET_ORG_LIST_SAGA = 'GET_ORG_LIST_SAGA',
    UPDATE_ORG_LIST_ACTION = 'UPDATE_ORG_LIST_ACTION',
    // 获取 talent group
    GET_TALENT_GROUP_LIST_SAGA = 'GET_TALENT_GROUP_LIST_SAGA',
    UPDATE_TALENT_GROUP_LIST_ACTION = 'UPDATE_TALENT_GROUP_LIST_ACTION',
    // 获取distribution的权限
    GET_DISTRIBUTION_ROLE_SAGA = 'GET_DISTRIBUTION_ROLE_SAGA',
    UPDATE_DISTRIBUTION_ROLE_ACTION = 'UPDATE_DISTRIBUTION_ROLE_ACTION',
}
/* <------------------------------------ **** action types END **** ------------------------------------ */
/* <------------------------------------ **** 接口类型 START **** ------------------------------------ */
// 根据 name 搜索distribution
export interface SearchDistributionsByNameSaga {
    type: ACTION_TYPE.SEARCH_DIStRIBUTIONS_BY_NAME_SAGA;
    payload: {
        name: string;
        callback?: (res: SearchDistributionType[]) => void;
    };
}
export interface UpdateDistributionsByNameAction {
    type: ACTION_TYPE.UPDATE_DISTRIBUTIONS_BY_NAME_ACTION;
    payload: {
        getDistributions: SearchDistributionType[];
    };
}
// 获取 organization list
export interface GetOrgListSaga {
    type: ACTION_TYPE.GET_ORG_LIST_SAGA;
}
export interface UpdateOrgListAction {
    type: ACTION_TYPE.UPDATE_ORG_LIST_ACTION;
    payload: OrganizationType[];
}
// 获取 talent group
export interface GetTalentGroupListSaga {
    type: ACTION_TYPE.GET_TALENT_GROUP_LIST_SAGA;
    payload: {
        organization_id: string;
    };
}
export interface UpdateTalentGroupListAction {
    type: ACTION_TYPE.UPDATE_TALENT_GROUP_LIST_ACTION;
    payload: {
        talentGroupList: TalentGroupType[];
    };
}
// 获取distribution的权限
export interface GetDistributionRoleSaga {
    type: ACTION_TYPE.GET_DISTRIBUTION_ROLE_SAGA;
    payload: {
        talent_group_id: string;
        data_proc_id: string;
        callback?: (status: boolean) => void;
    };
}
export interface UpdateDistributionRoleAction {
    type: ACTION_TYPE.UPDATE_DISTRIBUTION_ROLE_ACTION;
    payload: {
        getDistributionRoles: string[];
    };
}
/* <------------------------------------ **** 接口类型 END **** ------------------------------------ */
/* <------------------------------------ **** reducer数据类型 START **** ------------------------------------ */
export interface DistributionWindowReducer {
    getDistributions: SearchDistributionType[];
    orgList: OrganizationType[];
    talentGroupList: TalentGroupType[];
    getDistributionRoles: string[];
}
/* <------------------------------------ **** reducer数据类型 END **** ------------------------------------ */

export type DistributionWindowType =
    | SearchDistributionsByNameSaga
    | UpdateDistributionsByNameAction
    | GetOrgListSaga
    | UpdateOrgListAction
    | GetTalentGroupListSaga
    | UpdateTalentGroupListAction
    | GetDistributionRoleSaga
    | UpdateDistributionRoleAction;
