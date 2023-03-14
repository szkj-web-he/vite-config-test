/**
 * @file ViewRename
 * @date 2022-09-01
 * @author liaoli
 * @lastModify liaoli 2022-09-01
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import { Alert, Button, ResetInput } from '@datareachable/dr_front_componentlibrary';
import React, { useEffect, useState } from 'react';
import style from './style.scss';
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ViewRenameProps {
    show: boolean;
    view: {
        id: string;
        name: string;
    };
    handleClose?: () => void;
    handleViewRename: (id: string, name: string) => void;
}
const ViewRename: React.FC<ViewRenameProps> = ({
    show,
    view,
    handleClose,
    handleViewRename,
}): JSX.Element => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    const [viewName, setViewName] = useState(view.name);
    /************* This section will include this component HOOK function *************/
    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    useEffect(() => {
        setViewName(view.name);
    }, [view.name]);
    /************* This section will include this component parameter *************/
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/
    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <Alert
            className={style.viewRename_alert}
            width="60rem"
            height="26.5rem"
            custom
            status={show}
            changeStatus={handleClose}
        >
            <div className={style.viewRename_container}>
                <h2 className={style.viewRename_title}>编辑视角名称</h2>
                <p className={style.viewRename_tips}>视角名称</p>
                <ResetInput
                    width="100%"
                    className={style.viewRename_input}
                    defaultValue={viewName}
                    onChange={(v) => {
                        setViewName(v);
                    }}
                />
                <div className={style.viewRename_button}>
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
                        label="保存"
                        size="normal"
                        type="primary"
                        disabled={viewName === view.name || viewName.trim() === ''}
                        onClick={() => {
                            handleViewRename(view.id, viewName);
                        }}
                    />
                </div>
            </div>
        </Alert>
    );
};
export default ViewRename;
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
