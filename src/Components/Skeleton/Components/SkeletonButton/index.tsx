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
export interface SkeletonButtonProps {
    /** Show animation effect */
    active?: boolean;
    /** Set the shape of button */
    shape?: "default" | "circle" | "round";
    /** style */
    style?: React.CSSProperties;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const SkeletonButton: React.FC<SkeletonButtonProps> = ({
    active = false,
    shape = "default",
    ...props
}): JSX.Element => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/
    const getSkeletonButtonClass = () => {
        let className = style["skeletonButton_button"] + " ";
        if (active) {
            className += style[`skeletonButton_button_active`] + " ";
        }
        if (shape !== "default") {
            className += style[`skeletonButton_button_${shape}`] + " ";
        }
        return className;
    };
    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <div className={style.skeletonButton_container}>
            <span className={getSkeletonButtonClass()} style={props.style}></span>
        </div>
    );
};
export default SkeletonButton;
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
