/**
 * @file index file of CircularProgress component
 * @date 2022-02-15
 * @author lidaoping
 * @lastModify lidaoping 2022-02-15
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React from "react";
import styles from "./style.scss";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
interface CircularProgressProps {
    size?: number;
    thickness?: number;
    percentage: number;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const CircularProgress: React.FC<CircularProgressProps> = ({
    size = 40,
    thickness = 6,
    percentage,
}): JSX.Element => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    /**
     * 圆角
     */
    const radius = size / 2 - thickness / 2;

    /**
     * 初始时是 4 分之一圆，所以需要计算这个来移动圆，展示一个完整的圆
     */
    const circleOffset = size / 2;

    /**
     * 圆周长
     */
    const circumference = radius * 2 * Math.PI;

    /**
     * 进度
     */
    const progress = circumference - (circumference * percentage) / 100;
    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/
    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <svg width={size} height={size} className={styles.circularProgress_container}>
            <circle
                className={styles.circularProgress_undersideCircle}
                strokeWidth={thickness}
                r={radius}
                cx={circleOffset}
                cy={circleOffset}
            />
            <circle
                className={styles.circularProgress_upsideCircle}
                strokeWidth={thickness}
                strokeDasharray={circumference}
                strokeDashoffset={String(progress)}
                r={radius}
                cx={circleOffset}
                cy={circleOffset}
            />
        </svg>
    );
};

export default CircularProgress;
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
