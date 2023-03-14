/**
 * @file SettingStep
 * @date 2022-11-11
 * @author liaoli
 * @lastModify liaoli 2022-11-11
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import { Row, Col, Icon } from '@datareachable/dr_front_componentlibrary';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import JobNavigation from '../../../JobNavigation';
import CountScript from './Components/CountScript';
import ActionScript from './Components/ActionScript';
import style from './style.scss';
import StepVariable from './Components/StepVariable';
import EditStepName from './Components/EditStepName';
import { updateCurrentStepAction, updateJobStageSaga } from '~/Store/JobStage/actions';
import { RootState } from '~/Store/rootReducer';
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
interface SettingStepProps {
    testStage: boolean;
    setStep: (v: number) => void;
}
const SettingStep: React.FC<SettingStepProps> = ({ setStep, testStage }): JSX.Element => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    const dispatch = useDispatch();

    const currentStep = useSelector((state: RootState) => state.jobStage.currentStep);

    const getJobStage = useSelector((state: RootState) => state.jobStage.getJobStage);

    const tgId = useSelector((state: RootState) => state.preparation.selectedTg);

    const currentJob = useSelector((state: RootState) => state.jobList.getCurrentJob);

    /**
     * step name
     */
    const [showEditStepName, setShowEditStepName] = useState(false);

    /**
     *
     */
    const [showType, setShowType] = useState<'variable' | 'script'>('script');

    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    /**
     * 当前的step
     */
    const currentStepData = useMemo(() => {
        const currentStage = getJobStage.config.find((v) => v.id === currentStep.stageId);
        if (currentStep.type === '1') {
            return currentStage?.steps.in_stream.find((v) => v.id === currentStep.stepId);
        } else if (currentStep.type === '2') {
            return currentStage?.steps.after_stream.find((v) => v.id === currentStep.stepId);
        }
    }, [currentStep, getJobStage.config]);

    useEffect(() => {
        return () => {
            dispatch(updateCurrentStepAction({ stageId: '', stepId: '', type: '' }));
        };
    }, [dispatch]);
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/
    /**
     * 更新stepname
     */
    const updateStepName = (stage: string, step: string, name: string) => {
        setShowEditStepName(false);
        if (currentJob && tgId && stage && step && name) {
            dispatch(
                updateJobStageSaga({
                    talent_group_id: tgId,
                    job_id: currentJob.id,
                    stages: {
                        status: 0,
                        config: getJobStage.config.map((v) => {
                            if (v.id === stage) {
                                if (currentStep.type === '1') {
                                    v.steps.in_stream = v.steps.in_stream.map((item) => {
                                        if (item.id === currentStep.stepId) {
                                            item = {
                                                ...item,
                                                name,
                                            };
                                        }
                                        return item;
                                    });
                                } else if (currentStep.type === '2') {
                                    v.steps.after_stream = v.steps.after_stream.map((item) => {
                                        if (item.id === currentStep.stepId) {
                                            item = {
                                                ...item,
                                                name,
                                            };
                                        }
                                        return item;
                                    });
                                }
                            }
                            return v;
                        }),
                    },
                }),
            );
        }
    };
    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <>
            <Row justify="center" style={{ height: 'auto' }}>
                <Col span={10}>
                    <JobNavigation
                        step={3}
                        viewName={currentStepData?.name}
                        handleStepClick={(step) => {
                            setStep(step);
                            if (step === 2) {
                                dispatch(
                                    updateCurrentStepAction({ stageId: '', stepId: '', type: '' }),
                                );
                            }
                        }}
                    />
                    <div className={style.settingStep_header}>
                        <div>
                            <h2>{currentStepData?.name}</h2>
                            <span>{currentStep.type === '1' ? '计算类' : '行动类'}</span>
                            <Icon
                                style={
                                    currentStepData?.name === '开始步骤' ||
                                    currentStepData?.name === '结束步骤'
                                        ? { display: 'none' }
                                        : {}
                                }
                                type="edit"
                                onClick={() => {
                                    setShowEditStepName(true);
                                }}
                            />
                        </div>
                        <div
                            onClick={() => {
                                dispatch(
                                    updateCurrentStepAction({ stageId: '', stepId: '', type: '' }),
                                );
                            }}
                        >
                            <Icon type="ReturnStageList" />
                            <span>返回阶段列表</span>
                        </div>
                    </div>
                    <div className={style.settingStep_tab}>
                        <p
                            className={showType === 'script' ? style.settingStep_tab__select : ''}
                            onClick={() => setShowType('script')}
                        >
                            脚本设置
                        </p>
                        <p
                            className={showType === 'variable' ? style.settingStep_tab__select : ''}
                            onClick={() => setShowType('variable')}
                        >
                            阶段变量设置
                        </p>
                    </div>
                </Col>
            </Row>
            {showType === 'script' ? (
                currentStep.type === '1' ? (
                    <CountScript testStage={testStage} />
                ) : (
                    <ActionScript testStage={testStage} />
                )
            ) : (
                <StepVariable />
            )}

            {showEditStepName && (
                <EditStepName
                    type={currentStep.type}
                    oldStepName={currentStepData?.name || ''}
                    stage={currentStep.stageId}
                    step={currentStep.stepId}
                    handleClose={() => {
                        setShowEditStepName(false);
                    }}
                    handleUpdateStepName={updateStepName}
                />
            )}
        </>
    );
};
export default SettingStep;
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
