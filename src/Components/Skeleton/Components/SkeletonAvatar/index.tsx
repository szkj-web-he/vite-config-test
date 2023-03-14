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
export interface SkeletonAvatarProps {
    /** Show animation effect, only valid when used avatar independently */
    active?: boolean;
    /** Set the shape of avatar */
    shape?: "circle" | "square";
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const SkeletonAvatar: React.FC<SkeletonAvatarProps> = ({
    shape = "circle",
    active = false,
}): JSX.Element => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/
    const getSkeletonAvatarClass = () => {
        let className = style["skeletonAvatar_avatar"] + " ";
        if (shape === "circle") {
            className += style[`skeletonAvatar_avatar_${shape}`] + " ";
        }
        if (active) {
            className += style[`skeletonAvatar_avatar_active`] + " ";
        }
        return className;
    };
    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <div className={style.skeletonContainer_container}>
            <span className={getSkeletonAvatarClass()}></span>
        </div>
    );
};
export default SkeletonAvatar;
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
