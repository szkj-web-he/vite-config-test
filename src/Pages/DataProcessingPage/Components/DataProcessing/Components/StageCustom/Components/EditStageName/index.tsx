/**
 * @file EditStageName
 * @date 2022-11-10
 * @author liaoli
 * @lastModify liaoli 2022-11-10
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import { Alert, Button, ResetInput } from '@datareachable/dr_front_componentlibrary';
import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux'
import { RootState } from '~/Store/rootReducer';
import style from './style.scss';
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
interface EditStageNameProps {
    stageName?: string;
    actionStage: string;
    handleClose: () => void;
    handleUpdateStageName: (name: string, id: string) => void;
}
const EditStageName: React.FC<EditStageNameProps> = ({
    stageName: defaultStageName,
    actionStage,
    handleClose,
    handleUpdateStageName,
}): JSX.Element => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    const stageList = useSelector((state: RootState) => state.jobStage.getJobStage.config);

    const [stageName, setStageName] = useState(defaultStageName || '');
    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    const isNameRepeat = useMemo(() => {
        return stageList.some(v => v.name === stageName && v.id !== actionStage)
    }, [stageList, stageName, actionStage])
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/
    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <Alert
            width="60rem"
            className={style.editStageName_alert}
            height="25.9rem"
            custom
            status={true}
            changeStatus={() => {
                handleClose();
            }}
        >
            <div className={style.editStageName_alertBox}>
                <h2 className={style.editStageName_title}>修改阶段名称</h2>
                <p className={style.editStageName_tips}>阶段名称</p>
                <ResetInput
                    value={stageName}
                    className={isNameRepeat ? style.ditStageName_input : ''}
                    onChange={(v) => {
                        setStageName(v);
                    }}
                />
                <div className={style.editStageName_button}>
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
                        disabled={!stageName.trim() || stageName === defaultStageName || isNameRepeat}
                        onClick={() => {
                            handleUpdateStageName(stageName, actionStage);
                        }}
                    />
                </div>
            </div>
        </Alert>
    );
};
export default EditStageName;
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
