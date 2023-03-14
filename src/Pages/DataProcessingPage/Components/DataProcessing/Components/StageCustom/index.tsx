/**
 * @file StageCustom
 * @date 2022-11-09
 * @author liaoli
 * @lastModify liaoli 2022-11-09
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import {
    Icon,
    Radio,
    Kite,
    ScrollComponent,
    Popover,
} from '@datareachable/dr_front_componentlibrary';
import React, { useState, useRef, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateJobStageSaga } from '~/Store/JobStage/actions';
import { RootState } from '~/Store/rootReducer';
import style from './style.scss';
import emptyImg from '~/Assets/images/icon_questionnaire.png';
import CreateStage from './Components/CreateStage';
import StageList from './Components/StageList';
import StageNav from './Components/StageNav';
import EditStageName from './Components/EditStageName';
import DelStage from './Components/DelStage';
import CreateStep from './Components/CreateStep';
import { v4 as uuidv4 } from 'uuid';
import { verifyScriptParams } from '~/Utils/verifyScriptParams';
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
interface StageCustomProps {
    stageStatus: number;
    isSelect: boolean;
    handleChangeStatus: (v: number) => void;
}
const StageCustom: React.FC<StageCustomProps> = ({
    isSelect,
    stageStatus,
    handleChangeStatus,
}): JSX.Element => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    const dispatch = useDispatch();

    const tgId = useSelector((state: RootState) => state.preparation.selectedTg);

    const currentJob = useSelector((state: RootState) => state.jobList.getCurrentJob);

    const getJobStage = useSelector((state: RootState) => state.jobStage.getJobStage);

    /** 显示创建阶段弹框 */
    const [showCreateStageAlert, setShowCreateStageAlert] = useState(false);

    /** 显示重命名弹框 */
    const [showReNameAlert, setShowReNameAlert] = useState(false);

    /** 显示删除弹框 */
    const [showDelAlert, setShowDelAlert] = useState(false);

    /** 显示增加步骤弹框 */
    const [showCreateStepAlert, setShowCreateStepAlert] = useState(false);

    /** 阶段操作root元素 */
    const [el, setEl] = useState<null | Element>(null);

    /** 当前操作的阶段 */
    const [actionStage, setActionStage] = useState('');

    /** 操作步骤option */
    const stepOption = useRef<{ icon: 'edit' | 'addition01' | 'dustbin'; content: string }[]>([
        {
            icon: 'edit',
            content: '重命名',
        },
        {
            icon: 'addition01',
            content: '新增步骤',
        },
        {
            icon: 'dustbin',
            content: '删除阶段',
        },
    ]);

    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    // useEffect(() => {
    //     if (isSelect) {
    //         getJobStageFn();
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [currentJob, dispatch, tgId, isSelect]);

    /**
     * 获取当前所有setp是否选择了脚本
     */
    const isAllselectScript = useMemo(() => {
        return getJobStage.config.every((v) => {
            return (
                v.steps.in_stream.every((item) => !!item.script.name) &&
                v.steps.after_stream.every((item) => !!item.script.name)
            );
        });
    }, [getJobStage]);

    /**
     * 是否所有的参数都填了
     */
    const isSetAllParams = useMemo(() => {
        return getJobStage.config.every((v) => {
            return (
                v.steps.in_stream.every((item) => !!verifyScriptParams(item.script)) &&
                v.steps.after_stream.every((item) => !!verifyScriptParams(item.script))
            );
        });
    }, [getJobStage]);

    /**
     * get stage status
     */
    const getStatusInfo = useMemo(() => {
        switch (stageStatus) {
            case 5:
                return {
                    icon: 'send' as const,
                    text: '发布',
                    tips: '已完成配置测试，发布后将开始数据处理',
                };
            case 4:
                return {
                    icon: 'send' as const,
                    text: '发布',
                    tips: '已完成配置测试，发布后将开始数据处理',
                };
            case 3:
                return {
                    icon: 'check' as const,
                    text: '测试',
                    tips: '请对以下脚本与变量配置进行测试',
                };
            case 2:
                return {
                    icon: 'check' as const,
                    text: '测试',
                    tips: '请对以下脚本与变量配置进行测试',
                };
            default:
                return {
                    icon: 'save' as const,
                    text: '保存',
                    tips: '请保存脚本与变量配置',
                };
        }
    }, [stageStatus]);

    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/

    /**
     * 获取stage
     */
    // const getJobStageFn = () => {
    //     setShowCreateStageAlert(false);
    //     if (currentJob && tgId) {
    //         dispatch(
    //             getJobStageSage({
    //                 job_id: currentJob.id,
    //                 talent_group_id: tgId,
    //                 callback() {
    //                     setLoading(false);
    //                 },
    //             }),
    //         );
    //     }
    // };

    /**
     * 显示哪个弹框
     */
    const handleSetStage = (index: number) => {
        switch (index) {
            case 0:
                setShowReNameAlert(true);
                break;
            case 1:
                setShowCreateStepAlert(true);
                break;
            case 2:
                setShowDelAlert(true);
                break;
        }
    };

    /**
     * 创建stage
     */
    const handleCreateStage = (value: string) => {
        setShowCreateStageAlert(false);
        if (currentJob) {
            dispatch(
                updateJobStageSaga({
                    talent_group_id: tgId,
                    job_id: currentJob.id,
                    stages: {
                        status: 0,
                        config: [
                            ...getJobStage.config,
                            {
                                id: uuidv4(),
                                name: value,
                                steps: {
                                    in_stream: [
                                        {
                                            id: uuidv4(),
                                            name: '开始步骤',
                                            script: {
                                                name: '',
                                                args: [],
                                                type: '',
                                                description: '',
                                            },
                                        },
                                        {
                                            id: uuidv4(),
                                            name: '结束步骤',
                                            script: {
                                                name: '',
                                                args: [],
                                                type: '',
                                                description: '',
                                            },
                                        },
                                    ],
                                    after_stream: [],
                                },
                                g_vars: [],
                                r_vars: [],
                            },
                        ],
                    },
                }),
            );
        }
    };

    /**
     * 创建step
     */
    const createStepFn = (id: string, type: string, name: string) => {
        setShowCreateStepAlert(false);
        if (tgId && currentJob) {
            dispatch(
                updateJobStageSaga({
                    talent_group_id: tgId,
                    job_id: currentJob.id,
                    stages: {
                        status: 0,
                        config: getJobStage.config.map((v) => {
                            if (v.id === id) {
                                if (type === '1') {
                                    v.steps.in_stream.splice(v.steps.in_stream.length - 1, 0, {
                                        id: uuidv4(),
                                        name: name,
                                        script: {
                                            name: '',
                                            args: [],
                                            type: '',
                                            description: '',
                                        },
                                    });
                                } else {
                                    v.steps.after_stream.push({
                                        id: uuidv4(),
                                        name: name,
                                        script: {
                                            name: '',
                                            args: [],
                                            type: '',
                                        },
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

    /**
     * 改变 stage status
     */
    const updateStageStatus = (status: number) => {
        if (currentJob && tgId) {
            dispatch(
                updateJobStageSaga({
                    talent_group_id: tgId,
                    job_id: currentJob.id,
                    stages: {
                        status: status,
                        config: getJobStage.config,
                    },
                }),
            );
        }
    };

    /**
     * 更新stage name
     */
    const updateStageNameFn = (name: string, id: string) => {
        setShowReNameAlert(false);
        if (currentJob && tgId) {
            dispatch(
                updateJobStageSaga({
                    talent_group_id: tgId,
                    job_id: currentJob.id,
                    stages: {
                        status: 0,
                        config: getJobStage.config.map((v) => {
                            if (v.id === id) {
                                v.name = name;
                            }
                            return v;
                        }),
                    },
                }),
            );
        }
    };

    /**
     * 删除stage
     */
    const delStageFn = (id: string) => {
        setShowDelAlert(false);
        if (currentJob && tgId) {
            dispatch(
                updateJobStageSaga({
                    talent_group_id: tgId,
                    job_id: currentJob.id,
                    stages: {
                        status: 0,
                        config: getJobStage.config.filter((v) => v.id !== id),
                    },
                }),
            );
        }
    };

    /**
     * 点击 保存、测试、发布
     */
    const stageStatusChange = () => {
        switch (stageStatus) {
            case 1:
                handleChangeStatus(2);
                break;
            case 2:
                isAllselectScript && handleChangeStatus(3);
                if (isAllselectScript) {
                    if (isSetAllParams) {
                        handleChangeStatus(4);
                        updateStageStatus(1);
                    } else {
                        handleChangeStatus(3);
                    }
                }
                break;
            case 3:
                if (isSetAllParams && isAllselectScript) {
                    handleChangeStatus(4);
                    updateStageStatus(1);
                }
                break;
            case 4:
                handleChangeStatus(5);
                updateStageStatus(2);
                break;
        }
    };

    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <div className={style.dataProcessing_custom__container}>
            <Radio
                className={`${style.dataProcessing_option} ${
                    isSelect ? style.dataProcessing_active : ''
                }`}
                value="custom"
            >
                <div className={style.customStage_option}>
                    <div>
                        <p>自定义处理</p>
                        <Icon
                            type="information"
                            className={!isSelect ? style.dataProcessing_custom__hidden : ''}
                        />
                        <span className={!isSelect ? style.dataProcessing_custom__hidden : ''}>
                            {getStatusInfo.tips}
                        </span>
                    </div>
                    <div className={!isSelect ? style.dataProcessing_custom__hidden : ''}>
                        <Popover
                            placement="rb"
                            direction="horizontal"
                            triangle={{ width: '0', height: '0' }}
                            offset={{ x: -10, y: -10 }}
                            show={!isAllselectScript && stageStatus === 2 ? undefined : false}
                            className={style.dataProcessing_customStatus__popover}
                            root={
                                <div
                                    onClick={stageStatusChange}
                                    className={
                                        (stageStatus === 2 && !isAllselectScript) ||
                                        (stageStatus === 3 && !isSetAllParams) ||
                                        stageStatus === 5
                                            ? style.dataProcessing_customStatus__notSelect
                                            : ''
                                    }
                                >
                                    <Icon type={getStatusInfo.icon} />
                                    <p>{getStatusInfo.text}</p>
                                </div>
                            }
                        >
                            您有未设脚本，无法测试
                        </Popover>

                        <div
                            onClick={() => {
                                setShowCreateStageAlert(true);
                            }}
                        >
                            <Icon type="addition01" />
                            <p>创建</p>
                        </div>
                    </div>
                </div>
            </Radio>
            {isSelect && (
                <div className={style.dataProcessing_customContent}>
                    {getJobStage.config.length ? (
                        <div className={style.dataProcessing_custom__main}>
                            <StageNav stageStatus={stageStatus} />
                            <ScrollComponent height="100%">
                                <StageList
                                    stageTest={stageStatus === 3 || stageStatus === 4}
                                    handleSetKite={(e) => {
                                        el ? setEl(null) : setEl(e);
                                    }}
                                    handleCurrentStageChange={(v) => {
                                        setActionStage(v);
                                    }}
                                />
                            </ScrollComponent>
                        </div>
                    ) : (
                        <div className={style.dataProcessing_emptyStage}>
                            <img src={emptyImg} alt="" />
                            <p>暂未创建处理阶段</p>
                            <div
                                onClick={() => {
                                    setShowCreateStageAlert(true);
                                }}
                            >
                                <Icon type="addition01" />
                                <span>创建阶段</span>
                            </div>
                        </div>
                    )}
                </div>
            )}
            {showCreateStageAlert && (
                <CreateStage
                    handleClose={() => {
                        setShowCreateStageAlert(false);
                    }}
                    handleCreateStage={(value) => {
                        handleCreateStage(value);
                    }}
                />
            )}
            {showReNameAlert && (
                <EditStageName
                    actionStage={actionStage}
                    stageName={getJobStage.config.find((v) => v.id === actionStage)?.name}
                    handleClose={() => {
                        setShowReNameAlert(false);
                    }}
                    handleUpdateStageName={updateStageNameFn}
                />
            )}
            {showDelAlert && (
                <DelStage
                    stage={getJobStage.config.find((v) => v.id === actionStage)}
                    handleClose={() => {
                        setShowDelAlert(false);
                    }}
                    handleDelStage={delStageFn}
                />
            )}
            {showCreateStepAlert && (
                <CreateStep
                    actionStage={actionStage}
                    handleClose={() => {
                        setShowCreateStepAlert(false);
                    }}
                    handleCreateStep={createStepFn}
                />
            )}
            {el && (
                <Kite
                    placement="rb"
                    show={true}
                    root={el}
                    offset={{ y: 4 }}
                    bodyClassName={style.customStage_optionKite}
                    handleGlobalClick={(v) => {
                        if (!v.isMenu && !v.isBtn) {
                            setEl(null);
                        }
                    }}
                >
                    <div>
                        {stepOption.current.map((item, index) => (
                            <div
                                key={item.icon}
                                onClick={() => {
                                    handleSetStage(index);
                                }}
                                style={item.content === '删除阶段' ? { color: '#FF525D' } : {}}
                            >
                                <Icon type={item.icon} />
                                <span>{item.content}</span>
                            </div>
                        ))}
                    </div>
                </Kite>
            )}
        </div>
    );
};
export default StageCustom;
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
