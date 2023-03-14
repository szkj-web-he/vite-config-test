/**
 * @file ScriptInfoOneDimension
 * @date 2022-11-14
 * @author liaoli
 * @lastModify liaoli 2022-11-14
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import {
    Icon,
    ResetInput,
    Transition,
    ScrollComponent,
} from '@datareachable/dr_front_componentlibrary';
import React, { useEffect, useMemo, useState } from 'react';
import { useLayoutEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateJobStageSaga } from '~/Store/JobStage/actions';
import { RootState } from '~/Store/rootReducer';
import { reg } from '~/Utils/reg';
import style from './style.scss';
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ScriptInfoOneDimensionProps {
    selectScript: string[];
    testStage: boolean;
}
const ScriptInfoOneDimension: React.FC<ScriptInfoOneDimensionProps> = ({
    testStage,
    selectScript,
}): JSX.Element => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/

    const dispatch = useDispatch();

    const tgId = useSelector((state: RootState) => state.preparation.selectedTg);

    const currentJob = useSelector((state: RootState) => state.jobList.getCurrentJob);

    const { stageId, stepId } = useSelector((state: RootState) => state.jobStage.currentStep);

    const getJobStage = useSelector((state: RootState) => state.jobStage.getJobStage);

    const [showVarList, setShowVarList] = useState(false);

    const [currentVarName, setCurrentVarName] = useState('');

    const [telNum, setTelNum] = useState('');
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

    const isSelectScript = useMemo(() => {
        if (currentStep?.script) {
            return (
                selectScript[2] === currentStep.script.name &&
                selectScript[1] === currentStep.script.type

                // selectScript[2] === currentStep.script.type &&
                // selectScript[1] === currentStep.script.name
            );
        }
    }, [currentStep?.script, selectScript]);

    const varOption = useMemo(() => {
        if (stageId && getJobStage) {
            return getJobStage.config.find((v) => v.id === stageId)?.g_vars;
        }
    }, [stageId, getJobStage]);

    useEffect(() => {
        setCurrentVarName('');
        setTelNum('');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectScript]);

    useEffect(() => {
        const varName = currentStep?.script.args[0];
        const tel = currentStep?.script.args[1];
        if (isSelectScript) {
            varName && setCurrentVarName(varName);
            tel && setTelNum(tel);
        }
    }, [currentStep, isSelectScript]);

    useEffect(() => {
        handleSetVar();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentVarName]);

    useEffect(() => {
        handleSetVar();
        handleSetTelNumber();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentStep]);

    useLayoutEffect(() => {
        const fn = () => {
            setShowVarList(false);
        };
        window.addEventListener('click', fn);
        return () => window.removeEventListener('click', fn);
    }, [showVarList]);

    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/
    const handleSetVar = () => {
        if (
            !currentJob ||
            !currentVarName ||
            currentVarName === currentStep?.script.args[0] ||
            !isSelectScript
        ) {
            return;
        }
        dispatch(
            updateJobStageSaga({
                talent_group_id: tgId,
                job_id: currentJob.id,
                stages: {
                    status: 0,
                    config: getJobStage.config.map((v) => {
                        if (v.id === stageId) {
                            v.steps.after_stream = v.steps.after_stream.map((item) => {
                                if (item.id === stepId) {
                                    const args = [...item.script.args];
                                    args[0] = currentVarName;
                                    return {
                                        ...item,
                                        script: {
                                            ...item.script,
                                            args,
                                        },
                                    };
                                }
                                return item;
                            });
                        }
                        return v;
                    }),
                },
            }),
        );
    };
    const handleSetTelNumber = () => {
        if (!currentJob || !telNum || telNum === currentStep?.script.args[1] || !isSelectScript) {
            return;
        }
        dispatch(
            updateJobStageSaga({
                talent_group_id: tgId,
                job_id: currentJob.id,
                stages: {
                    status: 0,
                    config: getJobStage.config.map((v) => {
                        if (v.id === stageId) {
                            v.steps.after_stream = v.steps.after_stream.map((item) => {
                                if (item.id === stepId) {
                                    const args = [...item.script.args];
                                    args[1] = telNum;
                                    return {
                                        ...item,
                                        script: {
                                            ...item.script,
                                            args,
                                        },
                                    };
                                }
                                return item;
                            });
                        }
                        return v;
                    }),
                },
            }),
        );
    };

    const textNum = () => {
        return (
            (currentStep?.script.name === 'sendMessage' &&
                reg.sendMessage.test(currentStep?.script.args[1])) ||
            (currentStep?.script.name === 'sendEmail' &&
                reg.sendEmail.test(currentStep?.script.args[1]))
        );
    };

    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <div>
            <div className={style.scriptInfo_card}>
                <div className={style.scriptInfo_header}>
                    <h2 className={style.scriptInfo_cardTitle}>短信通知</h2>
                    <span>通知类</span>
                </div>
                <div className={style.scriptInfo_item}>
                    <div className={style.scriptInfo_title}>脚本描述：</div>
                    <div className={style.scriptInfo_desc}>
                        此脚本用于将数据处理完成的结果以
                        {selectScript[2] === 'sendEmail' ? '邮件通知' : '手机短信'}
                        的形式发送给预设的手机号码。
                    </div>
                </div>
            </div>

            <div className={style.scriptInfo_card}>
                <h2 className={style.scriptInfo_cardTitle}>参数形式：</h2>
                <div className={style.scriptInfo_item}>
                    <div className={style.scriptInfo_title}>参数名：</div>
                    <div className={style.scriptInfo_desc}>
                        {selectScript[2] === 'sendEmail' ? '邮件模板' : '短信模板'}
                    </div>
                </div>
                <div className={style.scriptInfo_item}>
                    <div className={style.scriptInfo_title}>参数说明：</div>
                    <div className={style.scriptInfo_desc}>
                        编辑{selectScript[2] === 'sendEmail' ? '邮件' : '短信'}
                        的内容模板，其中可以插入全局变量的输出值。待全局变量统计完成后将向目标手机号码发送此短信。
                    </div>
                </div>
                <div className={style.scriptInfo_item}>
                    <div className={style.scriptInfo_title}>模板内容：</div>
                    <div className={style.scriptInfo_sendMessage}>
                        <span>您好，您的数据处理工作 “{currentJob?.name}” 已经完成，全局变量</span>
                        {/* <Kite
                            show={true}
                            triangle={{ height: '0.5rem', width: '0.9rem', color: '#f00' }}
                            root={
                                <div className={style.scriptInfo_insertVariable}>
                                    <span>点击插入变量</span>
                                    <Icon type="dropdown" />
                                </div>
                            }
                        >
                            123
                        </Kite> */}

                        <div
                            className={style.scriptInfo_insertVariable}
                            style={
                                testStage && isSelectScript && !currentVarName
                                    ? { color: '#FF525D' }
                                    : {}
                            }
                            onClick={(e) => {
                                e.stopPropagation();
                                setShowVarList(!showVarList);
                            }}
                        >
                            <span>{currentVarName ? currentVarName : '点击插入变量'}</span>
                            <Icon
                                type="dropdown"
                                style={showVarList ? { transform: 'rotate(180deg)' } : {}}
                            />
                        </div>
                        <Transition
                            show={showVarList}
                            animationType="taller"
                            className={style.scriptInfo_varList}
                        >
                            <ScrollComponent className={style.scriptInfo_varList__scroll}>
                                {varOption?.map((item) => (
                                    <div
                                        className={style.scriptInfo_varListItem}
                                        style={
                                            item.name === currentVarName ? { color: '#22A6B3' } : {}
                                        }
                                        key={item.name}
                                        onClick={() => {
                                            // handleSetVar(item.name);
                                            setCurrentVarName(item.name);
                                            setShowVarList(false);
                                        }}
                                    >
                                        {item.name}
                                    </div>
                                ))}
                            </ScrollComponent>
                        </Transition>
                        <span>共出现</span>
                        <span className={style.scriptInfo_templateNotes}>(全局变量运行结果)</span>
                        <span>次,请及时登录查看。</span>
                    </div>
                </div>
            </div>

            <div className={style.scriptInfo_card}>
                <h2 className={style.scriptInfo_cardTitle}>参数形式：</h2>
                <div className={style.scriptInfo_item}>
                    <div className={style.scriptInfo_title}>参数名：</div>
                    <div className={style.scriptInfo_desc}>
                        {selectScript[2] === 'sendEmail' ? '邮件地址' : '手机号码'}
                    </div>
                </div>
                <div className={style.scriptInfo_item}>
                    <div className={style.scriptInfo_title}>参数说明：</div>
                    <div className={style.scriptInfo_desc}>
                        编辑需要发送
                        {selectScript[2] === 'sendEmail'
                            ? '邮件的目标邮件地址'
                            : '短信的目标手机号码'}
                        。
                    </div>
                </div>
                <div className={style.scriptInfo_item}>
                    <div className={style.scriptInfo_title}>参数值：</div>
                    <ResetInput
                        className={`${style.scriptInfo_number} ${
                            testStage && isSelectScript && (!telNum || !textNum())
                                ? style.scriptInfo_error
                                : ''
                        }`}
                        placeholder={
                            selectScript[2] === 'sendEmail'
                                ? '请输入邮箱地址...'
                                : '请输入手机号码...'
                        }
                        value={telNum}
                        onChange={(v) => {
                            setTelNum(v);
                        }}
                        onBlur={handleSetTelNumber}
                    />
                </div>
            </div>
        </div>
    );
};
export default ScriptInfoOneDimension;
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
