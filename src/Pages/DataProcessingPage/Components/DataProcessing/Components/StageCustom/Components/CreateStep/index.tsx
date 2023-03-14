/**
 * @file CreateStep
 * @date 2022-11-11
 * @author liaoli
 * @lastModify liaoli 2022-11-11
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import { Alert, Button } from '@datareachable/dr_front_componentlibrary';
import { Input } from '@datareachable/dr_front_componentlibrary/Components/Zmz/Input';
import { DropDownListV2 } from '@datareachable/dr_front_componentlibrary/Components/Zmz/DropDownListV2';
import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import style from './style.scss';
import { RootState } from '~/Store/rootReducer';
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
interface CreateStepProps {
    actionStage: string;
    handleClose: () => void;
    handleCreateStep: (id: string, type: string, name: string) => void;
}
const CreateStep: React.FC<CreateStepProps> = ({
    actionStage,
    handleClose,
    handleCreateStep,
}): JSX.Element => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    const stageList = useSelector((state: RootState) => state.jobStage.getJobStage.config);

    /**
     * 计算类：1
     * 行动类: 2
     */
    const [stepType, setStepType] = useState('1');

    /**
     * step name
     */
    const [stepName, setStepName] = useState('');
    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    const isNameRepeat = useMemo(() => {
        const currentStep = stageList.find((v) => v.id === actionStage)?.steps;
        if (!currentStep) {
            return false;
        }
        return (
            currentStep.in_stream.some((v) => v.name === stepName) ||
            currentStep.after_stream.some((v) => v.name === stepName)
        );
    }, [stageList, actionStage, stepName]);
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/
    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <Alert
            status={true}
            custom={true}
            width="60rem"
            height="30rem"
            className={style.createStep_alert}
            changeStatus={handleClose}
        >
            <div>
                <h2 className={style.createStep}>新增步骤</h2>
                <p className={style.createStep_tip}>请先选择步骤类型，即在此类型中创建一个步骤</p>
                <h3 className={style.createStep_name}>步骤名称</h3>
                <Input
                    className={`${style.createStep_input} ${
                        isNameRepeat ? style.createStep_nameRepeat : ''
                    }`}
                    value={stepName}
                    onChange={(v) => {
                        setStepName(v.target.value.trim());
                    }}
                    addonBefore={
                        <DropDownListV2
                            floatingClassName={style.createStep_type}
                            defaultValue={stepType}
                            handleValueChange={(v) => {
                                setStepType(v as string);
                            }}
                            labels={[
                                { content: '计算类', id: '1' },
                                { content: '行动类', id: '2' },
                            ]}
                        />
                    }
                    placeholder="输入步骤名称..."
                />
                <div className={style.createStep_button}>
                    <Button
                        height="3.2rem"
                        label="取消"
                        size="big"
                        type="primary"
                        width="7.6rem"
                        onClick={() => {
                            handleClose();
                        }}
                    />
                    <Button
                        width="6rem"
                        height="3.2rem"
                        label="创建"
                        size="normal"
                        type="primary"
                        disabled={!stepName || isNameRepeat}
                        onClick={() => {
                            handleCreateStep(actionStage, stepType, stepName);
                        }}
                    />
                </div>
            </div>
        </Alert>
    );
};
export default CreateStep;
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
