/**
 * @file ScriptSideBar
 * @date 2022-11-14
 * @author liaoli
 * @lastModify liaoli 2022-11-14
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import { Icon, Transition } from '@datareachable/dr_front_componentlibrary';
import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { actionScriptList } from '~/DefaultData/Stages';
import { RootState } from '~/Store/rootReducer';
import style from './style.scss';
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ScriptSideBarProps {
    setSelectScript: (v: string[]) => void;
    selectScript: string[];
}
const ScriptSideBar: React.FC<ScriptSideBarProps> = ({
    setSelectScript,
    selectScript,
}): JSX.Element => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    const { stageId, stepId } = useSelector((state: RootState) => state.jobStage.currentStep);

    const getJobStage = useSelector((state: RootState) => state.jobStage.getJobStage);

    const [showScriptList, setShowScriptList] = useState<{ [key: string]: boolean }>({
        '1': true,
        '1_1': true,
    });
    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    const currentStep = useMemo(() => {
        if (stageId && stageId && getJobStage) {
            return getJobStage.config
                .find((v) => v.id === stageId)
                ?.steps.after_stream.find((v) => v.id === stepId);
        }
    }, [getJobStage, stageId, stepId]);

    useEffect(() => {
        const data = getJobStage.config
            .find((v) => v.id === stageId)
            ?.steps.after_stream.find((v) => v.id === stepId);
        if (data?.script.name) {
            setShowScriptList({
                ...showScriptList,
                1: true,
                [`1_${data.script.name}`]: true,
                [`1_${data.script.type}`]: true,
            });

            setSelectScript(['1', data.script.type, data.script.name]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/
    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <div>
            <div
                className={style.scriptSideBar_title}
                onClick={() => {
                    setShowScriptList({ ...showScriptList, 1: !showScriptList['1'] });
                }}
            >
                <Icon type="down" style={showScriptList['1'] ? { transform: 'rotate(0)' } : {}} />
                <p>内置脚本</p>
            </div>
            <Transition show={showScriptList['1']} animationType="taller">
                <div>
                    {actionScriptList.map((item) => (
                        <div key={item.id} className={style.scriptSideBar_item}>
                            <div
                                onClick={() => {
                                    setShowScriptList({
                                        ...showScriptList,
                                        [`1_${item.id}`]: !showScriptList[`1_${item.id}`],
                                    });
                                }}
                            >
                                <Icon
                                    type="down"
                                    style={
                                        showScriptList[`1_${item.id}`]
                                            ? { transform: 'rotate(0)' }
                                            : {}
                                    }
                                />
                                <p
                                    style={
                                        selectScript[1] === item.id && selectScript[2]
                                            ? { color: '#22A6B3' }
                                            : {}
                                    }
                                >
                                    {item.name}
                                </p>
                            </div>
                            <Transition
                                show={showScriptList[`1_${item.id}`]}
                                animationType="taller"
                            >
                                <div>
                                    {item.scripts.map((v) => (
                                        <div
                                            key={v.id}
                                            className={`${style.scriptSideBar_script} ${
                                                selectScript.join('_') === `1_${item.id}_${v.id}`
                                                    ? style.scriptSideBar_active
                                                    : ''
                                            }`}
                                            onClick={() => {
                                                setSelectScript(['1', item.id, v.id]);
                                            }}
                                        >
                                            <i></i>
                                            <p>{v.name}</p>
                                            <span
                                                style={
                                                    currentStep?.script?.name == v.id &&
                                                    currentStep.script?.type === item.id
                                                        ? { display: 'block' }
                                                        : {}
                                                }
                                            >
                                                已选
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </Transition>
                        </div>
                    ))}
                </div>
            </Transition>
            <div
                className={style.scriptSideBar_selfScript}
                onClick={() => {
                    setShowScriptList({ ...showScriptList, 2: !showScriptList['2'] });
                }}
            >
                <div>
                    <Icon
                        type="down"
                        style={showScriptList['2'] ? { transform: 'rotate(0)' } : {}}
                    />
                    <p>自建脚本</p>
                </div>
                <Icon type="addition" />
            </div>
            <Transition show={showScriptList['2']} animationType="taller">
                <div className={style.scriptSideBar_empty}>暂无自建脚本</div>
            </Transition>
        </div>
    );
};
export default ScriptSideBar;
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
