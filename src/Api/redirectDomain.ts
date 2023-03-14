import { dataProcApp, oidcServiceUrl } from './mainDomain';

/**
 * @file redirect domain
 * @date 2021-1-16
 * @author Jack
 * @lastModify  2021-1-16
 */
let redirectToProjectManager = '';
let redirectToSurveyDistribution = '';
let redirectToSurveyAnalysisReport = '';
let redirectToPlugInEditor = '';
let redirectToQeditorDashBoard = '';
let redirectToProfile = '';
let redirectToDataProcessing = '';

const dataProcessingLoginEntry = `${oidcServiceUrl}/entry?app=${dataProcApp}`;
const redirectToSignOutPage = `${oidcServiceUrl}/logout?app=${dataProcApp}`;
switch (process.env.NODE_ENV) {
    // npm start 本地开发环境
    case 'development': {
        redirectToProjectManager = 'https://dev-spm.datareachable.cn/v2/dev';
        redirectToSurveyDistribution = 'https://dev-dist.datareachable.cn/v2/dev';
        redirectToSurveyAnalysisReport = 'https://dev-data-proc.datareachable.cn/v1/dev';
        redirectToPlugInEditor = 'https://dev-plugin-system.datareachable.cn/v2-dev/';
        redirectToQeditorDashBoard = 'https://dev-qdashboard.datareachable.cn/v2/dev';
        redirectToProfile = 'https://dev-profile.datareachable.cn/v2/dev';
        redirectToDataProcessing = '';
        break;
    }
    // npm run build v1 生产测试环境 (production test)
    case 'v1_dev': {
        redirectToProjectManager = 'https://dev-spm.datareachable.cn/v1/dev';
        redirectToSurveyDistribution = 'https://dev-dist.datareachable.cn/v1/dev';
        redirectToSurveyAnalysisReport = 'https://dev-data-proc.datareachable.cn/v1/dev';
        redirectToPlugInEditor = 'https://dev-plugin-system.datareachable.cn/v2-dev/';
        redirectToQeditorDashBoard = 'https://dev-qdashboard.datareachable.cn/v1/dev';
        redirectToProfile = 'https://dev-profile.datareachable.cn/v1/dev';
        redirectToDataProcessing = '';

        break;
    }
    // npm run build v2 生产测试环境 (production test)
    case 'v2_dev': {
        redirectToProjectManager = 'https://dev-spm.datareachable.cn/v2/dev';
        redirectToSurveyDistribution = 'https://dev-dist.datareachable.cn/v2/dev';
        redirectToSurveyAnalysisReport = 'https://dev-data-proc.datareachable.cn/v2/dev';
        redirectToPlugInEditor = 'https://dev-plugin-system.datareachable.cn/v2-dev/';
        redirectToQeditorDashBoard = 'https://dev-qdashboard.datareachable.cn/v2/dev';
        redirectToProfile = 'https://dev-profile.datareachable.cn/v2/dev';
        redirectToDataProcessing = '';
        break;
    }
    // npm run build-dev 测试环境
    case 'v2_test': {
        redirectToProjectManager = 'https://dev-spm.datareachable.cn/v2/test';
        redirectToSurveyDistribution = 'https://dev-dist.datareachable.cn/v2/test';
        redirectToSurveyAnalysisReport = 'https://dev-data-proc.datareachable.cn/v2/test';
        redirectToPlugInEditor = 'https://dev-plugin-system.datareachable.cn/v2-test/';
        redirectToQeditorDashBoard = 'https://dev-qdashboard.datareachable.cn/v2/test';
        redirectToProfile = 'https://dev-profile.datareachable.cn/v2/test';
        redirectToDataProcessing = '';
        break;
    }
    // 线上生产环境, 正式版本
    case 'production': {
        redirectToProjectManager = 'https://dev-spm.datareachable.cn/v2/dev';
        redirectToSurveyDistribution = 'https://dev-dist.datareachable.cn/v2/dev';
        redirectToSurveyAnalysisReport = 'https://anlys.dev.datareachable.net/v1/dev';
        redirectToPlugInEditor = 'https://dev-plugin-system.datareachable.cn/v2-dev/';
        redirectToQeditorDashBoard = 'https://dev-qdashboard.datareachable.cn/v2/dev';
        redirectToProfile = 'https://dev-profile.datareachable.cn/v2/dev';
        redirectToDataProcessing = '';

        break;
    }
    // 其他环境
    default: {
        redirectToProjectManager = 'https://dev-spm.datareachable.cn/v2/dev';
        redirectToSurveyDistribution = 'https://dev-dist.datareachable.cn/v2/dev';
        redirectToSurveyAnalysisReport = 'https://anlys.dev.datareachable.net/v1/dev';
        redirectToPlugInEditor = 'https://dev-plugin-system.datareachable.cn/v2-dev/';
        redirectToQeditorDashBoard = 'https://dev-qdashboard.datareachable.cn/v2/dev';
        redirectToProfile = 'https://dev-profile.datareachable.cn/v2/dev';
        redirectToDataProcessing = '';

        break;
    }
}

export {
    dataProcessingLoginEntry,
    redirectToSignOutPage,
    redirectToProjectManager,
    redirectToSurveyDistribution,
    redirectToSurveyAnalysisReport,
    redirectToPlugInEditor,
    redirectToQeditorDashBoard,
    redirectToProfile,
    redirectToDataProcessing,
};
