export const scriptList = [
    {
        id: 'count',
        name: '统计类',
        scripts: [
            {
                id: '答案条目数统计-一维单选',
                name: '答案条目数统计-一维单选',
            },
            {
                id: '答案条目数统计-二维单选',
                name: '答案条目数统计-二维单选',
            },
            {
                id: '答案条目数统计-一维多选',
                name: '答案条目数统计-一维多选',
            },
            {
                id: '答案条目数统计-二维多选',
                name: '答案条目数统计-二维多选',
            },
            {
                id: '答案条目数统计-一维开放',
                name: '答案条目数统计-一维开放',
            },
            {
                id: '答案条目数统计-二维开放',
                name: '答案条目数统计-二维开放',
            },
            {
                id: '答案条目数统计-一维数字',
                name: '答案条目数统计-一维数字',
            },
            {
                id: '答案条目数统计-二维数字',
                name: '答案条目数统计-二维数字',
            },
        ],
    },
    {
        id: 'count',
        name: '运算类',
        scripts: [
            {
                id: '+',
                name: '数字题基础运算-加法',
            },
            {
                id: '-',
                name: '数字题基础运算-减法',
            },
            {
                id: '*',
                name: '数字题基础运算-乘法',
            },
            {
                id: '/',
                name: '数字题基础运算-除法',
            },
        ],
    },
];

export const actionScriptList = [
    {
        id: '1',
        name: '通知类',
        scripts: [
            {
                id: '根据被访者变量发送短信警告',
                name: '短信通知-异常值预警',
            },
            {
                id: '根据被访者变量发送邮箱警告',
                name: '邮件通知-异常值预警',
            },
            {
                id: 'sendMessage',
                name: '短信通知-全局变量',
            },
            {
                id: 'sendEmail',
                name: '邮件通知-全局变量',
            },
        ],
    },
];

export const respondentVariable = [
    {
        id: '1',
        name: '被访者变量001',
    },
    {
        id: '2',
        name: '被访者变量002',
    },
    {
        id: '3',
        name: '被访者变量003',
    },
    {
        id: '4',
        name: '被访者变量004',
    },
    {
        id: '5',
        name: '被访者变量005',
    },
];

export const globalVariable = [
    {
        id: '1',
        name: '全局变量001',
    },
    {
        id: '2',
        name: '全局变量002',
    },
    {
        id: '3',
        name: '全局变量003',
    },
    {
        id: '4',
        name: '全局变量004',
    },
    {
        id: '5',
        name: '全局变量005',
    },
];

export const respondentsVarType: {
    id: string;
    text: string;
    icon: 'singleChoiceUnselected' | 'multipleLinear' | 'openEnd2' | 'Numeric';
}[] = [
    {
        id: 'Single',
        text: '单选题',
        icon: 'singleChoiceUnselected',
    },
    {
        id: 'Multi',
        text: '多选题',
        icon: 'multipleLinear',
    },
    {
        id: 'OpenEnd',
        text: '开放题',
        icon: 'openEnd2',
    },
    {
        id: 'Numeric',
        text: '数字题',
        icon: 'Numeric',
    },
];

export const globalVarType = [
    {
        id: 'number',
        text: '数字类',
        icon: 'Numeric' as const,
    },
    {
        id: 'string',
        text: '字符串类',
        icon: 'StringClass' as const,
    },
];
