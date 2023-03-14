/**
 * 通过网址解析出params对象
 * @param url 需要解析的网址
 * @returns 返回params对象
 */
export const getUrlParamsObj = function <T>(url: string): T {
    const reg = /([^&?]+)=([^&]+)/g;
    let result: RegExpExecArray | null = null;
    const params: { [key: string]: string } = {};
    const decodeURI = decodeURIComponent(url);
    while ((result = reg.exec(decodeURI)) !== null) {
        params[result[1]] = result[2];
    }
    return params as unknown as T;
};
