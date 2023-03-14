/**
 * @file StageNav
 * @date 2022-11-10
 * @author liaoli
 * @lastModify liaoli 2022-11-10
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import { Icon } from '@datareachable/dr_front_componentlibrary'
import React, { useRef } from 'react';
import style from './style.scss';
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface StageNavProps {
    stageStatus: number
}
const StageNav: React.FC<StageNavProps> = ({ stageStatus }): JSX.Element => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    const step = useRef(['保存', '测试', '发布']);
    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/

    /**
    * getNavNumber
    */
    const getaNavNumber = () => {
        switch (stageStatus) {
            case 1:
                return 0
            case 2:
                return 1
            case 3:
                return 1
            case 4:
                return 2
            case 5:
                return 3
            default:
                return 0
        }
    }

    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <div className={style.stageNav_container}>
            {step.current.map((item, index) => (
                <div key={index}>
                    {index !== 0 && <i></i>}
                    <span className={index <= getaNavNumber() ? index < getaNavNumber() ? style.stageNav_prev : style.stageNav_current : ''}>{index < getaNavNumber() ? <Icon type='right' /> : index + 1}</span>
                    <p>{item}</p>
                </div>
            ))}
        </div>
    );
};
export default StageNav;
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
