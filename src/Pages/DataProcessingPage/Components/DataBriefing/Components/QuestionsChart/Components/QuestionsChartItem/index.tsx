/**
 * @file QuestionsChartItem
 * @date 2022-09-06
 * @author liaoli
 * @lastModify liaoli 2022-09-06
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { MultiDropDown, Icon, Popover } from '@datareachable/dr_front_componentlibrary';
import {
    ChartJS,
    Charts,
    extendOption,
} from '@datareachable/dr_front_componentlibrary/Components/Zmz/Charts';
import style from './style.scss';
import { ViewType } from '~/Store/JobView/types';
import {
    getChartTypeOption,
    chartDataSets,
    getChartType,
    showChartIcon,
    chartLabel,
    getChartGuides,
    getChartData,
} from './utils';
import { RootState } from '~/Store/rootReducer';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { DropDownListV2 } from '@datareachable/dr_front_componentlibrary/Components/Zmz/DropDownListV2';
import { JobQuestionType } from '~/Store/JobList/types';
import { QList } from '~/Utils/loopNodeUtils';

ChartJS.register(ChartDataLabels);
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
// eslint-disable-next-line @typescript-eslint/no-empty-interface

type ChartOptionType = extendOption & {
    plugins?: {
        customCanvasBackgroundColor?: {
            color: string;
        };
    };
};

type LabelType = {
    id: string;
    content: string;
};

interface QuestionsChartItemProps {
    chartData: ViewType;
    handleSwitchChart;
    selectChartId: string;
    isWriter: boolean;
    viewId: string;
    handleChartSetting;
}
const QuestionsChartItem: React.FC<QuestionsChartItemProps> = ({
    chartData,
    handleSwitchChart,
    selectChartId,
    isWriter,
    viewId,
    handleChartSetting,
}): JSX.Element => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    const { shareView } = useSelector((state: RootState) => state.preparation);
    /**
     * 循环列表
     */
    const [loopLabels, setLoopLabels] = useState<LabelType[][]>([]);
    /**
     * 选中的ID
     */
    const [selectId, setSelectId] = useState('');
    /**
     * job question
     */
    const jobQuestion = useSelector((state: RootState) => state.jobList.getJobQuestion);
    /**
     * 选择的loop
     */
    const [selectLoop, setSelectLoop] = useState<string[]>([]);

    /** 题目选择的选项 */
    const [selectQuestionOptions, setSelectQuestionOptions] = useState<string[]>([]);

    /** 图表元素 */
    const chartRef = useRef<any>(null);

    /** 切换图表元素 */
    const switchChartTypeRef = useRef(null);
    /**
     * job数据
     */
    const getJobResult = useSelector((state: RootState) => state.jobList.getJobResult)?.find(
        (v) => v.stage === 'default processing',
    )?.data.options_count;

    /**
     *
     */
    const newChartData = useMemo(() => {
        let newChartData = JSON.parse(JSON.stringify(chartData)) as ViewType;
        if (!chartData.is_loop) {
            return newChartData;
        }
        if (!jobQuestion) {
            return newChartData;
        }
        const v = jobQuestion.find((item) => item.qid === chartData.id);

        if (v && chartData.id) {
            const newV = JSON.parse(JSON.stringify(v)) as JobQuestionType;
            newChartData = JSON.parse(JSON.stringify(chartData)) as ViewType;
            newV.qid = `${newV.qid}_${selectLoop.join('_')}`;
            const chartDate = getChartData(getJobResult, newV);
            if (chartDate) {
                newChartData.id = newV.qid;
                newChartData.dataSets = chartDate;
                if (newChartData.max === 0) {
                    newChartData.max = Math.max(
                        ...newChartData.labelData.map((v, i) => {
                            return (
                                newChartData.dataSets as { data: (number | undefined)[] }[]
                            ).reduce((num, item) => {
                                return (num += item.data[i] || 0);
                            }, 0);
                        }),
                    );
                }
            }
        }

        return newChartData;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [chartData, selectLoop]);

    /**
     * 更新数据
     */
    useEffect(() => {
        const selectLoop: string[] = [];
        const loopLabels: LabelType[][] = [];
        console.log('chartData', chartData);
        if (chartData.id === selectId) {
            return;
        }
        if (Array.isArray(chartData.text)) {
            chartData.text.forEach((item) => {
                if (typeof item !== 'string' && item.type === 'loopNode') {
                    selectLoop.push('');
                    loopLabels.push(item.labels);
                }
            });
        }

        setSelectId(chartData.id);
        setSelectLoop(selectLoop);
        setLoopLabels(loopLabels);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [chartData]);

    /**
     *
     */
    useEffect(() => {
        let selectQuestionOptions: string[] = [];

        if (newChartData.dataSets.length > 0) {
            selectQuestionOptions = newChartData.dataSets.map((items) => {
                return items.id;
            });
        }

        // console.log('selectQuestionOptions22', selectQuestionOptions);

        setSelectQuestionOptions([...selectQuestionOptions]);
    }, [newChartData.dataSets]);

    console.log('selectQuestionOptions', selectQuestionOptions);

    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/
    const isStack = (newChartData: ViewType) => {
        const stackArr = ['1-3', '1-4', '2-3', '2-4'];
        const type = newChartData.chartsType.join('-');
        return stackArr.includes(type);
    };

    /**
     * 获取节点中文名称
     */
    const getNodeType = (type: string) => {
        let content = '';
        const allTypes = {
            Single: '单选',
            Multi: '多选',
            OpenEnd: '开放',
            Numeric: '数字',
        };
        if (allTypes[type]) {
            content += allTypes[type];
        }
        return content;
    };

    const getText = () => {
        let text = '';
        let loopIndex = 0;
        for (let i = 0; i < newChartData.text.length; i++) {
            const item = newChartData.text[i];
            if (typeof item === 'string') {
                text += item;
                continue;
            }

            if (item.type === 'loopNode') {
                if (selectLoop[loopIndex] && loopLabels[loopIndex]) {
                    const loopItem = loopLabels[loopIndex].find(
                        (it) => it.id === selectLoop[loopIndex],
                    );
                    if (loopItem) {
                        text += loopItem.content;
                    }
                } else {
                    text += '{循环项目}';
                }
                loopIndex++;
            }
        }
        const div = document.createElement('div');
        div.innerHTML = text;
        return div.innerText;
    };

    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <div key={newChartData.id} className={style.question_item}>
            <div className={style.question_title}>
                <p>
                    [{getNodeType(newChartData.type)}-
                    {newChartData.isTwoDimensional ? '二维' : '一维'}]{' '}
                    {newChartData.is_extra && '被访者变量'}
                    {/* {newChartData.text} */}
                    {getText()}
                </p>
                {(!shareView.sign || shareView.isSameOrg) && (
                    <div
                        ref={switchChartTypeRef}
                        className={style.question_changeChartType}
                        onClick={() => {
                            // console.log('newChartData.id', newChartData.id);

                            handleSwitchChart(
                                switchChartTypeRef.current,
                                newChartData.id.split('_')[0],
                            );
                        }}
                    >
                        <Icon
                            className={style.columnChart_icon}
                            type={showChartIcon(newChartData.chartsType[0])}
                        />
                        <Icon
                            style={
                                selectChartId === newChartData.id
                                    ? { transform: 'rotate(270deg)' }
                                    : {}
                            }
                            className={style.changeChart_icon}
                            type="open"
                        />
                    </div>
                )}
            </div>
            <div className={style.changeChart_loopContainer}>
                {loopLabels.length > 0 && (
                    <div className={style.changeChart_loopContainer_left}>
                        <div className={style.changeChart_loopContainer_leftTitle}>循环项目：</div>
                        {loopLabels.map((item, index) => (
                            <DropDownListV2
                                key={index}
                                placeholder="请选择..."
                                defaultValue={selectLoop[index]}
                                labels={item}
                                width="20rem"
                                height="3rem"
                                handleValueChange={(id) => {
                                    selectLoop[index] = id as string;
                                    setSelectLoop([...selectLoop]);
                                }}
                            />
                        ))}
                    </div>
                )}
                {newChartData.isTwoDimensional && (
                    <Popover
                        placement="lt"
                        className={style.questionOption_popover}
                        root={
                            <div className={style.question_option}>
                                <MultiDropDown
                                    focusStyle={{ color: '#f00' }}
                                    separator="/ "
                                    floatingClassName={style.questionOption_kite}
                                    defaultItem={selectQuestionOptions}
                                    handleChange={(v) => {
                                        setSelectQuestionOptions(
                                            newChartData.dataSets
                                                .filter((k) => v.includes(k.id))
                                                .map((k) => k.id),
                                        );
                                    }}
                                    className={style.question_optionSelect}
                                    labelSet={newChartData.dataSets.map((items, index) => {
                                        return {
                                            content: (
                                                <span>{`选项${index + 1}:${items.label}`}</span>
                                            ),
                                            id: items.id,
                                        };
                                    })}
                                    type="multi"
                                />
                            </div>
                        }
                    >
                        {newChartData.dataSets
                            .map((v, i) => {
                                if (selectQuestionOptions.includes(v.id)) {
                                    return `选项${i + 1}: ${v.label}`;
                                }
                                return undefined;
                            })
                            .filter((v) => v)
                            .join('/ ')}
                    </Popover>
                )}
            </div>

            <div className={style.question_charts}>
                <div className={style.chart_header}>
                    <p>点击数</p>
                    {isWriter && (!shareView.sign || shareView.isSameOrg) && (
                        <div className={style.chart_Icon}>
                            {viewId !== '-1' && (
                                <Popover
                                    offset={{
                                        y: -4,
                                    }}
                                    className={style.chartIcon_popover}
                                    placement="ct"
                                    root={
                                        <Icon
                                            className={style.chart_settingIcon}
                                            type="setting"
                                            onClick={() => {
                                                handleChartSetting(newChartData.id);
                                            }}
                                        />
                                    }
                                >
                                    自定义图标
                                </Popover>
                            )}
                            <Popover
                                offset={{
                                    y: -4,
                                }}
                                className={style.chartIcon_popover}
                                placement="ct"
                                root={
                                    <Icon
                                        className={style.chart_exportIcon}
                                        type="exportIcon"
                                        onClick={() => {
                                            const url = chartRef.current.toBase64Image();
                                            const aLink = document.createElement('a');
                                            aLink.href = url;
                                            // aLink.download = newChartData.text;
                                            aLink.download = QList.getText(newChartData.text);
                                            aLink.click();
                                        }}
                                    />
                                }
                            >
                                导出图片
                            </Popover>
                        </div>
                    )}
                </div>
                <Charts
                    ref={chartRef}
                    // dataSets={chartDataSets(newChartData, selectQuestionOptions)}
                    dataSets={chartDataSets(newChartData, selectQuestionOptions)}
                    labelData={chartLabel(newChartData, selectQuestionOptions)}
                    // width="100%"
                    height={loopLabels.length > 0 || newChartData.isTwoDimensional ? 330 : 350}
                    options={
                        {
                            ...getChartTypeOption(newChartData.chartsType.join(''), newChartData),
                            maintainAspectRatio: false,
                            plugins: {
                                datalabels: {
                                    color: '#757575',
                                    anchor:
                                        newChartData.chartsType[0] === 5 || isStack(newChartData)
                                            ? 'center'
                                            : 'end',
                                    align:
                                        newChartData.chartsType[0] === 5 || isStack(newChartData)
                                            ? 'center'
                                            : 'end',
                                    offset: -7,
                                    display: newChartData.specificValue ? true : false,
                                    formatter: (value) => {
                                        const scales = getChartTypeOption(
                                            newChartData.chartsType.join(''),
                                            newChartData,
                                        ).scales;
                                        if (
                                            (newChartData.chartsType[0] === 5 &&
                                                newChartData.yType === 1) ||
                                            newChartData.chartsType[1] === 4
                                        ) {
                                            return value
                                                ? `${parseFloat((value as number)?.toFixed(2))}%`
                                                : '';
                                        } else if (value && newChartData.yType === 1) {
                                            return (
                                                `${parseFloat(
                                                    (
                                                        (value / (scales?.y.max || scales?.x.max)) *
                                                        100
                                                    ).toFixed(0),
                                                )}%` || ''
                                            );
                                        } else {
                                            return value
                                                ? `${parseFloat((value as number)?.toFixed(2))}`
                                                : '';
                                        }
                                    },
                                },
                                legend: {
                                    display:
                                        newChartData.isTwoDimensional ||
                                        newChartData.chartsType[0] === 5
                                            ? true
                                            : false,
                                },
                                arbitraryLine: getChartGuides(newChartData.yGuides),
                                // responsive: true,
                                fixedLegendWidth: {
                                    widthVal: 110,
                                },
                                customCanvasBackgroundColor: {
                                    color: '#fff',
                                },
                                tooltip: {
                                    enabled: false,
                                    external: (context) => {
                                        // Tooltip Element
                                        const { chart, tooltip } = context;

                                        let tooltipEl =
                                            chart.canvas.parentNode?.querySelector('div');

                                        if (!tooltipEl) {
                                            tooltipEl = document.createElement('div');
                                            tooltipEl.setAttribute(
                                                'style',
                                                `
                                                    background: rgba(0, 0, 0, 0.7);
                                                    border-radius: 3px;
                                                    color: #fff;
                                                    opacity: 1;
                                                    pointer-events: none;
                                                    position: absolute;
                                                    transform: translate(-50%, 0);
                                                    transition: opacity .1s ease;
                                                `,
                                            );
                                            const container = document.createElement('div');
                                            container.style.margin = '0px';

                                            tooltipEl.appendChild(container);
                                            chart.canvas.parentNode?.appendChild(tooltipEl);
                                        }

                                        // Hide if no tooltip
                                        if (tooltip.opacity === 0) {
                                            tooltipEl.style.opacity = '0';
                                            return;
                                        }

                                        // Set Text
                                        if (tooltip.body) {
                                            const div = document.createElement('div');
                                            if (
                                                (tooltip.dataPoints[0].formattedValue &&
                                                    newChartData.yType === 1) ||
                                                newChartData.chartsType[1] === 4
                                            ) {
                                                const scales = getChartTypeOption(
                                                    newChartData.chartsType.join(''),
                                                    newChartData,
                                                ).scales;
                                                if (newChartData.chartsType[0] === 5) {
                                                    div.innerText = tooltip.dataPoints[0]
                                                        .formattedValue
                                                        ? `${tooltip.dataPoints[0].formattedValue}%`
                                                        : '';
                                                } else {
                                                    div.innerText = `${parseInt(
                                                        (
                                                            (Number(
                                                                tooltip.dataPoints[0]
                                                                    .formattedValue,
                                                            ) /
                                                                (scales?.y.max || scales?.x.max)) *
                                                            100
                                                        ).toFixed(2),
                                                    )}%`;
                                                }
                                            } else {
                                                div.innerText =
                                                    tooltip.dataPoints[0].formattedValue;
                                            }

                                            const divRoot = tooltipEl.querySelector('div');

                                            // Remove old children
                                            while (divRoot?.firstChild) {
                                                divRoot?.firstChild.remove();
                                            }

                                            divRoot?.appendChild(div);
                                        }

                                        const { offsetLeft: positionX, offsetTop: positionY } =
                                            chart.canvas;

                                        // Display, position, and set styles for font
                                        tooltipEl.style.opacity = '1';
                                        tooltipEl.style.left = `${positionX}${tooltip.caretX}px`;
                                        tooltipEl.style.top = `${positionY}${tooltip.caretY}px`;

                                        // tooltipEl.style.font = tooltip.options.bodyFont.string;
                                        tooltipEl.style.padding = `0.4rem 0.6rem`;
                                    },
                                },
                            },
                        } as ChartOptionType
                    }
                    plugins={[
                        {
                            id: 'customCanvasBackgroundColor',
                            beforeDraw: (chart) => {
                                const { ctx } = chart;
                                ctx.save();
                                ctx.globalCompositeOperation = 'destination-over';
                                ctx.fillStyle = '#fff';
                                ctx.fillRect(0, 0, chart.width, chart.height);
                                ctx.restore();
                            },
                        },
                    ]}
                    type={getChartType(newChartData.chartsType)}
                />
            </div>
        </div>
    );
};
export default QuestionsChartItem;
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
