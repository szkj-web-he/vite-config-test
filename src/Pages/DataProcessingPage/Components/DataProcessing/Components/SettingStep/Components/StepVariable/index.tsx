/**
 * @file StepVariable
 * @date 2022-11-15
 * @author liaoli
 * @lastModify liaoli 2022-11-15
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import { Row, Col, Icon } from '@datareachable/dr_front_componentlibrary';
import React, { useEffect, useMemo, useState } from 'react';
import VariableSideBar from './Components/VariableSideBar';
import GlobalVarInfo from './Components/GlobalVarInfo';
import style from './style.scss';
import RespondentVarInfo from './Components/RespondentVarInfo';
import emptyImage from '~/Assets/images/icon_questionnaire.png';
import CreateVariable from './Components/CreateVariable';
import { RootState } from '~/Store/rootReducer';
import { useDispatch, useSelector } from 'react-redux';
import { updateJobStageSaga } from '~/Store/JobStage/actions';
import { v4 as uuidv4 } from 'uuid';
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface StepVariableProps {}
const StepVariable: React.FC<StepVariableProps> = (): JSX.Element => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    const dispatch = useDispatch();

    const {
        getJobStage,
        currentStep: { stageId },
    } = useSelector((state: RootState) => state.jobStage);

    const tgId = useSelector((state: RootState) => state.preparation.selectedTg);

    const currentJob = useSelector((state: RootState) => state.jobList.getCurrentJob);

    const [selectVariable, setSelectVariable] = useState(['1', '']);

    const [createVar, setCreateVar] = useState('');
    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    const currentStep = useMemo(() => {
        return getJobStage.config.find((v) => v.id === stageId);
    }, [getJobStage, stageId]);

    useEffect(() => {
        if (selectVariable[0] === '1' && currentStep?.r_vars.length && !selectVariable[1]) {
            setSelectVariable(['1', currentStep.r_vars[0].id]);
        } else if (selectVariable[0] === '2' && currentStep?.g_vars.length && !selectVariable[1]) {
            setSelectVariable(['2', currentStep.g_vars[0].id]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentStep]);

    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/
    const emptyEl = (type: string) => (
        <div className={style.stepVar_empty}>
            <h2>设置变量</h2>
            <div>
                <img src={emptyImage} alt="" />
                <p>暂未创建变量</p>
                <div onClick={() => setCreateVar(type)}>
                    <Icon type="addition01" />
                    <span>创建{type === '1' ? '被访者' : '全局'}变量</span>
                </div>
            </div>
        </div>
    );

    const createVarFn = (varType: 'global' | 'respondents', name: string, type: string) => {
        setCreateVar('');
        if (!currentJob) return;
        const data = getJobStage.config.map((v) => {
            if (v.id === stageId) {
                if (varType === 'global') {
                    return {
                        ...v,
                        g_vars: [
                            ...v.g_vars,
                            {
                                id: uuidv4(),
                                name: name,
                                type: type,
                                description: '',
                            },
                        ],
                    };
                } else {
                    return {
                        ...v,
                        r_vars: [
                            ...v.r_vars,
                            {
                                id: uuidv4(),
                                qid: name,
                                q_text: '',
                                q_type: type,
                                q_dimension: [],
                                q_label_name: '',
                                q_description: '',
                            },
                        ],
                    };
                }
            }
            return v;
        });

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
    };
    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */

    return (
        <>
            <Row justify="center">
                <Col span={3}>
                    <VariableSideBar
                        selectVariable={selectVariable}
                        handleSwitchSelectVar={(v: string[]) => {
                            setSelectVariable(v);
                        }}
                        handleCreateVar={createVarFn}
                    />
                </Col>
                <Col span={7}>
                    {selectVariable[0] === '1' &&
                        (currentStep?.r_vars.length ? (
                            <RespondentVarInfo selectVariable={selectVariable[1]} />
                        ) : (
                            emptyEl('1')
                        ))}

                    {selectVariable[0] === '2' &&
                        (currentStep?.g_vars.length ? (
                            <GlobalVarInfo selectVariable={selectVariable[1]} />
                        ) : (
                            emptyEl('2')
                        ))}
                </Col>
            </Row>
            {createVar && (
                <CreateVariable
                    type={createVar === '1' ? 'respondents' : 'global'}
                    handleClose={() => setCreateVar('')}
                    handleCreateVar={createVarFn}
                />
            )}
        </>
    );
};
export default StepVariable;
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
