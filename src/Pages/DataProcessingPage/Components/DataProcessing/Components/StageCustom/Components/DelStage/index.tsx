/**
 * @file DelStage
 * @date 2022-11-11
 * @author liaoli
 * @lastModify liaoli 2022-11-11
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import { Alert, Icon, Button, ResetInput } from '@datareachable/dr_front_componentlibrary';
import React, { useState } from 'react';
import { StageType } from '~/Store/JobStage/types';
import style from './style.scss';
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface DelStageProps {
    stage?: StageType;
    handleClose: () => void;
    handleDelStage: (id: string) => void;
}
const DelStage: React.FC<DelStageProps> = ({ stage, handleClose, handleDelStage }): JSX.Element => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    const [value, setValue] = useState('');
    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/
    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <Alert
            status={true}
            custom={true}
            width="60rem"
            height="30.7rem"
            className={style.delStage_alert}
            changeStatus={handleClose}
        >
            <div className={style.delStage_box}>
                <div className={style.delStage_header}>
                    <Icon className={style.delStage_warning} type="warningTriangle" />
                    <h2>删除此阶段?</h2>
                </div>
                <div>
                    <span className={style.delStage_tip}>请确定你想要删除此阶段</span>
                    <span className={style.delStage_remarks}>
                        (一旦您删除了此阶段，您之前在此阶段做的所有操作都将清除，且无法恢复。请您谨慎操作。)
                    </span>
                </div>
                <h3>请输入您想删除的阶段名称</h3>
                <ResetInput
                    value={value}
                    onChange={(v) => {
                        setValue(v);
                    }}
                    placeholder="请输入完整名称"
                />
                <div className={style.delStage_button}>
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
                        label="确定"
                        size="normal"
                        type="primary"
                        disabled={(stage?.name || '') !== value || !value.trim()}
                        onClick={() => {
                            stage && handleDelStage(stage.id);
                        }}
                    />
                </div>
            </div>
        </Alert>
    );
};
export default DelStage;
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
