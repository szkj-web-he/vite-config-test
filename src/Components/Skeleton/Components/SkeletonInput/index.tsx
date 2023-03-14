/**
 * @file
 * @date 2021-10-30
 * @author zhoubin
 * @lastModify zhoubin 2021-10-30
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React from "react";
import style from "./style.scss";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
export interface SkeletonInputProps {
    /** Show animation effect */
    active?: boolean;
    /** style */
    style?: React.CSSProperties;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const SkeletonInput: React.FC<SkeletonInputProps> = ({ active = false, ...props }): JSX.Element => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/
    const getSkeletonInputClass = () => {
        let className = style["skeletonInput_input"] + " ";
        if (active) {
            className += style[`skeletonInput_input_active`] + " ";
        }
        return className;
    };
    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <div className={style.skeletonInput_container}>
            <span className={getSkeletonInputClass()} style={props.style}></span>
        </div>
    );
};
export default SkeletonInput;
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
