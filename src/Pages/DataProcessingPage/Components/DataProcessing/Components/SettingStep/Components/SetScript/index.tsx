/**
 * @file etScript
 * @date 2022-11-23
 * @author liaoli
 * @lastModify liaoli 2022-11-23
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import { Button } from '@datareachable/dr_front_componentlibrary/Components/Buttons/Button';
import { Alert } from '@datareachable/dr_front_componentlibrary/Components/DataDisplay/Alert';
import { Icon } from '@datareachable/dr_front_componentlibrary/Components/Icon';
import React from 'react';
import style from './style.scss';
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface etScriptProps {
    handleClose: () => void;
    handleSetScript: () => void;
}
const etScript: React.FC<etScriptProps> = ({ handleClose, handleSetScript }): JSX.Element => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
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
            height="23rem"
            className={style.setScript_alert}
            changeStatus={handleClose}
        >
            <div className={style.setScript_container}>
                <div className={style.setScript_header}>
                    <Icon type="warning" />
                    <h2>设为已选脚本？</h2>
                </div>
                <p className={style.setScript_tips}>请确定您是否要将“内置脚本002” 设为已选脚本？</p>
                <p className={style.setScript_warning}>
                    （一旦确认，即代表之前已选脚本将被该脚本全部覆盖替换）
                </p>
                <div className={style.setScript_button}>
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
                        onClick={handleSetScript}
                    />
                </div>
            </div>
        </Alert>
    );
};
export default etScript;
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
