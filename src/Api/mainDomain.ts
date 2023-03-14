/**
 * @file main domain
 * @date 2021-1-16
 * @author Jack
 * @lastModify  2021-1-16
 */
let mainDomain = '';
let profileServiceUrl = '';
let userManagementServiceUrl = '';
let commonAuthServiceUrl = '';
let oidcServiceUrl = '';
let projectServiceUrl = '';
let dataProcApp = '';
let jwtStr = '';
switch (process.env.NODE_ENV) {
    case 'development':
        mainDomain = 'https://dev-api.datareachable.cn/proc/v2/dev';
        profileServiceUrl = 'https://dev-api.datareachable.cn/query/centre/v2/dev/profile';
        userManagementServiceUrl = 'https://dev-api.datareachable.cn/user/v2/dev';
        commonAuthServiceUrl = 'https://dev-api.datareachable.cn/auth/common/v2';
        oidcServiceUrl = 'https://dev-api.datareachable.cn/common/oidc/v2';
        projectServiceUrl = 'https://dev-api.datareachable.cn/proj/v2/dev';
        dataProcApp = 'data-proc-v2-dev';
        jwtStr = 'jwt';
        break;
    case 'v1_dev':
        mainDomain = 'https://dev-api.datareachable.cn/proc/v1/dev';
        profileServiceUrl = 'https://profile.dev.datareachable.net/api/v2';
        userManagementServiceUrl = 'https://profile.dev.datareachable.net/api/v2';
        commonAuthServiceUrl = 'https://dev-api.datareachable.cn/auth/common/v1';
        oidcServiceUrl = 'https://dev-api.datareachable.cn/common/oidc/v1';
        projectServiceUrl = 'https://spm.dev.datareachable.net/api/v1';
        dataProcApp = 'data-proc-v1-dev';
        jwtStr = 'jwt_v1_dev';
        break;
    case 'v2_dev':
        mainDomain = 'https://dev-api.datareachable.cn/proc/v2/dev';
        profileServiceUrl = 'https://dev-api.datareachable.cn/query/centre/v2/dev/profile';
        userManagementServiceUrl = 'https://dev-api.datareachable.cn/user/v2/dev';
        commonAuthServiceUrl = 'https://dev-api.datareachable.cn/auth/common/v2';
        oidcServiceUrl = 'https://dev-api.datareachable.cn/common/oidc/v2';
        projectServiceUrl = 'https://dev-api.datareachable.cn/proj/v2/dev';
        dataProcApp = 'data-proc-v2-dev';
        jwtStr = 'jwt_v2_dev';
        break;
    case 'v2_test':
        mainDomain = 'https://dev-api.datareachable.cn/proc/v2/test';
        profileServiceUrl = 'https://dev-api.datareachable.cn/query/centre/v2/test/profile';
        userManagementServiceUrl = 'https://dev-api.datareachable.cn/user/v2/test';
        commonAuthServiceUrl = 'https://dev-api.datareachable.cn/auth/common/v2/test';
        oidcServiceUrl = 'https://dev-api.datareachable.cn/common/oidc/v2/test';
        projectServiceUrl = 'https://dev-api.datareachable.cn/proj/v2/test';
        dataProcApp = 'data-proc-v2-test';
        jwtStr = 'jwt_v2_test';
        break;
    case 'production':
        mainDomain = 'https://dev-api.datareachable.cn/proc/v2/dev';
        profileServiceUrl = 'https://dev-api.datareachable.cn/query/centre/v2/dev/profile';
        userManagementServiceUrl = 'https://dev-api.datareachable.cn/user/v2/dev';
        commonAuthServiceUrl = 'https://dev-api.datareachable.cn/auth/common/v2';
        oidcServiceUrl = 'https://dev-api.datareachable.cn/common/oidc/v2/test';
        projectServiceUrl = 'https://dev-api.datareachable.cn/proj/v2/dev';
        dataProcApp = 'data-proc-v2-dev';
        jwtStr = 'jwt';
        break;
    default:
        mainDomain = 'https://dev-api.datareachable.cn/proc/v2/dev';
        profileServiceUrl = 'https://dev-api.datareachable.cn/query/centre/v2/dev/profile';
        userManagementServiceUrl = 'https://dev-api.datareachable.cn/user/v2/dev';
        commonAuthServiceUrl = 'https://dev-api.datareachable.cn/auth/common/v2';
        oidcServiceUrl = 'https://dev-api.datareachable.cn/common/oidc/v2/dev';
        projectServiceUrl = 'https://dev-api.datareachable.cn/proj/v2/dev';
        dataProcApp = 'data-proc-v2-dev';
        jwtStr = 'jwt_*';
        break;
}

export default mainDomain;
export {
    profileServiceUrl,
    userManagementServiceUrl,
    commonAuthServiceUrl,
    oidcServiceUrl,
    projectServiceUrl,
    dataProcApp,
    jwtStr,
};
