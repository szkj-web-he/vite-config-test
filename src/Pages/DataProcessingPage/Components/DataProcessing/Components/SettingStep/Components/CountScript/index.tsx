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
import { useSelector } from 'react-redux';
import CountScriptInfo from './Components/CountScriptInfo';
import CountScriptSideBar from './Components/CountScriptSideBar';
import SetScript from '../SetScript';
import style from './style.scss';
import emptyImage from '~/Assets/images/icon_questionnaire.png';
import { RootState } from '~/Store/rootReducer';
import { OperationScript } from './Components/OperationScript';
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

    const { stageId, stepId } = useSelector((state: RootState) => state.jobStage.currentStep);

    const getJobStage = useSelector((state: RootState) => state.jobStage.getJobStage);

    /** 当前选择的脚本 */
    const [selectScript, setSelectScript] = useState<string[]>([]);

    /** 是否显示 确认选择弹框 */
    const [showSetScript, setShowSetScript] = useState(false);

    /** 是否设置当前脚本维已选脚本 */
    const [isSetScript, setIsSetScript] = useState(false);
    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/

    const isSelect = useMemo(() => {
        if (selectScript.every((v) => v)) {
            if (selectScript[0] === '1') {
                const currentScript = getJobStage.config
                    .find((v) => v.id === stageId)
                    ?.steps.in_stream.find((v) => v.id === stepId)?.script;
                return (
                    currentScript?.type === selectScript[1] &&
                    currentScript.name === selectScript[2]
                );
            }
            if (selectScript[0] === '2') {
                const currentScript = getJobStage.config
                    .find((v) => v.id === stageId)
                    ?.steps.in_stream.find((v) => v.id === stepId)?.script;
                if (!currentScript) {
                    return false;
                }
                const { name, type, args } = currentScript;
                if (
                    name === '数字选项-加减乘除' &&
                    type === 'count' &&
                    args[1] &&
                    args[1] === selectScript[2]
                ) {
                    return true;
                }
            }
        }
    }, [getJobStage.config, selectScript, stageId, stepId]);

    const currentStep = useMemo(() => {
        if (stageId && stageId && getJobStage) {
            return getJobStage.config
                .find((v) => v.id === stageId)
                ?.steps.in_stream.find((v) => v.id === stepId);
        }
    }, [getJobStage, stageId, stepId]);
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/
    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <>
            <Row justify="center" style={{ height: 'auto' }}>
                <Col span={3}>
                    <div className={style.stepScript_container}>
                        <h2>脚本列表</h2>
                        <CountScriptSideBar
                            setSelectScript={(v) => {
                                if (v.join('_') !== selectScript.join('_')) {
                                    setSelectScript(v);
                                }
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
                                                setIsSetScript(true);
                                                // handleSetScript();
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
                                    {selectScript[0] === '1' && (
                                        <CountScriptInfo
                                            setIsSetScript={() => setIsSetScript(false)}
                                            selectScript={selectScript}
                                            testStage={testStage}
                                            isSetScript={isSetScript}
                                        />
                                    )}

                                    {selectScript[0] === '2' && (
                                        <OperationScript
                                            setIsSetScript={() => setIsSetScript(false)}
                                            selectScript={selectScript}
                                            testStage={testStage}
                                            isSetScript={isSetScript}
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
                    handleSetScript={() => {
                        setShowSetScript(false);
                        setIsSetScript(true);
                    }}
                />
            )}
        </>
    );
};
export default StepScript;
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
