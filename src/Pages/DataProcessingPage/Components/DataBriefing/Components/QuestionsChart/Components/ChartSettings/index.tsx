/**
 * @file ChartSettings
 * @date 2022-09-02
 * @author liaoli
 * @lastModify liaoli 2022-09-02
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import {
    Alert,
    ScrollComponent,
    DropDownListV2,
    Icon,
    Switch,
    ResetInput,
    Button,
    Kite,
    Popover,
} from '@datareachable/dr_front_componentlibrary';
import React, { useState, useRef, useMemo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import style from './style.scss';
import { chartColor, chartsType } from '~/DefaultData/DataBriefing';
import { RootState } from '~/Store/rootReducer';
import { ViewType } from '~/Store/JobView/types';
import { QList } from '~/Utils/loopNodeUtils';
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
interface ChartSettingsProps {
    id: string;
    viewId: string;
    show: boolean;
    handleClose?: () => void;
    handleQuestionChange: (id: string, viewId: string, data: ViewType) => void;
}
const ChartSettings: React.FC<ChartSettingsProps> = ({
    show,
    id,
    viewId,
    handleClose,
    handleQuestionChange,
}): JSX.Element => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    const viewInfo = useSelector((state: RootState) => state.jobView.getViewInfo);

    const chartInfoRef = useRef<ViewType>(
        JSON.parse(
            JSON.stringify(viewInfo[viewId]?.question?.find((v) => v.id === id)),
        ) as ViewType,
    );

    /** 切换图表 */
    const [showSwitchChartType, setShowSwitchChartType] = useState(() => {
        return {
            group: false,
            type: false,
        };
    });

    /** 行选项内容 */
    const [rowOptions, setRowOption] = useState('');

    /** 列选项内容 */
    const [colOptions, setColOption] = useState('');

    /** 切换图表弹出层 */
    const SwitchChartTypeKite = useRef<HTMLUListElement>(null);

    /** 当前的chartGroup */
    const currentChartGroup = useRef(-1);

    /** 点击更改颜色 */
    const selectColorRef = useRef<Element | null>(null);

    /** 修改哪个颜色 1:行 2:列 */
    const [modifyColor, setModifyColor] = useState<1 | 2>();

    /** 选中的图表类型 */
    const [chartType, setChartType] = useState(() => {
        return {
            group: 1,
            type: 1,
        };
    });

    /** 纵轴参考线与类型 */
    const [chartVerticalAxis, setChartVerticalAxis] = useState(() => {
        return {
            type: 0,
            referenceLine: 0,
        };
    });

    /** 最大值和最小值 */
    const [chartExtremum, setChartExtremum] = useState<{ max: string; min: string }>({
        max: '',
        min: '',
    });

    /** 是否展示具体数值 */
    const [isShowValue, setIsShowValue] = useState(false);

    /************* This section will include this component HOOK function *************/
    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /** 获取当前设置的图表信息 */
    const chartInfo = useMemo(() => {
        return viewInfo[viewId]?.question?.find((item) => item.id === id);
    }, [id, viewId, viewInfo]);

    /** 进行初始化赋值 */
    useEffect(() => {
        if (chartInfo) {
            if (chartInfo.isTwoDimensional) {
                setRowOption(chartInfo.dataSets[0].id);
                setColOption(chartInfo.labelData[0].id);
            } else {
                setRowOption(chartInfo.labelData[0].id);
            }
            setChartVerticalAxis({
                type: chartInfo.yType,
                referenceLine: chartInfo.yGuides,
            });
            setChartExtremum({
                min: chartInfo.min.toString(),
                max: chartInfo.max.toString(),
            });
            setIsShowValue(chartInfo.specificValue);
            setChartType({
                group: chartInfo.chartsType[0],
                type: chartInfo.chartsType[1],
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [chartInfo]);

    /** 不能选择的图表类型 */
    const isNotSelectList = useMemo(() => {
        if (chartInfo) {
            if (chartInfo.isTwoDimensional) {
                return ['11', '21'];
            } else {
                return ['12', '13', '14', '22', '23', '24', '42'];
            }
        }
    }, [chartInfo]);

    /************* This section will include this component parameter *************/
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/

    /** 是否可以保存 */
    const isSave = () => {
        if (JSON.stringify(chartInfoRef.current) === JSON.stringify(chartInfo)) {
            return false;
        }
        if (
            !chartInfoRef.current.text ||
            !chartInfoRef.current?.labelData.find((item) => item.id === rowOptions)?.value ||
            (chartInfoRef.current.isTwoDimensional &&
                !chartInfoRef.current?.dataSets?.find((item) => item.id === colOptions)?.label)
        )
            return false;
        return true;
    };

    /** 把用户没输入的重置 */
    const resetLabel = () => {
        chartInfoRef.current.labelData = chartInfoRef.current.labelData.map((v) => {
            if (v.value.trim()) {
                return v;
            } else {
                return chartInfo?.labelData.find((item) => item.id === v.id) as {
                    id: string;
                    value: string;
                };
            }
        });
        if (chartInfoRef.current.isTwoDimensional) {
            chartInfoRef.current.dataSets = chartInfoRef.current.dataSets.map((v) => {
                if (v.label.trim()) {
                    return v;
                } else {
                    return chartInfo?.dataSets.find((item) => item.id === v.id) as {
                        backgroundColor:
                            | string
                            | {
                                  id: string;
                                  value: string;
                              }[];
                        data: (number | undefined)[];
                        label: string;
                        id: string;
                    };
                }
            });
        }
    };

    /** 图表类型的type */
    const showChartIcon = (type) => {
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

    const switchChartGroupEl = (
        <Kite
            className={style.chartSettings_chartGroup__kite}
            placement="lb"
            handleGlobalClick={(v) => {
                if (!v.isMenu && !v.isBtn && !showSwitchChartType.type) {
                    setShowSwitchChartType({ group: false, type: false });
                    currentChartGroup.current = -1;
                }
            }}
            root={
                <div
                    className={style.chartSettings_changeChartType}
                    onClick={() => {
                        if (showSwitchChartType.group) return;
                        setShowSwitchChartType(
                            Object.assign({}, showSwitchChartType, { group: true }),
                        );
                    }}
                >
                    <div>
                        <Icon
                            className={style.columnChart_icon}
                            type={showChartIcon(chartType.group)}
                        />
                        <p>
                            {chartsType.find((item) => item.id === chartType.group)?.value}/
                            {
                                chartsType
                                    .find((item) => item.id === chartType.group)
                                    ?.children.find((item) => item.id === chartType.type)?.value
                            }
                        </p>
                    </div>
                    <Icon
                        style={showSwitchChartType.group ? { transform: 'rotate(180deg)' } : {}}
                        className={style.changeChart_icon}
                        type="dropdown"
                    />
                </div>
            }
            show={showSwitchChartType.group}
        >
            <ul className={style.chart_chartGroup} ref={SwitchChartTypeKite}>
                {chartsType.map((item) => {
                    return (
                        <li
                            key={item.id}
                            style={
                                item.id === currentChartGroup.current
                                    ? { backgroundColor: '#E9F7F8' }
                                    : {}
                            }
                            onMouseEnter={() => {
                                if (!showSwitchChartType.group) return;
                                currentChartGroup.current = item.id;
                                setShowSwitchChartType({ group: true, type: true });
                            }}
                        >
                            <div
                                className={
                                    item.id === chartInfoRef.current.chartsType[0]
                                        ? style.isSelect_type
                                        : ''
                                }
                            >
                                <Icon type={showChartIcon(item.id)} />
                                <p>{item.value}</p>
                            </div>
                            <Icon type="open" />
                        </li>
                    );
                })}
            </ul>
        </Kite>
    );

    const switchChartTypeEl = SwitchChartTypeKite.current &&
        showSwitchChartType.group &&
        showSwitchChartType.type && (
            <Kite
                className={style.chartSettings_chartType__kite}
                root={SwitchChartTypeKite.current}
                show={showSwitchChartType.group && showSwitchChartType.type}
                placement="rt"
                direction="horizontal"
                offset={{
                    x: 3,
                }}
                handleGlobalClick={(v) => {
                    if (!v.isBtn && !v.isMenu) {
                        setShowSwitchChartType({
                            group: false,
                            type: false,
                        });
                        currentChartGroup.current = -1;
                    }
                }}
            >
                <ul className={style.chart_chartType}>
                    {currentChartGroup.current &&
                        chartsType
                            .find((item) => item.id === currentChartGroup.current)
                            ?.children.map((item) => {
                                return (
                                    <li
                                        style={
                                            item.id === chartInfoRef.current.chartsType[1] &&
                                            currentChartGroup.current ===
                                                chartInfoRef.current.chartsType[0]
                                                ? { color: '#22A6B3' }
                                                : {}
                                        }
                                        className={
                                            isNotSelectList?.includes(
                                                `${currentChartGroup.current}${item.id}`,
                                            )
                                                ? style.chart_chartType__notSelect
                                                : ''
                                        }
                                        key={item.id}
                                        onClick={() => {
                                            if (
                                                isNotSelectList?.includes(
                                                    `${currentChartGroup.current}${item.id}`,
                                                )
                                            ) {
                                                return;
                                            }
                                            setChartType({
                                                group: currentChartGroup.current,
                                                type: item.id,
                                            });
                                            chartInfoRef.current.chartsType = [
                                                currentChartGroup.current,
                                                item.id,
                                            ];

                                            setShowSwitchChartType({
                                                group: false,
                                                type: false,
                                            });
                                            currentChartGroup.current = -1;
                                        }}
                                    >
                                        {item.value}
                                    </li>
                                );
                            })}
                </ul>
            </Kite>
        );
    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <Alert
            custom
            status={show}
            width="80rem"
            height="54rem"
            className={style.chartSettings_alert}
            changeStatus={() => {
                handleClose && handleClose();
            }}
        >
            <div className={style.chartSettings_container}>
                <div className={style.chartSettings_scroll}>
                    <h2 className={style.chartSettings_title}>自定义图表</h2>
                    <p className={style.chartSettings_tips}>在创建的视角中定制数据可视化图表。</p>
                    <ScrollComponent>
                        <div className={style.chartSettings}>
                            <h3 className={style.chartSettings_option}>修改题目题干内容</h3>
                            <ResetInput
                                className={style.editTitle_input}
                                defaultValue={QList.getText(chartInfo?.text ?? '')}
                                onChange={(v) => {
                                    if (typeof v === 'string') {
                                        chartInfoRef.current.text = [v];
                                    }
                                }}
                                width="100%"
                                disabled={chartInfoRef.current.is_loop}
                            />
                            <h3 className={style.chartSettings_option}>修改题目选项内容</h3>
                            <ul className={style.chartSettings_optionContent}>
                                <li>
                                    <p>行选项</p>
                                    <div>
                                        <DropDownListV2
                                            floatingClassName={style.chartSettings_dropDownList}
                                            height="4rem"
                                            width="18rem"
                                            placeholder="选择一个选项"
                                            handleValueChange={(v) => {
                                                setRowOption(v as string);
                                            }}
                                            defaultValue={rowOptions}
                                            labels={chartInfo?.labelData.map((item) => {
                                                return {
                                                    id: item.id,
                                                    content: item.value,
                                                };
                                            })}
                                        />
                                        <ResetInput
                                            width="48.4rem"
                                            height="4rem"
                                            placeholder="在这里修改选项内容"
                                            value={
                                                chartInfoRef.current?.labelData.find(
                                                    (item) => item.id === rowOptions,
                                                )?.value
                                            }
                                            onChange={(v) => {
                                                const row = chartInfoRef.current.labelData?.find(
                                                    (items) => items.id === rowOptions,
                                                );
                                                if (row) {
                                                    row.value = v;
                                                }
                                            }}
                                        />
                                        <Popover
                                            placement="ct"
                                            className={style.switchColors_popover}
                                            root={
                                                <Icon
                                                    type="chooseColor"
                                                    style={
                                                        chartInfo?.isTwoDimensional
                                                            ? {
                                                                  color: '#ccc',
                                                                  backgroundColor: '#F5F5F5',
                                                              }
                                                            : {
                                                                  color: (
                                                                      chartInfoRef.current
                                                                          ?.dataSets[0]
                                                                          .backgroundColor as Array<{
                                                                          id: string;
                                                                          value: string;
                                                                      }>
                                                                  )?.find(
                                                                      (i) => i.id === rowOptions,
                                                                  )?.value,
                                                              }
                                                    }
                                                    onClick={(e) => {
                                                        if (chartInfo?.isTwoDimensional) return;
                                                        selectColorRef.current =
                                                            e.target as Element;
                                                        setModifyColor(1);
                                                    }}
                                                />
                                            }
                                        >
                                            {chartInfo?.isTwoDimensional
                                                ? '二维图表只能更改列选项颜色'
                                                : '切换图表颜色'}
                                        </Popover>
                                    </div>
                                </li>
                                {chartInfo?.isTwoDimensional && (
                                    <li>
                                        <p>列选项</p>
                                        <div>
                                            <DropDownListV2
                                                floatingClassName={style.chartSettings_dropDownList}
                                                height="4rem"
                                                width="18rem"
                                                placeholder="选择一个选项"
                                                handleValueChange={(v) => {
                                                    setColOption(v as string);
                                                }}
                                                defaultValue={colOptions}
                                                labels={chartInfo?.dataSets?.map((item) => {
                                                    return {
                                                        id: item.id,
                                                        content: item.label,
                                                    };
                                                })}
                                            />
                                            <ResetInput
                                                width="48.4rem"
                                                height="4rem"
                                                placeholder="在这里修改选项内容"
                                                value={
                                                    chartInfoRef.current?.dataSets?.find(
                                                        (item) => item.id === colOptions,
                                                    )?.label
                                                }
                                                onChange={(v) => {
                                                    const col =
                                                        chartInfoRef.current?.dataSets?.find(
                                                            (items) => items.id === colOptions,
                                                        );
                                                    if (col) {
                                                        col.label = v;
                                                    }
                                                }}
                                            />
                                            <Popover
                                                placement="ct"
                                                className={style.switchColors_popover}
                                                root={
                                                    <Icon
                                                        type="chooseColor"
                                                        style={{
                                                            color: chartInfoRef.current?.dataSets?.find(
                                                                (item) => item.id === colOptions,
                                                            )?.backgroundColor as string,
                                                        }}
                                                        onClick={(e) => {
                                                            selectColorRef.current =
                                                                e.target as Element;
                                                            setModifyColor(2);
                                                        }}
                                                    />
                                                }
                                            >
                                                切换图表颜色
                                            </Popover>
                                        </div>
                                    </li>
                                )}
                            </ul>
                            <h3 className={style.chartSettings_option}>切换可视化图表类型</h3>
                            {switchChartGroupEl}
                            <div className={style.chartSettings_yAxis}>
                                <div>
                                    <h3 className={style.chartSettings_option}>修改纵轴展示类型</h3>
                                    <DropDownListV2
                                        width="100%"
                                        height="4rem"
                                        floatingClassName={style.chartSettings_yAxisFloating}
                                        labels={[
                                            {
                                                content: '数值',
                                                id: 0,
                                            },
                                            {
                                                content: '百分比',
                                                id: 1,
                                            },
                                        ]}
                                        handleValueChange={(v) => {
                                            setChartVerticalAxis(
                                                Object.assign({}, chartVerticalAxis, { type: v }),
                                            );
                                            chartInfoRef.current.yType = v as number;
                                        }}
                                        defaultValue={chartVerticalAxis.type}
                                    />
                                </div>
                                <div>
                                    <h3 className={style.chartSettings_option}>设置纵轴参考线</h3>
                                    <DropDownListV2
                                        width="100%"
                                        height="4rem"
                                        floatingClassName={style.chartSettings_yAxisFloating}
                                        labels={[
                                            {
                                                content: '不显示',
                                                id: 0,
                                            },
                                            {
                                                content: '平均值',
                                                id: 1,
                                            },
                                            {
                                                content: '最大值',
                                                id: 2,
                                            },
                                            {
                                                content: '最小值',
                                                id: 3,
                                            },
                                        ]}
                                        handleValueChange={(v) => {
                                            setChartVerticalAxis(
                                                Object.assign({}, chartVerticalAxis, {
                                                    referenceLine: v,
                                                }),
                                            );
                                            chartInfoRef.current.yGuides = v as number;
                                        }}
                                        defaultValue={chartVerticalAxis.referenceLine}
                                    />
                                </div>
                            </div>
                            <div>
                                <h3 className={style.chartSettings_option}>纵轴的最大值与最小值</h3>
                                <div className={style.chartSettings_range}>
                                    <ResetInput
                                        width="100%"
                                        height="4rem"
                                        placeholder="最大值"
                                        value={chartExtremum.max}
                                        disabled={chartVerticalAxis.type === 1}
                                        onChange={(v) => {
                                            setChartExtremum(
                                                Object.assign({}, chartExtremum, {
                                                    max: v,
                                                }),
                                            );
                                        }}
                                        onBlur={() => {
                                            if (chartInfo) {
                                                const num = isNaN(parseFloat(chartExtremum.max))
                                                    ? chartInfo.max
                                                    : parseFloat(chartExtremum.max);
                                                setChartExtremum(
                                                    Object.assign({}, chartExtremum, {
                                                        max: num?.toString(),
                                                    }),
                                                );
                                                chartInfoRef.current.max = num;
                                            }
                                        }}
                                    />
                                    <ResetInput
                                        width="100%"
                                        height="4rem"
                                        placeholder="最小值"
                                        value={chartExtremum.min}
                                        disabled={chartVerticalAxis.type === 1}
                                        onChange={(v) => {
                                            setChartExtremum(
                                                Object.assign({}, chartExtremum, {
                                                    min: v,
                                                }),
                                            );
                                        }}
                                        onBlur={() => {
                                            if (chartInfo) {
                                                const num = isNaN(parseFloat(chartExtremum.min))
                                                    ? chartInfo.min
                                                    : parseFloat(chartExtremum.min);
                                                setChartExtremum(
                                                    Object.assign({}, chartExtremum, {
                                                        min: num?.toString(),
                                                    }),
                                                );
                                                chartInfoRef.current.min = num;
                                            }
                                        }}
                                    />
                                </div>
                            </div>
                            <div className={style.chartSettings_showValue}>
                                <h3 className={style.chartSettings_option}>
                                    是否在图表中显示具体数值
                                </h3>
                                <Switch
                                    defaultValue={isShowValue}
                                    handleChange={(v) => {
                                        setIsShowValue(v);
                                        chartInfoRef.current.specificValue = v;
                                    }}
                                />
                            </div>
                        </div>
                    </ScrollComponent>
                </div>
                <div className={style.chartSettings_button}>
                    <Button
                        height="3.2rem"
                        label="取消"
                        size="big"
                        type="primary"
                        width="7.6rem"
                        onClick={() => {
                            handleClose && handleClose();
                        }}
                    />
                    <Button
                        width="6rem"
                        height="3.2rem"
                        label="保存"
                        size="normal"
                        type="primary"
                        disabled={!isSave()}
                        onClick={() => {
                            resetLabel();
                            handleQuestionChange(id, viewId, chartInfoRef.current);
                            handleClose && handleClose();
                        }}
                    />
                </div>
                {switchChartTypeEl}
                {modifyColor && selectColorRef.current && (
                    <Kite
                        className={style.chartSettings_color}
                        root={selectColorRef.current}
                        show={true}
                        style={{ zIndex: 100 }}
                        offset={{
                            y: 4,
                            x: -40,
                        }}
                        handleGlobalClick={(v) => {
                            if (!v.isBtn && !v.isMenu) {
                                setModifyColor(undefined);
                                selectColorRef.current = null;
                            }
                        }}
                    >
                        <ScrollComponent height="27.8">
                            <ul>
                                {chartColor.map((item) => {
                                    return (
                                        <li
                                            style={{ color: item.background }}
                                            key={item.label}
                                            onClick={() => {
                                                if (modifyColor === 1) {
                                                    const row = (
                                                        chartInfoRef.current.dataSets[0]
                                                            .backgroundColor as Array<{
                                                            id: string;
                                                            value: string;
                                                        }>
                                                    ).find((i) => i.id === rowOptions);
                                                    if (row) {
                                                        row.value = item.background;
                                                    }
                                                } else {
                                                    const col = chartInfoRef.current.dataSets.find(
                                                        (items) => items.id === colOptions,
                                                    );
                                                    if (col) {
                                                        col.backgroundColor = item.background;
                                                    }
                                                }
                                                setModifyColor(undefined);
                                                selectColorRef.current = null;
                                            }}
                                        >
                                            <Icon type="chooseColor" />
                                            <p>{item.label}</p>
                                        </li>
                                    );
                                })}
                            </ul>
                        </ScrollComponent>
                    </Kite>
                )}
            </div>
        </Alert>
    );
};
export default ChartSettings;
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
