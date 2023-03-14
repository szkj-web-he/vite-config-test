/**
 * @file
 * @date 2022-06-06
 * @author zhuxiaojixo
 * @lastModify zhuxiaojixo 2022-06-06
 */
import { AxiosResponse } from 'axios';
import { FileUploadType } from '~/Store/Preparation/types';
import service from './interceptor';

// 获取导航信息
export const getNavData = (params: {
    talent_group_id: string;
    data_proc_id: string;
}): Promise<AxiosResponse> => {
    return service({
        url: '/data_proc/navigation',
        method: 'get',
        params,
    });
};
// 获取表单recruitment和 attachments
export const getRecruitmentAndAttach = (params: {
    talent_group_id: string;
    data_proc_id: string;
}): Promise<AxiosResponse> => {
    return service({
        url: '/data_proc',
        method: 'get',
        params,
    });
};
// 更新 recruitment Requirement
export const updateRecruitment = (data: {
    talent_group_id: string;
    data_proc_id: string;
    recruitment: string;
}): Promise<AxiosResponse> => {
    return service({
        url: '/data_proc/recruitment',
        method: 'put',
        data,
    });
};
// 上传文件
export const uploadAttachment = (data: FileUploadType): Promise<AxiosResponse> => {
    return service({
        url: '/attachment',
        method: 'post',
        timeout: 20000,
        headers: { 'content-type': 'multipart/form-data' },
        data: data.formData,
        timeoutErrorMessage: '文件上传超时！',
        onUploadProgress: data.onUploadProgress,
        cancelToken: data.cancelToken,
    });
};
// 修改文件名
export const uploadAttachmentName = (data: {
    talent_group_id: string;
    data_proc_id: string;
    att_id: string;
    name: string;
}): Promise<AxiosResponse> => {
    return service({
        url: '/attachment/name',
        method: 'put',
        data,
    });
};
// 删除文件
export const deleteAttachment = (data: {
    talent_group_id: string;
    data_proc_id: string;
    att_id: string;
}): Promise<AxiosResponse> => {
    return service({
        url: '/attachment/data_proc',
        method: 'delete',
        data,
    });
};
// 下载文件
export const downloadAttachment = (params: {
    talent_group_id: string;
    data_proc_id: string;
    att_id: string;
}): Promise<AxiosResponse> => {
    return service({
        url: '/attachment/data_proc',
        method: 'get',
        responseType: 'blob',
        params,
        timeout: 50000,
    });
};
