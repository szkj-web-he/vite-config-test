/**
 * @file QuestionsChart
 * @date 2022-09-06
 * @author liaoli
 * @lastModify liaoli 2022-09-06
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { useState, useRef, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import QuestionsChartItem from './Components/QuestionsChartItem';
import { Kite, Icon } from '@datareachable/dr_front_componentlibrary';
import style from './style.scss';
import ChartSettings from './Components/ChartSettings';
import { ViewType } from '~/Store/JobView/types';
import { chartsType } from '~/DefaultData/DataBriefing';
import { updateDefaultViewAction, updateViewInfoAction } from '~/Store/JobView/actions';
import { RootState } from '~/Store/rootReducer';
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface QuestionsChartProps {
    viewId: string;
    chartsData: ViewType[];
    isWriter: boolean;
    handleQuestionChange: (id: string, viewId: string, data: ViewType) => void;
}
const QuestionsChart: React.FC<QuestionsChartProps> = ({
    chartsData,
    viewId,
    isWriter,
    handleQuestionChange,
}): JSX.Element => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    const dispatch = useDispatch();

    /** views info */
    const getViewInfo = useSelector((state: RootState) => state.jobView.getViewInfo);

    /** default views info */
    const getDefaultView = useSelector((state: RootState) => state.jobView.getDefaultView);

    /** 切换图表 */
    const [showSwitchChartType, setShowSwitchChartType] = useState(() => {
        return {
            group: false,
            type: false,
        };
    });

    /** 当前选中图表的id */
    const [selectChartId, setSelectChartId] = useState('');

    /** 当前点击设置的图表id */
    const [settingChartId, setSettingChartId] = useState('');

    /** 切换图表弹出层 */
    const SwitchChartTypeKite = useRef<HTMLUListElement>(null);

    /** 当前的chartGroup */
    const currentChartGroup = useRef(-1);

    /** 当前点击的切换图表元素 */
    const currentSwitchBtn = useRef<Element | null>(null);

    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */

    const currentChartData = useMemo(() => {
        if (selectChartId && chartsData) {
            return chartsData.find((v) => v.id === selectChartId);
        }
        return undefined;
    }, [selectChartId, chartsData]);

    const isNotSelectList = useMemo(() => {
        if (currentChartData) {
            if (currentChartData.isTwoDimensional) {
                return ['11', '21'];
            } else {
                return ['12', '13', '14', '22', '23', '24', '42'];
            }
        }
    }, [currentChartData]);
    /************* This section will include this component parameter *************/
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/

    const handleSwitchChart = (item: { id: number; value: string }) => {
        setShowSwitchChartType({
            group: false,
            type: false,
        });
        if (viewId === '-1' && getDefaultView) {
            dispatch(
                updateDefaultViewAction(
                    getDefaultView.map((v) => {
                        if (v.id === currentChartData?.id) {
                            return {
                                ...currentChartData,
                                chartsType: [currentChartGroup.current, item.id],
                            };
                        }
                        return v;
                    }),
                ),
            );
        } else {
            if (getViewInfo[viewId]) {
                dispatch(
                    updateViewInfoAction({
                        id: viewId,
                        question: getViewInfo[viewId].question.map((v) => {
                            if (v.id === currentChartData?.id) {
                                return {
                                    ...currentChartData,
                                    chartsType: [currentChartGroup.current, item.id],
                                };
                            }
                            return v;
                        }),
                    }),
                );
            }
        }
        setSelectChartId('');
        currentChartGroup.current = -1;
    };

    const switchChartGroupEl = currentSwitchBtn.current && showSwitchChartType.group && (
        <Kite
            offset={{
                x: -41,
                y: 4,
            }}
            className={style.chart_chartGroup__kite}
            handleGlobalClick={(v) => {
                if (!v.isMenu && !v.isBtn && !showSwitchChartType.type) {
                    setShowSwitchChartType({ group: false, type: false });
                    currentChartGroup.current = -1;
                    setSelectChartId('');
                }
            }}
            root={currentSwitchBtn.current}
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
                            className={
                                currentChartData?.chartsType[0] === item.id
                                    ? style.chart_selectChartType
                                    : ''
                            }
                            onMouseEnter={() => {
                                if (!showSwitchChartType.group) return;
                                currentChartGroup.current = item.id;
                                setShowSwitchChartType({ group: true, type: true });
                            }}
                        >
                            <div>
                                <Icon type={item.icon} />
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
                className={style.chart_chartType__kite}
                root={SwitchChartTypeKite.current}
                show={showSwitchChartType.group && showSwitchChartType.type}
                placement="lt"
                direction="horizontal"
                offset={{
                    x: -3,
                }}
                handleGlobalClick={(v) => {
                    if (!v.isBtn && !v.isMenu) {
                        setShowSwitchChartType({ group: false, type: false });
                        currentChartGroup.current = -1;
                        setSelectChartId('');
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
                                        key={item.id}
                                        className={`
                                            ${
                                                currentChartData?.chartsType[1] === item.id &&
                                                currentChartData?.chartsType[0] ===
                                                    currentChartGroup.current
                                                    ? style.chart_selectChartType
                                                    : ''
                                            } ${
                                            isNotSelectList?.includes(
                                                `${currentChartGroup.current}${item.id}`,
                                            )
                                                ? style.chart_chartType__notSelect
                                                : ''
                                        }`}
                                        onClick={() => {
                                            if (
                                                isNotSelectList?.includes(
                                                    `${currentChartGroup.current}${item.id}`,
                                                )
                                            ) {
                                                return;
                                            }
                                            handleSwitchChart(item);
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
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return (
        <>
            {chartsData.map((item) => {
                return (
                    <QuestionsChartItem
                        selectChartId={selectChartId}
                        key={item.id}
                        chartData={item}
                        viewId={viewId}
                        isWriter={isWriter}
                        handleChartSetting={(id: string) => {
                            setSettingChartId(id);
                        }}
                        handleSwitchChart={(el: Element, id: string) => {
                            currentSwitchBtn.current = el;
                            setSelectChartId(id);
                            setShowSwitchChartType(
                                Object.assign({}, showSwitchChartType, { group: true }),
                            );
                        }}
                    />
                );
            })}
            {switchChartGroupEl}
            {switchChartTypeEl}
            {!!settingChartId && (
                <ChartSettings
                    viewId={viewId}
                    id={settingChartId.split('_')[0]}
                    show={!!settingChartId}
                    handleClose={() => {
                        setSettingChartId('');
                    }}
                    handleQuestionChange={(id, viewId, data) => {
                        handleQuestionChange(id, viewId, data);
                    }}
                />
            )}
        </>
    );
};
export default QuestionsChart;
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
