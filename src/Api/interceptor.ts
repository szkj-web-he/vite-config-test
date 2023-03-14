/**
 * @file  profile page api
 * @date 2021-1-13
 * @author Jack
 * @lastModify  2021-1-13
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import { getJwtKey, notice } from '@datareachable/dr_front_componentlibrary';
import axios, { AxiosResponse, AxiosRequestConfig, AxiosError, Canceler } from 'axios';
import mainDomain, { jwtStr } from './mainDomain';
import { dataProcessingLoginEntry } from './redirectDomain';
import store from '~/Store/rootStore';
import i18n from '~/Locales/i18n';
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type CustomAxiosResponse<T = any> = AxiosResponse<T> | void;

// create a axios instanse
const service = axios.create({
    baseURL: mainDomain, // api base_url
    timeout: 10000, // request timeout
});

// cancel request
export let allPendingRequestsRecord: (AxiosRequestConfig & {
    c: Canceler;
})[] = [];

// clear all request
export const clearRequestList = (): void => {
    for (let i = 0; i < allPendingRequestsRecord.length; ) {
        allPendingRequestsRecord[i].c();
        ++i;
    }
    allPendingRequestsRecord = [];
};

// remove request
export const removeRequest = (config: AxiosRequestConfig): void => {
    const n = allPendingRequestsRecord.findIndex((index) => {
        let state = true;
        for (const key in config) {
            if (config[key] === index[key]) {
                true;
            } else {
                state = false;
                break;
            }
        }
        if (state) {
            index.c();
        }
        return state;
    });
    allPendingRequestsRecord.splice(n, 1);
};

// request interceptors
service.interceptors.request.use(
    (config: AxiosRequestConfig) => {
        if (window.navigator.onLine === false) {
            throw new axios.Cancel('The network status is not good, please check your network');
        }

        const jwt = window.localStorage.getItem(getJwtKey());
        if (jwt) {
            config.headers['DR-AUTH'] = jwt;
        }
        return config;
    },
    (error: AxiosError) => {
        // console.log("request error-->", error); // for debug
        return error;
    },
);

// response interceptors
service.interceptors.response.use(
    (response: AxiosResponse<{ code: number; message: string }>) => {
        if (response.data.code === 403001 || response.data.code === 401001) {
            window.localStorage.removeItem(jwtStr);
            if (process.env.NODE_ENV === 'production') {
                window.location.replace(
                    `${dataProcessingLoginEntry}&lang=${store
                        .getState()
                        .homePage.language?.toLocaleLowerCase()}`,
                );
            }
        }
        return response;
    },
    (error: AxiosError) => {
        /**
         * Filter out all requests that are not cancelled by themselves
         */
        if (axios.isCancel(error)) {
            error.message &&
                notice.warning({
                    title: i18n.t('Notice.Warning'),
                    description: i18n.t('Notice.CustomizeMsg.ErrorNetwork'),
                });
        } else {
            if (error.response) {
                return error.response;
            }
            return error;
        }
    },
);
export interface APIResponse<T = unknown> {
    status: number;
    data: {
        code: number;
        message: string;
        data: T;
    };
}

export default service;
