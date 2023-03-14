/**
 * @file
 * @date 2022-09-23
 * @author liaoli
 * @lastModify liaoli 2022-09-23
 */

import { AxiosResponse } from 'axios';
import service from './interceptor';

// 获取viewList
export const getViewList = (params): Promise<AxiosResponse> => {
    return service({
        url: '/view/list',
        method: 'get',
        params,
    });
};

// 创建view
export const createView = (payload): Promise<AxiosResponse> => {
    return service({
        url: '/view',
        method: 'put',
        data: payload,
    });
};

// 获取view info
export const getViewInfo = (params): Promise<AxiosResponse> => {
    return service({
        url: '/view/info',
        method: 'get',
        params,
    });
};

// 删除view
export const deleteView = (payload): Promise<AxiosResponse> => {
    return service({
        url: '/view',
        method: 'delete',
        data: payload,
    });
};

// 视角重命名
export const viewRename = (payload): Promise<AxiosResponse> => {
    return service({
        url: '/view/rename',
        method: 'post',
        data: payload,
    });
};

// 修改视角
export const updateView = (payload): Promise<AxiosResponse> => {
    return service({
        url: '/view/update',
        method: 'post',
        data: payload,
    });
};

// 分享视角
export const shareView = (payload): Promise<AxiosResponse> => {
    return service({
        url: '/view/share',
        method: 'post',
        data: payload,
    });
};

// 获取分享view
export const getShareView = (params): Promise<AxiosResponse> => {
    return service({
        url: '/view/share',
        method: 'get',
        params,
    });
};
