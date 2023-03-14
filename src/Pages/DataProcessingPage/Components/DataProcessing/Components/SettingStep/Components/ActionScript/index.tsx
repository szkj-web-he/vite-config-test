/**
 * @file StepScript
 * @date 2022-11-14
 * @author liaoli
 * @lastModify liaoli 2022-11-14
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import { Row, Col, Icon, ScrollComponent } from '@datareachable/dr_front_componentlibrary';
import React, { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ActionScriptInfo from './Components/ActionScriptInfo';
import ActionScriptSideBar from './Components/ActionScriptSideBar';
import SetScript from '../SetScript';
import style from './style.scss';
import emptyImage from '~/Assets/images/icon_questionnaire.png';
import { updateJobStageSaga } from '~/Store/JobStage/actions';
import { RootState } from '~/Store/rootReducer';
import ExceptionNoticeScript from './Components/ExceptionNoticeScript';
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface StepScriptProps {
    testStage: boolean;
}
const StepScript: React.FC<StepScriptProps> = ({ testStage }): JSX.Element => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    const dispatch = useDispatch();

    const tgId = useSelector((state: RootState) => state.preparation.selectedTg);

    const currentJob = useSelector((state: RootState) => state.jobList.getCurrentJob);

    const { stageId, stepId } = useSelector((state: RootState) => state.jobStage.currentStep);

    const getJobStage = useSelector((state: RootState) => state.jobStage.getJobStage);

    const [selectScript, setSelectScript] = useState<string[]>([]);

    const [showSetScript, setShowSetScript] = useState(false);

    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    const isSelect = useMemo(() => {
        if (selectScript.every((v) => v)) {
            if (selectScript[0] === '1') {
                const currentScript = getJobStage.config
                    .find((v) => v.id === stageId)
                    ?.steps.after_stream.find((v) => v.id === stepId)?.script;
                return (
                    currentScript?.name === selectScript[2]
                    // currentScript?.type === selectScript[2] &&
                    // currentScript.name === selectScript[2]
                );
            } else {
                console.log('自建脚本');
            }
        }
    }, [getJobStage.config, selectScript, stageId, stepId]);

    const currentStep = useMemo(() => {
        if (stageId && stageId && getJobStage) {
            return getJobStage.config
                .find((v) => v.id === stageId)
                ?.steps.after_stream.find((v) => v.id === stepId);
        }
    }, [getJobStage, stageId, stepId]);
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/
    const handleSetScript = () => {
        showSetScript && setShowSetScript(false);
        if (selectScript.every((v) => v) && currentJob && tgId) {
            console.log('selectScript', selectScript);

            if (selectScript[0] === '1') {
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
                                            return {
                                                ...item,
                                                script: {
                                                    // ...item.script,
                                                    args: [],
                                                    name: selectScript[2],
                                                    type: selectScript[1],
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
            } else {
                console.log('自建脚本');
            }
        }
    };
    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <>
            <Row justify="center" style={{ height: 'auto' }}>
                <Col span={3}>
                    <div className={style.stepScript_container}>
                        <h2>脚本列表</h2>
                        <ActionScriptSideBar
                            setSelectScript={(v) => {
                                setSelectScript(v);
                            }}
                            selectScript={selectScript}
                        />
                    </div>
                </Col>
                <Col span={7}>
                    <ScrollComponent height="60rem">
                        <div className={style.stepScript_scriptInfo}>
                            <div className={style.stepScript_scriptInfo__header}>
                                <h2>脚本信息</h2>
                                <div
                                    onClick={() => {
                                        if (!isSelect && selectScript.length) {
                                            if (currentStep?.script.name) {
                                                setShowSetScript(true);
                                            } else {
                                                handleSetScript();
                                            }
                                        }
                                    }}
                                    className={
                                        isSelect || selectScript.length === 0
                                            ? style.stepScript_scriptInfo__isSelect
                                            : ''
                                    }
                                >
                                    <Icon type="right" />
                                    <p>设为已选脚本</p>
                                </div>
                            </div>
                            <p className={style.stepScript_tips}>
                                请<span>点击</span>左侧栏的某一脚本，可查看该脚本的详细信息
                            </p>
                            {selectScript.length ? (
                                <>
                                    {['sendMessage', 'sendEmail'].includes(selectScript[2]) && (
                                        <ActionScriptInfo
                                            testStage={testStage}
                                            selectScript={selectScript}
                                        />
                                    )}
                                    {[
                                        '根据被访者变量发送短信警告',
                                        '根据被访者变量发送邮箱警告',
                                    ].includes(selectScript[2]) && (
                                        <ExceptionNoticeScript
                                            testStage={testStage}
                                            selectScript={selectScript}
                                        />
                                    )}
                                </>
                            ) : (
                                <div className={style.stepScript_empty}>
                                    <img src={emptyImage} alt="" />
                                    <p>暂未选择脚本</p>
                                </div>
                            )}
                        </div>
                    </ScrollComponent>
                </Col>
            </Row>
            {showSetScript && (
                <SetScript
                    handleClose={() => {
                        setShowSetScript(false);
                    }}
                    handleSetScript={handleSetScript}
                />
            )}
        </>
    );
};
export default StepScript;
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
