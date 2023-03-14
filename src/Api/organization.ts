import { AxiosResponse } from 'axios';
import { profileServiceUrl, userManagementServiceUrl } from './mainDomain';
import service from './interceptor';

/**
 * send entry page info
 */
export const getOrgList = (): Promise<AxiosResponse> => {
    return service({
        method: 'post',
        url: `${profileServiceUrl}/orgs/detail/by_user`,
    });
};

//get user default organization
export const getDefaultOrganization = (): Promise<AxiosResponse> => {
    return service({
        url: `${userManagementServiceUrl}/preferred_org/get`,
        method: 'post',
    });
};
//set user default organization
export const setDefaultOrganization = (data: {
    organization_id: string;
}): Promise<AxiosResponse> => {
    return service({
        url: `${userManagementServiceUrl}/preferred_org/set`,
        method: 'post',
        data,
    });
};

// 获取 org 下所有的 talent group
export const getAllTalentGroup = (data: { organization_id: string }): Promise<AxiosResponse> => {
    return service({
        url: `${profileServiceUrl}/org/all_tg`,
        method: 'post',
        data,
    });
};
// 批量获取 user 在一个 organization 下加入的所有的 talent group
export const getTalentGroupForOrg = (data: { organization_id: string }): Promise<AxiosResponse> => {
    return service({
        url: `${profileServiceUrl}/org/tgs/by_user`,
        method: 'post',
        data,
    });
};
