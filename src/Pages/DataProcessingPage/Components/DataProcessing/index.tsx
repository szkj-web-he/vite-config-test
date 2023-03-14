/**
 * @file DataProcessing
 * @date 2022-08-29
 * @author liaoli
 * @lastModify liaoli 2022-08-29
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import {
    Icon,
    Radio,
    RadioGroup,
    Popover,
    MagneticEditor,
    Row,
    Col,
} from '@datareachable/dr_front_componentlibrary';
import { initDescendant } from '@datareachable/dr_front_componentlibrary/Components/TextEdit/Unit/initDescendant';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Skeleton from '~/Components/Skeleton';
import { updateJobDescAction, updateJobSaga } from '~/Store/JobList/actions';
import { getJobStageSage } from '~/Store/JobStage/actions';
import { RootState } from '~/Store/rootReducer';
import JobNavigation from '../JobNavigation';
import EditJobDescription from './Components/EditJobDescription';
import SettingStep from './Components/SettingStep';
import StageCustom from './Components/StageCustom';
import style from './style.scss';
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
interface DataProcessingProps {
    dataProcessingMethod: 'default' | 'custom';
    setStep: (v: number) => void;
    handleUpdateProcessingMethod: (v: 'default' | 'custom') => void;
}
const DataProcessing: React.FC<DataProcessingProps> = ({
    dataProcessingMethod,
    setStep,
    handleUpdateProcessingMethod,
}): JSX.Element => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    const dispatch = useDispatch();

    const { currentRole } = useSelector((state: RootState) => state.preparation);

    const tgId = useSelector((state: RootState) => state.preparation.selectedTg);

    const currentJob = useSelector((state: RootState) => state.jobList.getCurrentJob);

    const jobList = useSelector((state: RootState) => state.jobList.getJobList.data);

    const currentStep = useSelector((state: RootState) => state.jobStage.currentStep);

    const getJobStage = useSelector((state: RootState) => state.jobStage.getJobStage);

    // /** 选择的处理方式 */
    // const [dataProcessingMethod, setDataProcessingMethod] = useState<'default' | 'custom'>(
    //     'default',
    // );

    /** 显示修改描述弹框 */
    const [showDescribeAlert, setShowDescribeAlert] = useState(false);

    /** 当前自定义处理的状态 */
    const [stageStatus, setStageStatus] = useState(1);

    const [loading, setLoading] = useState(false);

    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/

    /**
     * 获取当前所有setp是否选择了脚本
     */
    // const isAllselectScript = useMemo(() => {
    //     return getJobStage.config.every(v => {
    //         return v.steps.in_stream.every(item => !!item.script.name) && v.steps.after_stream.every(item => !!item.script.name)
    //     })
    // }, [getJobStage])

    useEffect(() => {
        if (currentJob && tgId) {
            dispatch(
                getJobStageSage({
                    talent_group_id: tgId,
                    job_id: currentJob.id,
                    callback() {
                        setLoading(true);
                    },
                }),
            );
        }
    }, [currentJob, dispatch, tgId]);

    useEffect(() => {
        switch (getJobStage.status) {
            case 0:
                setStageStatus(1);
                break;
            case 1:
                setStageStatus(4);
                break;
            case 2:
                setStageStatus(5);
                break;

            default:
                break;
        }
        // switch (getJobStage.status) {
        //     case 1:
        //         setStageStatus(4)
        //         break;
        //     case 2:
        //         setStageStatus(5)
        //         break;
        //     default:
        //         setStageStatus(1)
        //         break;
        // }
    }, [getJobStage.status]);
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/
    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <div className={style.dataProcessing_wrap}>
            <Row
                justify="center"
                style={
                    !(currentStep.stageId && currentStep.stepId)
                        ? { display: 'block' }
                        : { display: 'none' }
                }
            >
                <Col span={10} style={{ margin: 'auto' }}>
                    <div className={style.dataProcessing_container}>
                        <JobNavigation step={2} handleStepClick={(step) => setStep(step)} />
                        <div className={style.dataProcessing_describeTitle}>
                            <h2>工作描述</h2>
                            {currentRole === 'task_giver' && (
                                <Popover
                                    root={
                                        <Icon
                                            onClick={() => {
                                                setShowDescribeAlert(true);
                                            }}
                                            className={style.dataProcessing_editIcon}
                                            type="edit"
                                        />
                                    }
                                    placement="ct"
                                    className={style.dataProcessing_editPopover}
                                >
                                    编辑工作描述
                                </Popover>
                            )}
                        </div>
                        <div className={style.dataProcessing_describe}>
                            <MagneticEditor
                                editorValue={initDescendant(
                                    jobList?.find((v) => v.id === currentJob?.id)?.description,
                                )}
                                readOnly
                            />
                        </div>
                        <h2 className={style.dataProcessing_method}>数据处理方式</h2>
                        <div className={style.dataProcessing_tips}>
                            <Icon type="information" />
                            <p>
                                请选择以默认处理（不配置任何数据处理）的方式直接展示简报，或选择自定义处理（自行配置数据处理）后展示简报。
                            </p>
                        </div>
                        {!loading ? (
                            <Skeleton row={9} />
                        ) : (
                            <RadioGroup
                                onChange={(value) => {
                                    handleUpdateProcessingMethod(value as 'default' | 'custom');
                                }}
                                value={dataProcessingMethod}
                            >
                                <Radio
                                    className={`${style.dataProcessing_option} ${
                                        dataProcessingMethod === 'default'
                                            ? style.dataProcessing_action
                                            : ''
                                    }`}
                                    style={
                                        currentRole !== 'writer'
                                            ? dataProcessingMethod === 'default'
                                                ? { color: '#BDBDBD', backgroundColor: '#F9FBFB' }
                                                : { color: '#BDBDBD', backgroundColor: '#fff' }
                                            : {}
                                    }
                                    disabled={currentRole !== 'writer'}
                                    value="default"
                                >
                                    默认处理
                                </Radio>
                                <div className={style.dataProcessing_line}></div>
                                {currentRole === 'writer' ? (
                                    <StageCustom
                                        isSelect={dataProcessingMethod === 'custom'}
                                        stageStatus={stageStatus}
                                        handleChangeStatus={setStageStatus}
                                    />
                                ) : (
                                    <Radio
                                        className={`${style.dataProcessing_option} ${
                                            dataProcessingMethod === 'default'
                                                ? style.dataProcessing_action
                                                : ''
                                        }`}
                                        style={
                                            dataProcessingMethod === 'default'
                                                ? { color: '#BDBDBD', backgroundColor: '#fff' }
                                                : { color: '#BDBDBD', backgroundColor: '#F9FBFB' }
                                        }
                                        disabled={true}
                                        value="custom"
                                    >
                                        自定义处理
                                    </Radio>
                                )}
                            </RadioGroup>
                        )}
                    </div>
                    {showDescribeAlert && (
                        <EditJobDescription
                            job={currentJob}
                            value={jobList?.find((v) => v.id === currentJob?.id)?.description || ''}
                            handleClose={() => {
                                setShowDescribeAlert(false);
                            }}
                            handleUpdateDescription={(id, value) => {
                                dispatch(
                                    updateJobSaga({
                                        job_id: id,
                                        talent_group_id: tgId,
                                        job_new_data: {
                                            description: JSON.stringify(value),
                                        },
                                        callback() {
                                            dispatch(
                                                updateJobDescAction({
                                                    job_id: id,
                                                    description: JSON.stringify(value),
                                                }),
                                            );
                                            setShowDescribeAlert(false);
                                        },
                                    }),
                                );
                            }}
                        />
                    )}
                </Col>
            </Row>
            {currentStep.stageId && currentStep.stepId && (
                <SettingStep setStep={setStep} testStage={stageStatus === 3} />
            )}
        </div>
    );
};
export default DataProcessing;
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
