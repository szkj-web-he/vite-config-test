/**
 * @file VariableInfo
 * @date 2022-11-15
 * @author liaoli
 * @lastModify liaoli 2022-11-15
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import { Icon, ResetInput, TextAreaV2 } from '@datareachable/dr_front_componentlibrary';
import React, { useLayoutEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import style from './style.scss';
import emptyImg from '~/Assets/images/icon_questionnaire.png';
import { RootState } from '~/Store/rootReducer';
import { updateJobStageSaga } from '~/Store/JobStage/actions';
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ScriptListType {
    id: string;
    name: string;
    type: string;
    script: {
        type: string;
        name: string;
        args: string[];
    };
}

interface VariableInfoProps {
    selectVariable: string;
}
const VariableInfo: React.FC<VariableInfoProps> = ({ selectVariable }): JSX.Element => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    const dispatch = useDispatch();

    const tgId = useSelector((state: RootState) => state.preparation.selectedTg);

    const currentJob = useSelector((state: RootState) => state.jobList.getCurrentJob);

    const getJobStage = useSelector((state: RootState) => state.jobStage.getJobStage);

    const { stageId } = useSelector((state: RootState) => state.jobStage.currentStep);

    const [varName, setVarName] = useState('');

    const [description, setDescription] = useState('');
    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    const currentGlobalVar = useMemo(() => {
        if (stageId) {
            return getJobStage.config
                .find((v) => v.id === stageId)
                ?.g_vars.find((v) => v.id === selectVariable);
        }
    }, [getJobStage.config, selectVariable, stageId]);

    useLayoutEffect(() => {
        if (currentGlobalVar) {
            setVarName(currentGlobalVar.name);
            setDescription(currentGlobalVar.description);
        }
    }, [currentGlobalVar]);

    const scriptList = useMemo(() => {
        const steps = getJobStage.config.find((v) => v.id === stageId)?.steps;
        const list: ScriptListType[] = [];
        steps?.after_stream.forEach((v) => {
            if (v.script.args[0] === currentGlobalVar?.name) {
                list.push({
                    ...v,
                    type: '行动类',
                });
            }
        });
        steps?.in_stream.forEach((v) => {
            if (v.script.args[0] === currentGlobalVar?.name) {
                list.push({
                    ...v,
                    type: '计算类',
                });
            }
        });

        return list;
    }, [currentGlobalVar?.name, getJobStage.config, stageId]);

    const isNameRepeat = useMemo(() => {
        return getJobStage.config.some(
            (v) =>
                v.r_vars.some((item) => item.qid === varName) ||
                v.g_vars.some((item) => item.name === varName && item.id !== currentGlobalVar?.id),
        );
    }, [currentGlobalVar?.id, varName, getJobStage.config]);

    const testVarname = useMemo(() => {
        return /^[a-zA-Z0-9_]{1,72}$/.test(varName);
    }, [varName]);

    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/
    const handleSaveFn = (type: 'name' | 'description') => {
        if (
            (varName !== currentGlobalVar?.name || description !== currentGlobalVar.description) &&
            currentJob &&
            tgId
        ) {
            let data;
            if (type === 'name') {
                data = getJobStage.config.map((v) => {
                    if (v.id === stageId) {
                        v.g_vars = v.g_vars.map((item) => {
                            v.steps.after_stream = v.steps.after_stream.map((items) => {
                                if (items.script.args[0] === item.name) {
                                    items.script.args[0] = varName;
                                }
                                return items;
                            });

                            v.steps.in_stream = v.steps.in_stream.map((items) => {
                                if (items.script.args[0] === item.name) {
                                    items.script.args[0] = varName;
                                }
                                return items;
                            });

                            if (item.id === currentGlobalVar?.id) {
                                return {
                                    ...item,
                                    description,
                                    name: varName,
                                };
                            }
                            return item;
                        });
                    }
                    return v;
                });
            } else {
                data = getJobStage.config.map((v) => {
                    if (v.id === stageId) {
                        v.g_vars = v.g_vars.map((item) => {
                            if (item.id === currentGlobalVar?.id) {
                                return {
                                    ...item,
                                    description,
                                    name: varName,
                                };
                            }
                            return item;
                        });
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
                }),
            );
        }
    };
    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <div className={style.globalVarInfo_container}>
            <h2 className={style.globalVarInfo_title}>设置变量</h2>
            <div className={style.globalVarInfo_row}>
                <h3 className={style.globalVarInfo_rowTitle}>变量名称</h3>
                <ResetInput
                    value={varName}
                    onChange={(v) => {
                        setVarName(v);
                    }}
                    onBlur={() => {
                        if (isNameRepeat || varName === '' || !testVarname) {
                            setVarName(currentGlobalVar?.name || '');
                        } else {
                            handleSaveFn('name');
                        }
                    }}
                    className={`${style.globalVarInfo_nameInput} ${
                        varName && (isNameRepeat || !testVarname)
                            ? style.globalVarInfo_nameRepeat
                            : ''
                    }`}
                />
            </div>
            <div className={style.globalVarInfo_row}>
                <h3 className={style.globalVarInfo_rowTitle}>变量描述</h3>
                <TextAreaV2
                    placeholder="请点击此处编辑描述..."
                    className={style.globalVarInfo_desc}
                    value={description}
                    onInput={(v) => {
                        setDescription(v);
                    }}
                    onBlur={() => handleSaveFn('description')}
                />
            </div>
            <div className={style.globalVarInfo_row}>
                <h3 className={style.globalVarInfo_rowTitle}>输入脚本</h3>
                {scriptList.length ? (
                    scriptList.map((v) => (
                        <div key={v.id} className={style.globalVarInfo_scriptList}>
                            <div className={style.globalVarInfo_scriptItem}>
                                <Icon type="binded" />
                                <p>{v.name}</p>
                                <span>{v.type}</span>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className={style.globalVarInfo_empty}>
                        <img src={emptyImg} alt="" />
                        <p>暂无输入脚本</p>
                    </div>
                )}
            </div>
        </div>
    );
};
export default VariableInfo;
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
