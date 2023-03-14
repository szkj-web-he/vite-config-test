/**
 * @file EditStepName
 * @date 2022-11-17
 * @author liaoli
 * @lastModify liaoli 2022-11-17
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import { Alert, Button, ResetInput } from '@datareachable/dr_front_componentlibrary';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useMemo } from 'react';
import style from './style.scss';
import { RootState } from '~/Store/rootReducer';
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface EditStepNameProps {
    type: string;
    stage: string;
    step: string;
    oldStepName: string;
    handleClose: () => void;
    handleUpdateStepName: (stage: string, step: string, name: string) => void;
}
const EditStepName: React.FC<EditStepNameProps> = ({
    type,
    oldStepName,
    stage,
    step,
    handleClose,
    handleUpdateStepName,
}): JSX.Element => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    const stageList = useSelector((state: RootState) => state.jobStage.getJobStage.config);

    const [stepName, setStepName] = useState(oldStepName);
    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    const isNameRepeat = useMemo(() => {
        const currentStep = stageList.find((v) => v.id === stage)?.steps;
        if (!currentStep) {
            return false;
        }
        if (type === '1') {
            return (
                currentStep.in_stream.some((v) => v.name === stepName && v.id !== step) ||
                currentStep.after_stream.some((v) => v.name === stepName)
            );
        } else if (type === '2') {
            return (
                currentStep.in_stream.some((v) => v.name === stepName) ||
                currentStep.after_stream.some((v) => v.name === stepName && v.id !== step)
            );
        }
    }, [stageList, stage, stepName, type, step]);
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/
    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <Alert
            width="60rem"
            className={style.editStepName_alert}
            height="25.9rem"
            custom
            status={true}
            changeStatus={() => {
                handleClose();
            }}
        >
            <div className={style.editStepName_alertBox}>
                <h2 className={style.editStageName_title}>修改步骤名称</h2>
                <p className={style.editStageName_tips}>步骤名称</p>
                <ResetInput
                    className={`${style.editStageName_input} ${
                        isNameRepeat ? style.editStageName_nameRepeat : ''
                    }`}
                    value={stepName}
                    onChange={(v) => {
                        setStepName(v);
                    }}
                />
                <div className={style.editStepName_button}>
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
                        label="保存"
                        size="normal"
                        type="primary"
                        disabled={
                            !stepName.trim() || oldStepName.trim() === stepName || isNameRepeat
                        }
                        onClick={() => {
                            handleUpdateStepName(stage, step, stepName.trim());
                        }}
                    />
                </div>
            </div>
        </Alert>
    );
};
export default EditStepName;
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
