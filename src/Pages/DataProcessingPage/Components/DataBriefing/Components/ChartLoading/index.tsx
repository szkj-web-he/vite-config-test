/**
 * @file ChartLoading
 * @date 2022-09-30
 * @author liaoli
 * @lastModify liaoli 2022-09-30
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React from 'react';
import Skeleton from '~/Components/Skeleton';
import style from './style.scss';
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ChartLoadingProps {}
const ChartLoading: React.FC<ChartLoadingProps> = (): JSX.Element => {
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
        <div className={style.dataBriefing_Loading}>
            <Skeleton row={10} style={{ padding: ' 0 1.6rem' }} />
            <Skeleton row={10} style={{ padding: ' 0 1.6rem' }} />
        </div>
    );
};
export default ChartLoading;
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
