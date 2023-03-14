import { chartColor, chartColorList } from '~/DefaultData/DataBriefing';
import { JobQuestionType } from '~/Store/JobList/types';
import { ViewType } from '~/Store/JobView/types';
import { QList } from '~/Utils/loopNodeUtils';

export const chartDataSets = (chartData: ViewType, selectQuestionOptions: string[]) => {
    if (chartData.chartsType[0] === 5 && chartData.yType === 1) {
        if (chartData.isTwoDimensional) {
            return chartData.labelData.map((v, i) => {
                const obj: {
                    backgroundColor: string[];
                    data: (number | null)[];
                    label: string;
                    maxBarThickness: number;
                } = {
                    backgroundColor: [],
                    data: [],
                    label: '',
                    maxBarThickness: 30,
                };
                selectQuestionOptions.forEach((item) => {
                    const currentObj = chartData.dataSets.find((v) => v.id === item);
                    obj.backgroundColor.push(currentObj?.backgroundColor as string);
                    obj.data.push(currentObj?.data[i] || null);
                    obj.label = v.value;
                });

                const total = obj.data.reduce((num: number, v) => {
                    return (num += v || 0);
                }, 0);
                obj.data = obj.data.map((v) => {
                    return ((v || 0) / total) * 100 || null;
                });

                return obj;
            });
        } else {
            return selectQuestionOptions.map((items) => {
                const obj = chartData.dataSets?.find((v) => v.id === items);
                const total = obj?.data.reduce((num: number, v) => {
                    return (num += v || 0);
                }, 0);
                const data = obj?.data.map((v) => {
                    return ((v || 0) / (total || 0)) * 100 || null;
                });
                return {
                    backgroundColor:
                        typeof obj?.backgroundColor === 'string'
                            ? obj.backgroundColor
                            : obj?.backgroundColor?.map((i) => i.value),
                    data: data || [],
                    label: obj?.label,
                    maxBarThickness: 30,
                };
            });
        }
    } else if (chartData.chartsType[0] === 5 && chartData.isTwoDimensional) {
        return chartData.labelData.map((v, i) => {
            const obj: {
                backgroundColor: string[];
                data: (number | null)[];
                label: string;
                maxBarThickness: number;
            } = {
                backgroundColor: [],
                data: [],
                label: '',
                maxBarThickness: 30,
            };
            selectQuestionOptions.forEach((item) => {
                const currentObj = chartData.dataSets.find((v) => v.id === item);
                obj.backgroundColor.push(currentObj?.backgroundColor as string);
                obj.data.push(currentObj?.data[i] || null);
                obj.label = v.value;
            });
            return obj;
        });
    } else if (chartData.chartsType.join('') === '14' || chartData.chartsType.join('') === '24') {
        const totle = chartData.labelData.map((item, index) => {
            return selectQuestionOptions.reduce((num, item) => {
                return (num += chartData.dataSets.find((v) => v.id == item)?.data[index] || 0);
            }, 0);
        });

        return selectQuestionOptions.map((items) => {
            const obj = chartData.dataSets?.find((v) => v.id === items);

            return {
                backgroundColor:
                    typeof obj?.backgroundColor === 'string'
                        ? obj.backgroundColor
                        : obj?.backgroundColor?.map((i) => i.value),
                data: obj?.data?.map((v, i) => ((v as number) / totle[i]) * 100) || [],
                label: obj?.label,
                maxBarThickness: 30,
            };
        });
    } else if (chartData.chartsType[0] === 4) {
        return selectQuestionOptions.map((items) => {
            const obj = chartData.dataSets?.find((v) => v.id === items);
            return {
                backgroundColor:
                    typeof obj?.backgroundColor === 'string'
                        ? chartColor.find((v) => v.background === obj.backgroundColor)?.opacity
                        : obj?.backgroundColor?.map(
                              (i) => chartColor.find((j) => j.background === i.value)?.opacity,
                          ),
                data: obj?.data?.map((v) => Number(v) || null) || [],
                label: obj?.label,
                maxBarThickness: 30,
                fill: true,
                borderColor:
                    typeof obj?.backgroundColor === 'string'
                        ? obj.backgroundColor
                        : obj?.backgroundColor?.map((i) => i.value),
            };
        });
    } else {
        return selectQuestionOptions.map((items) => {
            const obj = chartData.dataSets?.find((v) => v.id === items);
            console.log('obj', obj);

            return {
                backgroundColor:
                    typeof obj?.backgroundColor === 'string'
                        ? obj.backgroundColor
                        : obj?.backgroundColor?.map((i) => i.value),
                fill: false,
                data:
                    obj?.data?.map((v) => {
                        if (!isNaN(Number(v))) {
                            return Number(v);
                        } else {
                            return null;
                        }
                    }) || [],
                label: obj?.label,
                maxBarThickness: 30,
            };
        });
    }
};

const getSpanInner = (str: string) => {
    const res = str.match(/<span[^>]*>([\s\S]*?)<\/span>/);
    return res ? res[1] : str ? str : '选项1';
};

/** 生成默认颜色 */
const getColor = (index: number) => {
    return chartColorList[index % chartColorList.length];
};
/** 通过答案和问题生成默认的表格数据 */
export const getChartData = (jobResult: object | undefined, v: JobQuestionType) => {
    if (!jobResult) return;
    const isTwoDimensional = v.q_dimension.length > 1;
    switch (v.q_type) {
        case 'Single':
            if (isTwoDimensional) {
                return v.q_dimension?.[0]?.map((item, index) => {
                    const data = v.q_dimension?.[1]?.map((items) => {
                        return jobResult[`${v.qid}#${item.option_code}`]?.[items.option_code] as
                            | number
                            | undefined;
                    });
                    return {
                        data,
                        backgroundColor: getColor(index),
                        label: getSpanInner(item.option_text),
                        id: item.option_code,
                    };
                });
            } else {
                const data = v.q_dimension?.[0]?.map((item) => {
                    return jobResult[v.qid]?.[item.option_code] as number | undefined;
                });
                return [
                    {
                        data,
                        backgroundColor: v.q_dimension?.[0].map((i, index) => ({
                            id: i.option_code,
                            value: getColor(index),
                        })),
                        label: QList.getText(v.q_text),
                        id: '-1',
                    },
                ];
            }
        default:
            if (isTwoDimensional) {
                return v.q_dimension?.[0]?.map((item, index) => {
                    const data = v.q_dimension?.[1]?.map((items) => {
                        return jobResult[`${v.qid}#${item.option_code}_${items.option_code}`]?.[
                            '1'
                        ] as number | undefined;
                    });
                    return {
                        data,
                        backgroundColor: getColor(index),
                        label: getSpanInner(item.option_text),
                        id: item.option_code,
                    };
                });
            } else {
                const data = v.q_dimension?.[0]?.map((item) => {
                    console.log('job', v.qid);
                    console.log('job', item.option_code);
                    console.log('code', `${v.qid}#${item.option_code}`);

                    return jobResult[`${v.qid}#${item.option_code}`]?.['1'] as number | undefined;
                });
                return [
                    {
                        data,
                        backgroundColor: v.q_dimension?.[0].map((i, index) => ({
                            id: i.option_code,
                            value: getColor(index),
                        })),
                        label: QList.getText(v.q_text),
                        id: '-1',
                    },
                ];
            }
    }
};
export const getChartTypeOption = (
    type: string,
    chartData: ViewType,
): {
    scales?: {
        [v: string]: any;
    };
    indexAxis?: 'x' | 'y';
    plugins?: {
        [v: string]: any;
    };
} => {
    // const max =
    //     chartData.yType === 1 || chartData.isTwoDimensional
    //         ? Math.max(
    //               ...chartData.labelData.map((v, i) => {
    //                   return chartData.dataSets.reduce((num, item) => {
    //                       return (num += item.data[i] || 0);
    //                   }, 0);
    //               }),
    //           )
    //         : chartData.max;

    const max = chartData.max;

    const min = chartData.yType !== 1 ? chartData.min : 0;

    const commonScales: { [v: string]: any } = {
        x: {
            grid: {
                display: false,
            },
        },
        y: {
            grid: {
                borderDash: [5],
            },
        },
    };
    if (chartData.yType === 1) {
        if (type.charAt(0) === '2') {
            commonScales.x.ticks = {
                callback(v) {
                    return ((v / max) * 100).toFixed(0) + '%';
                },
            };
        } else {
            commonScales.y.ticks = {
                callback(v) {
                    return ((v / max) * 100).toFixed(0) + '%';
                },
            };
        }
    }
    switch (type) {
        case '11':
            commonScales.y.max = max;
            commonScales.y.min = min;
            return {
                indexAxis: 'x',
                scales: commonScales,
            };
        case '12':
            commonScales.y.max = max;
            commonScales.y.min = min;
            return {
                indexAxis: 'x',
                scales: commonScales,
            };
        case '13':
            commonScales.y.max = max;
            commonScales.y.min = min;
            commonScales.y.stacked = true;
            commonScales.x.stacked = true;
            return {
                indexAxis: 'x',
                scales: commonScales,
            };
        case '14':
            commonScales.y.max = 100;
            commonScales.y.min = 0;
            commonScales.x.stacked = true;
            commonScales.y.stacked = true;
            commonScales.y.ticks = {
                callback(v) {
                    return `${v as string}%`;
                },
            };
            return {
                indexAxis: 'x',
                scales: commonScales,
            };
        case '15':
            commonScales.y.max = max;
            commonScales.y.min = min;
            commonScales.y.stacked = true;
            commonScales.x.stacked = true;
            return {
                indexAxis: 'x',
                scales: commonScales,
            };
        case '21':
            commonScales.x.max = max;
            commonScales.x.min = min;
            commonScales.x.grid = { borderDash: [5] };
            commonScales.y.grid = { display: false };
            return {
                indexAxis: 'y',
                scales: commonScales,
            };
        case '22':
            commonScales.x.max = max;
            commonScales.x.min = min;
            commonScales.x.grid = { borderDash: [5] };
            commonScales.y.grid = { display: false };
            return {
                indexAxis: 'y',
                scales: commonScales,
            };
        case '23':
            commonScales.x.max = max;
            commonScales.x.min = min;
            commonScales.x.stacked = true;
            commonScales.y.stacked = true;
            commonScales.x.grid = { borderDash: [5] };
            commonScales.y.grid = { display: false };
            return {
                indexAxis: 'y',
                scales: commonScales,
            };
        case '24':
            commonScales.x.max = 100;
            commonScales.x.min = 0;
            commonScales.x.stacked = true;
            commonScales.y.stacked = true;
            commonScales.x.grid = { borderDash: [5] };
            commonScales.y.grid = { display: false };
            commonScales.x.ticks = {
                callback(v) {
                    return `${v as string}%`;
                },
            };
            return {
                indexAxis: 'y',
                scales: commonScales,
            };
        case '31':
            commonScales.y.max = max;
            commonScales.y.min = min;
            return {
                indexAxis: 'x',
                scales: commonScales,
            };
        case '41':
            commonScales.y.max = max;
            commonScales.y.min = min;
            return {
                scales: commonScales,
            };
        case '42':
            commonScales.y.max = max;
            commonScales.y.min = min;
            commonScales.y.stacked = true;
            commonScales.x.stacked = true;
            return {
                scales: commonScales,
            };
        case '51':
            return {};
        case '52':
            return {};
        default:
            return {};
    }
};

export const getChartType = (type: number[]): 'bar' | 'line' | 'pie' | 'doughnut' => {
    switch (type?.[0]) {
        case 1:
            return 'bar';
        case 2:
            return 'bar';
        case 3:
            return 'line';
        case 4:
            return 'line';
        case 5:
            if (type[1] === 1) {
                return 'pie';
            } else {
                return 'doughnut';
            }
        default:
            return 'bar';
    }
};

export const showChartIcon = (type) => {
    switch (type) {
        case 1:
            return 'columnChart';
        case 2:
            return 'barChart';
        case 3:
            return 'lineChart';
        case 4:
            return 'areaChart';
        case 5:
            return 'pieChart';
    }
};

export const chartLabel = (chartData: ViewType, selectQuestionOptions: string[]) => {
    if (chartData.chartsType[0] === 5 && chartData.isTwoDimensional) {
        return selectQuestionOptions.map((v) => {
            return chartData.dataSets.find((item) => item.id === v)?.label;
        });
    } else {
        return chartData.labelData.map((v) => v.value);
    }
};

export const getChartGuides = (type: number) => {
    const data: {
        lineColor: string;
        lineType: string;
        position: 'average' | 'max' | 'min';
    } = {
        lineColor: '#22A6B3',
        lineType: 'dash',
        position: 'average',
    };

    switch (type) {
        case 1:
            data.position = 'average';
            break;
        case 2:
            data.position = 'max';
            break;
        case 3:
            data.position = 'min';
            break;
        default:
            return {};
    }
    return data;
};
