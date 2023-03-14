/**
 * @file CreateStage
 * @date 2022-11-09
 * @author liaoli
 * @lastModify liaoli 2022-11-09
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import { Alert, Button } from '@datareachable/dr_front_componentlibrary';
import { ResetInput } from '@datareachable/dr_front_componentlibrary/Components/DataInput/ResetInput';
import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux'
import { RootState } from '~/Store/rootReducer';
import style from './style.scss';
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface CreateStageProps {
    handleClose: () => void;
    handleCreateStage: (value: string) => void;
}
const CreateStage: React.FC<CreateStageProps> = ({
    handleClose,
    handleCreateStage,
}): JSX.Element => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    const stageList = useSelector((state: RootState) => state.jobStage.getJobStage.config);

    const [stageName, setStageName] = useState('');
    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    const isNameRepeat = useMemo(() => {
        return stageList.some(v => v.name === stageName)
    }, [stageList, stageName])
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/
    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <Alert
            custom
            status={true}
            width="60rem"
            height="30rem"
            className={style.createStage_alert}
            changeStatus={() => {
                handleClose && handleClose();
            }}
        >
            <div className={style.createStage_alertContainer}>
                <h2>创建阶段</h2>
                <p>创建的阶段中将默认配有【开始】和【结束】 两个步骤，其中可进行脚本设置</p>
                <h3>阶段名称</h3>
                <ResetInput
                    className={isNameRepeat ? style.createStage_input : ''}
                    placeholder="请在此输入阶段名称 ..."
                    value={stageName}
                    onChange={(v) => {
                        setStageName(v.trim());
                    }}
                />
                <div className={style.createStage_alertButton}>
                    <Button
                        height="3.2rem"
                        label="取消"
                        size="big"
                        type="primary"
                        width="7.6rem"
                        onClick={() => {
                            handleClose && handleClose();
                        }}
                    />
                    <Button
                        width="6rem"
                        height="3.2rem"
                        label="创建"
                        size="normal"
                        type="primary"
                        disabled={!stageName || isNameRepeat}
                        onClick={() => {
                            handleCreateStage(stageName);
                        }}
                    />
                </div>
            </div>
        </Alert>
    );
};
export default CreateStage;
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
