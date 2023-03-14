/**
 * @file VariableSideBar
 * @date 2022-11-15
 * @author liaoli
 * @lastModify liaoli 2022-11-15
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import { Icon, Transition } from '@datareachable/dr_front_componentlibrary';
import React, { useMemo, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { globalVarType, respondentsVarType } from '~/DefaultData/Stages';
import { updateJobStageSaga } from '~/Store/JobStage/actions';
import { RootState } from '~/Store/rootReducer';
import CreateVariable from '../CreateVariable';
import DelVariable from '../DelVariable';
import style from './style.scss';
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface VariableSideBarProps {
    selectVariable: string[];
    handleSwitchSelectVar: (v: string[]) => void;
    handleCreateVar: (varType: 'global' | 'respondents', name: string, type: string) => void;
}
const VariableSideBar: React.FC<VariableSideBarProps> = ({
    selectVariable,
    handleSwitchSelectVar,
    handleCreateVar,
}): JSX.Element => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    const { getJobStage, currentStep } = useSelector((state: RootState) => state.jobStage);

    const tgId = useSelector((state: RootState) => state.preparation.selectedTg);

    const currentJob = useSelector((state: RootState) => state.jobList.getCurrentJob);

    const dispatch = useDispatch();

    const variableList = useRef([
        { id: '1', name: '被访者变量' },
        { id: '2', name: '全局变量' },
    ]);

    const [showList, setShowList] = useState<{ [key: string]: boolean }>({ '1': true });

    const [showCreateVar, setShowCreateVar] = useState('');

    const [showDelVar, setShowDelVar] = useState('');
    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    const currentStage = useMemo(() => {
        if (getJobStage && currentStep) {
            return getJobStage.config.find((v) => v.id === currentStep.stageId);
        }
    }, [getJobStage, currentStep]);

    const globalVarList = useMemo(() => {
        if (currentStage) {
            return currentStage?.g_vars;
        }
    }, [currentStage]);

    const respondentVarList = useMemo(() => {
        if (currentStage) {
            return currentStage?.r_vars;
        }
    }, [currentStage]);

    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/
    /**
     * 展示的列表
     */
    const showVarList = (type: string) => {
        if (type === '1') {
            return respondentVarList;
        } else {
            return globalVarList;
        }
    };

    /**
     * 删除变量
     */
    const varDelFn = (id: string, type: string) => {
        setShowDelVar('');
        if (!currentJob) {
            return;
        }
        let data;
        if (type === '1') {
            data = getJobStage.config.map((v) => {
                if (v.id === currentStep.stageId) {
                    v = {
                        ...v,
                        r_vars: v.r_vars.filter((item) => item.id !== id),
                    };
                }
                return v;
            });
        } else {
            data = getJobStage.config.map((v) => {
                if (v.id === currentStep.stageId) {
                    v = {
                        ...v,
                        g_vars: v.g_vars.filter((item) => item.id !== id),
                        steps: {
                            in_stream: v.steps.in_stream.map((items) => {
                                const args = items.script.args;
                                args[0] = '';
                                return {
                                    ...items,
                                    script: {
                                        ...items.script,
                                        args,
                                    },
                                };
                            }),
                            after_stream: v.steps.after_stream.map((items) => {
                                const args = items.script.args;
                                args[0] = '';
                                return {
                                    ...items,
                                    script: {
                                        ...items.script,
                                        args,
                                    },
                                };
                            }),
                        },
                    };
                }
                return v;
            });
        }
        dispatch(
            updateJobStageSaga({
                talent_group_id: tgId,
                job_id: currentJob.id,
                stages: {
                    status: 0,
                    config: data,
                },
                // callback() {
                //     if (selectVariable[1] === id) {
                //         const step = getJobStage.config.find((v) => v.id === currentStep.stageId);
                //         if (selectVariable[0] === '1') {
                //             selectVariable[1] =
                //                 step?.r_vars.filter((v) => v.id !== id)[0]?.id || '';
                //         } else if (selectVariable[0] === '2') {
                //             selectVariable[1] =
                //                 step?.g_vars.filter((v) => v.id !== id)[0]?.id || '';
                //         }
                //     }
                // },
            }),
        );
        if (selectVariable[1] === id) {
            const step = getJobStage.config.find((v) => v.id === currentStep.stageId);
            if (selectVariable[0] === '1') {
                selectVariable[1] = step?.r_vars.filter((v) => v.id !== id)[0]?.id || '';
            } else if (selectVariable[0] === '2') {
                selectVariable[1] = step?.g_vars.filter((v) => v.id !== id)[0]?.id || '';
            }
        }
    };

    const getIconType = (iconType: string, varType: string) => {
        if (varType === 'global') {
            return globalVarType.find((v) => v.id === iconType)?.icon;
        } else {
            return respondentsVarType.find((v) => v.id === iconType)?.icon;
        }
    };

    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <div className={style.variableSideBar_container}>
            {variableList.current.map((v) => (
                <React.Fragment key={v.id}>
                    <div
                        className={style.variableSideBar_title}
                        onClick={() => {
                            setShowList({ ...showList, [v.id]: !showList[v.id] });
                        }}
                    >
                        <div>
                            <Icon
                                type="down"
                                style={showList[v.id] ? { transform: 'rotate(0)' } : {}}
                            />
                            <h2
                                className={
                                    selectVariable[1] === v.id
                                        ? style.variableSideBar_title__select
                                        : ''
                                }
                                style={
                                    selectVariable[1] && selectVariable[0] === v.id
                                        ? { color: '#22A6B3' }
                                        : {}
                                }
                            >
                                {v.name}
                            </h2>
                        </div>
                        <Icon
                            type="addition"
                            onClick={(e) => {
                                e.stopPropagation();
                                setShowCreateVar(v.id);
                            }}
                        />
                    </div>
                    <Transition show={showList[v.id]} animationType="taller">
                        <div className={style.variableSideBar_list}>
                            {showVarList(v.id)?.length ? (
                                showVarList(v.id)?.map((item) => (
                                    <div
                                        className={`${style.variableSideBar_item} ${
                                            selectVariable.join('_') ===
                                            `${v.id}_${item.id as string}`
                                                ? style.variableSideBar_select
                                                : ''
                                        }`}
                                        key={item.id}
                                        onClick={() => {
                                            handleSwitchSelectVar([v.id, item.id as string]);
                                        }}
                                    >
                                        <span></span>
                                        <div>
                                            <Icon
                                                type={getIconType(
                                                    `${
                                                        v.id === '1'
                                                            ? (item.q_type as string)
                                                            : (item.type as string)
                                                    }`,
                                                    `${v.id === '1' ? 'respondents' : 'global'}`,
                                                )}
                                            />
                                            <p>{v.id === '1' ? item.qid : item.name}</p>
                                        </div>
                                        <Icon
                                            type="dustbin"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setShowDelVar(
                                                    `${v.id}#${
                                                        v.id === '1'
                                                            ? (item.qid as string)
                                                            : (item.name as string)
                                                    }#${item.id as string}`,
                                                );
                                            }}
                                        />
                                    </div>
                                ))
                            ) : (
                                <div className={style.variableSideBar_itemEmpty}>暂未创建变量</div>
                            )}
                        </div>
                    </Transition>
                </React.Fragment>
            ))}
            {showCreateVar && (
                <CreateVariable
                    type={`${showCreateVar === '1' ? 'respondents' : 'global'}`}
                    handleClose={() => {
                        setShowCreateVar('');
                    }}
                    handleCreateVar={(...rest) => {
                        setShowCreateVar('');
                        handleCreateVar(...rest);
                    }}
                />
            )}
            {showDelVar && (
                <DelVariable
                    type={showDelVar.split('#')[0]}
                    name={showDelVar.split('#')[1]}
                    id={showDelVar.split('#')[2]}
                    handleClose={() => {
                        setShowDelVar('');
                    }}
                    handleDel={varDelFn}
                />
            )}
        </div>
    );
};
export default VariableSideBar;
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
