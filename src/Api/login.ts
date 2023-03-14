/**
 * @file
 * @date 2021-11-01
 * @author zhoubin
 * @lastModify zhoubin 2021-11-01
 */
import { AxiosResponse } from 'axios';
import axios from './interceptor';
import { commonAuthServiceUrl, dataProcApp, oidcServiceUrl, profileServiceUrl } from './mainDomain';
/**
 * ajax response
 */
export interface AjaxResponse<T = Record<string, unknown>> {
    status: number;
    headers: { 'dr-auth': string };
    data: {
        code: number;
        message: string;
        data: T;
    };
}
export const firstEntryCheck = (data: {
    code: string;
    session_state: string;
}): Promise<AxiosResponse> => {
    return axios.request({
        method: 'post',
        url: `${oidcServiceUrl}/jwt?app=${dataProcApp}`,
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        },
        data,
    });
};

/**
 * type description
 * @param { type } var description
 */
export const checkSessionState = (): Promise<AxiosResponse> => {
    return axios.request({
        method: 'POST',
        url: `${commonAuthServiceUrl}/session/status`,
    });
};
/**
 * send entry page info
 */
export const getUserInfo = (): Promise<AxiosResponse> => {
    return axios.request({
        method: 'post',
        url: `${profileServiceUrl}/user_self/info`,
    });
};
