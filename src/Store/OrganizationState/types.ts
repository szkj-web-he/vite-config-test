/**
 * @file
 * @date 2021-10-16
 * @author zhoubin
 * @lastModify zhoubin 2021-10-16
 */

export interface OrganizationType {
    id: string;
    name: string;
    logo: string;
    type: string;
    members: {
        avatar: string;
        id: string;
        name: string;
    }[];
}
export interface TalentGroupType {
    name: string;
    status: string;
    owner_org?: string;
    id: string;
    updated_at?: string;
    created_at?: string;
    members: MemberType[];
}
export interface TalentGroupForOrgType {
    id: string;
    name: string;
    talent_group_role: string;
}
export interface MemberType {
    id: string;
    name: string;
    avatar: string;
    email: string;
    talent_group_role?: string;
    mobile_area?: string | null;
    mobile_country?: string | null;
    mobile_number?: string | null;
    mobile: MobileType;
    organization_role?: string;
}
export interface MobileType {
    area: string | null;
    country: string | null;
    number: string | null;
}

export interface OrganizationReducer {
    getOrganizationRequest: {
        isLoading: boolean;
        data?: Array<OrganizationType>;
    };
    // 以下为基础数据
    organizationList: Array<OrganizationType>;
    defaultOrganizationId: string;
    currentOrg: OrganizationType;
    // currentOrgInfo: OrgInfoType;
    talentGroupList: TalentGroupType[];
    currentTalentGroupId: string;
    talentGroupForOrg: TalentGroupForOrgType[];
}
/**
 * action types
 */
export enum ACTION_TYPE {
    // 获取用户所有的organization
    UPDATE_ORGANIZATION_LIST = "UPDATE_ORGANIZATION_LIST",
    GET_ORGANIZATION_LIST_SAGA = "GET_ORGANIZATION_LIST_SAGA",
    // 获取默认组织
    GET_USER_DEFAULT_ORGANIZATION = "GET_USER_DEFAULT_ORGANIZATION",
    // 保存默认组织
    RECORD_DEFAULT_ORGANIZATION = "RECORD_DEFAULT_ORGANIZATION",
    // 设置默认组织
    SET_DEFAULT_ORGANIZATION = "SET_DEFAULT_ORGANIZATION",
    // 保存用户当前所在的组织
    UPDATE_CURRENT_ORG_ACTION = "UPDATE_CURRENT_ORG_ACTION",
    /** 获取 org 下所有的 talent group */
    GET_ALL_TALENT_GROUP_SAGA = "GET_ALL_TALENT_GROUP_SAGA",
    UPDATE_ALL_TALENT_GROUP_ACTION = "UPDATE_ALL_TALENT_GROUP_ACTION",
    UPDATE_CURRENT_TALENT_GROUP = "UPDATE_CURRENT_TALENT_GROUP",
    /** 批量获取 user 在一个 organization 下加入的所有的 talent group */
    GET_TALENT_GROUP_FOR_ORG_SAGA = "GET_TALENT_GROUP_FOR_ORG_SAGA",
    UPDATE_TALENT_GROUP_FOR_ORG_ACTION = "UPDATE_TALENT_GROUP_FOR_ORG_ACTION",
}

/** 获取组织列表 */
export interface GetOrganizationListSaga {
    type: typeof ACTION_TYPE.GET_ORGANIZATION_LIST_SAGA;
}
export interface UpdateOrganizationListAction {
    type: typeof ACTION_TYPE.UPDATE_ORGANIZATION_LIST;
    payload: {
        isLoading: boolean;
        data?: Array<OrganizationType>;
    };
}

/** 获取默认组织 */
export interface GetDefaultOrganizationSagaAction {
    type: ACTION_TYPE.GET_USER_DEFAULT_ORGANIZATION;
}
export interface RecordDefaultOrganizationAction {
    type: ACTION_TYPE.RECORD_DEFAULT_ORGANIZATION;
    payload: {
        organization_id: string;
    };
}

/** 设置默认组织 */
export interface SetDefaultOrganizationSaga {
    type: ACTION_TYPE.SET_DEFAULT_ORGANIZATION;
    payload: {
        organization_id: string;
    };
}

/** 保存当前组织 */
export interface UpdateCurrentOrgAction {
    type: ACTION_TYPE.UPDATE_CURRENT_ORG_ACTION;
    payload: {
        currentOrg: OrganizationType;
    };
}
/** 获取 org 下所有的 talent group */
export interface GetAllTalentGroupSaga {
    type: ACTION_TYPE.GET_ALL_TALENT_GROUP_SAGA;
    payload: {
        organization_id: string;
        callback?: () => void;
    };
}
export interface UpdateAllTalentGroupAction {
    type: ACTION_TYPE.UPDATE_ALL_TALENT_GROUP_ACTION;
    payload: {
        talentGroupList: TalentGroupType[];
    };
}
// 保存当前所在的 talent group id
export interface UpdateCurrentTalentGroupAction {
    type: ACTION_TYPE.UPDATE_CURRENT_TALENT_GROUP;
    payload: {
        currentTalentGroupId: string;
    };
}

/** 批量获取 user 在一个 organization 下加入的所有的 talent group */
export interface GetTalentGroupForOrgSaga {
    type: ACTION_TYPE.GET_TALENT_GROUP_FOR_ORG_SAGA;
    payload: {
        organization_id: string;
        callback?: () => void;
    };
}
export interface UpdateTalentGroupForOrgAction {
    type: ACTION_TYPE.UPDATE_TALENT_GROUP_FOR_ORG_ACTION;
    payload: TalentGroupForOrgType[];
}

export type OrganizationTypes =
    | UpdateOrganizationListAction
    | GetOrganizationListSaga
    | GetDefaultOrganizationSagaAction
    | RecordDefaultOrganizationAction
    | SetDefaultOrganizationSaga
    | UpdateCurrentOrgAction
    | GetAllTalentGroupSaga
    | UpdateAllTalentGroupAction
    | UpdateCurrentTalentGroupAction
    | GetTalentGroupForOrgSaga
    | UpdateTalentGroupForOrgAction;
