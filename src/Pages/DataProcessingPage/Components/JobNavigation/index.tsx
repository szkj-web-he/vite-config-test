/**
 * @file JobNavigation
 * @date 2022-11-01
 * @author liaoli
 * @lastModify liaoli 2022-11-01
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Icon } from '@datareachable/dr_front_componentlibrary';
import style from './style.scss';
import { RootState } from '~/Store/rootReducer';
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
interface JobNavigationProps {
    step: number;
    viewName?: string;
    jobName?: string;
    dataProcName?: string;
    disable?: number[];
    handleStepClick?: (step: number) => void;
}
const JobNavigation: React.FC<JobNavigationProps> = ({
    step,
    viewName,
    jobName,
    dataProcName,
    disable,
    handleStepClick,
}): JSX.Element => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    /** getDataProcessing info */
    const dataProcInfo = useSelector((state: RootState) => state.preparation.navData.data_proc);

    const currentJob = useSelector((state: RootState) => state.jobList.getCurrentJob);

    const [navList, setNavList] = useState<string[]>([]);
    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    useEffect(() => {
        const arr = [
            dataProcName || dataProcInfo.name,
            jobName || currentJob?.name || '',
            viewName || '',
        ];

        setNavList(arr.slice(0, step));
    }, [dataProcInfo.name, currentJob?.name, viewName, step, dataProcName, jobName]);
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/
    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <div className={style.dataProc_jobNav}>
            {navList.map((item, index) => (
                <React.Fragment key={index}>
                    {index !== 0 && <i>/</i>}
                    <div
                        className={step === index + 1 ? style.dataProc_activeStep : ''}
                        onClick={() => {
                            if (disable?.includes(index + 1)) return;
                            if (index + 1 !== step) {
                                handleStepClick && handleStepClick(index + 1);
                            }
                        }}
                    >
                        {index === 0 && <Icon type="home" />}
                        <p>{item}</p>
                    </div>
                </React.Fragment>
            ))}
        </div>
    );
};
export default JobNavigation;
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
