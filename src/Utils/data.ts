// import { formatDate } from '@datareachable/dr_front_componentlibrary/Components/DataDisplay/DateTimePicker/Unit/timeFormat';

export const weekData = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
export const monthDropDownList = [
    {
        id: 1,
        content: 'January',
    },
    {
        id: 2,
        content: 'February',
    },
    { id: 3, content: 'March' },
    {
        id: 4,
        content: 'April',
    },
    {
        id: 5,
        content: 'May',
    },
    {
        id: 6,
        content: 'June',
    },
    {
        id: 7,
        content: 'July',
    },
    {
        id: 8,
        content: 'August',
    },
    {
        id: 9,
        content: 'September',
    },
    {
        id: 10,
        content: 'October',
    },
    {
        id: 11,
        content: 'November',
    },
    {
        id: 12,
        content: 'December',
    },
];
/**
 *
 * @param {number} length =>  The length to be cut
 * @param {number} val => The value to intercept
 * @returns {string}
 */

export const addZero = (length: number, val: number): string => {
    let str = '';
    for (let i = 0; i < length; i++) {
        str += '0';
    }
    str += val;
    return str.substring(str.length - length, str.length);
};
/**
 *
 * @param {number} year
 * @param {number} month
 * @param {number} day
 * @returns {string}
 */
export const formatDate = (y: number, m: number, d: number): string => {
    return `${monthDropDownList[m - 1].content.slice(0, 3)} ${addZero(2, d)},${y}`;
};

/**
 * @param d 时间
 * @param format 转化后的时间格式
 * @param p1 年月日之间的分隔符
 * @param p2 时分秒之间的分隔符
 */
export const dataFormat = (d: string, format: string, p1: string, p2?: string) => {
    const date = new Date(d);
    let arr1: string[] = [];
    let arr2: string[] = [];
    if (p2) {
        const a = format.split(' ');
        arr1 = a[0].split(p1);
        arr2 = a[1].split(p2);
    } else {
        arr1 = format.split(p1);
    }
    const times1: string[] = [];
    const times2: string[] = [];
    arr1.forEach((i) => {
        switch (i) {
            case 'YYYY':
                times1.push(addZero(4, date.getUTCFullYear()));
                break;
            case 'MM':
                times1.push(addZero(2, date.getUTCMonth() + 1));
                break;
            case 'DD':
                times1.push(addZero(2, date.getUTCDate()));
                break;
            default:
                break;
        }
    });
    arr2.forEach((i) => {
        switch (i) {
            case 'hh':
                times2.push(addZero(2, date.getUTCHours()));
                break;
            case 'mm':
                times2.push(addZero(2, date.getUTCMinutes()));
                break;
            case 'ss':
                times2.push(addZero(2, date.getUTCSeconds()));
                break;
            default:
                break;
        }
    });
    return `${times1.join(p1)} ${times2.join(p2)}`;
};

/**
 *
 * @param d
 * @returns 返回的字符串为 日/月/年 的格式  eg: 10/11/2021
 */
export const date_DMY = (d: string): string => {
    const data = new Date(d);
    const year = data.getFullYear();
    const month = data.getMonth() + 1;
    const day = data.getDate();
    return `${day}/${month}/${year}`;
};

/**
 *
 * @param d
 * @returns 返回的字符串为 月/日/年 的格式  eg: nov/08/2021
 */
export const date_MDY = (d: string): string => {
    const date = new Date(d);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const md = formatDate(year, month, day).split(',')[0].split(' ');
    const y = formatDate(year, month, day).split(',')[1];
    const arr = [...md, y];
    return arr.join('/');
};

/**
 *
 * @param d
 * @returns 返回的字符串为 年-月-日 的格式  eg: 2021-12-02
 */
export const date_YMD = (time: { year: number; month: number; day: number }): string => {
    const { year, month, day } = time;
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    const mm: string = (month >= 10 ? month : '0' + month) as string;
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    const dd: string = (day >= 10 ? day : '0' + day) as string;
    return `${year}-${mm}-${dd}`;
};

/**
 * 时间翻译
 */
export const handleDateTime = (lan: string, d: string) => {
    const date = new Date(d);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    if (lan === 'EN') {
        const md = formatDate(year, month, day).split(',')[0].split(' ');
        const arr = [...md, year];
        return arr.join('/');
    } else {
        return `${addZero(2, month)}/${addZero(2, day)}/${year}`;
    }
};

/** 绑定表单弹框中的时间格式 */
export const dateFormat_bindSurvey = (time: string, lan: string) => {
    const date = new Date(time);
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    if (lan === 'EN') {
        return `${monthDropDownList[month].content} ${addZero(2, day)}, ${year}`;
    } else {
        return `${year}-${addZero(2, month + 1)}-${addZero(2, day)}`;
    }
};

/** 手动添加回复列表中的时间格式 */
export const dateFormat_manualLink = (time: string, lan: string) => {
    const date = new Date(time);

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const h = hour > 12 ? hour - 12 : hour;
    if (lan === 'CN') {
        return `${date_YMD({ year, month, day })} ${hour <= 12 ? '上午' : '下午'} ${addZero(
            2,
            h,
        )}:${addZero(2, minute)}`;
    } else {
        return `${monthDropDownList[month - 1].content.slice(0, 3)} ${addZero(
            2,
            day,
        )}, ${year} ${addZero(2, h)}:${addZero(2, minute)} ${hour <= 12 ? 'AM' : 'PM'}`;
    }
};
