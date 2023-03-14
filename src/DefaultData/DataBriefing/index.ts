export const viewList = [
    {
        view_id: '1',
        name: 'view_01',
    },
    {
        view_id: '2',
        name: 'view_02',
    },
    {
        view_id: '3',
        name: 'view_03',
    },
];

export const dataSource = {
    '1': {
        question_name: '问题1',
        labels: ['一月', '二月', '三月', '四月'],
        option: ['选项1', '选项2', '选项3', '选项4'],
        datasets: [
            [47, 2, 97, 10],
            [26, 93, 28, 43],
            [14, 32, 34, 21],
            [30, 64, 85, 61],
        ],
    },
    '2': {
        question_name: '问题1',
        labels: ['星期一', '星期二', '星期三', '星期四'],
        option: ['选项1', '选项2', '选项3', '选项4'],
        datasets: [
            [52, 98, 13, 21],
            [70, 88, 52, 42],
            [17, 60, 89, 87],
            [44, 22, 75, 15],
        ],
    },
    '3': {
        question_name: '问题1',
        labels: ['第一天', '第二天', '第三天', '第四天'],
        option: ['选项1', '选项2', '选项3', '选项4'],
        datasets: [
            [29, 59, 33, 5],
            [2, 25, 88, 84],
            [70, 57, 82, 60],
            [95, 86, 69, 74],
        ],
    },
};
export const viewInfo = {
    name: 'view_01', // (视角名)
    id: '1', // (视角id)
    questions: [
        {
            // (题目)
            name: '题目1', // (题目名)
            id: '1', // (题目id)
            chart_option: {
                // (图表选项)
                chart_type: 'bar', // (图表类型)
                coordinate_y_type: 1, // (纵坐标类型 数值/百分比)
                specific_value: true, // (是否在图表中显示具体数值)
                max: 100, // (最大值)
                min: 0, // (最小值)
                reference_line: true, // ()设置坐标参考线
            },
            data: {
                labels: ['一月', '二月', '三月', '四月'],
                datasets: [
                    {
                        value: [47, 2, 97, 10],
                        label: '选项1', //纵轴选项
                        color: '#826AF9',
                    },
                    {
                        value: [26, 93, 28, 43],
                        label: '选项2', //纵轴选项
                        color: '#2CD8C5',
                    },
                    {
                        value: [14, 32, 34, 21],
                        label: '选项3', //纵轴选项
                        color: '#FF9345',
                    },
                    {
                        value: [30, 64, 85, 61],
                        label: '选项4', //纵轴选项
                        color: '#FFE700',
                    },
                ],
            },
        },
        {
            // (题目)
            name: '题目2', // (题目名)
            id: '2', // (题目id)
            chart_option: {
                // (图表选项)
                chart_type: 'bar', // (图表类型)
                coordinate_y_type: 1, // (纵坐标类型 数值/百分比)
                specific_value: true, // (是否在图表中显示具体数值)
                max: 100, // (最大值)
                min: 0, // (最小值)
                reference_line: true, // ()设置坐标参考线
            },
            data: {
                labels: ['星期一', '星期二', '星期三', '星期四'],
                datasets: [
                    {
                        value: [52, 98, 13, 21],
                        label: '选项1', //纵轴选项
                        color: '#2CD8C5',
                    },
                    {
                        value: [70, 88, 52, 42],
                        label: '选项2', //纵轴选项
                        color: '#FF9345',
                    },
                    {
                        value: [17, 60, 89, 87],
                        label: '选项3', //纵轴选项
                        color: '#FF6C40',
                    },
                    {
                        value: [44, 22, 75, 15],
                        label: '选项4', //纵轴选项
                        color: '#BDBDBD',
                    },
                ],
            },
        },
        {
            // (题目)
            name: '题目3', // (题目名)
            id: '3', // (题目id)
            chart_option: {
                // (图表选项)
                chart_type: 'bar', // (图表类型)
                coordinate_y_type: 1, // (纵坐标类型 数值/百分比)
                specific_value: true, // (是否在图表中显示具体数值)
                max: 100, // (最大值)
                min: 0, // (最小值)
                reference_line: true, // ()设置坐标参考线
            },
            data: {
                labels: ['第一天', '第二天', '第三天', '第四天'],
                datasets: [
                    {
                        value: [29, 59, 33, 5],
                        label: '选项1', //纵轴选项
                        color: '#FF9345',
                    },
                    {
                        value: [2, 25, 88, 84],
                        label: '选项2', //纵轴选项
                        color: '#3CBBC7',
                    },
                    {
                        value: [70, 57, 82, 60],
                        label: '选项3', //纵轴选项
                        color: '#2D99FF',
                    },
                    {
                        value: [95, 86, 69, 74],
                        label: '选项4', //纵轴选项
                        color: '#BDBDBD',
                    },
                ],
            },
        },
    ],
};

export const chartsType = [
    {
        id: 1,
        value: '柱状图',
        icon: 'columnChart' as const,
        children: [
            {
                id: 1,
                value: '常规柱状图',
            },
            {
                id: 2,
                value: '分组柱状图',
            },
            {
                id: 3,
                value: '堆叠柱状图',
            },
            {
                id: 4,
                value: '百分比堆叠柱状图',
            },
            {
                id: 5,
                value: '折线柱状图',
            },
        ],
    },
    {
        id: 2,
        value: '条形图',
        icon: 'barChart' as const,
        children: [
            {
                id: 1,
                value: '常规条形图',
            },
            {
                id: 2,
                value: '分组条形图',
            },
            {
                id: 3,
                value: '堆叠条形图',
            },
            {
                id: 4,
                value: '百分比堆叠条形图',
            },
        ],
    },
    {
        id: 3,
        value: '折线图',
        icon: 'lineChart' as const,
        children: [
            {
                id: 1,
                value: '常规折线图',
            },
        ],
    },
    {
        id: 4,
        value: '面积图',
        icon: 'areaChart' as const,
        children: [
            {
                id: 1,
                value: '层叠面积图',
            },
            {
                id: 2,
                value: '堆叠面积图',
            },
        ],
    },
    {
        id: 5,
        value: '饼图',
        icon: 'pieChart' as const,
        children: [
            {
                id: 1,
                value: '常规饼状图',
            },
            {
                id: 2,
                value: '环形图',
            },
        ],
    },
];

export const chartColor = [
    {
        background: 'rgb(169,229,235)',
        opacity: 'rgba(169,229,235,0.7)',
        label: '默认',
    },
    {
        background: 'rgb(138,217,217)',
        opacity: 'rgba(138,217,217,0.7)',
        label: '绿色1',
    },
    {
        background: 'rgb(167,224,158)',
        opacity: 'rgba(167,224,158,0.7)',
        label: '绿色2',
    },
    {
        background: 'rgb(160,197,231)',
        opacity: 'rgba(160,197,231,0.7)',
        label: '蓝色1',
    },
    {
        background: 'rgb(163,158,224)',
        opacity: 'rgba(163,158,224,0.7)',
        label: '紫色1',
    },
    {
        background: 'rgb(200,160,231)',
        opacity: 'rgba(200,160,231,0.7)',
        label: '紫色2',
    },
    {
        background: 'rgb(242,156,166)',
        opacity: 'rgba(242,156,166,0.7)',
        label: '红色1',
    },
    {
        background: 'rgb(251,191,234)',
        opacity: 'rgba(251,191,234,0.7)',
        label: '红色2',
    },
    {
        background: 'rgb(255,224,136)',
        opacity: 'rgba(255,224,136,0.7)',
        label: '黄色1',
    },
    {
        background: 'rgb(221,240,145)',
        opacity: 'rgba(221,240,145,0.7)',
        label: '黄色2',
    },
];

export const chartColorList = [
    'rgb(169,229,235)',
    'rgb(167,224,158)',
    'rgb(163,158,224)',
    'rgb(242,156,166)',
    'rgb(255,224,136)',
    'rgb(138,217,217)',
    'rgb(160,197,231)',
    'rgb(200,160,231)',
    'rgb(251,191,234)',
    'rgb(221,240,145)',
];
