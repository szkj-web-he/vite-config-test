/**
 * @file ExportMessage
 * @date 2022-12-08
 * @author liaoli
 * @lastModify liaoli 2022-12-08
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import { Icon } from '@datareachable/dr_front_componentlibrary';
import React, { useEffect, useState } from 'react';
import style from './style.scss';
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ExportMessageProps {
    id: string;
}
const ExportMessage: React.FC<ExportMessageProps> = ({ id }): JSX.Element => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    // const status = localStorage.getItem('data_proc_export');
    const [status, setStatus] = useState(
        JSON.parse(sessionStorage.getItem('data_proc_export') || '{}')[id],
    );
    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    useEffect(() => {
        const changeWindowCommonMenuCollapsed = (e) => {
            if (e.data_proc_export) {
                setStatus(JSON.parse(e.data_proc_export as string)[id]);
            }
        };
        window.addEventListener('setItemEvent', changeWindowCommonMenuCollapsed);
        return () => {
            window.removeEventListener('setItemEvent', changeWindowCommonMenuCollapsed);
        };
    }, [id]);
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/
    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <div>
            {status === '1' ? (
                <div className={style.exportMessage_progress}>
                    <div></div>
                    <p>文件正在导出中，请勿离开此页面...</p>
                </div>
            ) : (
                <div className={style.exportMessage_success}>
                    <Icon type="complete" />
                    <div>文件导出完成</div>
                </div>
            )}
        </div>
    );
};
export default ExportMessage;
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
