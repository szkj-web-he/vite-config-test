/**
 * @file
 * @date 2022-06-04
 * @author zhuxiaojixo
 * @lastModify zhuxiaojixo 2022-06-04
 */
import { OrganizationType, TalentGroupType } from '../OrganizationState/types';
import * as types from './types';

// 根据 name 搜索distribution
export const searchDistributionsByNameSaga = (payload: {
    name: string;
    callback?: (res: types.SearchDistributionType[]) => void;
}): types.DistributionWindowType => {
    return {
        type: types.ACTION_TYPE.SEARCH_DIStRIBUTIONS_BY_NAME_SAGA,
        payload,
    };
};
export const UpdateDistributionsByNameAction = (payload: {
    getDistributions: types.SearchDistributionType[];
}): types.DistributionWindowType => {
    return {
        type: types.ACTION_TYPE.UPDATE_DISTRIBUTIONS_BY_NAME_ACTION,
        payload,
    };
};
// 获取 organization list
export const getOrgListSaga = (): types.DistributionWindowType => {
    return {
        type: types.ACTION_TYPE.GET_ORG_LIST_SAGA,
    };
};
export const UpdateOrgListAction = (payload: OrganizationType[]): types.DistributionWindowType => {
    return {
        type: types.ACTION_TYPE.UPDATE_ORG_LIST_ACTION,
        payload,
    };
};
// 获取 talent group
export const getTalentGroupListSaga = (payload: {
    organization_id: string;
}): types.DistributionWindowType => {
    return {
        type: types.ACTION_TYPE.GET_TALENT_GROUP_LIST_SAGA,
        payload,
    };
};
export const UpdateTalentGroupListAction = (payload: {
    talentGroupList: TalentGroupType[];
}): types.DistributionWindowType => {
    return {
        type: types.ACTION_TYPE.UPDATE_TALENT_GROUP_LIST_ACTION,
        payload,
    };
};

// 获取 distribution 的权限
export const getDistributionRoleSaga = (payload: {
    talent_group_id: string;
    data_proc_id: string;
    callback?: (status: boolean) => void;
}): types.DistributionWindowType => {
    return {
        type: types.ACTION_TYPE.GET_DISTRIBUTION_ROLE_SAGA,
        payload,
    };
};
export const updateDistributionRoleAction = (payload: {
    getDistributionRoles: string[];
}): types.DistributionWindowType => {
    return {
        type: types.ACTION_TYPE.UPDATE_DISTRIBUTION_ROLE_ACTION,
        payload,
    };
};
