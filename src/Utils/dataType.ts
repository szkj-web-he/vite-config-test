import { Descendant } from '@datareachable/dr_front_componentlibrary';

/** 转换为可用于参数的权限 */
export const changeRoleForParams = (role: string): string => {
    switch (role) {
        case '可编辑':
        case 'Writer':
        case 'writer':
            return 'distr_writer';
        case '可评论':
        case 'Commenter':
        case 'commenter':
            return 'distr_commenter';
        case '可分配任务':
        case 'Task Giver':
        case 'task_giver':
            return 'distr_task_giver';
        default:
            return role;
    }
};

/** handle role icon */
export const handleRoleIcon = (role: string): string => {
    switch (role) {
        case 'task_giver':
            return 'taskGiver';
        default:
            return role?.toLocaleLowerCase();
    }
};

/** role change */
export const roleChange = (role: string): string => {
    switch (role) {
        case 'writer':
        case 'distr_writer':
            return 'writer';
        case 'task_giver':
        case 'distr_task_giver':
            return 'task_giver';
        case 'commenter':
        case 'distr_commenter':
            return 'commenter';
        case 'reader':
        case 'distr_reader':
            return 'reader';
        default:
            return role;
    }
};

/** 处理distributor的类型 */
export const handleDistributorType = (type: number) => {
    switch (type) {
        case 0:
            return 'weblink';
        case 1:
            return 'mail';
        case 2:
            return 'vector';
        default:
            break;
    }
};

/** 保留两位小数 */
export const handleNumber = (num: number): string => {
    const number = num || 0;
    return `${Math.round(number * 100 * 100) / 100}%`;
};

/** 两个对象比较
 *  true: 一样
 *  false:不一样
 */
export function objCompare<T extends object>(object1: T, object2: T): boolean {
    const o1keys = Object.keys(object1);
    const o2keys = Object.keys(object2);
    // if (o2keys.length !== o1keys.length) return false;
    for (let i = 0; i <= o1keys.length - 1; i++) {
        const key = o1keys[i];
        // console.log(key);
        if (!o2keys.includes(key)) return false;
        if (typeof object1[key] === 'object') {
            // console.log(key);
            const status = objCompare(object1[key], object2[key]);
            // console.log(status);
            if (!status) {
                return status;
            }
        } else {
            // console.log(key);
            if (object2[key] !== object1[key]) {
                return false;
            }
        }
    }
    return true;
}

/** 处理富文本 */
export const handleText = (value: string) => {
    if (!value) {
        return [{ children: [{ text: '' }] }];
    }
    let text: Descendant[];
    if (value.includes('[{"children":[{"text":')) {
        text = JSON.parse(value);
    } else {
        text = [{ children: [{ text: value }] }];
    }
    return text;
};
