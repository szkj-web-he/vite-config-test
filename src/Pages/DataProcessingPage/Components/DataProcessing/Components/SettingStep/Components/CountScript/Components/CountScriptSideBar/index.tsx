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
import { scriptList } from '~/DefaultData/Stages';
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

type ScriptType = {
    type: string;
    name: string;
    args: string[];
    description: string;
};
const ScriptSideBar: React.FC<ScriptSideBarProps> = ({
    setSelectScript,
    selectScript,
}): JSX.Element => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    const { stageId, stepId } = useSelector((state: RootState) => state.jobStage.currentStep);

    const getJobStage = useSelector((state: RootState) => state.jobStage.getJobStage);

    const [showScriptList, setShowScriptList] = useState<{ [key: string]: boolean }>({
        1: true,
        '1_count': false,
    });
    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    const currentStep = useMemo(() => {
        if (stageId && stageId && getJobStage) {
            return getJobStage.config
                .find((v) => v.id === stageId)
                ?.steps.in_stream.find((v) => v.id === stepId);
        }
    }, [getJobStage, stageId, stepId]);

    useEffect(() => {
        const data = getJobStage.config
            .find((v) => v.id === stageId)
            ?.steps.in_stream.find((v) => v.id === stepId);
        if (data?.script.name === '数字选项-加减乘除') {
            const name = data.script.args[1];
            setShowScriptList({
                ...showScriptList,
                '1_count': false,
                2: true,
                [`2_${name}`]: true,
                [`2_${data.script.type}`]: true,
            });
            setSelectScript(['2', data.script.type, name]);
            return;
        }
        if (data?.script.name) {
            setShowScriptList({
                ...showScriptList,
                1: true,
                '1_count': true,
                [`1_${data.script.name}`]: true,
                [`1_${data.script.type}`]: true,
            });
            setSelectScript(['1', data.script.type, data.script.name]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    /************* This section will include this component parameter *************/
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/
    /**
     * 展开和折叠
     * @param index 1 内置脚本 2 自建脚本
     */
    const handleOpenOrClose = (index: number) => {
        setShowScriptList({ ...showScriptList, [index]: !showScriptList[`${index}`] });
    };

    /**
     * 二级折叠和展开
     */
    const handleSecondOpenOrClose = (index: number, id: string) => {
        setShowScriptList({
            ...showScriptList,
            [`${index + 1}_${id}`]: !showScriptList[`${index + 1}_${id}`],
        });
    };

    const getSelect = (script: ScriptType | undefined, itemId: string, vId: string) => {
        if (!currentStep) {
            return false;
        }
        if (script?.name === '数字选项-加减乘除') {
            return script.args[1] === vId && currentStep.script?.type === itemId;
        }

        return currentStep?.script?.name == vId && currentStep.script?.type === itemId;
    };

    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <div>
            <div className={style.scriptSideBar_title} onClick={() => handleOpenOrClose(1)}>
                <Icon type="down" style={showScriptList['1'] ? { transform: 'rotate(0)' } : {}} />
                <p>内置脚本</p>
            </div>
            <Transition show={showScriptList['1']} animationType="taller">
                <div>
                    {scriptList.map((item, index) => (
                        <div key={index} className={style.scriptSideBar_item}>
                            <div onClick={() => handleSecondOpenOrClose(index, item.id)}>
                                <Icon
                                    type="down"
                                    style={
                                        showScriptList[`${index + 1}_${item.id}`]
                                            ? { transform: 'rotate(0)' }
                                            : {}
                                    }
                                />
                                <p
                                    style={
                                        showScriptList[`${index + 1}_${item.id}`]
                                            ? { color: '#22A6B3' }
                                            : {}
                                    }
                                >
                                    {item.name}
                                </p>
                            </div>
                            <Transition
                                show={showScriptList[`${index + 1}_${item.id}`]}
                                animationType="taller"
                            >
                                <div>
                                    {item.scripts.map((v) => (
                                        <div
                                            key={v.id}
                                            className={`${style.scriptSideBar_script} ${
                                                selectScript.join('_') ===
                                                `${index + 1}_${item.id}_${v.id}`
                                                    ? style.scriptSideBar_active
                                                    : ''
                                            }`}
                                            onClick={() => {
                                                setSelectScript([`${index + 1}`, item.id, v.id]);
                                            }}
                                        >
                                            <i></i>
                                            <p>{v.name}</p>
                                            <span
                                                style={
                                                    getSelect(currentStep?.script, item.id, v.id)
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
            <div className={style.scriptSideBar_selfScript} onClick={() => handleOpenOrClose(2)}>
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
