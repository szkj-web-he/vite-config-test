import { reg } from './reg';

export const verifyScriptParams = (script: { name: string; args: string[] } | undefined) => {
    if (!script) {
        return false;
    }
    const { name, args } = script;
    switch (name) {
        case '答案条目数统计-一维单选':
            return args[0] && args[1] && args[2];
        case '答案条目数统计-二维单选':
            return args[0] && args[1] && args[2];
        case '答案条目数统计-一维多选':
            return args[0] && args[1];
        case '答案条目数统计-二维多选':
            return args[0] && args[1];
        case '答案条目数统计-一维开放':
            return args[0] && args[1] && args[2];
        case '答案条目数统计-二维开放':
            return args[0] && args[1] && args[2];
        case '答案条目数统计-一维数字':
            return args[0] && args[1];
        case '答案条目数统计-二维数字':
            return args[0] && args[1];
        case 'sendMessage':
            return args[0] && reg.sendMessage.test(args[1]);
        case 'sendEmail':
            return args[0] && reg.sendEmail.test(args[1]);
        case '数字选项-加减乘除':
            return args[1] && args[2] && Array.isArray(args[0]) && !args[0].includes('');
        case '根据被访者变量发送短信警告':
            return args[0] && args[1] && args[2] && reg.sendMessage.test(args[3]);
        case '根据被访者变量发送邮箱警告':
            return args[0] && args[1] && args[2] && reg.sendEmail.test(args[3]);
        default:
            return false;
    }
};
