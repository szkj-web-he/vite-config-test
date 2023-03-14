/**
 * @file GlobalVarTable
 * @date 2022-09-06
 * @author liaoli
 * @lastModify liaoli 2022-09-06
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { useMemo } from 'react';
import style from './style.scss';
import { useSelector } from 'react-redux';
import { RootState } from '~/Store/rootReducer';

/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface GlobalVarTableProps {
    type: 'global' | 'marks';
}
const GlobalVarTable: React.FC<GlobalVarTableProps> = ({ type }): JSX.Element => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    const jobResult = useSelector((state: RootState) => state.jobList.getJobResult);

    const getShareData = useSelector((state: RootState) => state.jobView.getShareData);
    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    const marksList = useMemo(() => {
        let marks: { [var_name: string]: number } = {};
        if (getShareData.view.id && getShareData.jobResult) {
            getShareData.jobResult
                .map((v) => v.data.marks_count)
                .forEach((v) => {
                    marks = { ...marks, ...v };
                });
        } else if (jobResult) {
            jobResult
                .map((v) => v.data.marks_count)
                .forEach((v) => {
                    marks = { ...marks, ...v };
                });
        }
        return marks;
    }, [getShareData.jobResult, getShareData.view.id, jobResult]);

    const globalList = useMemo(() => {
        let global: { [var_name: string]: number } = {};
        console.log(getShareData.view.id, getShareData.jobResult);

        if (getShareData.view.id && getShareData.jobResult) {
            getShareData.jobResult
                .map((v) => v.data.global_vars)
                .forEach((v) => {
                    global = { ...global, ...v };
                });
        } else if (jobResult) {
            jobResult
                .map((v) => v.data.global_vars)
                .forEach((v) => {
                    global = { ...global, ...v };
                });
        }
        return global;
    }, [getShareData.jobResult, getShareData.view.id, jobResult]);

    const globalDesc = useMemo(() => {
        const desc = {};
        if (getShareData.view.id) {
            getShareData.jobResult.forEach((v) => {
                v.g_vars.forEach((item) => {
                    desc[item.name] = item.description;
                });
            });
        } else if (jobResult) {
            jobResult.forEach((v) => {
                v.g_vars.forEach((item) => {
                    desc[item.name] = item.description;
                });
            });
        }
        return desc;
    }, [getShareData.jobResult, getShareData.view.id, jobResult]);

    const showVar = useMemo(() => {
        return type === 'global' ? globalList : marksList;
    }, [globalList, marksList, type]);

    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/
    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return

    return (
        <div className={style.dataBriefing_globalVar}>
            <h2>{type === 'global' ? '【全局变量-常规】' : '【全局变量-配额】'}</h2>
            <div className={style.globalVar_table}>
                <div className={style.globalVar_header}>
                    <div>变量名称</div>
                    {type === 'global' && <div>变量描述</div>}
                    <div>值</div>
                </div>
                <div className={style.globalVar_body}>
                    {showVar &&
                        (Object.keys(showVar).length ? (
                            Object.keys(showVar)?.map((v) => (
                                <div key={v} className={style.globalVar_row}>
                                    <div>{v}</div>
                                    {type === 'global' && (
                                        <div>{globalDesc[v] || '未添加描述...'}</div>
                                    )}
                                    <div>{showVar[v]}</div>
                                </div>
                            ))
                        ) : (
                            <div
                                className={style.global_empty}
                                style={type === 'marks' ? { width: '23.4rem' } : {}}
                            >
                                无变量
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
};
export default GlobalVarTable;
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
