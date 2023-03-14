/**
 * @file DelView
 * @date 2022-09-01
 * @author liaoli
 * @lastModify liaoli 2022-09-01
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { useState } from 'react';
import { Alert, Icon, ResetInput, Button } from '@datareachable/dr_front_componentlibrary';
import style from './style.scss';

/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
interface DelViewProps {
    show: boolean;
    handleClose?: () => void;
    currentView: {
        id?: string;
        name?: string;
    };
    handleDelView?: (id: string) => void;
}
const DelView: React.FC<DelViewProps> = ({
    handleClose,
    show,
    currentView,
    handleDelView,
}): JSX.Element => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/

    /** 输入框value */
    const [value, setValue] = useState('');
    /** 验证输入 */
    const [isError, setIsError] = useState(false);

    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/
    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <Alert
            className={style.delView_alert}
            width="60rem"
            height="26.8rem"
            custom
            status={show}
            changeStatus={handleClose}
        >
            <div className={style.delView_container}>
                <div className={style.delView_header}>
                    <Icon className={style.delView_warningIcon} type="warning" />
                    <h2>删除视角</h2>
                </div>
                <div className={style.delView_main}>
                    <p className={style.delView_tips}>请输入您想要删除的视角名称</p>
                    <ResetInput
                        width="100%"
                        className={`${style.delView_input} ${isError ? style.delView_error : ''}`}
                        defaultValue={value}
                        onChange={(v) => {
                            setIsError(false);
                            setValue(v);
                        }}
                        onBlur={() => {
                            if (!(currentView?.name === value)) {
                                setIsError(true);
                            }
                        }}
                    />
                    <p style={isError ? { opacity: '1' } : {}} className={style.delView_errorTips}>
                        视角名称错误
                    </p>
                </div>
                <div className={style.delView_button}>
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
                        label="确定"
                        size="normal"
                        type="primary"
                        disabled={value.trim() !== currentView.name}
                        onClick={() => {
                            if (!(currentView?.name === value)) {
                                setIsError(true);
                                return;
                            }
                            handleDelView && handleDelView(currentView.id as string);
                        }}
                    />
                </div>
            </div>
        </Alert>
    );
};
export default DelView;
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
